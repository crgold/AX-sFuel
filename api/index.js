const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const {isAddress} = require("ethers");
const Distribute = require("../src/distribute");
const Balance = require("../src/balance");
const getUserBalance = require("../src/userBalance");
const mintMaterial = require('../src/mintMaterial')
const batchMintMaterial = require('../src/batchMintMaterial');
const getMaterialBalance = require('../src/materialBalance');
const getBatchMaterialBalance = require('../src/batchMaterialBalance');
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

app.get("/balance/:address", async(req, res) => {

	const { address } = req.params;

	if (!isAddress(address)) return res.status(400).send("Invalid Ethereum Address");

	return res.status(200).send({
		balance: await getUserBalance({ address })
	});
});

app.get("/mint/:address/:tokenId/:amount", async(req, res) => {

	const { address, tokenId, amount } = req.params;

	if (!isAddress(address)) return res.status(400).send("Invalid Ethereum Address");

	// Check if tokenId and amount are integers
	const tokenIdInt = Number(tokenId);
	const amountInt = Number(amount);
  
	if (!Number.isInteger(tokenIdInt) || !Number.isInteger(amountInt)) {
	  return res.status(400).send("tokenId and amount must be valid integers");
	};

	return res.status(200).send({
		transactionHash: await mintMaterial({
			address,
			tokenId,
			amount
		})
	});
});

app.get("/batchMint/:address/:tokenIds/:amounts", async (req, res) => {
	const { address, tokenIds, amounts } = req.params;
  
	// Check if address is valid
	if (!isAddress(address)) return res.status(400).send("Invalid Ethereum Address");
  
	// Split tokenIds and amounts by commas to convert them into arrays
	const tokenIdArray = tokenIds.split(',').map(Number);
	const amountArray = amounts.split(',').map(Number);
  
	// Check if all elements in tokenIdArray and amountArray are valid integers
	const areTokenIdsValid = tokenIdArray.every((id) => Number.isInteger(id));
	const areAmountsValid = amountArray.every((amt) => Number.isInteger(amt));
  
	if (!areTokenIdsValid || !areAmountsValid) {
	  return res.status(400).send("All elements in tokenIds and amounts must be valid integers");
	}
  
	// Ensure both arrays have the same length
	if (tokenIdArray.length !== amountArray.length) {
	  return res.status(400).send("tokenIds and amounts arrays must have the same length");
	}
  
	return res.status(200).send({
		transactionHash: await batchMintMaterial({
			address,
			tokenIds,
			amounts
		})
	});
  });

  app.get("/balance/:address/:tokenId", async(req, res) => {

	const { address, tokenId } = req.params;

	if (!isAddress(address)) return res.status(400).send("Invalid Ethereum Address");

	// Check if tokenId and amount are integers
	const tokenIdInt = Number(tokenId);
  
	if (!Number.isInteger(tokenIdInt)) {
	  return res.status(400).send("tokenId and amount must be valid integers");
	};

	return res.status(200).send({
		balance: await getMaterialBalance({
			address,
			tokenId
		})
	});
});

app.get("/balances/:addresses/:tokenIds", async(req, res) => {

	const { addresses, tokenIds } = req.params;

	// Split addresses by commas and validate each one
	const addressArray = addresses.split(',');

	const areAddressesValid = addressArray.every((addr) => isAddress(addr));
  
	if (!areAddressesValid) {
	  return res.status(400).send("One or more Ethereum addresses are invalid");
	}

	// Split tokenIds and amounts by commas to convert them into arrays
	const tokenIdArray = tokenIds.split(',').map(Number);

	// Check if all elements in tokenIdArray are valid integers
	const areTokenIdsValid = tokenIdArray.every((id) => Number.isInteger(id));
  
	if (!areTokenIdsValid) {
	  return res.status(400).send("All elements in tokenIds and amounts must be valid integers");
	}
  
	if (!Number.isInteger(tokenIdInt)) {
	  return res.status(400).send("tokenId and amount must be valid integers");
	};

	return res.status(200).send({
		balance: await getBatchMaterialBalance({
			addresses,
			tokenIds
		})
	});
});

module.exports = app;
