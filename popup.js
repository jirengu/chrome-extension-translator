console.log('popup')

let checkbox = document.querySelector('#checkbox')
let status = document.querySelector('.status')
checkbox.onchange = function() {
	console.log(this.checked)
	if(this.checked) {
		status.classList.add('active')
		chrome.browserAction.setBadgeText({
			text: '开'
		})
	} else {
		status.classList.remove('active')
		chrome.browserAction.setBadgeText({
			text: '关'
		})
	}
}
