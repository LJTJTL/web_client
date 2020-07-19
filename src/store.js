var Store={
	data:{
		chapterList:[]
	},
	
	setChapterList(chapter){
		this.data.chapterList=chapter
		console.log(this.data.chapterList)
	},
	clearChapterList(){
		this.data.chapterList.length=0
	},
	getChapterList(){
		console.log(this.data.chapterList)
		return this.data.chapterList
		
	}
};

export default Store;