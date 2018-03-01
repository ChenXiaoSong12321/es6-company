class Base{
	initData(){
		let self = this
		return new Promise((res,rej)=>{
			this.ajax({
				method: 'POST',
			    url: this.url,
			    async:false,
			    data: {
			        ACTION: 'getData'
			    },
			    success: function (receive) {
			        res.call(self,receive)
			    }
			})
		})
	}

	switchStep(direction){
		console.log(direction)
	}

}

export default Base