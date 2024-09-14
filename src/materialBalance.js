const { createThirdwebClient, getContract, readContract } = require("thirdweb");
const { defineChain } = require("thirdweb/chains");

const {
    SECRET_KEY
  } = require("./config");

async function getMaterialBalance({ address, tokenId }) {
    // create the client with your clientId, or secretKey if in a server environment
    const client = createThirdwebClient({ 
        secretKey: SECRET_KEY
    });

    // connect to your contract
    const contract = getContract({ 
    client, 
    chain: defineChain(37084624), 
    address: "0x0b34cE9c9dbE5a4894c0acb7fb29Eb34cE079A44"
    });

    return await readContract({ 
        contract, 
        method: "function balanceOf(address, uint256) view returns (uint256)", 
        params: [address, tokenId] 
      });
}

module.exports = getMaterialBalance;