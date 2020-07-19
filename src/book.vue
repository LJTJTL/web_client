<template>
	<el-container>
		<el-header>
			<router-link to="/">
			<img src="./assets/logo.png" class="logo">
			</router-link>
			<h1>{{head}}</h1>
		</el-header>
		<el-main v-loading="loading" element-loading-text="拼命加载中"
		element-loading-spinner="el-icon-loading"
		element-loading-background="rgba(0, 0, 0, 0.8)">
			<el-row  :gutter="10">
				<el-col :span="15">
					<div class="carouselnpm" >
						<el-carousel :interval="5000" arrow="always" type="card">
							<el-carousel-item v-for="item in carousel" :key="item">
								<el-image :src="'https://2shm.xyz/static/carousel/'+UUID+'/'+item" fit="fill"></el-image>
							</el-carousel-item>
						</el-carousel>
					</div>
				</el-col>
				<el-col style=" border-style: solid; border-width: 1px; border-radius:15px;" :span="8">
				<div class="info" >
					<p>{{head}}</p>
					共：{{bookInfo.NowChapter}} 话
					<p>{{bookInfo.Status}}</p>
					<p>{{bookInfo.Author}} |<font style="color:#e73844">★</font>{{bookInfo.rate}}</p>
					<hr/>
					<p>{{bookInfo.Description}}</p>
					<div class='tag'>
						<el-tag type="success" v-for='tag in csplitTag(bookInfo.tag)'>{{tag}}</el-tag>
					</div>
				</div>
				</el-col>
			</el-row>
			<hr />
			<div>
				<section class="episode_area">
					<div v-for="(i,index) in info">
						<router-link :to="{path:'/chapter/',query:{uuid:i.ChapterUUID}}">
							<el-row :span="2" :gutter="10">
								<el-col v-for="j in i.ChapterAbb" :span="2">
									<el-image :src="'https://2shm.xyz/static/abb/'+i.ChapterUUID+'/'+j" fit="fill" :lazy="true"></el-image>

								</el-col>
								<!--
						章节名字
												-->

								<el-col :span="18" style="border-style: solid; border-width: 1px; border-radius:15px;">
									<div>{{i.ChapterTitle}}</div>
									<div>{{i.ChapterSubTitle}}</div>
								</el-col>
							</el-row>
						</router-link>
						<hr />
					</div>
				</section>
			</div>
		</el-main>
		<el-footer >
			<div  >
				<a href="http://xiaoshuo8.xyz">免费小说</a>
			</div>
			
		</el-footer>
	</el-container>
</template>

<script>
	import Store from './store.js'

	export default {
		data() {
			return {
				head: this.$route.query.bookname,
				UUID: this.$route.query.uuid,
				info: [],
				carousel: [],
				bookInfo:[],
				loading: true

			}
		},
		    metaInfo(){
		        return {
		            
		            meta: [
		                {
		                    name:"keywords",
		                    content: this.bookInfo.tag
		                },{
		                    name:"description",
		                    content: this.bookInfo.Description
		                }
		            ]
		        }
		    },
		methods:{
			csplitTag: function(tag) {
				if (typeof(tag) == "object") {
					return
				} else {
					let tags = tag.split("#")
					tags.splice(0, 1)
					return tags
			
				}
			
			}
			
		},
		created() {
			document.title = this.head
			
			//Store.getChapterList()

			this.axios({
					method: 'get',
					url: 'https://2shm.xyz/mh/getChapter',
					params: {
						UUID: this.$route.query.uuid
					}
				}).then(response => {
					let info = response.data;
					
					for (let key in info) {
						this.info.push(JSON.parse(info[key]))
						//alert(info[key])

					}
					//Store.setChapterList(this.info)
					window.sessionStorage.setItem("chapterlist",JSON.stringify(info))
					this.loading=false
				}).catch(function(error) {
					if (error.response) {
						// The request was made and the server responded with a status code
						// that falls out of the range of 2xx
						console.log(error.response.data);
						console.log(error.response.status);
						console.log(error.response.headers);
					} else if (error.request) {
						// The request was made but no response was received
						// `error.request` is an instance of XMLHttpRequest in the browser and an instance of
						// http.ClientRequest in node.js
						console.log(error.request);
					} else {
						// Something happened in setting up the request that triggered an Error
						console.log('Error', error.message);
					}
					console.log(error.config);
				}),
				
				this.axios({
					method: 'get',
					url: 'https://2shm.xyz/mh/getCarousel',
					params: {
						UUID: this.$route.query.uuid
					}
				}).then(getCarousel => {
					this.carousel = getCarousel.data;
				}).catch(function(error) {
					if (error.response) {
						// The request was made and the server responded with a status code
						// that falls out of the range of 2xx
						console.log(error.response.data);
						console.log(error.response.status);
						console.log(error.response.headers);
					} else if (error.request) {
						// The request was made but no response was received
						// `error.request` is an instance of XMLHttpRequest in the browser and an instance of
						// http.ClientRequest in node.js
						console.log(error.request);
					} else {
						// Something happened in setting up the request that triggered an Error
						console.log('Error', error.message);
					}
					console.log(error.config);
				}),
				this.axios({
					method:'get',
					url:'https://2shm.xyz/mh/getBookInfo',
					params:
					{
						UUID:this.$route.query.uuid
					}
				}).then(response=>{
					this.bookInfo=response.data
					console.log(this.bookInfo)
				}).catch(function(error) {
					if (error.response) {
						// The request was made and the server responded with a status code
						// that falls out of the range of 2xx
						console.log(error.response.data);
						console.log(error.response.status);
						console.log(error.response.headers);
					} else if (error.request) {
						// The request was made but no response was received
						// `error.request` is an instance of XMLHttpRequest in the browser and an instance of
						// http.ClientRequest in node.js
						console.log(error.request);
					} else {
						// Something happened in setting up the request that triggered an Error
						console.log('Error', error.message);
					}
					console.log(error.config);
				})
		},
	}
</script>

<style scoped>
	.el-header,
	.el-footer {
		background-color: #B3C0D1;
		color: #333;
		text-align: center;
		height: 100px;

	}

	.logo {
		position: absolute;
		top: 10;
		left: 10px;
		height: 60px;
	}

	.el-image {
		border-radius: 10px;
	}

	.el-row {
		display: flex;
		margin-bottom: 20px;
	}

	.el-main {
		background-color: #FFFFFF;
		width: 100%;
	}
</style>
