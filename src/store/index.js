import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
	state: {
		data: {
			checkGoods: []
		},
		token:'',
		userInfo:{}
	},
	getters: {
		sum: state => {
			var sum = 0
			for (var i = 0; i < state.data.checkGoods.length; i++) {
				sum += state.data.checkGoods[i].num
			}
			return sum
		},
		checkSum:state=>{
			var sum = 0
			for (var i = 0; i < state.data.checkGoods.length; i++) {
				if(state.data.checkGoods[i].isChecked){
					sum += state.data.checkGoods[i].num
				}
			}
			return sum
		},
		pirceSum:state=>{
			var sum = 0
			for (var i = 0; i < state.data.checkGoods.length; i++) {
				if(state.data.checkGoods[i].isChecked){
					sum += state.data.checkGoods[i].num*state.data.checkGoods[i].goods_price
				}
			}
			return sum
		},
		allCheck:state=>{
			var sum = true
			for (var i = 0; i < state.data.checkGoods.length; i++) {
				if(!state.data.checkGoods[i].isChecked){
					sum = false 
					break
				}
			}
			return sum
		}
	},
	mutations: {
		changeSum(state, e) {
			uni.getStorage({
				key: 'goodsData',
				success: res => {
					state.data.checkGoods = res.data
				},
				fail: res => {}
			})
		},
		userInfoChange(state){
			uni.getStorage({
				key:'token',
				success:res=>{
					state.token = res.data
				},
				fail:err=>{
					state.token = ''
				}
			})
			uni.getStorage({
				key:'userInfo',
				success:res=>{
					state.userInfo = res.data
				},
				fail:err=>{
					state.userInfo = {
						nickName:'朽木',
						avatarUrl:'https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83er3ia6sH9icnpfZ1tkm4yA9oHz5UiafnNfVjfpriaTqYHQ8ytYwp2h6dZVNnGwxIF2uqR8mHAGhYFicadg/132'
					}
				}
			})
		}
	},
	actions: {

	},
	modules: {

	}
})
