<template>
	<view>
		<view class="main" @click="toSearch">
			<view class="box">
				<uni-icons type="search" size="17" color="rgba(128, 128, 128, 0.5)"></uni-icons>搜索
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		name:"search-nav",
		data() {
			return {
				
			};
		},
		methods:{
			toSearch(){
				uni.navigateTo({
					url: '/subpag/search_page/search_page',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			}
		}
	}
</script>

<style lang="scss">
	.main{
		background-color: red;
		height: 40px;
		width: 100%;
		text-align: center;
		.box{
			display: inline-block;
			width: 80%;
			height: 30px;
			border-radius: 20px;
			background-color: white;
			line-height: 30px;
			font-size: 14px;
			color: rgba(128, 128, 128, 0.5);
		}
	}
</style>