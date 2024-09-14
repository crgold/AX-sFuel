import { createThirdwebClient, getContract, prepareContractCall, sendAndConfirmTransaction } from "thirdweb";
import { defineChain } from "thirdweb/chains";

const {
    SECRET_KEY
} = require("./config");

async function mintMaterial({ address, tokenId, amount }) {
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

    const transaction = await prepareContractCall({ 
    contract, 
    method: "function mintTo(address _to, uint256 _tokenId, string _tokenURI, uint256 _amount)", 
    params: [address, tokenId, "", amount] 
    });
    
    return await sendAndConfirmTransaction({ 
    transaction, 
    account 
    });
}

module.exports = mintMaterial;