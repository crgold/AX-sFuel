const { JsonRpcProvider, Wallet, formatEther } = require("ethers");

const {
    GAS_KEY,
    RPC_URL
} = require("./config");

const provider = new JsonRpcProvider(RPC_URL);
const wallet = new Wallet(GAS_KEY, provider);

async function Balance() {
    const balance = await provider.getBalance(wallet.address);
    return parseFloat(formatEther(balance));
}

module.exports = Balance;
