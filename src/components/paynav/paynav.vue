<template>
	<view class="goods-carts">
		<uni-goods-nav :fill="true" :options="options" :button-group="buttonGroup" @click="addCar"
			@buttonClick="toPay" />
	</view>
</template>

<script>
	import {
		mapState,
		mapActions,
		mapGetters,
		mapMutations
	} from 'vuex'

	export default {
		name: "paynav",
		data() {
			return {
				buttonGroup: [{
						text: '加入购物车',
						backgroundColor: 'linear-gradient(90deg, #ef1224, #ef1224)',
						color: '#fff'
					},
					{
						text: '立即购买',
						backgroundColor: 'linear-gradient(90deg, #FF8A18, #FF8A18)',
						color: '#fff'
					}
				],
			}
		},
		props: ['goodsDetail'],
		methods: {
			addCar(e) {
				if (e.content.text === '购物车') {
					uni.switchTab({
						url: '/pages/cart/cart'
					})
				}
			},
			async toPay(e) {
				if (e.index === 0) {
					// 加入购物车
					await uni.getStorage({
						key: 'goodsData',
						success:async res => {
							console.log(res.data);
							// 判断有无
							var flag = false
							for(var i=0;i<res.data.length;i++){
								if(res.data[i].goods_id===this.goodsDetail.goods_id){
									flag = true
									break
								}
							}
							// 有  num++
							if(flag){
								res.data[i].num++
							}else{
								// 没有  定义计数器值为1
								this.goodsDetail.num=1
								// 默认为选中状态
								this.goodsDetail.isChecked = true
								this.goodsDetail.width = 0
								res.data.push(this.goodsDetail)
							}
							// 将修改过的data重新存入
							await uni.setStorage({
								key:'goodsData',
								data:res.data
							})
							// 存储操作结束，更新store的数据
							this.$store.commit('changeSum')
						},
						// 什么都没有的时候存入第一个值
						fail:res=>{
							this.goodsDetail.num=1
							this.goodsDetail.isChecked = true
							this.goodsDetail.width = 0
							uni.setStorage({
								key:'goodsData',
								data:[this.goodsDetail]
							})
							// 存储操作结束，更新store的数据
							this.$store.commit('changeSum')
						}
					})
				} else if (e.index === 1) {
					console.log('买');
				}
			},
		},
		computed: {
			...mapGetters(['sum']),
			options() {
				return [{
					icon: 'shop',
					text: '店铺',
				}, {
					icon: 'cart',
					text: '购物车',
					info: this.sum,
					infoBackgroundColor: '#EF1224',
					infoColor: "#f5f5f5"
				}]
			}
		}
	}
</script>

<style lang="scss">
	.goods-carts {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		position: fixed;
		left: 0;
		right: 0;
		/* #ifdef H5 */
		left: var(--window-left);
		right: var(--window-right);
		/* #endif */
		bottom: 0;
	}
</style>
