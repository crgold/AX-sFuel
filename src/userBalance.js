const { JsonRpcProvider, formatEther } = require("ethers");

const { RPC_URL } = require("./config");

const provider = new JsonRpcProvider(RPC_URL);

async function getUserBalance({ address }) {
    try {
        const balance = await provider.getBalance(address);
        return parseFloat(formatEther(balance));
    } catch (error) {
        console.error("Error getting user balance:", error);
        throw error;
    }
}

module.exports = getUserBalance;
