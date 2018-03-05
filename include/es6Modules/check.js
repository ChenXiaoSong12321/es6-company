class Check{
	initCheckOption(){
		this.checkOption
		    .set('illegalMesg', '非法字符！')
		    .set('errorItems',new Map())
		    .set('text_check', {
		        "remoteip": "远程IP",
		        "ip": "IP",
		        "ip_range": "IP范围",
		        "ip_addr_segment": "IP地址段",
		        "ipv6": "ipv6",
		        "ipv6_mask": "ipv6_mask",
		        "ip_mask": "IP/掩码",
		        "mac": "MAC地址",
		        "port": "端口",
		        "port_range": "端口范围",
		        "url": "URL",
		        "domain": "域名",
		        "ip_extend": "ip/路径",
		        "domain_extend": "domain/路径",
		        "name": "应在4-20个字符之间",
		        "specify_name": "指定长度的字符串名称",
		        "mail": "邮箱",
		        "note": "注释",
		        "num": "自然数",
		        "int": "正整数",
		        "float": "正小数",
		        "percent": "百分数",
		        "domain_suffix": "域",
		        "regexp": "正则表达式的合法性",
		        "other": "其他"
		    })
		    .set('option_type', {
		        "text": "文本框",
		        "password": "密码框",
		        "select-one": "单选下拉",
		        "select-multiple": "多选下拉",
		        "checkbox": "复选框",
		        "textarea": "文本域",
		        "radio": "单选框",
		        "file": "文件上传",
		        "date": "日期"
		    })
		    .set('option_name', {
		        "text": "input",
		        "select-one": "select",
		        "select-multiple": "select",
		        "checkbox": "input",
		        "textarea": "textarea",
		        "radio": "input",
		        "file": "input",
		        "password": "input",
		        "date": "input"
		    })
		    .set('required', 1)
		    .set('cur_time', 0)
		    .set('last_time', 0)
	}
	checkFormData(obj){
		console.log(obj)
		// this.checkOption.get('errorItems').add('aaa')
		this._checkArgument(obj)
		let option = obj.option
		let form_name = obj.form_name
		this.checkOption.get('errorItems').set(form_name,new Set())
		for (let x in option) {
			this._checkFormOption(option[x], x)
			this._initArgumentList(option[x])
			this._addListenerForFormLists(option[x], x, form_name, option)
		}
		// this._addFormSubmit(obj)
	}
	_addListenerForFormLists(option, name, form_name, obj) { //为每个表单元素添加事件监听
		let me = this
		let cur = me._getCURElementsByName(name, me.checkOption.get('option_name')[option.type], form_name)[0]
		if (!cur) {
			return
		} else if (option.type == "select-one" || option.type == "select-multiple" || option.type == "checkbox") {
			if (document.all) {
				cur.attachEvent("onchange", function() {
					let cur_value = cur.value
					let obj1 = {
						"option": option,
						"name": name,
						"value": cur_value,
						"form": form_name
					}
					me._check_select_checkbox(obj1)
				})
			} else {
				cur.addEventListener("change", function() {
					let cur_value = cur.value
					let obj1 = {
						"option": option,
						"name": name,
						"value": cur_value,
						"form": form_name
					}
					me._check_select_checkbox(obj1)
				}, true)
			}
		} else if (option.type == "password") {
			if (document.all) {
				cur.attachEvent("onkeyup", function() {
					let cur_value = cur.value
					let obj1 = {
						"option": option,
						"name": name,
						"value": cur_value,
						"form": form_name
					}
					me._check_password(obj1)
				})
			} else {
				cur.addEventListener("keyup", function(event) {
					let cur_value = cur.value
					let obj1 = {
						"option": option,
						"name": name,
						"value": cur_value,
						"form": form_name
					}
					me._check_password(obj1)
				}, true)
			}
		} else if (option.type == "file") {
			if (document.all) {
				cur.attachEvent("onchange", function() {
					let cur_value = cur.value
					let obj1 = {
						"option": option,
						"name": name,
						"value": cur_value,
						"form": form_name
					}
					me._check_file(obj1)
				})
			} else {
				cur.addEventListener("change", function(event) {
					let cur_value = cur.value
					let obj1 = {
						"option": option,
						"name": name,
						"value": cur_value,
						"form": form_name
					}
					me._check_file(obj1)
				}, true)
			}
		} else if (option.type == "text") {
			this.on(cur,'blur',function(){
				let cur_value = cur.value
					let obj1 = {
						"option": option,
						"method": "keyup",
						"name": name,
						"value": cur_value,
						"form": form_name,
						"eve": event.target ? event.target : event.srcElement
					}
					me._check_text(obj1)
					//部分需要有关联检测的输入 add by elvis
					if (option.associated) {
						me._check_associated(option, form_name, obj, event, "text")
					}
			})
		}
		// 添加事件监控事件
		else if (option.type == "date") {
			$("#add_panel_body_id_for_add_panel").on("change", '#start_time', function() {
				let cur_value = cur.value
				let obj1 = {
					"option": option,
					"method": "change",
					"name": name,
					"value": cur_value,
					"form": form_name
				}
				obj1.eve = event.srcElement
				me._check_text(obj1)

				//部分需要有关联检测的输入 add by elvis
				if (option.associated) {
					me._check_associated(option, form_name, obj, event, "text")
				}

			})
			$("#add_panel_body_id_for_add_panel").on("change", '#end_time', function() {
				let cur_value = cur.value
				let obj1 = {
					"option": option,
					"method": "change",
					"name": name,
					"value": cur_value,
					"form": form_name
				}
				obj1.eve = event.srcElement
				me._check_text(obj1)

				//部分需要有关联检测的输入 add by elvis
				if (option.associated) {
					me._check_associated(option, form_name, obj, event, "text")
				}

			})

		} else if (option.type == "textarea") {
			if (document.all) {
				cur.attachEvent("onblur", function() {
					let msg = ""
					let tmp_value = cur.value.replace("\n", "")
					if (!cur.value || !tmp_value) {
						if (option.required) {
							msg = "此项不能为空！"
						}
					} else {
						let error_obj = {}
						let textarea = cur.value.split("\n")
						for (let i = 0; i < textarea.length; i++) {
							{
								if (textarea[i]) {
									let obj = {
										"option": option,
										"name": name,
										"value": textarea[i]
									}
									let temp = me._check_textarea(obj)
									//部分需要有关联检测的输入 add by elvis
									if (option.associated) {
										me._check_associated(option, form_name, obj, event, "textarea")
									}
									if (temp) {
										error_obj[temp] = temp
									}
								}
							}
						}
					}
					for (let x in error_obj) {
						msg += x
					}
					me._tip(option, name, msg, form_name)
				})
			} else {
				cur.addEventListener("blur", function() {
					let msg = ""
					let tmp_value = cur.value.replace(/\n/g, "")
					if (!cur.value || !tmp_value) {
						if (option.required) {
							msg = "此项不能为空！"
						}
					} else {
						let error_obj = {}
						let textarea = cur.value.split("\n")
						if (textarea.length>1000) {
							msg="最多不能超过1000行！"
						}else{
							for (let i = 0 ;i < textarea.length ;i++) {
								{
									if (textarea[i]) {
										let obj = {
											"option": option,
											"name": name,
											"value": textarea[i]
										}
										let temp = me._check_textarea(obj)
										//部分需要有关联检测的输入 add by elvis
										if (option.associated) {
											me._check_associated(option, form_name, obj, event, "textarea")
										}
										if (temp) error_obj[temp] = temp
									}
								}
							}
						}
					}
					for (let x in error_obj) {
						msg += x
					}

					me._tip(option, name, msg, form_name)
				}, true)
			}
		}
	}
	_tip(option, name, msg, form_name){
		msg ? this.checkOption.get('errorItems').get(form_name).add(name) :
		 this.checkOption.get('errorItems').get(form_name).delete(name)
		console.log(option, name, msg, form_name)
	}
	_check_text(obj) {
		let option = obj.option
		let name = obj.name
		let str = obj.value
		let form_name = obj.form
		let src = obj.eve
		let msg = "",
			is_true = 0
		let checks = option.check.split("|")
		let new_checks = new Array()
		let d = new Date()
		this.cur_time = d.getTime()
		let num = 0
		for (let i = 0; i < checks.length; i++) {
			checks[i] = checks[i].replace(" ", "")
			if (checks[i]) {
				num++
			}
		}
		option.required = parseInt(option.required)
		let option_obj = {
			"required": option.required,
			"value": str,
			"other": option.other_reg,
			"require": option.required,
			"form": form_name,
		}
		if (!src.value && !option.required) {
			msg = ""
			this._tip(option, name, msg, form_name)
			return
		}	
		if (num > 1) //check类型为多个时
		{
			let is_true = 0
			if (/^\s*$/.test(src.value) && !option.required) {
				is_true = 1
			} else {
				for (let i = 0; i < checks.length; i++) {
					if (checks[i] == "") continue
					let temp = ""
					if (checks[i] == "other") {
						temp = this._check_other(option_obj)
					} else {
						temp = this._eval_check(option_obj, checks[i])
					}
					if (temp == "") is_true = 1
					new_checks[i] = this.text_check[checks[i]]
				}
				let temp_str = new_checks.join(",")
			}

			if (!is_true) {
				let temps = src.value
				if (this._get_str_byte(temps > 16)) {
					temps = temps.slice(0, 16) + "..."
				}
				msg = /^\s*$/.test(src.value) ? "此项不能为空！" : temps + "输入不合法,应是" + temp_str + "类型"
				this._tip(option, name, msg, form_name)

			} else {
				if (option.ass_check) { //若正常格式检查通过，则进行关联检查
					let check = option.ass_check
					if (!src.value && !parseInt(option.required)) {
						this._tip(option, name, "", form_name)

					} else {
						let msg = check(this)
						this._tip(option, name, msg, form_name)

					}
				}
			}
		} else {
			let check = option.check.replace("|", "")
			if (check == 'other') {
				msg = this._check_other(option_obj)
			} else {
				if (!src.value && !option.required) {
					msg = ""
				} else {
					msg = this._eval_check(option_obj, check)
				}
			}
			if (!msg && option.ass_check) {
				let check = option.ass_check
				msg = check(this)
				this.last_time = this.cur_time
			}
		}
		this._tip(option, name, msg, form_name)
	}
	_eval_check(obj, check_name) {
		check_name = check_name.split("-");
		return this[`_check_${check_name[0]}`](obj)
	}
	_check_ip(option) {
		var required = option.required;
		var str = option.value;
		var trimTx = this.trim(str);
		if (trimTx === false) {
			return this.checkOption.get('illegalMesg');
		} else {
			str = trimTx;
		}
		var msg = "";
		if (typeof str == "undefined" || str == "") {
			if (required) {
				msg = "IP不能为空！";
			}
			return msg;
		}
		if (!this.validip(str)) {
			if (this._get_str_byte(str) > 16) {
				str = str.slice(0, 16) + "...";
			}

			msg = str + "不合法,应是IP类型！";
		}
		return msg;
	}
	_check_remoteip(option) {
		var required = option.required;
		var str = option.value;
		var trimTx = this.trim(str);
		if (trimTx === false) {
			return this.illegalMesg;
		} else {
			str = trimTx;
		}
		var msg = "";
		if (typeof str == "undefined" || str == "") {
			if (required) {
				msg = "IP不能为空！";
			}
			return msg;
		}
		if (!this.validremoteip(str)) {
			if (this._get_str_byte(str) > 16) {
				str = str.slice(0, 16) + "...";
			}

			msg = str + "不合法,应是IP类型！";
		}
		return msg;
	}
	_check_ip_addr_segment(option) {
		var required = option.required;
		var str = option.value;
		var trimTx = this.trim(str);
		if (trimTx === false) {
			return this.illegalMesg;
		} else {
			str = trimTx;
		}
		var msg = "";
		if (typeof str == "undefined" || str == "") {
			if (required) {
				msg = "IP地址段不能为空！";
			}
			return msg;
		}
		if (!this.ip_addr_segment(str)) {
			if (this._get_str_byte(str) > 16) {
				str = str.slice(0, 16) + "...";
			}

			msg = str + "不合法,应是IP地址段类型！";
		}
		return msg;

	}
	_check_ip_range(option) {
		var required = option.required;
		var str = option.value;
		var trimTx = this.trim(str);
		if (trimTx === false) {
			return this.illegalMesg;
		} else {
			str = trimTx;
		}
		var msg = "";
		if (typeof str == "undefined" || str == "") {
			if (required) {
				msg = "IP范围不能为空！";
			}
			return msg;
		}
		if (!this.rangeip(str)) {
			if (this._get_str_byte(str) > 16) {
				str = str.slice(0, 16) + "...";
			}

			msg = str + "不合法,应是IP范围！";
		}
		return msg;
	}
	_check_ipv6(option) {
		var required = option.required;
		var str = option.value;
		var trimTx = this.trim(str);
		if (trimTx === false) {
			return this.illegalMesg;
		} else {
			str = trimTx;
		}
		var msg = "";
		if (typeof str == "undefined" || str == "") {
			if (required) {
				msg = "IPV6地址不能为空！";
			}
			return msg;
		}
		var regex = /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/;
		if (!regex.test(str)) {

			msg = str + "不合法,应是IPV6类型！";
		}
		return msg;
	}
	_check_ipv6_mask(option) {
		var required = option.required;
		var str = option.value;
		var test = new Array();
		var trimTx = this.trim(str);
		if (trimTx === false) {
			return this.illegalMesg;
		} else {
			str = trimTx;
		}
		test = str.split("/");
		var msg = "";
		if (typeof str == "undefined" || str == "") {
			if (required) {
				msg = "IPV6地址不能为空！";
			}
			return msg;
		}
		var regex = /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/;
		var regex_mask = /^-?[0-9]\d*$/
		if (!regex.test(test[0])) {

			msg = str + "不合法,应是IPV6/掩码类型！";
			return msg;
		}
		if (!regex_mask.test(test[1])) {

			msg = str + "不合法,应是IPV6/掩码类型！";
			return msg;
		}
		test[1] = parseInt(test[1]);
		if (test[1] < 0 || test[1] > 128) {

			msg = str + "不合法,应是IPV6/掩码类型！";
			return msg;
		}
		return msg;
	}
	_check_ip_mask(option) {
		var required = option.required;
		var str = option.value;
		var trimTx = this.trim(str);
		if (trimTx === false) {
			return this.illegalMesg;
		} else {
			str = trimTx;
		}
		var msg = "";
		if (typeof str == "undefined" || str == "") {
			if (required) {
				msg = "IP/掩码不能为空！";
			}
			return msg;
		}
		if (!this.validsegment(str)) {
			if (this._get_str_byte(str) > 16) {
				str = str.slice(0, 16) + "...";
			}

			msg = str + " 输入不合法,应是IP/掩码类型！";
		}
		return msg;
	}
	_check_port(option) {
		var str = option.value;
		var trimTx = this.trim(str);
		if (trimTx === false) {
			return this.illegalMesg;
		} else {
			str = trimTx;
		}
		var required = option.required;
		var msg = "";
		if (typeof str == "undefined" || str == "") {
			if (required) {
				msg = "端口号不能为空！";
			}
			return msg;
		}
		var reg = /^([1-9][0-9]*)$/;
		if (!(reg.test(str) && RegExp.$1 < 65536 && RegExp.$1 > 0)) {
			if (this._get_str_byte(str) > 16) {
				str = str.slice(0, 16) + "...";
			}

			msg = str + "端口号格式输入错误！";
		}
		return msg;
	}
	_check_port_range(option) {
		var required = option.required;
		var str = option.value;
		var trimTx = this.trim(str);
		if (trimTx === false) {
			return this.illegalMesg;
		} else {
			str = trimTx;
		}
		var msg = "";
		if (typeof str == "undefined" || str == "") {
			if (required) {
				msg = "端口范围不能为空！";
			}
			return msg;
		}
		if (/^([1-9]+[0-9]*)[:|-]([1-9]+[0-9]*)$/.test(str)) {
			if (parseInt(RegExp.$1) > 65535 || parseInt(RegExp.$1) < 0 || parseInt(RegExp.$2) > 65535 || parseInt(RegExp.$2) <= 0)
				msg = str + "中端口应在0-65535之间";
			if (parseInt(RegExp.$1) >= parseInt(RegExp.$2))
				msg = str + "端口范围中前一个应小于后一个";
		} else {
			if (this._get_str_byte(str) > 16) {
				str = str.slice(0, 16) + "...";
			}

			msg = str + "端口范围格式错误";
		}
		return msg;
	}
	_check_mac(option) {
		var required = option.required;
		var str = option.value;
		var trimTx = this.trim(str);
		if (trimTx === false) {
			return this.illegalMesg;
		} else {
			str = trimTx;
		}
		var msg = "";
		if (typeof str == "undefined" || str == "") {
			if (required) {
				msg = "MAC地址不能为空！";
			}
			return msg;
		}
		str = str.replace(/-/g, ":");
		var reg = /^([\dA-Fa-f]{2}):([\dA-Fa-f]{2}):([\dA-Fa-f]{2}):([\dA-Fa-f]{2}):([\dA-Fa-f]{2}):([\dA-Fa-f]{2})$/;
		if (!reg.test(str)) {
			if (this._get_str_byte(str) > 16) {
				str = str.slice(0, 16) + "...";
			}

			msg = str + "MAC地址格式输入错误！";
		}
		return msg;

	}
	_check_num(option) {
		var str = option.value;
		var trimTx = this.trim(str);
		if (trimTx === false) {
			return this.illegalMesg;
		} else {
			str = trimTx;
		}
		var required = option.required;
		var msg = "";
		if (typeof str == "undefined" || str == "") {
			if (required) {
				msg = "此项不能为空！";
			}
			return msg;
		}
		if (!(/^[1-9][0-9]*$/.test(str))) {
			if (this._get_str_byte(str) > 16) {
				str = str.slice(0, 16) + "...";
			}

			msg = str + "此项应填正整数！";
		}
		return msg;
	}
	_check_int(option) {
		var str = option.value;
		var trimTx = this.trim(str);
		if (trimTx === false) {
			return this.illegalMesg;
		} else {
			str = trimTx;
		}
		var required = option.required;
		var msg = "";
		if (typeof str == "undefined" || str == "") {
			if (required) {
				msg = "此项不能为空！";
			}
			return msg;
		}
		if (!(/^([0-9])+$/.test(str) && (RegExp.$2 && RegExp.$1 != 0 || !RegExp.$2))) {
			if (this._get_str_byte(str) > 16) {
				str = str.slice(0, 16) + "...";
			}

			msg = str + "此项应填0或正整数！";
		}
		return msg;
	}
	_check_float(option) {
		var str = option.value;
		var trimTx = this.trim(str);
		if (trimTx === false) {
			return this.illegalMesg;
		} else {
			str = trimTx;
		}
		var required = option.required;
		var msg = "";
		if (typeof str == "undefined" || str == "") {
			if (required) {
				msg = "此项不能为空！";
			}
			return msg;
		}
		if (!(/^[1-9][0-9]*(\.[0-9]+)?$/.test(str))) {
			if (this._get_str_byte(str) > 16) {
				str = str.slice(0, 16) + "...";
			}

			msg = str + "此项应填正小数或正整数！";
		}
		return msg;
	}
	_check_percent(option) {
		var str = option.value;
		var trimTx = this.trim(str);
		if (trimTx === false) {
			return this.illegalMesg;
		} else {
			str = trimTx;
		}
		var required = option.required;
		var msg = "";
		if (typeof str == "undefined" || str == "") {
			if (required) {
				msg = "此项不能为空！";
			}
			return msg;
		}
		if (!(/^([0-9]+)%$/.test(str) && parseInt(RegExp.$1) <= 100 && parseInt(RegExp.$1) >= 0)) {
			if (this._get_str_byte(str) > 16) {
				str = str.slice(0, 16) + "...";
			}

			msg = str + "此项应填整数百分数！";
		}
		return msg;


	}
	_check_name(option) {
		var str = option.value;
		var trimTx = this.trim(str);
		if (trimTx === false) {
			return this.illegalMesg;
		} else {
			str = trimTx;
		}
		var required = option.required;
		var msg = "";
		if (typeof str == "undefined" || str == "") {
			if (required) {
				msg = "此项不能为空！";
			}
			return msg;
		}
		var reg = /^[0-9a-zA-Z\u4e00-\u9fa5][_0-9a-zA-Z\u4e00-\u9fa5]+$/;
		var reg2 = /^[0-9]/;
		if ((str.length >= 4) && (str.length <= 20)) {
			if (/\s/.test(str)) {
				msg = str + "含有空格！";
			}
			if (reg2.test(str)) {
				msg = str + "不能以数字开头！";
			}
			if (!reg.test(str)) {
				msg = str + "含有非法字符！";
			}
		} else {
			if (str.length < 4) {
				msg = str + "应4个字符以上！";
			}
			if (str.length >= 20) {
				if (this._get_str_byte(str) > 16) {
					str = str.slice(0, 16) + "...";
				}

				msg = str + "应20个字符以内！";
			}
		}
		return msg;
	}
	_check_specify_name(option) {

		var str = option.value;
		var nameLength = str.length
		var nameLengthInt = parseInt(nameLength);

		var trimTx = this.trim(str);
		if (trimTx === false) {
			return this.illegalMesg;
		} else {
			str = trimTx;
		}
		var required = option.required;
		var msg = "";
		if (typeof str == "undefined" || str == "") {
			if (required) {
				msg = "此项不能为空！";
			}
			return msg;
		}
		var reg = /^[0-9a-zA-Z\u4e00-\u9fa5]+$/;
		var reg2 = /^[0-9]/;
		if ((str.length >= nameLengthInt) && (str.length <= 20)) {
			if (/\s/.test(str)) {
				msg = str + "含有空格！";
			}
			if (reg2.test(str)) {
				msg = str + "不能以数字开头！";
			}
			if (!reg.test(str)) {
				msg = str + "含有非法字符！";
			}
		} else {
			if (str.length < nameLengthInt) {
				msg = str + "至少为" + nameLength + "个字符！";
			}
			if (str.length > 20) {
				if (this._get_str_byte(str) > 16) {
					str = str.slice(0, 16) + "...";
				}

				msg = str + "应在20个字符以内！";
			}
		}
		return msg;
	}
	_check_mail(option) {
		var str = option.value;
		var trimTx = this.trim(str);
		if (trimTx === false) {
			return this.illegalMesg;
		} else {
			str = trimTx;
		}
		var required = option.required;
		var msg = "";
		if (typeof str == "undefined" || str == "") {
			if (required) {
				msg = "邮件地址不能为空！";
			}
			return msg;
		}
		var reg = /^[-_A-Za-z0-9]+@([_A-Za-z0-9]+\.)+[A-Za-z0-9]{2,3}$/;
		if (!reg.test(str)) {
			if (this._get_str_byte(str) > 16) {
				str = str.slice(0, 16) + "...";
			}

			msg = str + "邮件地址错误！";
		}
		return msg;
	}
	_check_note(option) {
		var required = option.required;
		var str = option.value;
		var trimTx = this.trim(str);
		if (trimTx === false) {
			return this.illegalMesg;
		} else {
			str = trimTx;
		}
		var msg = "";
		if (typeof str == "undefined" || str == "") {
			if (required) {
				msg = "此项不能为空！";
			}
			return msg;
		}
		if (/[@#\$%\^&\*~`<>,]/.test(str)) {
			if (this._get_str_byte(str) > 16) {
				str = str.slice(0, 16) + "...";
			}

			msg = str + "此项信息包含非法字符！";
		} else if (str.length > 128) {
			if (this._get_str_byte(str) > 16) {
				str = str.slice(0, 16) + "...";
			}

			msg = str + "此项信息过长，应在128个字符以内！";
		}
		return msg;
	}
	_check_url(option) {
		var required = option.required;
		var str = option.value;
		var trimTx = this.trim(str);
		if (trimTx === false) {
			return this.illegalMesg;
		} else {
			str = trimTx;
		}
		var msg = "";
		if (typeof str == "undefined" || str == "") {
			if (required) {
				msg = "此项不能为空！";
			}
			return msg;
		}
		if (!this.validurl(str)) {
			if (this._get_str_byte(str) > 16) {
				str = str.slice(0, 16) + "...";
			}

			msg = str + "格式错误！";
			return msg;
		}
		return msg;

	}
	_check_other(option) {
		var required = option.required;
		var str = option.value;
		var trimTx = this.trim(str);
		if (trimTx === false) {
			return this.illegalMesg;
		} else {
			str = trimTx;
		}
		var reg = option.other;
		var msg = "";
		if (typeof str == "undefined" || str == "") {
			if (required) {
				msg = "此项不能为空！";
			}
			return msg;
		}
		if (/"/.test(str)) {
			msg = "含有非法字符！";
			return msg;
		}
		if (eval('!' + reg + '.test("' + str + '")')) {
			if (this._get_str_byte(str) > 16) {
				str = str.slice(0, 16) + "...";
			}

			if (option.other_msg) {
				msg = str + option.other_msg;
			} else {
				msg = str + "格式错误！";
			}
		}
		return msg;
	}
	_check_domain(option) {
		var required = option.required;
		var str = option.value;
		var trimTx = this.trim(str);
		if (trimTx === false) {
			return this.illegalMesg;
		} else {
			str = trimTx;
		}
		var msg = "";
		if (/"/.test(str)) {
			msg = str + '含有非法字符"';
			return msg;
		}
		if (typeof str == "undefined" || str == "") {
			if (required) {
				msg = " 域名不能为空！";
			}
			return msg;
		}
		if (!this.validdomainname(str)) {
			if (this._get_str_byte(str) > 16) {
				str = str.slice(0, 16) + "...";
			}

			msg = str + "域名输入错误！";
		}
		return msg;
	}
	_check_ip_extend(option) {
		var required = option.required;
		var str = option.value;
		var trimTx = this.trim(str);
		if (trimTx === false) {
			return this.illegalMesg;
		} else {
			str = trimTx;
		}
		var msg = "";
		if (/"/.test(str)) {
			msg = str + '含有非法字符"';
			return msg;
		}
		if (typeof str == "undefined" || str == "") {
			if (required) {
				msg = "该项不能为空！";
			}
			return msg;
		} else {
			var arr = str.split("/");
			if (arr.length != 2) {
				return "该项格式错误！";
			}
		}
		if (!this.validip(arr[0]) || !(/^[a-zA-Z0-9]+$/.test(arr[1]))) {
			if (this._get_str_byte(str) > 16) {
				str = str.slice(0, 16) + "...";
			}

			msg = str + "格式错误！";
		}
		return msg;
	}
	_check_domain_extend(option) {
		var required = option.required;
		var str = option.value;
		var trimTx = this.trim(str);
		if (trimTx === false) {
			return this.illegalMesg;
		} else {
			str = trimTx;
		}
		var msg = "";
		if (/"/.test(str)) {
			msg = str + '含有非法字符"';
			return msg;
		}
		if (typeof str == "undefined" || str == "") {
			if (required) {
				msg = "该项不能为空！";
			}
			return msg;
		} else {
			var arr = str.split("/");
			if (arr.length != 2) {
				return "该项格式错误！";
			}
		}
		if (!this.validdomainname(arr[0]) || !(/^[a-zA-Z0-9]+$/.test(arr[1]))) {
			if (this._get_str_byte(str) > 16) {
				str = str.slice(0, 16) + "...";
			}

			msg = str + "格式错误！";
		}
		return msg;
	}
	_check_regexp(option) {
		var required = option.required;
		var str = option.value;
		var trimTx = this.trim(str);
		if (trimTx === false) {
			return this.illegalMesg;
		} else {
			str = trimTx;
		}
		var msg = "";
		if (/"/.test(str)) {
			msg = str + '含有非法字符"';
			return msg;
		}
		if (typeof str == "undefined" || str == "") {
			if (required) {
				msg = "正则表达式不能为空！";
			}
			return msg;
		}
		if (!this.validregexp(str)) {
			if (this._get_str_byte(str) > 16) {
				str = str.slice(0, 16) + "...";
			}

			msg = str + "非法的正则表达式！";
		}
		return msg;
	}
	_check_domain_suffix(option) {
		var required = option.required;
		var str = option.value;
		var trimTx = this.trim(str);
		if (trimTx === false) {
			return this.illegalMesg;
		} else {
			str = trimTx;
		}
		var msg = "";
		if (/"/.test(str)) {
			msg = str + '含有非法字符"';
			return msg;
		}
		if (typeof str == "undefined" || str == "") {
			if (required) {
				msg = " 域不能为空！";
			}
			return msg;
		}
		if (!this.validdomain_suffix(str)) {
			if (this._get_str_byte(str) > 16) {
				str = str.slice(0, 16) + "...";
			}

			msg = str + "域输入错误！";
		}
		return msg;
	}
	validdomainname(str) {
		var reg = /^[0-9a-zA-Z]+[0-9a-zA-Z\.-]*\.[a-zA-Z]{2,4}$/;
		var regnum = /^(\d+\.)+\d+$/;
		if (str == "localdomain") {
			return true;
		}
		if (regnum.test(str)) {
			return false;
		}
		return reg.test(str);
	}
	validregexp(str) {
		try {
			new RegExp(str);
		} catch (e) {
			return false;
		}
		return true;
	}
	validdomain_suffix(str) {
		var reg = /^[A-Za-z0-9+\.]+([-A-Za-z0-9]+\.)+[A-Za-z0-9]{2,6}$/;
		var reg2 = /^[A-Za-z0-9]{2,6}$/;
		var regnum = /^(\d+\.)+\d+$/;
		if (str == "localdomain") {
			return true;
		}
		if (regnum.test(str)) {
			return false;
		}
		if (reg2.test(str)) {
			return true;
		}
		return reg.test(str);
	}
	validip(str) {
		var ip = /^([1-9]|[1-9]\d|1\d{2}|2[0-1]\d|22[0-3])(\.(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])){3}$/;
		var flag = ip.test(str);
		var ip_0 = /\.0$/; //ip地址的最后一位不允许为0,
		if (ip_0.test(str)) {
			flag = false;
		}
		return flag;
	}
	validremoteip(str) {
		var ip = /^([0-9]|[1-9]\d|1\d{2}|2[0-1]\d|22[0-3])(\.(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])){3}$/;
		var flag = ip.test(str);
		return flag;
	}
		//部分需要有关联检测的输入的函数主体
	_check_associated(option, form_name, obj, event, type) {
		let me = this
		let associated = option.associated.split("|")
		let objs
		for (let i in associated) {
			let cur_ass = me._getCURElementsByName(associated[i], me.option_name[option.type], form_name)[0]
			let cur_value_ass = cur_ass.value
			for (let x in obj) {
				if (x == associated[i]) {
					objs = {
						"option": obj[x],
						"method": "keyup",
						"name": associated[i],
						"value": cur_value_ass,
						"form": form_name
					}
				}
			}
			if (cur_value_ass) {
				objs.eve = event.target ? event.target : event.srcElement
				if (type == "text") {
					me._check_text(objs)
				}
				if (type == "textarea") {
					me._check_textarea(objs)
				}
			}
		}

	}
	trim(str) {
		var reg = /[><]/;
		if (reg.test(str)) {
			return false;
		}
		return str.replace(/^\s+|\s+$/g, "");

	}
	_getCURElementsByName(name, tag, form_name) { //取某标签form下的名字为name的tag元素
		if (!document.all) { //pj:在非IE浏览器下,modify the document not exist;
			// var e = document.getElementsByName(form_name)[0].getElementsByTagName(tag); 
			var e = (document.getElementsByName(form_name).length == 0) ? [] : document.getElementsByName(form_name)[0].getElementsByTagName(tag);
			var returns = new Array();
			for (var i = 0; i < e.length; i++) {
				if (e[i].getAttribute("name") == name) {
					returns[returns.length] = e[i]
				};
			}
		} else {
			var con = this._getElementsByName(form_name, "form")[0];
			returns = new Array();
			var e = con.getElementsByTagName(tag);
			for (var i = 0; i < e.length; i++) {
				if (e[i].getAttribute("name") == name) {
					returns[returns.length] = e[i]
				}
			}
		}
		return returns;
	}
	_check_other(option) {
		var required = option.required;
		var str = option.value;
		var trimTx = this.trim(str);
		if (trimTx === false) {
			return this.illegalMesg;
		} else {
			str = trimTx;
		}
		var reg = option.other;
		var msg = "";
		if (typeof str == "undefined" || str == "") {
			if (required) {
				msg = "此项不能为空！";
			}
			return msg;
		}
		if (/"/.test(str)) {
			msg = "含有非法字符！";
			return msg;
		}
		if (eval('!' + reg + '.test("' + str + '")')) {
			if (this._get_str_byte(str) > 16) {
				str = str.slice(0, 16) + "...";
			}

			if (option.other_msg) {
				msg = str + option.other_msg;
			} else {
				msg = str + "格式错误！";
			}
		}
		return msg;
	}
	_get_str_byte(str) {
		var bytes = 0;
		for (var i = 0; i < str.length; i++) {
			if (str.charCodeAt(i) > 255) {
				bytes += 2;
			} else {
				bytes += 1;
			}
		}
		return bytes;
	}
	_initArgumentList(option) { //初始化参数列表
		option.required = typeof(option.required) == 'undefined' ? this.checkOption.get(required) : parseInt(option.required) //默认是必须填写，不能为空
	}
	_checkFormOption(option, x) { //检查传入的表单对象的属性是否符合规范
		let cur = this._getElementsByName(x, this.checkOption.get('option_name')[option.type])
		if (!cur[0]) {
			return
		} else if (option.check == "other" && !option.other_reg) {
			alert(`${x}的类型为其他，则reg选项为必选`)
			return
		} else if (option.check && (cur[0].type == "text" || option.type == "textarea")) {

			let checks = option.check.split("|")
			let unexites = 0
			let check_error = ""
			for (let i = 0; i < checks.length ;i++) {
				checks[i] = checks[i].split("-")[0]
				if (!checks[i]) {
					break
				}
				if (!this.checkOption.get('text_check')[checks[i]]) {
					unexites = 1
					check_error = checks[i]
					break
				}
			}
			if (unexites) {
				alert(`${x}表单元素的check字段出现了${check_error}类型，但是我们未定义这种检查方法，你是不是写错啦~`)
				return
			}
		}
	}
	_checkArgument(obj) { //检查传入参数的正确性
		if (!obj) {
			alert("验证表单没有传入参数！")
			return
		}
		if (typeof obj != "object") {
			alert("传入的参数不是对象！")
			return
		}
		if (!obj.form_name) {
			alert("要检查的表单名form_name字段没写或者为空！")
			return
		}
		if (!this._getElementsByName(obj.form_name, "form")) {
			alert(`没有找到表单名为${obj.form_name}的表单，检查一下表单名称写对没！`)
			return
		}
	}
	_getElementsByName(name, tag) {
		if (!document.all) {
			return document.getElementsByName(name)
		} else {
			let returns = document.getElementsByName(name)
			if (returns.length > 0) return returns
			returns = new Array()
			let e = document.getElementsByTagName(tag)
			for (let i = 0; i < e.length; i++) {
				if (e[i].getAttribute("name") == name) {
					returns[returns.length] = e[i]
				}
			}
		}
		return returns
	}
}

export default Check