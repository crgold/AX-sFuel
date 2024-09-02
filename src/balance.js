const { JsonRpcProvider, Wallet } = require("ethers");

const {
    PRIVATE_KEY,
    RPC_URL
} = require("./config");

const provider = new JsonRpcProvider(RPC_URL);
const wallet = new Wallet(PRIVATE_KEY, provider);

async function Balance() {
    const balance = await provider.getBalance(wallet.address);
    return parseFloat(balance.toString()); // Convert BigNumber to a number
	//return balance.toString(); // Convert BigNumber to string
}

module.exports = Balance;
