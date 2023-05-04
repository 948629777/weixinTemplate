<template>
	<view>
		<view class="searchipt">
			<uni-search-bar :focus="true" v-model.trim="queryInfo.query"
				@input="searchInput" cancelButton="none" radius="15">
			</uni-search-bar>
		</view>
		<view class="searchHistory" v-if="!queryInfo.query">
			<view class="historyTitle">
				搜索历史
				<uni-icons class="clearIcon" type="trash" size="20" @click="clearHistory"></uni-icons>
			</view>
			<view class="historyMain">
				<uni-tag class="item" v-for="item,index in searchHistory" :key="index" :text="item"  @click="clickHistory(item)"/>
			</view>
		</view>
		<view class="goodsList">
			<view class="item" v-for="item,index in searchShowList" :key="item.goods_id" @click="toDetail(item.goods_id)">
				<view class="text">
					{{item.goods_name}}
				</view>
				<uni-icons type="right" class="rightIcon" size="20"></uni-icons>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 搜索历史
				searchHistory:[],
				// 推荐列表
				searchShowList:[],
				// 防抖延时器
				searchInputTimer:undefined,
				// 查询表单
				queryInfo:{
					query:'',
					cid:'',
					pagenum:1,
					pagesize:20
				}
			};
		},
		methods: {
			searchInput() {
				// 防抖
				if(this.searchInputTimer){
					clearTimeout(this.searchInputTimer)
				}
				// 空文本时终止
				if(this.queryInfo.query.length===0){
					this.searchShowList = []
					return
				}
				// 午时已到
				this.searchInputTimer = setTimeout(_=>{
					// 不记录重复值
					let index = this.searchHistory.indexOf(this.queryInfo.query)
					if(index===-1){
						// 未重复将查询值加入数组
						this.searchHistory.push(this.queryInfo.query)
						// 历史记录存入本地
						uni.setStorage({
							key:'searchHistory',
							data:this.searchHistory
						})
					}else{
						// 读取缓存
						uni.getStorage({key:this.queryInfo.query,success:res=>{
							this.searchShowList=res.data.goods
						}})
						// 终止函数，不发请求
						return
					}
					// 请求数据
					this.getSearchShowList()
				},800)
			},
			// 点击了历史记录
			clickHistory(text){
				this.queryInfo.query=text
			},
			// 去详情页
			toDetail(id){
					uni.navigateTo({
						url: '/subpag/goods_detail/goods_detail?id='+id, 
						success: res => {},
						fail: () => {},
						complete: () => {}
					});
			},
			// 清空历史记录
			clearHistory(){
				uni.removeStorage({
					key:'searchHistory'
				})
				this.searchHistory = []
			},
			// 请求推荐列表
			async getSearchShowList(){
				const res = await uni.$http.get('/api/public/v1/goods/search',this.queryInfo)
				// 存入本地
				uni.setStorage({key:this.queryInfo.query,data:res.data.message})
				// 更新推荐列表
				this.searchShowList = res.data.message.goods
			}
		},
		mounted(){
			// 页面加载读取本地记录是否存在历史记录
			uni.getStorage({
				key:'searchHistory',
				success:res=>{
					if(res&&res.data){
						this.searchHistory=res.data
					}
				}
			})
		}
	}
</script>

<style lang="scss">
	.searchipt {
		background-color: red;
	}
	.clearIcon,.rightIcon{
		float: right;
	}
	.historyTitle{
		font-size: 14px;
	}
	.historyMain>.item{
		margin: 0 5px;
	}
	.goodsList>.item{
		margin: 15px 5px;
		padding-bottom: 3px;
		border-bottom: 1px solid rgba(128, 128, 128, 0.5);
	}
	.goodsList>.item>.text{
		display: inline-block;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		font-size: 16px;
		width: 94%;
	}
</style>
