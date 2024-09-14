const { parseEther } = require("ethers");

const DISTRIBUTION_VALUE = parseEther("0.00001");
const GAS_KEY = process.env.GAS_KEY;
const RPC_URL = process.env.RPC_URL;
const SECRET_KEY = process.env.SECRET_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

if (!GAS_KEY) throw new Error("Missing Private Key");
if (!RPC_URL) throw new Error("Missing RPC URL");

module.exports = {
	DISTRIBUTION_VALUE,
	GAS_KEY,
	RPC_URL,
	SECRET_KEY,
	PRIVATE_KEY
}
