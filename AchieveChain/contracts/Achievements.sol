pragma solidity ^0.8.0;

contract Achievements {
    struct Achievement {
        uint id;
        string description;
        uint timestamp;
    }

    mapping(address => Achievement[]) private achievements;
    uint private nextId;

    event AchievementAdded(address indexed user, uint id, string description, uint timestamp);

    function addAchievement(string memory description) public {
        achievements[msg.sender].push(Achievement(nextId, description, block.timestamp));
        emit AchievementAdded(msg.sender, nextId, description, block.timestamp);
        nextId++;
    }

    function getAchievements() public view returns (Achievement[] memory) {
        return achievements[msg.sender];
    }
}
