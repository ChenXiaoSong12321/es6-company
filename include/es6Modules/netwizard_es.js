import 'babel-polyfill';
import Create from './create.js'
import Animate from './animate.js'
import Common from './common.js'
import Base from './base.js'
import Check from './check.js'
import SaveData from './saveData.js'

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
class Netwizard extends mix(Create, Animate, Common, SaveData, Base,Check) {
    constructor(url = '**', nextBtn = '**', prevBtn = '**', interfaceConfig = '**') {
        super()
        this.url = "/cgi-bin/netwizard_new.cgi"
        this.nextBtn = nextBtn
        this.prevBtn = prevBtn
        this.interfaceConfig = {}
        this.init()
    }

    init() {
        let self = this
        let res = {
            "stepdetail": {
                "step1": {
                    "text": "主上行接口(WAN)",
                    "stepText": "选择主上行接口类型",
                    "type": "radio",
                    "name": "RED_TYPE",
                    "detail": [{
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
                    "stepText": "选择网络服务区域",
                    "text": "服务器区(DMZ)",
                    "type": "radio",
                    "name": "ZONES",
                    "detail": [{
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
                    "stepText": "网络参数设置",
                    "options": [{
                            "name": "",
                            "text": "内网用户区(LAN)",
                            "type": "group",
                            "options": [{
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
                                    "options": [{
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
                                    "options": [{
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
                        }, {
                            "name": "",
                            "text": "服务器区(DMZ)",
                            "type": "dmzGroup",
                            "options": [{
                                    "text": "IP 地址*",
                                    "type": "text",
                                    "name": "DISPLAY_ORANGE_ADDRESS",
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
                                    "name": "DISPLAY_ORANGE_NETMASK",
                                    "type": "select",
                                    "options": [{
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
                                    "options": [{
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
                                            "name": "ORANGE_DEVICES",
                                            "type": "checkbox",
                                            "checked": true,
                                            "value": "1",
                                            "port": "n/a",
                                            "connect": false,
                                            "mac": "28:51:32:12:06:d3",
                                            "device": "eth0.10"
                                        },
                                        {
                                            "name": "ORANGE_DEVICES",
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
                    "stepText": "互联网连接偏好设置",
                    "text": "主上行接口(WAN)[默认网关*]",
                    "name": "DEFAULT_GATEWAY",
                    "type": "text",
                    "value": "192.168.11.1"
                },
                "step5": {
                    "stepText": "配置DNS",
                    "options": [{
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
                    "stepText": "配置默认管理员邮箱",
                    "options": [{
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
                    "stepText": "应用配置",
                    "text": "网络设置已经准备好,点击应用配置就可应用新的配置.."
                },
                "step8": {
                    "stepText": "配置完成",
                    "text": "配置成功"
                }
            }
        }
        // this.initData()
        // .then(function(res){

        // self.interfaceConfig = JSON.parse(res)
        self.interfaceConfig = res
        self.interfaceConfig.curStep = 1
        self.buildHtml()
        self.addListener()

        // })

    }

    buildHtml() {
        this.interfaceConfig.stepCount = this.getObjSize(this.interfaceConfig.stepdetail)
        let step = this.createStep(this.interfaceConfig.stepCount)
        this.select('#step').innerHTML = step
        let footer_btn = this.createFooterBtn(this.interfaceConfig.stepdetail.step2)
        this.select("#footer_btn").innerHTML = footer_btn
        let panel = this.createStepPanel()
        this.select('#step_panel').innerHTML = panel
    }
    addListener() {
        let self = this
        this.nextBtn = this.select(this.nextBtn)
        this.prevBtn = this.select(this.prevBtn)
        this.on(this.nextBtn, 'click', function() { self.switchStep('next') })
        this.on(this.prevBtn, 'click', function() { self.switchStep('prev') })
    }
}

export default Netwizard