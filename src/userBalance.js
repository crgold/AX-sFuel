const { JsonRpcProvider, Wallet, formatEther } = require("ethers");

const {
    RPC_URL
} = require("./config");

const provider = new JsonRpcProvider(RPC_URL);

async function getUserBalance({ address }) {
    const balance = await provider.getBalance(
        {
            address: address
        }
    );
    return parseFloat(formatEther(balance));
}

module.exports = getUserBalance;
