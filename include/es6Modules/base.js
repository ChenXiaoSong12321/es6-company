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
        let cur = this.select(`.stepBar .step-${config.curStep}`)
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


        this.addClass(`.stepBar .step-${config.curStep} .step-num`, 'current')
        cur = this.select(`.stepBar .step-${config.curStep}`)
    }

}

export default Base