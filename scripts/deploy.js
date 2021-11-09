const { ethers } = require("hardhat");

async function main() {
    const RareJunos = await ethers.getContractFactory("RareJunos")

    const rareJunos = await RareJunos.deploy()
    console.log(`Contract deployed to address: ${rareJunos.address}`)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
