console.log('popup hello...')

let selectNode = document.querySelector('#select')

selectNode.onchange = function(){
	console.log(this.value)
	let self = this

	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	  chrome.tabs.sendMessage(tabs[0].id, {switch: self.value}, function(response) {
	  	console.log('i apm popup.js, hear from content script')
	    console.log(response)
	  })
	})
}