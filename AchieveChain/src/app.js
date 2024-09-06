/*
*Notes
* Replace 'YOUR_CONTRACT_ADDRESS' in src/app.js with the actual address of your 
* deployed smart contract.
* Ensure MetaMask or another Ethereum wallet extension is installed and connected 
* to the same network as your Ganache instance.
*/

window.addEventListener('load', async () => {
    // Check if Web3 is injected
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: 'eth_requestAccounts' });
    } else {
        alert('Please install MetaMask to use this app.');
        return;
    }

    const contractAddress = 'YOUR_CONTRACT_ADDRESS';
    const contractABI = [
        {
            "constant": false,
            "inputs": [{"name": "description", "type": "string"}],
            "name": "addAchievement",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "getAchievements",
            "outputs": [
                {
                    "components": [
                        {"name": "id", "type": "uint256"},
                        {"name": "description", "type": "string"},
                        {"name": "timestamp", "type": "uint256"}
                    ],
                    "name": "",
                    "type": "tuple[]"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }
    ];

    const contract = new web3.eth.Contract(contractABI, contractAddress);

    const form = document.getElementById('achievementForm');
    form.addEventListener('submit', async (e    ) => {
        e.preventDefault();
        const description = document.getElementById('description').value;
        const accounts = await web3.eth.getAccounts();
        const account = accounts[0];

        try {
            await contract.methods.addAchievement(description).send({ from: account });
            alert('Achievement added!');
            loadAchievements();
        } catch (error) {
            console.error('Error adding achievement:', error);
        }
    });

    async function loadAchievements() {
        const achievements = await contract.methods.getAchievements().call();
        const achievementList = document.getElementById('achievementList');
        achievementList.innerHTML = '';
        achievements.forEach(ach => {
            const listItem = document.createElement('li');
            listItem.textContent = `ID: ${ach.id} - ${ach.description} (Timestamp: ${new Date(ach.timestamp * 1000).toLocaleString()})`;
            achievementList.appendChild(listItem);
        });
    }

    loadAchievements(); // Load achievements on page load
});

