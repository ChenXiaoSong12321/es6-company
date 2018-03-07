// es7兼容包
import 'babel-polyfill';
import Netwizard from './netwizard_es.js';

document.addEventListener('DOMContentLoaded',function(){
	//DOM渲染完即可执行，此时图片、视频还可能没有加载完
	const nwzOpt = new Map()
	nwzOpt.set('url','/cgi-bin/netwizard_new.cgi')
	
		.set('checkData',{
			// step1:{
			// 	'form_name':'nwzFormstep1',
   //     			'option':{
   //     				'RED_TYPE':{
		 //                'type':'radio',
		 //                'required':'1',
		 //                'ass_check':function(eve){
		                   
		 //                }
	  //           	}
			// 	}
			// },
			step3:{
				'form_name':'nwzFormStep3',
       			'option':{
       				'DISPLAY_GREEN_ADDRESS':{
		                'type':'text',
		                'required':'1',
		                'check':'ip|',
		                'ass_check':function(eve){
		                   
		                }
	            	},
	            	'DISPLAY_GREEN_ADDITIONAL':{
		                'type':'textarea',
		                'required':'1',
		                'check':'ip|',
		                'ass_check':function(eve){
		                   
		                }
	            	},
				}
			},
			// step4:{}
		})
	const nwz = new Netwizard(nwzOpt)
	console.log(nwz)
})