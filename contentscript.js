console.log('hello world')


function Panel() {
	this.createPanel()
	this.bind()
}

Panel.prototype.createPanel = function() {
	var container = document.createElement('div')
	container.id = 'translate-panel'
	let html = `<header>
								<h1></h1><span class="close">X</span>
							</header>
							<main></main>`
	container.innerHTML = html
	document.body.appendChild(container)
	this.container = container
	this.source = container.querySelector('h1')
	this.close = container.querySelector('.close')
	this.target = container.querySelector('main')
}

Panel.prototype.bind = function() {
	this.close.onclick = ()=>{
		this.hide()
	}
}

Panel.prototype.moveTo = function(posX, posY) {
	this.container.style.left = posX + 'px'
	this.container.style.top = posY + 'px'
} 

Panel.prototype.translate = function(rawStr, pos) {
	chrome.storage.sync.get(['type'], function(result) {
          console.log('Value currently is ' + result.key);
   });
	this.source.innerText = rawStr
	this.moveTo(pos[0], pos[1])
	this.show()
	fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=zh&dt=t&q=${rawStr}`)
		.then(res => res.json())
		.then(result => {
			console.log(result)
			this.target.innerText = result[0][0][0]
		})
}

Panel.prototype.show = function() {
	this.container.style.display = "block"
}

Panel.prototype.hide = function() {
	this.container.style.display = "none"
}


Panel.prototype.isShow = function() {
	return window.getComputedStyle(this.container).display === 'block'
}


let translateType = "none"
let panel = new Panel()




document.onmouseup = function(e){  
  let str = window.getSelection().toString().trim()
  if(str === '') return

  if(translateType === 'select_translate') {
  	panel.translate(str, [e.pageX, e.pageY])
  }
  

  // console.log(str)
  // console.log(e.pageX, e.pageY)
  // window.ee = e
} 

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    console.log('helar...')
    translateType = request.type
    sendResponse({status: "ok"});
  })


