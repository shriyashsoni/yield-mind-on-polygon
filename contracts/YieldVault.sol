// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

/**
 * @title YieldVault
 * @notice Main vault contract for YieldMind DeFi optimizer
 * @dev Manages user deposits, withdrawals, and strategy allocations
 */
contract YieldVault is ERC20, ReentrancyGuard, Pausable, AccessControl {
    bytes32 public constant STRATEGIST_ROLE = keccak256("STRATEGIST_ROLE");
    bytes32 public constant REBALANCER_ROLE = keccak256("REBALANCER_ROLE");
    
    IERC20 public immutable asset;
    
    struct StrategyInfo {
        address strategyAddress;
        uint256 allocation; // in basis points (10000 = 100%)
        bool active;
    }
    
    StrategyInfo[] public strategies;
    uint256 public totalAllocated;
    uint256 public performanceFee = 1000; // 10% in basis points
    uint256 public managementFee = 100; // 1% annual in basis points
    
    address public treasury;
    uint256 public lastHarvestTime;
    
    event Deposit(address indexed user, uint256 assets, uint256 shares);
    event Withdraw(address indexed user, uint256 assets, uint256 shares);
    event Rebalanced(uint256 timestamp, uint256[] newAllocations);
    event StrategyAdded(address indexed strategy, uint256 allocation);
    event StrategyRemoved(address indexed strategy);
    event FeesCollected(uint256 performanceFees, uint256 managementFees);
    
    constructor(
        address _asset,
        address _treasury,
        string memory _name,
        string memory _symbol
    ) ERC20(_name, _symbol) {
        asset = IERC20(_asset);
        treasury = _treasury;
        lastHarvestTime = block.timestamp;
        
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(STRATEGIST_ROLE, msg.sender);
        _grantRole(REBALANCER_ROLE, msg.sender);
    }
    
    /**
     * @notice Deposit assets into the vault
     * @param amount Amount of assets to deposit
     */
    function deposit(uint256 amount) external nonReentrant whenNotPaused returns (uint256 shares) {
        require(amount > 0, "Amount must be greater than 0");
        
        uint256 totalAssets = getTotalAssets();
        uint256 supply = totalSupply();
        
        if (supply == 0) {
            shares = amount;
        } else {
            shares = (amount * supply) / totalAssets;
        }
        
        require(asset.transferFrom(msg.sender, address(this), amount), "Transfer failed");
        _mint(msg.sender, shares);
        
        emit Deposit(msg.sender, amount, shares);
    }
    
    /**
     * @notice Withdraw assets from the vault
     * @param shares Amount of shares to burn
     */
    function withdraw(uint256 shares) external nonReentrant returns (uint256 assets) {
        require(shares > 0, "Shares must be greater than 0");
        require(balanceOf(msg.sender) >= shares, "Insufficient shares");
        
        uint256 totalAssets = getTotalAssets();
        assets = (shares * totalAssets) / totalSupply();
        
        _burn(msg.sender, shares);
        
        // Withdraw from strategies if needed
        uint256 availableBalance = asset.balanceOf(address(this));
        if (availableBalance < assets) {
            _withdrawFromStrategies(assets - availableBalance);
        }
        
        require(asset.transfer(msg.sender, assets), "Transfer failed");
        
        emit Withdraw(msg.sender, assets, shares);
    }
    
    /**
     * @notice Rebalance vault allocations across strategies
     * @param newAllocations Array of new allocation percentages (basis points)
     */
    function rebalance(uint256[] calldata newAllocations) 
        external 
        onlyRole(REBALANCER_ROLE) 
        nonReentrant 
    {
        require(newAllocations.length == strategies.length, "Invalid allocations length");
        
        uint256 totalAllocation = 0;
        for (uint256 i = 0; i < newAllocations.length; i++) {
            totalAllocation += newAllocations[i];
        }
        require(totalAllocation <= 10000, "Total allocation exceeds 100%");
        
        // Withdraw all from strategies
        for (uint256 i = 0; i < strategies.length; i++) {
            if (strategies[i].active) {
                IStrategy(strategies[i].strategyAddress).divest(
                    IStrategy(strategies[i].strategyAddress).estimatedValue()
                );
            }
        }
        
        // Reallocate based on new weights
        uint256 totalAssets = asset.balanceOf(address(this));
        for (uint256 i = 0; i < newAllocations.length; i++) {
            if (newAllocations[i] > 0 && strategies[i].active) {
                uint256 amountToInvest = (totalAssets * newAllocations[i]) / 10000;
                strategies[i].allocation = newAllocations[i];
                
                asset.approve(strategies[i].strategyAddress, amountToInvest);
                IStrategy(strategies[i].strategyAddress).invest(amountToInvest);
            }
        }
        
        emit Rebalanced(block.timestamp, newAllocations);
    }
    
    /**
     * @notice Get total assets under management
     */
    function getTotalAssets() public view returns (uint256) {
        uint256 total = asset.balanceOf(address(this));
        
        for (uint256 i = 0; i < strategies.length; i++) {
            if (strategies[i].active) {
                total += IStrategy(strategies[i].strategyAddress).estimatedValue();
            }
        }
        
        return total;
    }
    
    /**
     * @notice Get Net Asset Value per share
     */
    function getNAV() external view returns (uint256) {
        uint256 supply = totalSupply();
        if (supply == 0) return 1e18;
        return (getTotalAssets() * 1e18) / supply;
    }
    
    /**
     * @notice Add a new strategy
     */
    function addStrategy(address strategyAddress, uint256 allocation) 
        external 
        onlyRole(STRATEGIST_ROLE) 
    {
        require(strategyAddress != address(0), "Invalid strategy address");
        require(totalAllocated + allocation <= 10000, "Exceeds 100% allocation");
        
        strategies.push(StrategyInfo({
            strategyAddress: strategyAddress,
            allocation: allocation,
            active: true
        }));
        
        totalAllocated += allocation;
        
        emit StrategyAdded(strategyAddress, allocation);
    }
    
    /**
     * @notice Remove a strategy
     */
    function removeStrategy(uint256 index) external onlyRole(STRATEGIST_ROLE) {
        require(index < strategies.length, "Invalid index");
        
        StrategyInfo storage strategy = strategies[index];
        require(strategy.active, "Strategy already inactive");
        
        // Divest all funds from strategy
        IStrategy(strategy.strategyAddress).divest(
            IStrategy(strategy.strategyAddress).estimatedValue()
        );
        
        totalAllocated -= strategy.allocation;
        strategy.active = false;
        
        emit StrategyRemoved(strategy.strategyAddress);
    }
    
    /**
     * @notice Harvest yields and collect fees
     */
    function harvest() external onlyRole(STRATEGIST_ROLE) {
        uint256 totalBefore = getTotalAssets();
        
        // Harvest from all strategies
        for (uint256 i = 0; i < strategies.length; i++) {
            if (strategies[i].active) {
                IStrategy(strategies[i].strategyAddress).harvest();
            }
        }
        
        uint256 totalAfter = getTotalAssets();
        uint256 profit = totalAfter > totalBefore ? totalAfter - totalBefore : 0;
        
        if (profit > 0) {
            uint256 performanceFeeAmount = (profit * performanceFee) / 10000;
            asset.transfer(treasury, performanceFeeAmount);
            
            emit FeesCollected(performanceFeeAmount, 0);
        }
        
        lastHarvestTime = block.timestamp;
    }
    
    function _withdrawFromStrategies(uint256 amount) internal {
        uint256 remaining = amount;
        
        for (uint256 i = 0; i < strategies.length && remaining > 0; i++) {
            if (strategies[i].active) {
                uint256 strategyBalance = IStrategy(strategies[i].strategyAddress).estimatedValue();
                uint256 toWithdraw = remaining > strategyBalance ? strategyBalance : remaining;
                
                IStrategy(strategies[i].strategyAddress).divest(toWithdraw);
                remaining -= toWithdraw;
            }
        }
    }
    
    function pause() external onlyRole(DEFAULT_ADMIN_ROLE) {
        _pause();
    }
    
    function unpause() external onlyRole(DEFAULT_ADMIN_ROLE) {
        _unpause();
    }
}

interface IStrategy {
    function invest(uint256 amount) external;
    function divest(uint256 amount) external;
    function estimatedValue() external view returns (uint256);
    function harvest() external;
}
