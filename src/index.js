import Vue from 'vue'

const VueVirtualScroll = Vue.component('vue-virtualscroll', {

	props: {
		height: {
			type: Number,
			default: 30
		},
		onScroll: Function
	},

	data(){
		return {
			offset: 0, 
			paddingTop: 0,
			nb: 0, 
			total: 0, 
			viewHeight: 0, 
			scrollHeight: 0,
			scrollTop: 0,
			count: 0,
			initialized: false
		}
	},

	methods: {
		scroll (e) {
			this.scrollTop = e.target.scrollTop
			this.offset = Math.floor(this.scrollTop / this.height)
			if(this.offset > this.total - this.count){
				this.$emit('reachBottom')
				this.offset = this.total - this.count
			}
			this.paddingTop = this.offset * this.height
			this.$forceUpdate()
			if (this.onScroll) {
				this.onScroll(e, this.scrollTop)
			}
			if(!this.scrollTop) this.$emit('reachTop')
		},

		_getVNodes () {
			if(this.initialized && this.$slots.default){
				return this.$slots.default.slice(this.offset, this.offset + this.count)
			}else{
				return []
			}
		},

		_getElemInfo(elem) {
			let offsetTop = 0;
			let offsetLeft = 0;
			let offsetHeight = elem.offsetHeight
			let offsetWidth = elem.offsetWidth

			do {
				if (!isNaN(elem.offsetTop))
					offsetTop += elem.offsetTop
				if (!isNaN(elem.offsetLeft))
					offsetLeft += elem.offsetLeft
			} while ((elem = elem.offsetParent) !== null)

			return {
					top: offsetTop,
					left: offsetLeft,
					height: offsetHeight,
					width: offsetWidth
			}
		},

		init(){
			this.initialized = true
			this.setData()
			this.$forceUpdate()
		},

		setData(){
			this.viewHeight = this._getElemInfo(this.$el).height
			this.nb = Math.ceil(this.viewHeight / this.height)
			this.count = this.nb + Math.round(this.nb / 2)
			this.total = this.$slots.default ? this.$slots.default.length : 0
			if(this.total < this.count) this.count = this.total
			this.scrollHeight = this.height * (this.total - this.count)
			this.$el.scrollTop = 0
		}
	},

	updated () {
		if(!this.initialized) this.init()
	},

	render (createElement) {
		if(!this.initialized || !this.height) return createElement('div', {})
		if(this.initialized && this.total != (this.$slots.default ? this.$slots.default.length : 0)) this.setData()
		return createElement('div', 
			{
				'on': {
					'scroll': this.scroll
				},
				'style': {
					'overflow-y': 'auto',
					'height': this.viewHeight + 'px',
					'scrollTop': 0
				}
			},
			[
				createElement('div', 
					{
						'style': {
							'padding-top': this.paddingTop + 'px',
							'padding-bottom': this.scrollHeight - this.paddingTop + 'px'
						}
					}, this._getVNodes())
			]
		)
	}
})

module.exports = VueVirtualScroll
