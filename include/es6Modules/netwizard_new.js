// es7兼容包
import 'babel-polyfill';
import Netwizard from './netwizard_es.js';

document.addEventListener('DOMContentLoaded',function(){
	//DOM渲染完即可执行，此时图片、视频还可能没有加载完
	const nwz = new Netwizard('/cgi-bin/netwizard_new.cgi','#footer_btn .next','#footer_btn .prev')
	console.log(nwz)
})