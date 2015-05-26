exports.main = function() {
	const self = require("sdk/self");
	const notifications = require("sdk/notifications");
	const urls = require("sdk/url");
	const clipboard = require("sdk/clipboard");
	const cm = require("sdk/context-menu");
	
	const {debug} = require("./lib/debug-1.0.0.js");
	
	const iconUrl = self.data.url("icon-64.png");
	
	const onMessage = msg => {
		debug("received", msg.links);
		const links = msg.links.filter(urls.isValidURI);
		debug("after validating:", links);
		links.length > 0 && clipboard.set(links.join("\n"));
		notifications.notify({
			title: "Copied " + links.length + " link" + (links.length == 1? "": "s") + "!",
			iconURL: iconUrl
		});
	}
	
	cm.Item({
		label: "Copy URLs of selected links",
		image: self.data.url("icon-16.png"),
		context: [cm.SelectionContext()],
		contentScriptFile: self.data.url("context.js"),
		onMessage: onMessage
	});
}