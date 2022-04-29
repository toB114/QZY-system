import { createStore } from 'vuex';
export default createStore({
	state:{
		tagList:[],//标签栏中的标签信息
		collpase:false//控制header图标切换和侧边栏收缩，正文展开样式
	},
	mutations:{
		//控制状态行为，根据传入data数据更改collpase的值
		controllCollpase(state,data){
			state.collpase = data;
		},
		//删除第一个Tag
		delTagsItem(state,data){
			state.tagList.splice(data.index,1);
		},
		//在末尾新增标签
		appendTag(state,data){
			state.tagList.push(data);
		}
	}
});