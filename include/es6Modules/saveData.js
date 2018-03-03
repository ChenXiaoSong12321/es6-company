class SaveData {
    
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