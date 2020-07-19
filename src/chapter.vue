<template>
	<el-container  v-loading="loading" element-loading-text="拼命加载中"
		element-loading-spinner="el-icon-loading"
		element-loading-background="rgba(0, 0, 0, 0.8)">
		<el-header>
			<el-row :gutter="10" type="flex" justify="space-between">

				<el-col :span="2">
					<el-button type="primary" icon="el-icon-arrow-left" @click="UpPage">上一页</el-button>
				</el-col>
				<el-col :span="4">{{chapterName}}</el-col>

				<el-col :span="2">

					<el-dropdown trigger="click" @command="handleCommand">
						<el-button type="primary">
							目录<i class="el-icon-arrow-down el-icon--right"></i>
						</el-button>
						<el-dropdown-menu slot="dropdown" class="project-dropdown">
							<el-dropdown-item v-for="(i,index ) in chapterList" :command="i.ChapterUUID">{{i.ChapterName}}
							</el-dropdown-item>

						</el-dropdown-menu>
					</el-dropdown>
				</el-col>
				<el-col :span="2">
					<el-button type="primary" @click="DownPage">下一页<i class="el-icon-arrow-right el-icon--right"></i></el-button>
				</el-col>

			</el-row>
		</el-header>
		<el-main>

			<div class="img" v-for="url in pics" style="font-size:0" align="center">
				<img v-lazy="'https://2shm.xyz/static/data'+url"></img>
			</div>
			<el-button type="primary" icon="el-icon-arrow-up" @click="backTop" style="position: fixed;bottom: 0; right:0;">Top</el-button>

			<router-link to="/">
				<el-button type="primary" icon="el-icon-arrow-up" style="position: fixed;bottom: 0; left:0;">首页</el-button>
			</router-link>
					<el-button type="primary" icon="el-icon-d-arrow-left" circle style="position: fixed;bottom: 10px; left:30%;"  @click="UpPage"> </el-button>
					<el-button type="primary" icon="el-icon-d-arrow-right" circle style="position: fixed;bottom: 10px; right:30%;" @click="DownPage"> </el-button>
		</el-main>

	</el-container>

</template>

<script>
	import Store from './store.js'
	export default {
		data() {
			return {

				UUID: this.$route.query.uuid,
				pics: [],
				chapterName: "",
				chapterList: [],
				loading:true

			}
		},
		methods: {
			GetChapterImgs(uuid) {
				this.axios({
					method: 'get',
					url: 'https://2shm.xyz/mh/getChapterImgs',
					params: {
						UUID: uuid
					}
				}).then(response => {
					this.loading=false
					//console.log(response.data.name)
					this.chapterName = response.data.name
					
					this.pics = response.data.imgs;
					//document.title=response.data.name
					document.title=this.chapterName
					console.log("title:",this.chapterName)
				})
			},
			getchapterList(chapterlist) {
				//console.log("getchapterList")
				//console.log(chapterlist)
				let info=window.sessionStorage.getItem("chapterlist")
				
				let jsonInfo=JSON.parse(info)
				
				for (let key in jsonInfo) {
					
					this.chapterList.push(JSON.parse(jsonInfo[key]))
					//alert(info[key])
				
				}
				console.log("this.chapterList:",this.chapterList)
				//this.chapterList = chapterlist
				//this.chapterList=window.sessionStorage.getItem("chapterlist")
			},
			handleCommand(command) {
				this.UUID = command
				//this.$message('click on item ' + this.UUID);
				this.GetChapterImgs(command)
				this.backTop()

			},
			UpPage() {
				this.backTop()
				for (var key = 0, len = this.chapterList.length; key < len; key++) {

					if (this.chapterList[key].ChapterUUID == this.UUID) {
						if (key == 0) {
							alert("已经是第一页了")
							return
						}
						
						this.UUID = this.chapterList[key - 1].ChapterUUID
						
						this.GetChapterImgs(this.UUID)
						return

					}
				}
				

			},
			DownPage() {
				this.backTop()
				for (var key = 0, len = this.chapterList.length; key < len; key++) {

					if (this.chapterList[key].ChapterUUID == this.UUID) {
						if (key == this.chapterList.length - 1) {
							alert("已经是最后一页了")
							return
						}
						console.log(typeof(key))
						this.UUID = this.chapterList[key + 1].ChapterUUID
						console.log(this.UUID)
						this.GetChapterImgs(this.UUID)
						return

					}
				}
				
			},
			backTop() {

				const that = this
				let timer = setInterval(() => {
					let ispeed = Math.floor(-that.scrollTop / 5)
					document.documentElement.scrollTop = document.body.scrollTop = that.scrollTop + ispeed
					if (that.scrollTop === 0) {
						clearInterval(timer)
					}
				}, 16)
			},

			// 为了计算距离顶部的高度，当高度大于60显示回顶部图标，小于60则隐藏
			scrollToTop() {
				const that = this
				let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
				that.scrollTop = scrollTop
				if (that.scrollTop > 0) {
					that.btnFlag = true
				} else {
					that.btnFlag = false
				}
			}


		},
		created() {
			
			
			this.GetChapterImgs(this.$route.query.uuid)
			document.title=this.chapterName
			console.log("chapterName:",this.chapterName)

		},
		mounted() {
			console.log("mounted")
			this.getchapterList(Store.getChapterList())
			window.addEventListener('scroll', this.scrollToTop)
		},
		destroyed() {
			window.removeEventListener('scroll', this.scrollToTop)
		},

	}
</script>

<style scoped>
	.el-header {
		position: fixed;
		left: 0;
		top: 0;
		z-index: 10;
		width: 100%;
		height: 56px;
		line-height: 56px;
		color: #ffaaff;
		background-color: rgba(51, 51, 51, .95);
	}

	.el-main {
		font-size: 16px;
		font-family: Microsoft Yahei, SimSun, Tahoma, arial, SimHei, sans-serif;
		width: 100%;
		background-color: #000000;
		text-align:center;
	}

	.project-dropdown {
		//设置高度才能显示出滚动条 !important
		position: absolute;
		height: 500px;
		overflow: auto;
	}

	.project-dropdown::-webkit-scrollbar {
		width: 5px;
		height: 5px;
		background-color: #F5F5F5;
	}

	.project-dropdown::-webkit-scrollbar-track {
		//-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
		border-radius: 10px;
		background-color: #F5F5F5;
	}
</style>
