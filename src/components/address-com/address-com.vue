<template>
	<view>
		<view class="addressBox" v-if="address.userName" @click="reSelect">
			<view class="user">
				<view>
					收件人:{{address.userName}}
				</view>
				<view>
					电话:{{address.telNumber}}>
				</view>
			</view>
			<view class="address">
				<view class="">
					收货地址：
				</view>
				<view class="">
					{{address.provinceName+address.cityName+address.countyName+address.detailInfo+address.detailInfoNew}}
				</view>
				<view class="">
		
				</view>
			</view>
		</view>
		<view class="newAddress" @click="selectAddress" v-else>
			<uni-tag text="请选择收货地址+" custom-style="background-color: #00B26A; border-color: #00B26A; color: #fff;">
								</uni-tag>
		</view>
	</view>
</template>

<script>
	export default {
		name:"address",
		data() {
			return {
				address:{}
			};
		},
		mounted() {
			uni.getStorage({
				key:'curAddress',
				success:res=>{
					this.address = res.data
				}
			})
		},
		methods:{
			// 选择地址
			selectAddress(){
				this.getAddress()
			},
			// 重新选择地址
			reSelect(){
				this.getAddress()
			},
			getAddress(){
				uni.chooseAddress({
				  success:res=>{
					  this.address = res
					  uni.setStorage({
						  key:'curAddress',
						  data:res
					  })
				  },
				  fail:res=>{
					  console.log(res);
				  }
				})
			}
		}
	}
</script>

<style lang="scss">
	.newAddress{
		font-size: 12px;
		padding: 5px;
		height: 80px;
		width: 100%;
		text-align: center;
		line-height: 80px;
	}
	.addressBox {
		font-size: 12px;
		padding: 5px;
		height: 80px;
		>.user {
			margin: 10px 0;
			display: flex;
			justify-content: space-between;
		}

		>.address {
			margin: 10px 0;
			display: flex;

			>view {
				vertical-align: middle;
				flex: 2;
			}

			>view:nth-child(2) {
				flex: 6;
			}

			>view:nth-child(3) {
				flex: 3;
			}
		}
	}
</style>