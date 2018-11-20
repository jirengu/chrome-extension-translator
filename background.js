chrome.contextMenus.create({
	title: 'hello',
	contexts:['selection'],
	onclick: function(info, tab) {
			chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
				  chrome.tabs.sendMessage(tabs[0].id, {menuContent: info.selectionText}, function(response) {
				    console.log(response)
				  })
			})
		console.log(info.selectionText)
 }})

