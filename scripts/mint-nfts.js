require('dotenv').config()
const API_URL = process.env.API_URL
const CONTRACT_ADDR = process.env.CONTRACT_ADDR // CONTRACT_ADDR="0x98AACB97ce38063f7368aFE92aD80F1c3C2A9ba8"
const PRIVATE_KEY = process.env.PRIVATE_KEY
const PUBLIC_KEY = process.env.PUBLIC_KEY

const {createAlchemyWeb3 } = require('@alch/alchemy-web3')
const web3 = createAlchemyWeb3(API_URL)

const contractArtifact = require('../artifacts/contracts/RareJunos.sol/RareJunos.json')
const contract = new web3.eth.Contract(contractArtifact.abi, CONTRACT_ADDR)

async function mintNFT(address, tokenData) {
    const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest')

    const tx = {
        'from': PUBLIC_KEY,
        'to': CONTRACT_ADDR,
        'nonce': nonce,
        'gas': 500000,
        'data': contract.methods.mintNFT(address, tokenData).encodeABI()
    }

    const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY)

    signPromise
        .then((signedTx) => {
            web3.eth.sendSignedTransaction(
                signedTx.rawTransaction,
                (error, hash) => {
                    if (!error) {
                        console.log("Transaction hash: ", hash)
                    } else {
                        console.log("Unable to send signed transaction: ", error)
                    }
                }
            )
        })
        .catch((error) => {
            console.log("Unable to sign transaction: ", error)
        })
}

const JUNO_1 = "https://gateway.pinata.cloud/ipfs/QmS8kPCHQBHhBM8DHFr8ERwTAUYPcFr5RgcK12jrYwFwpv"
const JUNO_2 = "https://gateway.pinata.cloud/ipfs/QmVgjA4zwhguije3yqgCFNQLHwW2rRWhaQsLHEcVy15GZ2"
const JUNO_3 = "https://gateway.pinata.cloud/ipfs/QmX7KWZNrYAK2P3Lw6Kfw9FKoU2nKdDGYozhZFkcJZks3D"

// mintNFT('0xd8e1B0C57140b523F5129F69651E32D7Fe134D71', JUNO_3)
