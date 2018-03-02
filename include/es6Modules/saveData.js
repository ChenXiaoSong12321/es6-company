class SaveData {
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
    getChecked(radio) {
        let checkedVal
        document.querySelectorAll('input[name="' + radio + '"]').forEach(function(item, index) {
            if (item.checked) { checkedVal = item.value }
        });
        return checkedVal
    }
    saveRadio(lastData) {
        let checkedRadio = this.getChecked(lastData.name)
        for (let i = 0; i < lastData.detail.length; i++) {
            lastData.detail[i].checked = lastData.detail[i].value === checkedRadio ? true : false
        }
    }
    saveText(lastData) {
        lastData.value = document.querySelector('input[name="' + lastData.name + '"]').value
    }
    saveSelect(lastData) {
        let myselect = document.querySelector('select[name="' + lastData.name + '"]');
        let index = myselect.selectedIndex;
        let selectVal = myselect.options[index].value;
        for (let i = 0; i < lastData.options.length; i++) {
            lastData.options[i].checked = lastData.options[i].value === selectVal ? true : false
        }
    }
    saveTextarea(lastData) {
        lastData.value = document.querySelector('textarea[name="' + lastData.name + '"]').value.replace(/\n/, '\&')
    }
    saveTable(lastData) {
        for (let i = 1; i < lastData.options.length; i++) {
            let checkbox = document.querySelector('input[name="' + lastData.options[i].name + '"]').checked
            lastData.options[i].checked = checkbox ? true : false
        }
    }
}

export default SaveData