class Common{
	// 获取元素的某个样式
	getCss(el,styleName){
		// 判断是否为IE浏览器
		return window.getComputedStyle ? window.getComputedStyle(el, null)[styleName] : el.currentStyle[styleName]
	}

	// 驼峰命名与中横线命名的转换
	converseNameStyle(name,type=true){
		name = type ? name.replace(/-\w/g,(v)=>{return v.replace('-','').toUpperCase()}) :
		 			name.replace(/[A-Z]/g,(v)=>{return `-${v.toLowerCase()}`})
		return name
	}
	setCss(el,css){
		for(let [key,value] of Object.entries(css)){
			key = this.converseNameStyle(key)
			if(typeof el.style[key] !== 'undefined')  el.style[key] = value;
		}
	}
	// 获取元素
	select(el){
		let ele = document.querySelectorAll(el)
		return ele.length === 1 ? ele[0] : ele
	}
	getObjSize(obj){
		let count = 0;
		for(let i in obj){
		    count ++;
		}
		return count;
	}
	// 绑定事件
	on(el,eventName,handle){
		el.addEventListener ? el.addEventListener(eventName, handle) : el.attachEvent(`on${eventName}`, handle)
		return el
	}

	// 解除绑定事件
	off(el,eventName,handle){
		el.removeEventListener ? el.removeEventListener(eventName, handle) : el.detachEvent(`on${eventName}`, handle)
		return el
	}
	nodeToArr(nodes){
		let nodeList = []
		if (nodes instanceof Array){
			return nodes
		}else{
			nodes.length ? nodeList = Array.from(nodes) : nodeList[0] = nodes
		}
		return nodeList
	}
	addClass(nodes,className){
		nodes = this.nodeToArr(this.select(nodes))
		className = className.split(/\ +/)
		nodes.forEach((item)=>{
			for (let i = 0; i < className.length; i++) {
				item.classList.add(className[i])
			}
		})
		return nodes
	}
	removeClass(nodes,className){
		nodes = this.nodeToArr(this.select(nodes))
		nodes.forEach((item)=>{item.classList.remove(className)})
		return nodes
	}
	html(nodes,content=null){
		nodes = this.nodeToArr(this.select(nodes))
		if (!content) {
			nodes.forEach((item)=>{item.innerHTML = content})
		}else{
			let nodeHtml = []
			nodes.forEach((item)=>{
				item.innerHTML = content
				nodeHtml.push(item.innerHTML)
			})
			nodes = nodeHtml
		}
		return nodes
	}
	ajax(opt={}){
		opt.method = opt.method.toUpperCase();
		opt.url = opt.url || '';
		opt.async =opt.async || true;
		opt.data = opt.data || null;
		opt.success = opt.success || function (){};
		let xmlHttp = XMLHttpRequest ? new XMLHttpRequest : new ActiveXObject('Microsoft.XMLHTTP')
		
		let params = new Set()
		for(let [key,value] of Object.entries(opt.data)){
			params.add(`${key}=${value}`)
		}
		let postData = [...params].join('&')
		if (opt.method === 'POST') {
			xmlHttp.open(opt.method,opt.url,opt.async)
			xmlHttp.setRequestHeader('content-Type','application/x-www-form-urlencoded;charset=utf-8')
			xmlHttp.send(postData)
		}else if(opt.method === 'GET'){
			xmlHttp.open(opt.method,opt.url+'?'+postData,opt.async)
			xmlHttp.send(null)
		}
		xmlHttp.onreadystatechange = function(){
			if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
				opt.success(xmlHttp.responseText)
			}
		}
	}
}

export default Common