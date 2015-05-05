self.on("click", function(node, data) {
	let selection = window.getSelection();
	let links = [];
	let doclinks = document.getElementsByTagName("a");
	for (var i = 0;i < doclinks.length;i++) {
		let link = doclinks[i];
		if (selection.containsNode(link, true)) {
			links.push(link.href);
		}
	}
	self.postMessage({links: links});
});