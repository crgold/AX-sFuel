const { JsonRpcProvider, Wallet, formatEther } = require("ethers");

const {
    PRIVATE_KEY,
    RPC_URL
} = require("./config");

const provider = new JsonRpcProvider(RPC_URL);
const wallet = new Wallet(PRIVATE_KEY, provider);

async function getUserBalance() {
    const balance = await provider.getBalance(wallet.address);
    return parseFloat(formatEther(balance));
}

module.exports = getUserBalance;
