import 'babel-polyfill';
import Create from './create.js'
import Animate from './animate.js'
import Common from './common.js'
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
class Netwizard extends mix(Create, Animate, Common, SaveData) {
	constructor(name = 'syy', cname = '11选5', issue = '**', state = '**') {
		super()
		this.name = name
		this.init()
	}

	init(){
		this.buildHtml()
		this.setCss()
		this.addListener()
	}

	buildHtml(){

	}
	
}

export default Netwizard