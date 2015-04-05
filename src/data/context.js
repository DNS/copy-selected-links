self.on("click", function(node, data) {
	let selection = window.getSelection();
	let links = [];
	let doclinks = document.getElementsByTagName("a");
	for (var i = 0;i < doclinks.length;i++) {
		if (selection.containsNode(doclinks[i], true)) {
			links.push(doclinks[i].href);
		}
	}
	self.postMessage({links: links});
});