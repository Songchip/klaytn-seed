const fs = require('fs');
const ERC721Card = artifacts.require('ERC721Card');  // 계약 정보(artifact)를 읽어와야

module.exports = function(deployer) {
	deployer.deploy(ERC721Card).then(() => {
		const data = JSON.stringify({
			blockAddress: ERC721Card.blockAddress,
			contractAddress: ERC721Card.address
		});
		fs.writeFile('./contract.json', data, () =>
			console.log(`migrate completed: ${ERC721Card.address}`)
		);
	});
};
