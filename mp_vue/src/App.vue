<script>

export default {
	onLaunch() {
		require('./utils/sdk-v1.2.1')
		wx.BaaS.init('edee430aff687736b7d0')
	}
}
</script>

<style>
.container {
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	padding: 200rpx 0;
	box-sizing: border-box;
}
/* this rule will be remove */
* {
	transition: width 2s;
	-moz-transition: width 2s;
	-webkit-transition: width 2s;
	-o-transition: width 2s;
}
</style>
