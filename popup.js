console.log('popup')

let select = document.querySelector('#select')

chrome.storage.sync.get(['type'],(result)=>{
	select.value = result['type']
})

select.onchange = function() {
	console.log(this.value)
	let self = this
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	  chrome.tabs.sendMessage(tabs[0].id, {type: self.value}, function(response) {
	    console.log(response)
	  })
	})

	chrome.storage.sync.set({'type': this.value})
  if(this.value === 'none') {
  	chrome.browserAction.setBadgeText({text: '关'})
  } else {
  	chrome.browserAction.setBadgeText({text: '开'})
  }


}
