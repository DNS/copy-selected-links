exports.main = function() {
	const self = require("sdk/self");
	const notifications = require("sdk/notifications");
	const urls = require("sdk/url");
	const clipboard = require("sdk/clipboard");
	const cm = require("sdk/context-menu");
	
	const iconUrl = self.data.url("icon-64.png");
	
	cm.Item({
		label: "Copy URLs of selected links",
		image: self.data.url("icon-16.png"),
		context: [cm.SelectionContext()],
		contentScriptFile: self.data.url("context.js"),
		onMessage: function(msg) {
			let links = [];
			for (let i = 0;i < msg.links.length;i++) {
				let link = msg.links[i];
				if (urls.isValidURI(link)) {
					links.push(link);
				}
			}
			if (links.length > 0) {
				clipboard.set(links.join("\n"));
			}
			notifications.notify({
				title: "Copied " + links.length + " link" + (links.length == 1? "": "s") + "!",
				iconURL: iconUrl
			});
		}
	});
}