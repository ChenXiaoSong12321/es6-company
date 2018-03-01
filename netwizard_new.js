// 'use strict';
$( document ).ready(function() {
	do_request({ ACTION: 'getStep' }, function (data) {
		interfaceConfig.stepName = data.step;
	});
	// createStep(step)
	// createFooterBtn()
	// chageConfig()

})
var ass_url = "/cgi-bin/netwizard_new.cgi";
var interfaceConfig = {
	step: 1,
	stepName: [],
	stepdetail: {
		step1: {
			text: '主上行接口(WAN)',
			type: 'radio',
			name: 'RED_TYPE',
			detail: [{
				value: 'STATIC',
				checked: false,
				text: '固定IP'
			}, {
				value: 'DHCP',
				checked: true,
				text: 'DHCP'
			}, {
				value: 'PPPOE',
				checked: false,
				text: 'PPPOE'
			}, {
				value: 'NONE',
				checked: false,
				text: '透明网关'
			}, ]
		},
		step2: {
			text: '服务器区(DMZ)',
			type: 'radio',
			name: 'ZONES',
			detail: [{
				value: 'NONE',
				checked: false,
				text: '无'
			}, {
				value: 'ORANGE',
				checked: true,
				text: 'DMZ区'
			}]
		},
		step3: {
			options: [{
				name: '',
				text: '内网用户区(LAN)',
				type: 'group',
				options: [{
					text: 'IP 地址*',
					type: 'text',
					name: 'DISPLAY_GREEN_ADDRESS',
					value: '192.168.11.181'
				}, {
					text: '附加IP地址',
					type: 'textarea',
					name: 'DISPLAY_GREEN_ADDITIONAL',
					value: '192.168.11.181&3.3.3.3'
				}, {
					text: '子网掩码*',
					name: 'DISPLAY_GREEN_NETMASK',
					type: 'select',
					options: [{
						value: '0',
						text: '/0 - 0.0.0.0',
						checked: false
					}, {
						value: '1',
						text: '/1 - 128.0.0.0',
						checked: true
					}]
				}, {
					text: '接口*',
					name: '',
					type: 'table',
					options: [{
						name: '',
						type: '',
						checked: '',
						value: '',
						port: '端口',
						connect: '连接',
						mac: 'MAC',
						device: '设备'
					}, {
						name: 'GREEN_DEVICES',
						type: 'checkbox',
						checked: true,
						value: '1',
						port: 'n/a',
						connect: false,
						mac: '28:51:32:12:06:d3',
						device: 'eth0.10'
					}, {
						name: 'GREEN_DEVICES',
						type: 'checkbox',
						checked: false,
						value: '2',
						port: '1',
						connect: true,
						mac: '28:51:32:12:06:d4',
						device: 'eth1'
					}, ]
				}]
			}, {
				text: '主机名',
				name: 'HOSTNAME',
				type: 'text',
				value: 'localhost'
			}, {
				text: '域名',
				name: 'DOMAINNAME',
				type: 'text',
				value: 'localdomain'
			}]
		},
		step4: {
			text: '主上行接口(WAN)[默认网关*]',
			name: 'DEFAULT_GATEWAY',
			type: 'text',
			value: '192.168.11.1'
		},
		step5: {
			options:[
				{
					text: 'DNS 1*',
					name: 'DNS1',
					type: 'text',
					value: '61.139.2.69'
				},{
					text: 'DNS 2',
					name: 'DNS2',
					type: 'text',
					value: ''
				}
			]
		},
		step6: {
			options:[
				{
					text: '管理员邮箱地址',
					name: 'MAIN_ADMINMAIL',
					type: 'text',
					value: ''
				},{
					text: '发送者邮件地址',
					name: 'MAIN_MAILFROM',
					type: 'text',
					value: ''
				},{
					text: '邮件中继主机地址',
					name: 'MAIN_SMARTHOST',
					type: 'text',
					value: ''
				}
			]
		},
		step7: {
			text:'网络设置已经准备好,点击应用配置就可应用新的配置..'
		},
		step8: {
			text:'配置成功'
		}
	}
}
function createStep() {
	var stepName = interfaceConfig.stepName
	var stepStr = '<div style="display:inline-block;">';
	for (var i = 0; i < stepName.length; i++) {
		stepStr += '<div id="step_' + (i + 1) + '" class="step-detail ' + (i === 0 ? 'step-detail-active' : '') + '">\n    <p class="step-num"><span id="step-span" style="display:inline-block">0' + (i + 1) + '</span></p>\n    <span class="step-cont">' + stepName[i] + '</span>\n</div> \n' + (i === stepName.length-1 ? '' : '<div class="step-line"></div>');
	}
	stepStr += '</div>';
	document.querySelector('#step').innerHTML = stepStr;
}
function createFooterBtn(){
	var footerBtn = "<footer><button class=\"next-step\" id=\"nextStep\" onclick=\"switchStep('next');\">\u4E0B\u4E00\u6B65</button><a class=\"last-step last-hide\" id=\"lastStep\" onclick=\"switchStep('last')\">\u8FD4\u56DE\u4E0A\u4E00\u6B65</a></footer>";
	document.querySelector('#module-content').innerHTML += footerBtn;
}
function switchStep(direction){
	document.querySelector('#step_'+interfaceConfig.step).classList.remove("step-detail-active")
	saveData()
	direction === 'next' && interfaceConfig.step !== interfaceConfig.stepName.length ? interfaceConfig.step += 1 : true
	direction === 'last' && interfaceConfig.step !== 1 ? interfaceConfig.step -= 1 : true
	interfaceConfig.step === 1 ? document.querySelector('#lastStep').classList.add("last-hide") :
								 document.querySelector('#lastStep').classList.remove("last-hide")
	document.querySelector('#nextStep').innerText = interfaceConfig.step >= interfaceConfig.stepName.length-1 ? '应用配置' : '下一步'
	document.querySelector('#step_'+interfaceConfig.step).classList.add("step-detail-active")
	slideShow('#step_'+interfaceConfig.step+' #step-span','bounceIn')
	if (direction === 'next' && interfaceConfig.step !== interfaceConfig.stepName.length) {
		slideShow('#stepConf','fadeInRight')
	}else if (direction === 'last') {
		slideShow('#stepConf','fadeInLeft')
	}
	chageConfig()
}
function getChecked(radio){
	var checkedVal 
	document.querySelectorAll('input[name="' + radio + '"]').forEach(function (item,index) {
		if(item.checked){checkedVal = item.value}
	});
	return checkedVal
}
function saveData(){
	var lastData = interfaceConfig.stepdetail['step'+interfaceConfig.step]
	var save = {
		step1:function(){
			saveRadio(lastData)
		},
		step2:function(){
			save.step1()
		},
		step3:function(){
			contentData = lastData.options
			for (var i = 0; i < contentData.length; i++) {
			    if (contentData[i].type === 'text') {
			    	saveText(contentData[i])
			    } else {
			    	var opts = contentData[i].options;
			        for (var j = 0; j < opts.length; j++) {
						opts[j].type === 'text' ? saveText(opts[j]) : '';
						opts[j].type === 'select' ? saveSelect(opts[j]) : '';
						opts[j].type === 'textarea' ? saveTextarea(opts[j]) : '';
						opts[j].type === 'table' ? saveTable(opts[j]) : '';
			        }
			    }
			}
		},
		step4:function(){
			saveText(lastData)
		},
		step5:function(){
			contentData = lastData.options
			for (var i = 0; i < contentData.length; i++) {
				saveText(contentData[i])
			}
		},
		step6:function(){
			save.step5()
		},
		step7:function(){
		},
		step8:function(){
		}
	}
	save['step'+interfaceConfig.step]()
}
function chageConfig(){
	var content = "数据有误"
	var contentData = interfaceConfig.stepdetail['step'+interfaceConfig.step]
	var change ={
		step1:function(){
			content = createRadio(contentData)
		},
		step2:function(){
			change.step1()
		},
		step3:function(){
			content = ''
			contentData = contentData.options
			for (var i = 0; i < contentData.length; i++) {
			    if (contentData[i].type === 'text') {
			    	content += createText(contentData[i])
			    } else {
			        content += '<div class="form-group">\n                    <label for="name">' + contentData[i].text + '</label>';
			        var opts = contentData[i].options;
			        for (var j = 0; j < opts.length; j++) {
			            content += opts[j].type === 'text' ? createText(opts[j],'2') : '';
			            content += opts[j].type === 'select' ? createSelect(opts[j]) : '';
			            content += opts[j].type === 'textarea' ? createTextarea(opts[j]) : '';
			            content += opts[j].type === 'table' ? createTable(opts[j]) : '';
			        }
			    }
			}
		},
		step4:function(){
			content = createText(contentData)
		},
		step5:function(){
			content = ''
			contentData = contentData.options
			for (var i = 0; i < contentData.length; i++) {
				content += createText(contentData[i],'2')
			}
		},
		step6:function(){
			change.step5()
		},
		step7:function(){
			content = contentData.text
		},
		step8:function(){
			change.step7()
		}
	}
	change['step'+interfaceConfig.step]()
	document.querySelector('#stepConf').innerHTML = content
}
function saveRadio(lastData){
	var checkedRadio = getChecked(lastData.name)
	for (var i = 0; i < lastData.detail.length; i++) {
		lastData.detail[i].checked = lastData.detail[i].value === checkedRadio ? true:false
	}
}
function saveText(lastData){
	lastData.value = document.querySelector('input[name="'+lastData.name+'"]').value
}
function saveSelect(lastData){
	var myselect=document.querySelector('select[name="'+lastData.name+'"]');
	var index = myselect.selectedIndex ; 
	var selectVal = myselect.options[index].value;
	for (var i = 0; i < lastData.options.length; i++) {
		lastData.options[i].checked = lastData.options[i].value === selectVal ? true:false
	}
}
function saveTextarea(lastData){
	lastData.value = document.querySelector('textarea[name="'+lastData.name+'"]').value.replace(/\n/,'\&')
}
function saveTable(lastData){
	for (var i = 1; i < lastData.options.length; i++) {
		var checkbox = document.querySelector('input[name="'+lastData.options[i].name+'"]').checked
		lastData.options[i].checked = checkbox ? true:false
	}
}
function createRadio(data){
	var radio =''
	radio = "<label for=\"name\">" + data.text + "</label>";
	for (var i = 0; i < data.detail.length; i++) {
		radio += '<div class="' + data.type + '">\n    <label>\n        <input type="' + data.type + '" name="' + data.name + '" id="' + data.detail[i].value + '" value="' + data.detail[i].value + '" ' + (data.detail[i].checked ? 'checked' : '') + '>' + data.detail[i].text + '\n    </label>\n</div>';	}
	return radio
}
function createText(data, level) {
	return '<div class="form-group ' + (level === '2' ? 'form-group-second' : '') + '">\n                <label for="name">' + data.text + '</label>\n                <input type="' + data.type + '" class="form-control"\n                 id="' + data.name + '" name="' + data.name + '" \n                 value="' + data.value + '" placeholder="\u8BF7\u8F93\u5165' + data.text + '">\n            </div>';
}
function createTextarea(data) {
    return '<div class="form-group form-group-second">\n                <label for="name">' + data.text + '</label>\n                <textarea class="form-control" rows="3" name="' + data.name + '">' + data.value.replace(/&/, '\n') + '</textarea>\n            </div>';
}
function createSelect(data) {
    var select = '';
    select += '<div class="form-group form-group-second">\n                <label for="name">' + data.text + '</label>\n                <select class="form-control" name="' + data.name + '">';
    for (var i = 0; i < data.options.length; i++) {
        select += '<option value="' + data.options[i].value + '" ' + (data.options[i].checked ? 'selected' : '') + '>' + data.options[i].text + '</option>';
    }
    select += '</select></div>';
    return select;
}
function slideShow(el,effect) {
	$(el).removeClass().addClass(effect + ' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
	  	$(this).removeClass();
	});
};
function createTable(data) {
    var table = '';
    table += '<div class="form-group form-group-second">\n                <label for="name">' + data.text + '</label>\n                <table class="table table-condensed table-bordered">\n                    <thead>\n                        <tr>\n                            <th><input type="checkbox"></th>\n                            <th>' + data.options[0].port + '</th>\n                            <th>' + data.options[0].connect + '</th>\n                            <th>' + data.options[0].mac + '</th>\n                            <th>' + data.options[0].device + '</th>\n                        </tr>\n                    </thead>\n                    <tbody>';
    for (var i = 1; i < data.options.length; i++) {
        table += '<tr>\n                    <td><input type="checkbox" name="' + data.options[i].name + '" value="' + data.options[i].value + '"' + (data.options[i].checked ? 'checked' : '') + '></td>\n                    <td>' + data.options[i].port + '</td>\n                    <td>' + data.options[i].connect + '</td>\n                    <td>' + data.options[i].mac + '</td>\n                    <td>' + data.options[i].device + '</td>\n                </tr>';
    }
    table += '</tbody>\n                </table>\n            </div>';
    return table;
}
//AJAX异步请求数据
function do_request(sending_data, ondatareceived) {
    $.ajax({
        type: 'POST',
        url: ass_url,
        dataType: "json",
        data: sending_data,
        async: false,
        error: function(request) {
            message_manager.show_popup_error_mesg("网络错误,部分功能可能出现异常");
        },
        success: ondatareceived
    });
}
// `<div id="step_${i+1}" class="step-detail ${i===0?'step-detail-active':''}">
//     <p class="step-num">0${i+1}</p>
//     <span class="step-cont">${stepName[i]}</span>
// </div> 
// ${i===stepName.length-1?'':'<div class="step-line"></div>'}`
// 
// let footerBtn = `<footer><button class="next-step" id="nextStep" onclick="switchStep('next');">下一步</button><a class="last-step last-hide" id="lastStep" onclick="switchStep('last')">返回上一步</a></footer>`
// document.querySelector('.containter-div').innerHTML += footerBtn;
// 
// for (var i = 0; i < contentData.length; i++) {
//     if (contentData[i].type === 'text') {
//         content += createText(contentData[i])
//     }else{
//         content += `<div class="form-group">
//                     <label for="name">${contentData[i].text}</label>`
//         let opts = contentData[i].options
//         for (var j = 0; j < opts.length; j++) {
//             content += opts[j].type === 'text' ? createText(opts[j],'2') : ''
//             content += opts[j].type === 'select' ? createSelect(opts[j]) : ''
//             content += opts[j].type === 'textarea' ? createTextarea(opts[j]) : ''
//             content += opts[j].type === 'table' ? createTable(opts[j]) : ''
//         }
//     }
// }
// function createText(data,level){
//     return `<div class="form-group ${level=== '2' ? 'form-group-second':''}">
//                 <label for="name">${data.text}</label>
//                 <input type="${data.type}" class="form-control"
//                  id="${data.name} name="${data.name}" 
//                  value="${data.value}" placeholder="请输入${data.text}">
//             </div>`
// }
// function createTextarea(data){
//     return `<div class="form-group form-group-second">
//                 <label for="name">${data.text}</label>
//                 <textarea class="form-control" rows="3" name="${data.name}">${data.value.replace(/&/,'\n')}</textarea>
//             </div>`
// }
// function createSelect(data){
//     let select = ''
//     select += `<div class="form-group form-group-second">
//                 <label for="name">${data.text}</label>
//                 <select class="form-control" name="${data.name}">`
//     for (var i = 0; i < data.options.length; i++) {
//         select += `<option value="${data.options[i].value}" ${data.options[i].checked?'selected':''}>${data.options[i].text}</option>`
//     }
//     select += `</select></div>`
//     return select
// }
// function createTable(data){
//     let table = ''
//     table += `<div class="form-group form-group-second">
//                 <label for="name">${data.text}</label>
//                 <table class="table table-condensed table-bordered">
//                     <thead>
//                         <tr>
//                             <th><input type="checkbox"></th>
//                             <th>${data.options[0].port}</th>
//                             <th>${data.options[0].connect}</th>
//                             <th>${data.options[0].mac}</th>
//                             <th>${data.options[0].device}</th>
//                         </tr>
//                     </thead>
//                     <tbody>`
//     for (var i = 1; i < data.options.length; i++) {
//         table += `<tr>
//                     <td><input type="checkbox" name="${data.options[i].name}" value="${data.options[i].value}"${data.options[i].checked? 'checked':''}></td>
//                     <td>${data.options[i].port}</td>
//                     <td>${data.options[i].connect}</td>
//                     <td>${data.options[i].mac}</td>
//                     <td>${data.options[i].device}</td>
//                 </tr>`
//     }                  
//     table += `</tbody>
//                 </table>
//             </div>`
//     return table
// }
