import 'babel-polyfill';
import Create from './create.js'
import Animate from './animate.js'
import Common from './common.js'
import Base from './base.js'

const copyProperties = function(target, source) {
	for (let key of Reflect.ownKeys(source)) {
		if (key !== 'constructor' && key !== 'prototype' && key !== 'name') {
			let desc = Object.getOwnPropertyDescriptor(source, key)
			Object.defineProperty(target, key, desc)
		}
	}
}
const mix = function(...mixins) {
	class Mix {}
	for (let mixin of mixins) {
		copyProperties(Mix, mixin)
		copyProperties(Mix.prototype, mixin.prototype)
	}
	return Mix
}
class Netwizard extends mix(Create, Animate, Common, Base) {
	constructor(name = 'syy', cname = '11选5', issue = '**', state = '**') {
		super()
		this.url = "/cgi-bin/netwizard_new.cgi"
		this.interfaceConfig = {}
		this.init()
	}

	init(){
		let self = this
		let res = {
    "stepdetail": {
        "step1": {
            "text": "主上行接口(WAN)", 
            "type": "radio", 
            "name": "RED_TYPE", 
            "detail": [
                {
                    "value": "STATIC", 
                    "checked": false, 
                    "text": "固定IP"
                }, 
                {
                    "value": "DHCP", 
                    "checked": true, 
                    "text": "DHCP"
                }, 
                {
                    "value": "PPPOE", 
                    "checked": false, 
                    "text": "PPPOE"
                }, 
                {
                    "value": "NONE", 
                    "checked": false, 
                    "text": "透明网关"
                }
            ]
        }, 
        "step2": {
            "text": "服务器区(DMZ)", 
            "type": "radio", 
            "name": "ZONES", 
            "detail": [
                {
                    "value": "NONE", 
                    "checked": false, 
                    "text": "无"
                }, 
                {
                    "value": "ORANGE", 
                    "checked": true, 
                    "text": "DMZ区"
                }
            ]
        }, 
        "step3": {
            "options": [
                {
                    "name": "", 
                    "text": "内网用户区(LAN)", 
                    "type": "group", 
                    "options": [
                        {
                            "text": "IP 地址*", 
                            "type": "text", 
                            "name": "DISPLAY_GREEN_ADDRESS", 
                            "value": "192.168.11.181"
                        }, 
                        {
                            "text": "附加IP地址", 
                            "type": "textarea", 
                            "name": "DISPLAY_GREEN_ADDITIONAL", 
                            "value": "192.168.11.181&3.3.3.3"
                        }, 
                        {
                            "text": "子网掩码*", 
                            "name": "DISPLAY_GREEN_NETMASK", 
                            "type": "select", 
                            "options": [
                                {
                                    "value": "0", 
                                    "text": "/0 - 0.0.0.0", 
                                    "checked": false
                                }, 
                                {
                                    "value": "1", 
                                    "text": "/1 - 128.0.0.0", 
                                    "checked": true
                                }
                            ]
                        }, 
                        {
                            "text": "接口*", 
                            "name": "", 
                            "type": "table", 
                            "options": [
                                {
                                    "name": "", 
                                    "type": "", 
                                    "checked": "", 
                                    "value": "", 
                                    "port": "端口", 
                                    "connect": "连接", 
                                    "mac": "MAC", 
                                    "device": "设备"
                                }, 
                                {
                                    "name": "GREEN_DEVICES", 
                                    "type": "checkbox", 
                                    "checked": true, 
                                    "value": "1", 
                                    "port": "n/a", 
                                    "connect": false, 
                                    "mac": "28:51:32:12:06:d3", 
                                    "device": "eth0.10"
                                }, 
                                {
                                    "name": "GREEN_DEVICES", 
                                    "type": "checkbox", 
                                    "checked": false, 
                                    "value": "2", 
                                    "port": "1", 
                                    "connect": true, 
                                    "mac": "28:51:32:12:06:d4", 
                                    "device": "eth1"
                                }
                            ]
                        }
                    ]
                }, 
                {
                    "text": "主机名", 
                    "name": "HOSTNAME", 
                    "type": "text", 
                    "value": "localhost"
                }, 
                {
                    "text": "域名", 
                    "name": "DOMAINNAME", 
                    "type": "text", 
                    "value": "localdomain"
                }
            ]
        }, 
        "step4": {
            "text": "主上行接口(WAN)[默认网关*]", 
            "name": "DEFAULT_GATEWAY", 
            "type": "text", 
            "value": "192.168.11.1"
        }, 
        "step5": {
            "options": [
                {
                    "text": "DNS 1*", 
                    "name": "DNS1", 
                    "type": "text", 
                    "value": "61.139.2.69"
                }, 
                {
                    "text": "DNS 2", 
                    "name": "DNS2", 
                    "type": "text", 
                    "value": ""
                }
            ]
        }, 
        "step6": {
            "options": [
                {
                    "text": "管理员邮箱地址", 
                    "name": "MAIN_ADMINMAIL", 
                    "type": "text", 
                    "value": ""
                }, 
                {
                    "text": "发送者邮件地址", 
                    "name": "MAIN_MAILFROM", 
                    "type": "text", 
                    "value": ""
                }, 
                {
                    "text": "邮件中继主机地址", 
                    "name": "MAIN_SMARTHOST", 
                    "type": "text", 
                    "value": ""
                }
            ]
        }, 
        "step7": {
            "text": "网络设置已经准备好,点击应用配置就可应用新的配置.."
        }, 
        "step8": {
            "text": "配置成功"
        }
    }
}
		// this.initData()
			// .then(function(res){
				
				// self.interfaceConfig = JSON.parse(res)
				self.interfaceConfig = res
				self.interfaceConfig.step = 1
				self.buildHtml()
				self.addListener()

			// })
		
	}

	buildHtml(){
		let step = this.createStep(this.getObjSize(this.interfaceConfig.stepdetail))
		this.select('#step').innerHTML = step
		let footer_btn = this.createFooterBtn()
		this.select("#footer_btn").innerHTML = footer_btn
		let panel = this.createStepPanel(this.interfaceConfig)
		this.select('#step_panel').innerHTML = panel
	}
	addListener(){

	}
}

export default Netwizard

