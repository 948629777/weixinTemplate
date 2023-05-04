<template>
	<view class="main">
		<search-nav></search-nav>   
		<scroll-view scroll-y class="leftNav" :style="'height:'+boxHeight+'px;'">
			<!-- 一级分类  左侧导航栏 -->
			<view v-for="item,index in cateList" :key="index" :class="{'left_item':true,'active':index==active}" @click="showCur(index)">
				{{item.cat_name}}
				
				<scroll-view scroll-y class="right" :style="'height:'+boxHeight+'px;'" v-if="index==active">
					<view class="title">
						<!-- 二级分类，右侧顶部选项 -->
						<view v-for="item1,index1 in item.children" :key="index1">
							<view :class="{'titleText':true,'active':index1==active1}" @click.stop="show2(index1)">
								{{item1.cat_name}}
							</view>
							<view class="right_main">
								<!-- 三级分类，点击跳转 -->
								<view class="right_item" v-for="item2,index2 in item1.children" :key="index2" v-if="index1==active1" @click="toGoodsList(item2.cat_id,item2.cat_name)">
										<image src="../../static/my-icons/icon2.png"></image>
									<p>{{item2.cat_name}}</p>
								</view>
							</view>
						</view>
					</view>
					<view class="line">
						<view></view>
						<view>品牌</view>
						<view></view>
					</view>
				</scroll-view>
			</view>
		</scroll-view>
	</view>
</template>
<script>
	import mix from '@/mixins/mixins'
	export default {
		mixins:[mix],
		data() {
			return {
				boxHeight:0,
				cateList: [],
				active:0,
				active1:0
			};
		},
		methods: {
			async getCateList() {
				const res = await uni.$http.get('/api/public/v1/categories')
				this.cateList = res.data.message
			},
			// 大标题显示判断
			showCur(i){
				this.active = i
				this.active1 = 0
			},
			// 二级标题显示判断
			show2(i){
				this.active1 = i
			},
			// 页面跳转
			toGoodsList(id,name){
				uni.navigateTo({
					url: '/subpkg/goods_list/goods_list?cid='+id+'&query='+name,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			}
		},
		mounted() {
			// 设置盒子高度
			this.boxHeight =  uni.getSystemInfoSync().windowHeight-40
			this.getCateList()
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
	}
	.main {
		.leftNav {
			width:200rpx;
			box-sizing: border-box;
			font-size: 14px;
			height: 100rpx;
			text-align: center;
			line-height: 100rpx;
			background-color: rgba(128, 128, 128, 0.2);
			.right{
				position: fixed;
				top: 40px;
				left: 200rpx;
				.title{
					box-sizing: border-box;
					width: 550rpx;
					display: flex;
					flex-wrap: wrap;
					position: relative;
					padding-bottom:10px ;
					>view{
						width: 25%;
						text-align: center;
						.right_main{
							width: 550rpx;
							position: absolute;
							bottom: -80rpx;
							transform:translateY(100%);
							left: 0;
							display: flex;
							flex-wrap: wrap;
						}
					}
				}
			}
		}
	}
	.left_item.active{
		background-color:white;
	}
	.titleText{
		border-bottom: 2px solid transparent;
	}
	.titleText.active{
		border-bottom: 2px solid red;
		color: red;
	}
	.right_item{
			width: 33%;
			text-align: center;
			flex: none;
			height: 120rpx;
			image{
				width: 60rpx;
				height: 60rpx;
			}
			p{
				transform: translateY(-70rpx);
			}
			
	}
	.line{
		display: flex;
		justify-content: center;
		height: 60rpx;
		width: 550rpx;
	}
	.line>view{
		flex: 2;
		border-bottom: 1px solid gray;
	}
	.line>view:nth-child(2){
		flex: 1;
		border: none;
	}
</style>
