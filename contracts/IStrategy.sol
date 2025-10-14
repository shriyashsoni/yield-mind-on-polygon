// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title IStrategy
 * @notice Interface for yield strategy adapters
 * @dev All strategy contracts must implement this interface
 */
interface IStrategy {
    /**
     * @notice Invest assets into the strategy
     * @param amount Amount of assets to invest
     */
    function invest(uint256 amount) external;
    
    /**
     * @notice Divest assets from the strategy
     * @param amount Amount of assets to withdraw
     */
    function divest(uint256 amount) external;
    
    /**
     * @notice Get estimated value of assets in strategy
     * @return Estimated value in base asset terms
     */
    function estimatedValue() external view returns (uint256);
    
    /**
     * @notice Harvest yields from the strategy
     */
    function harvest() external;
    
    /**
     * @notice Get the underlying asset address
     */
    function asset() external view returns (address);
    
    /**
     * @notice Get strategy name
     */
    function name() external view returns (string memory);
}
