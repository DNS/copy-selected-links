exports.main = function() {
	const self = require("sdk/self");
	const notifications = require("sdk/notifications");
	const urls = require("sdk/url");
	const clipboard = require("sdk/clipboard");
	const cm = require("sdk/context-menu");
	const prefs = require('sdk/simple-prefs');
	
	const iconUrl = self.data.url("icon-64.png");
	
	function debug() {
		if (prefs.prefs.debug) {
			let msg = "Debug:";
			for (let i = 0;i < arguments.length;i++) {
				msg += " " + arguments[i];
			}
			console.log(msg);
		}
	}
	
	cm.Item({
		label: "Copy URLs of selected links",
		image: self.data.url("icon-16.png"),
		context: [cm.SelectionContext()],
		contentScriptFile: self.data.url("context.js"),
		onMessage: function(msg) {
			debug("received", msg.links);
			let links = [];
			for (let i = 0;i < msg.links.length;i++) {
				let link = msg.links[i];
				if (urls.isValidURI(link)) {
					links.push(link);
				}
			}
			debug("after parsing:", links);
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