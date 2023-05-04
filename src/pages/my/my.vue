<template>
	<view>
		<view class="loginBtn" v-if="!token">
			<view class="userIcon">
				<uni-icons
					type="contact-filled"
					color="#808080"
					size="80"
				></uni-icons>
			</view>
			<view class="" @click="loginReq"> 一键登录 </view>
			<view class=""> 登陆后尽享更多权益 </view>
			<view class=""> </view>
		</view>
		<view class="userMain" v-else>
			<view class="userHead">
				<view
					class=""
					hover-class="none"
					hover-stop-propagation="false"
				>
					<image
						:src="userInfo.avatarUrl"
						mode="aspectFit|aspectFill|widthFix"
						lazy-load="false"
						binderror=""
						bindload=""
					>
					</image>
				</view>
				<view class="username">
					{{ userInfo.nickName }}
				</view>
			</view>
			<view
				class="content"
				hover-class="none"
				hover-stop-propagation="false"
			>
				<view
					class="userCollect"
					hover-class="none"
					hover-stop-propagation="false"
				>
					<view>
						<p>8</p>
						<p>收藏的店铺</p>
					</view>
					<view>
						<p>8</p>
						<p>收藏的店铺</p>
					</view>
					<view>
						<p>8</p>
						<p>收藏的店铺</p>
					</view>
					<view>
						<p>8</p>
						<p>收藏的店铺</p>
					</view>
				</view>
				<view
					class="userOrder"
					hover-class="none"
					hover-stop-propagation="false"
				>
					<view
						class=""
						hover-class="none"
						hover-stop-propagation="false"
					>
						我的订单
					</view>
					<view
						class="orderIocn"
						hover-class="none"
						hover-stop-propagation="false"
					>
						<view>
							<image
								src="../../static/my-icons/icon1.png"
								mode="aspectFit|aspectFill|widthFix"
								lazy-load="false"
								binderror=""
								bindload=""
							>
							</image>
							<p>待付款</p>
						</view>
						<view>
							<image
								src="../../static/my-icons/icon1.png"
								mode="aspectFit|aspectFill|widthFix"
								lazy-load="false"
								binderror=""
								bindload=""
							>
							</image>
							<p>待付款</p>
						</view>
						<view>
							<image
								src="../../static/my-icons/icon1.png"
								mode="aspectFit|aspectFill|widthFix"
								lazy-load="false"
								binderror=""
								bindload=""
							>
							</image>
							<p>待付款</p>
						</view>
						<view>
							<image
								src="../../static/my-icons/icon1.png"
								mode="aspectFit|aspectFill|widthFix"
								lazy-load="false"
								binderror=""
								bindload=""
							>
							</image>
							<p>待付款</p>
						</view>
					</view>
				</view>
				<!-- 地址 登录 选项 -->
				<view
					class="userSelect"
					hover-class="none"
					hover-stop-propagation="false"
				>
					<view
						class="afterIocn"
						hover-class="none"
						hover-stop-propagation="false"
					>
						收货地址
					</view>
					<view
						class="afterIocn"
						hover-class="none"
						hover-stop-propagation="false"
					>
						收货地址
					</view>
					<view
						class="afterIocn"
						hover-class="none"
						hover-stop-propagation="false"
						@click="loginOut"
					>
						退出登录
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import mix from '@/mixins/mixins'
import { mapState } from 'vuex'
export default {
	mixins: [mix],
	data() {
		return {
			loginReqInfo: {
				code: '',
				encryptedData: '',
				iv: '',
				rawData: '',
				signature: '',
			},
		}
	},
	computed: {
		...mapState(['token', 'userInfo']),
	},
	mounted() {
	},
	methods: {
		loginReq() {
			uni.getUserProfile({
				desc: '用于同步小程序用户信息',
				success: (res) => {
					console.log(res)
					// 存储获取的用户信息
					this.userInfo = res.userInfo
					uni.setStorage({
						key: 'userInfo',
						data: res.userInfo,
					})
					// 设置请求时携带的参数
					this.loginReqInfo.encryptedData = res.encryptedData
					this.loginReqInfo.iv = res.iv
					this.loginReqInfo.rawData = res.rawData
					this.loginReqInfo.signature = res.signature
					// 获取用户微信code
					uni.login({
						success: async (resLogin) => {
							this.loginReqInfo.code = resLogin.code
							// 发起请求
							const resToken = await uni.$http.post(
								'/api/public/v1/users/wxlogin',
								this.loginReqInfo
							)
							// 提示用户并存储token
							uni.showToast({
								title: '登录成功',
								icon: 'none',
								complete: (res) => {
									uni.setStorage({
										key: 'token',
										data: 'isOK',
									})
									this.$store.commit('userInfoChange')
								},
							})
						},
					})
				}
			})
		},
		async loginOut(){
			await uni.removeStorage({
				key:'token'
			})
			await uni.removeStorage({
				key:'userInfo'
			})
			this.$store.commit('userInfoChange')
		}
	},
}
</script>

<style lang="scss">
.loginBtn {
	position: fixed;
	left: 50%;
	top: 30%;
	transform: translateX(-50%);
	text-align: center;

	> view {
		margin: 20px 0;
	}

	> view:nth-child(1) {
		width: 400rpx;
		margin: 0;
	}

	> view:nth-child(2) {
		margin-top: 0px;
		width: 400rpx;
		height: 90rpx;
		line-height: 90rpx;
		background-color: red;
		border-radius: 50rpx;
		color: white;
	}

	> view:nth-child(3) {
		font-size: 10px;
		color: gray;
	}

	> view:nth-child(4) {
		position: fixed;
		top: -120%;
		left: -50%;
		width: 600px;
		height: 900rpx;
		background-color: rgba(128, 128, 128, 0.2);
		z-index: -1;
	}
}
.userHead {
	background-color: red;
	width: 100%;
	height: 500rpx;
	text-align: center;
	padding-top: 180rpx;
	box-sizing: border-box;
}
.userHead > view:nth-child(1) > image {
	width: 160rpx;
	height: 160rpx;
	border-radius: 80rpx;
	overflow: hidden;
}
.userHead > view:nth-child(2) {
	color: white;
	font-size: 12px;
}
.content {
	width: 92%;
	height: 700rpx;
	padding: 20px;
	margin: 0 auto;
	box-sizing: border-box;
	transform: translateY(-40rpx);
	background-color: white;
	border-radius: 5px;
	text-align: center;
	font-size: 12px;
	> .userCollect {
		display: flex;
		> view {
			flex: 1;
		}
	}
}
.userOrder {
	font-size: 16px;
	text-align: left;
	> view:nth-child(1) {
		margin: 15px 0;
		padding-left: 10px;
	}
	> .orderIocn {
		display: flex;
		text-align: center;
		> view {
			font-size: 12px;
			flex: 1;
			> image {
				width: 60rpx;
				height: 60rpx;
			}
		}
	}
}
.userSelect {
	font-size: 16px;
	text-align: left;
	margin: 10px;
	> view {
		margin: 10px 0;
		&::after {
			width: 8px;
			height: 8px;
			content: '';
			border: 1px solid gray;
			display: block;
			border-left: none;
			border-top: none;
			transform: rotate(-45deg);
			float: right;
		}
	}
}
.content>view{
margin: 25px 0;
}
</style>
