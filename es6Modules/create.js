class Create {
	createText(data, level) {
		return `
			<div class="form-group ${level=== '2' ? 'form-group-second':''}">
                <label for="name">${data.text}</label>
                <input type="${data.type}" class="form-control"
                 id="${data.name} name="${data.name}" 
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