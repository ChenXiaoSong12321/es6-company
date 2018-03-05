class Base {
    initData() {
        let self = this
        return new Promise((res, rej) => {
            this.ajax({
                method: 'POST',
                url: this.url,
                async: false,
                data: {
                    ACTION: 'getData'
                },
                success: function(receive) {
                    res.call(self, receive)
                }
            })
        })
    }

    switchStep(direction) {
        let config = this.interfaceConfig
        let self = this
        if (config.curStep === 1 && config.curStep === config.stepCount) {return}
        if (direction === 'next' && this.checkData[`step${config.curStep}`] && this.checkForm(`nwzFormStep${config.curStep}`) === false ) {return}
        this.removeClass(`.stepBar .step-${config.curStep} .step-num`, 'current')
        direction === 'next' && this.saveData()
        if (direction === 'next' && config.curStep < config.stepCount) {
            self.slideShow('#step_panel', 'slideInRight', 'nwz')
        }
        if (direction === 'prev' && config.curStep > 1) {
            self.slideShow('#step_panel', 'slideInLeft', 'nwz')
        }
        if (direction === 'next' && config.curStep !== config.stepCount) {
            this.addClass(`.stepBar .step-${config.curStep} .step-line,.stepBar .step-${config.curStep} .step-num`, 'success')
            config.curStep === 1 && this.removeClass('#footer_btn .prev', 'disabled-step')
            config.curStep++
			config.curStep === config.stepCount && this.addClass('#footer_btn .next', 'disabled-step')

        }
        if (direction === 'prev' && config.curStep !== 1) {
            this.removeClass(`.stepBar .step-${config.curStep-1} .step-line,.stepBar .step-${config.curStep-1} .step-num`, 'success')
            config.curStep === config.stepCount && this.removeClass('#footer_btn .next', 'disabled-step')
            config.curStep--
            config.curStep === 1 && this.addClass('#footer_btn .prev', 'disabled-step')

        }
        this.select(`#footer_btn .next .control-detail`).innerText =
            config.stepdetail[`step${config.curStep+1}`] ?
            config.stepdetail[`step${config.curStep+1}`].stepText : ''
        this.select(`#footer_btn .prev .control-detail`).innerText =
            config.stepdetail[`step${config.curStep-1}`] ?
            config.stepdetail[`step${config.curStep-1}`].stepText : ''

        let panel = this.createStepPanel(this.interfaceConfig)
        this.select('#step_panel').innerHTML = panel
        this.checkOption.get('errorItems').clear()
        if (this.checkData[`step${config.curStep}`]) {
            this.checkFormData(this.checkData[`step${config.curStep}`])
        }

        this.addClass(`.stepBar .step-${config.curStep} .step-num`, 'current')
    }
    createStepPanel(){
        let self = this,
            data = self.interfaceConfig,
            contentData = data.stepdetail[`step${data.curStep}`],
            content = `<form name="nwzFormStep${data.curStep}" id="nwzFormstep${data.curStep}" class="nwz-form">
                            ${self.createPanelTitle(contentData)}`
        let panel ={
            step1(){
                content += self.createRadio(contentData)
            },
            step2(){
                panel.step1()
            },
            step3(){
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
                content += self.createText(contentData)
            },
            step5(){
                contentData = contentData.options
                for (let i = 0; i < contentData.length; i++) {
                    content += self.createText(contentData[i])
                }
            },
            step6(){
                panel.step5()
            },
            step7(){
                content += contentData.text
            },
            step8(){
                panel.step7()
            }
        }
        panel['step'+data.curStep]()
        content += `</form>`
        return content
    }
    saveData() {
        let self = this
        let lastData = self.interfaceConfig.stepdetail[`step${self.interfaceConfig.curStep}`]
        let save = {
            step1() {
                self.saveRadio(lastData)
            },
            step2() {
                save.step1()
            },
            step3() {
                let contentData = lastData.options
                for (let i = 0; i < contentData.length; i++) {
                    if (contentData[i].type === 'text') {
                        self.saveText(contentData[i])
                    } else {
                        let step2detail = self.interfaceConfig.stepdetail.step2.detail
                        let dmzStatus = false
                        for (let k = 0; k < step2detail.length; k++) {
                            if (step2detail[k].value.toUpperCase() === 'ORANGE') { dmzStatus = step2detail[k].checked }
                        }
                        if (contentData[i].type === 'group' || (contentData[i].type === 'dmzStatus' && dmzStatus)) {
                            let opts = contentData[i].options;
                            for (let j = 0; j < opts.length; j++) {
                                opts[j].type === 'text' ? self.saveText(opts[j]) : '';
                                opts[j].type === 'select' ? self.saveSelect(opts[j]) : '';
                                opts[j].type === 'textarea' ? self.saveTextarea(opts[j]) : '';
                                opts[j].type === 'table' ? self.saveTable(opts[j]) : '';
                            }
                        }
                    }
                }
            },
            step4() {
                self.saveText(lastData)
            },
            step5() {
                let contentData = lastData.options
                for (let i = 0; i < contentData.length; i++) {
                    self.saveText(contentData[i])
                }
            },
            step6() {
                save.step5()
            },
            step7() {},
            step8() {}
        }
        save[`step${self.interfaceConfig.curStep}`]()
    }
    customTip(option, name, msg, form_name){
        this.select(`form[name="${form_name}"] p#${name}_tip`).innerText = msg
    }
    checkForm(form_name){
        let errorItems = this.checkOption.get('errorItems').get(form_name).size
        if (errorItems !== 0) {
            alert('填写有误，请检查')
            return false
        }else{
            return true
        }
        
    }
}

export default Base