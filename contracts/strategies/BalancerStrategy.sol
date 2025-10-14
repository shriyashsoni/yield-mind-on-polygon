// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "../IStrategy.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title BalancerStrategy
 * @notice Strategy adapter for Balancer weighted pools on Polygon
 * @dev Simplified implementation for demonstration
 */
contract BalancerStrategy is IStrategy, Ownable {
    IERC20 public immutable override asset;
    address public immutable vault;
    address public balancerPool;
    
    string public constant override name = "Balancer Weighted Pool Strategy";
    
    uint256 private investedAmount;
    
    event Invested(uint256 amount);
    event Divested(uint256 amount);
    event Harvested(uint256 yield);
    
    constructor(address _asset, address _vault, address _balancerPool) {
        asset = IERC20(_asset);
        vault = _vault;
        balancerPool = _balancerPool;
    }
    
    modifier onlyVault() {
        require(msg.sender == vault, "Only vault can call");
        _;
    }
    
    function invest(uint256 amount) external override onlyVault {
        require(amount > 0, "Amount must be greater than 0");
        
        asset.transferFrom(msg.sender, address(this), amount);
        
        // In production: interact with Balancer vault to add liquidity
        // For demo: track invested amount
        investedAmount += amount;
        
        emit Invested(amount);
    }
    
    function divest(uint256 amount) external override onlyVault {
        require(amount > 0, "Amount must be greater than 0");
        require(amount <= investedAmount, "Insufficient invested amount");
        
        // In production: withdraw from Balancer pool
        // For demo: transfer tracked amount
        investedAmount -= amount;
        asset.transfer(vault, amount);
        
        emit Divested(amount);
    }
    
    function estimatedValue() external view override returns (uint256) {
        // In production: calculate actual LP token value
        // For demo: return invested amount with simulated 22.5% APY
        uint256 timeElapsed = 30 days; // Simplified
        uint256 apy = 2250; // 22.5% in basis points
        uint256 yield = (investedAmount * apy * timeElapsed) / (10000 * 365 days);
        return investedAmount + yield;
    }
    
    function harvest() external override onlyVault {
        // In production: claim Balancer rewards (BAL tokens)
        // For demo: emit event
        uint256 yield = this.estimatedValue() - investedAmount;
        emit Harvested(yield);
    }
    
    function updateBalancerPool(address newPool) external onlyOwner {
        balancerPool = newPool;
    }
}
