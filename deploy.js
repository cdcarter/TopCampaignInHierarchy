var mavensmate = require('mavensmate');
var fs = require('fs-extra')
var client = mavensmate.createClient({
	headless: true,
	verbose: true,
	editor: 'atom'
});

client.executeCommand('new-project',
	{'name': 'TopCampaignInHierarchyForDeploy', 'username':process.env.USERNAME,
	 'password':process.env.PASSWORD,'workspace': '.','orgType':'Production'}
	,function(x) {
		fs.removeSync('TopCampaignInHierarchyForDeploy/src/');
		fs.copySync('src/','TopCampaignInHierarchyForDeploy/src/');
		client.setProject('TopCampaignInHierarchyForDeploy', function(err, res) {
			client.executeCommand('compile-project',function(err,res) {
				console.log(err);
				console.log(res);
				process.exit(); 
			})
		});
	}
);
