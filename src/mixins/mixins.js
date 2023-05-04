import { mapGetters } from 'vuex'

// 导出一个 mixin 对象
export default {
  computed: {
    ...mapGetters(['sum']),
  },
  onShow() {
	// 第一次打开小程序，在首页加载缓存数值到store公共数据
	this.$store.commit('changeSum')
    // 在页面刚展示的时候，设置数字徽标
    this.setBadge()
	this.$store.commit('userInfoChange')
  },
  onLoad(){
    // 更新商品总和
	  this.$store.commit('changeSum')
	  this.setBadge()
	  this.$store.commit('userInfoChange')
    // 用户token读取
		this.$store.commit('userInfoChange')
  },
  watch:{
	sum(){
		this.setBadge()
	}  
  },
  methods: {
    setBadge() {
      // 调用 uni.setTabBarBadge() 方法，为购物车设置右上角的徽标
      uni.setTabBarBadge({
        index: 2,
        text: this.sum + '', // 注意：text 的值必须是字符串，不能是数字
      })
    },
  },
}

