const { parseEther } = require("ethers");

const DISTRIBUTION_VALUE = parseEther("0.00001");
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const RPC_URL = process.env.RPC_URL;
const SECRET_KEY = process.env.SECRET_KEY

if (!PRIVATE_KEY) throw new Error("Missing Private Key");
if (!RPC_URL) throw new Error("Missing RPC URL");

module.exports = {
	DISTRIBUTION_VALUE,
	PRIVATE_KEY,
	RPC_URL,
	SECRET_KEY
}
