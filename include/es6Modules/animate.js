import $ from 'jquery'

class Animate{
 	slideShow(el,effect) {
		$(el).removeClass().addClass(effect + ' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
		  	$(this).removeClass()
		})
	}
}

export default Animate