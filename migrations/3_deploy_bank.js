const fs = require('fs');
const AzureUploader = require('@flui/klaytn-uploader').AzureUploader;
const SCVBank = artifacts.require('SCVBank');

module.exports = function(deployer) {
	deployer.deploy(SCVBank).then(() => {
		const data = JSON.stringify({
			contractAddress: SCVBank.address
		});

		if (!fs.existsSync('./artifacts')) {
			fs.mkdirSync('./artifacts');
			console.log(`\n    Create Artifacts`);
		}

		fs.writeFileSync('./artifacts/address.json', data);
		console.log(`\n    Create file of contract address to json: ${SCVBank.address}`);

		const abi = JSON.stringify(SCVBank._json.abi);
		fs.writeFileSync('./artifacts/abi.json', abi);
		console.log(`\n    Create file of abi file to json: ${SCVBank.address}`);

		const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;
		const accessKey = process.env.AZURE_STORAGE_ACCOUNT_ACCESS_KEY;
		const uploader = new AzureUploader(accountName, accessKey);

		const containerName = process.env.AZURE_STORAGE_CONTRACT_CONTAINER_NAME;
		uploader.uploadArtifacts(SCVBank._json.contractName, 'artifacts', containerName);
	});
};
