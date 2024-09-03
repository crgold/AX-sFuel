const { JsonRpcProvider, formatEther } = require("ethers");

const {
    RPC_URL
} = require("./config");

const provider = new JsonRpcProvider(RPC_URL);;

async function Balance() {
    const balance = await provider.getBalance(address);
    return parseFloat(formatEther(balance));
}

module.exports = Balance;
