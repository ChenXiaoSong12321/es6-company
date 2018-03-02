class Create {
	createStepPanel(data){
		let self = this
		let content = "数据有误"
		let contentData = data.stepdetail[`step${data.curStep}`]
		let panel ={
			step1(){
				content = self.createRadio(contentData)
			},
			step2(){
				panel.step1()
			},
			step3(){
				content = ''
				contentData = contentData.options
				for (let i = 0; i < contentData.length; i++) {
				    if (contentData[i].type === 'text') {
				    	content += self.createText(contentData[i])
				    } else if(contentData[i].type === 'group') {
				        content += `<div class="form-group">
				        				<label for="name">${contentData[i].text}</label>`;
				        let opts = contentData[i].options;
				        for (let j = 0; j < opts.length; j++) {
				            content += opts[j].type === 'text' ? self.createText(opts[j],'2') : '';
				            content += opts[j].type === 'select' ? self.createSelect(opts[j]) : '';
				            content += opts[j].type === 'textarea' ? self.createTextarea(opts[j]) : '';
				            content += opts[j].type === 'table' ? self.createTable(opts[j]) : '';
				        }
				        content += `</div>`
				    }else if(contentData[i].type === 'dmzGroup'){
				    	let step2detail = self.interfaceConfig.stepdetail.step2.detail
				        let dmzStatus = false
				        for (let k = 0; k < step2detail.length; k++) {
				        	if(step2detail[k].value.toUpperCase() === 'ORANGE') {dmzStatus = step2detail[k].checked}
				        }
				        if (dmzStatus) {
				        	content += `<div class="form-group">
				        				<label for="name">${contentData[i].text}</label>`;
				        	let opts = contentData[i].options;
					        for (let j = 0; j < opts.length; j++) {
					            content += opts[j].type === 'text' ? self.createText(opts[j],'2') : '';
					            content += opts[j].type === 'select' ? self.createSelect(opts[j]) : '';
					            content += opts[j].type === 'textarea' ? self.createTextarea(opts[j]) : '';
					            content += opts[j].type === 'table' ? self.createTable(opts[j]) : '';
					        }
					        content += `</div>`	
				        }
				    }
				}

			},
			step4(){
				content = self.createText(contentData)
			},
			step5(){
				content = ''
				contentData = contentData.options
				for (let i = 0; i < contentData.length; i++) {
					content += self.createText(contentData[i])
				}
			},
			step6(){
				panel.step5()
			},
			step7(){
				content = contentData.text
			},
			step8(){
				panel.step7()
			}
		}
		panel['step'+data.curStep]()
		return content
	}
	createRadio(data){
		let radio = `<label for="name">${data.text}</label>`
		for (let i = 0; i < data.detail.length; i++) {
			radio += `<div class="${data.type}">
					    <label>
					        <input type="${data.type}" name="${data.name}" id="${data.detail[i].value}" value="${data.detail[i].value}" ${data.detail[i].checked ? 'checked':''}>
					        ${data.detail[i].text}
					    </label>
					  </div>`
		}
		return radio
	}
	createFooterBtn(data){
		return `<a class="prev disabled-step" disabled="disabled">
	                <span class="btn-name">上一步</span>
	                <span class="control-detail"></span>
	            </a>
	            <a class="next">
	                <span class="btn-name">下一步</span>
	                <span class="control-detail">网络参数设置</span>
	            </a>`
	}
	createStep(data){
		let step = `<div  class="stepBar" >
                		<ul>`
        for (let i = 0; i < data; i++) {
        	step += `<li class="${i===data-1 ? 'last-step':''} step-${i+1}">
                        <div class="step-line">
                            <span class="line"></span>
                        </div>
                        <div class="step-num ${i === 0 ? 'current':''}">
                            <div class="bg-circle">
                               <span class="num">${i+1}</span>
                            </div>
                        </div>
                    </li>`
        }
        step += `</ul>
            </div>`
        return step
	}
	createText(data, level) {
		return `
			<div class="form-group ${level=== '2' ? 'form-group-second':''}">
                <label for="name">${data.text}</label>
                <input type="${data.type}" class="form-control"
                 id="${data.name}" name="${data.name}" 
                 value="${data.value}" placeholder="请输入${data.text}">
            </div>`
	}
	createTextarea(data) {
		return `
			<div class="form-group form-group-second">
                <label for="name">${data.text}</label>
                <textarea class="form-control" rows="3" name="${data.name}">${data.value.replace(/&/,'\n')}</textarea>
            </div>`
	}
	createSelect(data) {
		let select = ''
		select += `
			<div class="form-group form-group-second">
                <label for="name">${data.text}</label>
                <select class="form-control" name="${data.name}">`
		for (let i = 0; i < data.options.length; i++) {
			select += `<option value="${data.options[i].value}" ${data.options[i].checked?'selected':''}>${data.options[i].text}</option>`
		}
		select += `
				</select>
			</div>`
		return select
	}
	createTable(data) {
		let table = ''
		table += `
			<div class="form-group form-group-second">
                <label for="name">${data.text}</label>
                <table class="table table-condensed table-bordered">
                    <thead>
                        <tr>
                            <th><input type="checkbox"></th>
                            <th>${data.options[0].port}</th>
                            <th>${data.options[0].connect}</th>
                            <th>${data.options[0].mac}</th>
                            <th>${data.options[0].device}</th>
                        </tr>
                    </thead>
                    <tbody>`
		for (let i = 1; i < data.options.length; i++) {
			table += `
				<tr>
                    <td><input type="checkbox" name="${data.options[i].name}" value="${data.options[i].value}"${data.options[i].checked? 'checked':''}></td>
                    <td>${data.options[i].port}</td>
                    <td>${data.options[i].connect}</td>
                    <td>${data.options[i].mac}</td>
                    <td>${data.options[i].device}</td>
                </tr>`
		}
		table += `</tbody>
                </table>
            </div>`
		return table
	}
}

export default Create