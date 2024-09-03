const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const {isAddress} = require("ethers");
const Distribute = require("../src/distribute");
const Balance = require("../src/balance");
const getUserBalance = require("../src/userBalance");
const {json, urlencoded} = require("express");

/**
 * Initialize Express Application
 */
const app = express();

/** Express Middleware */
app.use(json());
app.use(urlencoded());
app.use(cors());
app.use(helmet());

app.get("/", (_, res) => {
	return res.status(200).send("API Distributor Healthy");
});

app.get("/claim/:address", async(req, res) => {

	const { address } = req.params;

	if (!isAddress(address)) return res.status(400).send("Invalid Ethereum Address");

	const distribute = await Distribute({ address });

	return res.status(200).send({
		distribute
	});
});

app.get("/balance", async(_, res) => {
	return res.status(200).send({
		balance: await Balance()
	});
});

app.get("/balance/:address", async(_, res) => {

	const { address } = req.params;

	if (!isAddress(address)) return res.status(400).send("Invalid Ethereum Address");

	return res.status(200).send({
		balance: await getUserBalance({ address })
	});
});

module.exports = app;
