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
		this.initData()
			.then(function(res){
				self.interfaceConfig = JSON.parse(res)
				self.interfaceConfig.step = 1
				self.buildHtml()
				self.addListener()

			})
		
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