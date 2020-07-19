<template>
	<el-container v-loading="loading" element-loading-text="拼命加载中"
		element-loading-spinner="el-icon-loading"
		element-loading-background="rgba(0, 0, 0, 0.8)">
		<el-header>
			<img src="./assets/logo.png" class="logo">
			<h1>韩漫</h1>
		</el-header>
		<el-main >
			<div id="app">
				<div id="view">
					<div id="content" v-for="(i,index) in info ">
						<hr />
						<!--<a id="url" :href ="i.UUID" style="font-weight: bolder;">-->
						<router-link :to="{path:'/book/',query:{uuid:i.UUID,bookname:i.BookName}}">
							<el-row :gutter="10">
								<el-col :span="1">
									<div class="grid-content bg-purple">{{index}}</div>
								</el-col>
								<el-col :span="2">
									<div class="grid-content bg-purple">

										<img v-lazy="'https://2shm.xyz/static/cover/'+i.cover" width="72px" style="border-radius:10px;">
										<div style="font-size: 14px;">
											<el-tag>{{i.BookName}}</el-tag>
										</div>

									</div>
								</el-col>
								<el-col :span="3">
									<div class="grid-content bg-purple-light">
										作者：{{i.Author}}</br></br>
										{{i.Status}}</br></br>
										<font style="color:#e73844">★</font>{{i.rate}}</br></br>
										共：{{i.NowChapter}} 话</br></br>
									</div>
								</el-col>
								<el-col :span="18">
									<div class="grid-content bg-purple-light-D">
										<p>{{i.Description}}</p>
										</br><br>
										<div class='tag'>
											<el-tag type="success" v-for='tag in csplitTag(i.tag)'>{{tag}}</el-tag>
										</div>

									</div>
								</el-col>
							</el-row>
						</router-link>
						<!--</a> -->
					</div>
				</div>
			</div>
		</el-main>
		<el-footer>
			<div>
				<a href="http://xiaoshuo8.xyz">免费小说</a>
			</div>
		</el-footer>
	</el-container>
</template>

<script>
	export default {
		data() {
			return {
				info: [],
				url: 'https://2shm.xyz/static/cover.jpg',
				loading:true
			}
		},
		created() {
			document.title = "免费 韩漫 爱看韩漫"
			console.log("created...")
			this.getBookList()
			
		},
		methods: {
			
			getBookList:function(){
				let booklist=window.sessionStorage.getItem("BookList")
				if (booklist==null)
				{
					this.axios({
						method: 'get',
						url: 'https://2shm.xyz/mh/getBookList'
					}).then(response => {
						let info = response.data;
						this.loading=false
						window.sessionStorage.setItem("BookList",JSON.stringify(info))
						//alert(info);
						console.log("booklist...")
						for (let key in info) {
							this.info.push(JSON.parse(info[key]))
						}
					
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
				}
				else
				{
					this.loading=false
					let jbooklist=JSON.parse(booklist)
					for (let key in jbooklist)
					{
						this.info.push(JSON.parse(jbooklist[key]))
					}
				}

				
			},
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
	}
</script>

<style scoped>


	.logo {
		position: absolute;
		top: 10;
		left: 10px;
		height: 60px;
	}

	.el-row {
		margin-bottom: 20px;

		&:last-child {
			margin-bottom: 0;
		}
	}

	.el-col {
		border-radius: 4px;
	}

	.bg-purple-dark {}

	.bg-purple {
		text-align: left;
		line-height: 20px;
		color: #000000;
	}

	.bg-purple-light {
		text-align: left;
		font-size: 12px;
		color: #000000;
	}

	.bg-purple-light-D {
		text-align: left;
		font-size: 14px;
		color: #000000;
	}

	.grid-content {
		border-radius: 4px;
		min-height: 1px;

	}

	.row-bg {
		padding: 10px 0;
		background-color: #f9fafc;
	}

	.el-header,
	.el-footer {
		background-color: #B3C0D1;
		color: #333;
		text-align: center;
		line-height: 20px;
		height: 100px;
	}

	.url {
		display: block;

	}

	.el-image {
		border-radius: 10px;
		width: 72px;

	}

	.tag {
		color: #ff0000;
	}

	.img {
		width: 72px;
		border-radius: 10px;
	}
</style>
