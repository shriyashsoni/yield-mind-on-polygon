// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

/**
 * @title RebalanceOracle
 * @notice Oracle contract that verifies and stores ML-generated rebalancing recommendations
 * @dev Uses ECDSA signature verification to ensure recommendations come from authorized ML service
 */
contract RebalanceOracle is AccessControl {
    using ECDSA for bytes32;
    
    bytes32 public constant SIGNER_ROLE = keccak256("SIGNER_ROLE");
    
    struct Recommendation {
        string vaultId;
        uint256 timestamp;
        string modelVersion;
        address[] assets;
        uint256[] weights; // in basis points
        uint256 confidence; // 0-10000 (0-100%)
        address signer;
    }
    
    Recommendation public latestRecommendation;
    mapping(string => Recommendation[]) public recommendationHistory;
    
    uint256 public constant MIN_CONFIDENCE = 7000; // 70%
    uint256 public constant MAX_RECOMMENDATION_AGE = 1 hours;
    
    event NewRecommendation(
        string indexed vaultId,
        address indexed signer,
        uint256 timestamp,
        string modelVersion,
        uint256 confidence
    );
    
    event SignerAdded(address indexed signer);
    event SignerRemoved(address indexed signer);
    
    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }
    
    /**
     * @notice Submit a new ML recommendation with signature verification
     * @param vaultId Identifier for the vault
     * @param timestamp Unix timestamp of recommendation generation
     * @param modelVersion Version identifier of the ML model
     * @param assets Array of asset addresses
     * @param weights Array of allocation weights (basis points)
     * @param confidence Confidence score (0-10000)
     * @param signature ECDSA signature from authorized ML service
     */
    function submitRecommendation(
        string calldata vaultId,
        uint256 timestamp,
        string calldata modelVersion,
        address[] calldata assets,
        uint256[] calldata weights,
        uint256 confidence,
        bytes calldata signature
    ) external {
        require(assets.length == weights.length, "Assets and weights length mismatch");
        require(confidence >= MIN_CONFIDENCE, "Confidence too low");
        require(timestamp <= block.timestamp, "Future timestamp");
        require(block.timestamp - timestamp <= MAX_RECOMMENDATION_AGE, "Recommendation too old");
        
        // Verify total weights sum to 100%
        uint256 totalWeight = 0;
        for (uint256 i = 0; i < weights.length; i++) {
            totalWeight += weights[i];
        }
        require(totalWeight <= 10000, "Total weight exceeds 100%");
        
        // Verify signature
        bytes32 messageHash = keccak256(abi.encodePacked(
            vaultId,
            timestamp,
            modelVersion,
            assets,
            weights,
            confidence
        ));
        
        address signer = messageHash.toEthSignedMessageHash().recover(signature);
        require(hasRole(SIGNER_ROLE, signer), "Invalid signer");
        
        // Store recommendation
        Recommendation memory rec = Recommendation({
            vaultId: vaultId,
            timestamp: timestamp,
            modelVersion: modelVersion,
            assets: assets,
            weights: weights,
            confidence: confidence,
            signer: signer
        });
        
        latestRecommendation = rec;
        recommendationHistory[vaultId].push(rec);
        
        emit NewRecommendation(vaultId, signer, timestamp, modelVersion, confidence);
    }
    
    /**
     * @notice Get the latest recommendation
     */
    function getLatestRecommendation() external view returns (
        string memory vaultId,
        uint256 timestamp,
        string memory modelVersion,
        address[] memory assets,
        uint256[] memory weights,
        uint256 confidence,
        address signer
    ) {
        Recommendation memory rec = latestRecommendation;
        return (
            rec.vaultId,
            rec.timestamp,
            rec.modelVersion,
            rec.assets,
            rec.weights,
            rec.confidence,
            rec.signer
        );
    }
    
    /**
     * @notice Get recommendation history for a vault
     */
    function getRecommendationHistory(string calldata vaultId, uint256 limit) 
        external 
        view 
        returns (Recommendation[] memory) 
    {
        Recommendation[] storage history = recommendationHistory[vaultId];
        uint256 length = history.length > limit ? limit : history.length;
        
        Recommendation[] memory result = new Recommendation[](length);
        for (uint256 i = 0; i < length; i++) {
            result[i] = history[history.length - 1 - i];
        }
        
        return result;
    }
    
    /**
     * @notice Check if a recommendation is still valid
     */
    function isRecommendationValid() external view returns (bool) {
        if (latestRecommendation.timestamp == 0) return false;
        if (block.timestamp - latestRecommendation.timestamp > MAX_RECOMMENDATION_AGE) return false;
        if (latestRecommendation.confidence < MIN_CONFIDENCE) return false;
        return true;
    }
    
    /**
     * @notice Add an authorized signer
     */
    function addSigner(address signer) external onlyRole(DEFAULT_ADMIN_ROLE) {
        grantRole(SIGNER_ROLE, signer);
        emit SignerAdded(signer);
    }
    
    /**
     * @notice Remove an authorized signer
     */
    function removeSigner(address signer) external onlyRole(DEFAULT_ADMIN_ROLE) {
        revokeRole(SIGNER_ROLE, signer);
        emit SignerRemoved(signer);
    }
}
