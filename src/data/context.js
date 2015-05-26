const filter = link => selection.containsNode(link, true)
const toHref = link => link.href

const onClick = (node, data) => {
	selection = getSelection();
	self.postMessage({
		links: Array.from(document.getElementsByTagName("a")).filter(filter).map(toHref)
	});
};

let selection;

self.on("click", onClick);