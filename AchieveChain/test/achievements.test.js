const Achievements = artifacts.require("Achievements");

contract('Achievements', (accounts) => {
    it('should allow users to add achievements and retrieve them', async () => {
        const instance = await Achievements.deployed();
        const user = accounts[0];
        
        await instance.addAchievement("My first achievement", { from: user });
        const achievements = await instance.getAchievements.call({ from: user });

        assert.equal(achievements.length, 1, "Achievement was not added correctly");
        assert.equal(achievements[0].description, "My first achievement", "Achievement description does not match");
    });
});
