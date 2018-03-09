class Message{
	init(){
		
	}
	createMsg(msg,form_name,type){
		return 	`<div id="msg_for_${form_name}" class="msg-tip msg-tip-${type}">
					<div >
	   					<p><button type="button">×</button></p>
					   	<span data-notify="icon"></span>
					   	<span data-notify="title"></span>
						<p><span data-notify="message">${msg}</span></p>
					   	<a href="#" target="_blank" data-notify="url"></a>
				   	</div>
				</div>`
	}
	showErrorMsg(msg,form_name){
		let self = this
		let msgHtml = this.createMsg(msg,form_name,'err')
		this.select('body').innerHTML += msgHtml
		this.slideShow(`#msg_for_${form_name}`, 'slideInRight', 'animated')
		setTimeout(function(){
			
		},3000)
	}
	showInfoMsg(){

	}
	showWarnMsg(){

	}
	showRightMsg(){

	}
}
// <div>
//   <button type="button">×</button>
//   <span data-notify="icon"></span>
//   <span data-notify="title"></span>
//   <span data-notify="message">表单填写中有误</span>
//   <a href="#" target="_blank" data-notify="url"></a>
// </div>
export default Message