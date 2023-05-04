<template>
	<view>
		<search-nav></search-nav>
		<!-- 轮播图 -->
		<view class="swiper">
			<swiper autoplay indicator-dots indicator-color="white" indicator-active-color="red" circular
				interval="2000">
				<swiper-item v-for="item,index in swiperList" :key="index">
					<navigator :url="'/subpkg/goods_detail/goods_detail?id='+item.goods_id">
						<image :src="item.image_src" />
					</navigator>
				</swiper-item>
			</swiper>
		</view>
		<!-- 分类列表 -->
		<view class="cate">
			<view v-for="item,index in cateList" :key="index">
				<navigator @click.prevent="navTo(index)">
					<image :src="item.image_src" mode=""></image>
				</navigator>
			</view>
		</view>
		<!-- 楼层导航 -->
		<p style="display: none;">{{this.sum}}</p>
		<view class="floornav" v-for="item,index in floorList" :key="index">
			<view class="title">
				<image :src="item.floor_title.image_src" />
			</view>
			<view class="content">
				<view class="" v-for="item1,index1 in item.product_list" :key="index1"
					@click="toDetail(item1.navigator_url)">
					<image :src="item1.image_src" />
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import mix from '@/mixins/mixins'
	export default {
		mixins:[mix],
		data() {
			return {
				swiperList: [],
				cateList: [],
				floorList: []
			};
		},
		methods: {
			async getSwiperList() {
				const res = await uni.$http.get(`/api/public/v1/home/swiperdata`)
				if (res.data.meta.status === 200) {
					this.swiperList = res.data.message
				} else {
					uni.showToast({
						title: '网络错误',
						icon: 'none',
						image: '',
						duration: 1500,
						mask: false,
						success: (result) => {

						},
						fail: () => {},
						complete: () => {}
					});
				}
			},
			async getCateList() {
				const res = await uni.$http.get(`/api/public/v1/home/catitems`)
				if (res.data.meta.status === 200) {
					this.cateList = res.data.message
				} else {
					uni.showToast({
						title: '网络错误',
						icon: 'none',
						image: '',
						duration: 1500,
						mask: false,
						success: (result) => {

						},
						fail: () => {},
						complete: () => {}
					});
				}
			},
			navTo(e) {
				if (e != 0) return
				uni.switchTab({
					url: '/pages/cate/cate'
				})
			},
			toDetail(url) {
				var query = url.slice(url.indexOf('query=') + 6)
				uni.navigateTo({
					url: '/subpkg/goods_list/goods_list?query=' + query
				})
			},
			async getFloorList() {
				const res = await uni.$http.get(`/api/public/v1/home/floordata`)
				if (res.data.meta.status === 200) {
					this.floorList = res.data.message
				} else {
					uni.showToast({
						title: '网络错误',
						icon: 'none',
						image: '',
						duration: 1500,
						mask: false,
						success: (result) => {

						},
						fail: () => {},
						complete: () => {}
					});
				}
			}
		},
		mounted() {
			this.getSwiperList()
			this.getCateList()
			this.getFloorList()
		}
	}
</script>

<style lang="scss">
	.swiper image {
		width: 100%;
		height: 330rpx;
	}

	.cate {
		width: 100%;
		display: flex;
		padding-top: 15rpx;

		view {
			flex: 1;
		}
	}

	.cate navigator {
		width: 100%;
		text-align: center;

		image {
			width: 70%;
			height: 140rpx;
		}
	}

	.title>image {
		margin: 10px 0;
		height: 60rpx;
	}

	.content {
		display: grid;
		grid-gap: 20rpx;
		grid-template-areas:
			"a a b b b c c"
			"a a d d e e e"
	}

	.content image {
		width: 100%;
		height: 100%;
	}

	.content>view {
		height: 250rpx;
	}

	.content>view:nth-child(1) {
		height: 520rpx;
	}

	.content>view:nth-child(1) {
		grid-area: a;
	}

	.content>view:nth-child(2) {
		grid-area: b;
	}

	.content>view:nth-child(3) {
		grid-area: c;
	}

	.content>view:nth-child(4) {
		grid-area: d;
	}

	.content>view:nth-child(5) {
		grid-area: e;
	}
</style>
