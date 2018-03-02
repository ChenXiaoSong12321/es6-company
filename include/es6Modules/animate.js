// import $ from 'jquery'

class Animate{
 	slideShow(el,effect,other) {
 		this.select(el).classList = ''
 		this.addClass(el,`${effect} ${other}`)
 		this.listenOnce(this.select(el),'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',function(){
 			document.querySelector(el).classList =''
 		})

	}
	once(dom, type, callback) {  
	    var handle = function() {  
	        callback() 
	        dom.removeEventListener(type, handle)
	    }  
	    dom.addEventListener(type, handle)  
	}
	listenOnce(node, type, listener, useCapture=false)  {
		type = type.split(/\ +/)
	    let wrapper = (event) => {
	        for (var i = 0; i < type.length; i++) {
		    	node.removeEventListener(type[i], wrapper, useCapture);
		    }
	        return listener(event);
	    }
	    for (var i = 0; i < type.length; i++) {
	    	node.addEventListener(type[i], wrapper, useCapture);
	    }
	}
}

export default Animate