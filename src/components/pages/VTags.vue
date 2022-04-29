<template>
	<div class="tags" v-if="showTags">
		<ul class="tags-ul">
			<il v-for="(item,index) in tagList" class="tags-li"  :class="{'active': isActive(item.path)}" :key="index">
				<router-link :to="item.path" class="tags-li-title">{{item.title}}</router-link>
				<span @click="closeTags(index)">
					<el-icon calss="tags-li-icon"><close /></el-icon>
				</span>
			</il>
		</ul>
	</div>
</template>

<script>
	import {computed, onMounted} from 'vue';
	import {useStore} from 'vuex';
	import { onBeforeRouteUpdate, useRoute, useRouter } from "vue-router";

	export default{
		name:"VTags",
		setup(){
			const route = useRoute();
			const router = useRouter();
			const store = useStore();
			const showTags = computed(()=>store.state.tagList.length>0);
			const tagList = computed(()=>store.state.tagList);
			const isActive = (path) => {
			    return path == route.fullPath;
			};
			
			const setTags = (route)=>{ //设置标签
				const isExist =tagList.value.some((item)=>{
					return item.path === route.fullPath;
					console.log(tagList.value.length);
				});
				if(!isExist){
					//判断tagList的长度是否超过8，如果是，删除第一个元素
					if(tagList.value.length >= 8){
						store.commit("delFirstTag",{index:0});
					}
					//给数组末尾添加新元素
					store.commit("appendTag",{
						name: route.name,
						path: route.fullPath,
						title: route.meta.title,
					});
				}
			};
			
			//关闭标签
			const closeTags = (index) => {
			    const delItem = tagList.value[index];
			    store.commit("delTagsItem", { index });
			    const item = tagList.value[index]
			        ? tagList.value[index]
			        : tagList.value[index - 1];
			    if (item) {
			        delItem.path === route.fullPath && router.push(item.path);
			    } else {
			        router.push("/");
			    }
			};
			
			
			setTags(route);
			onBeforeRouteUpdate((to) => {
			    setTags(to);
			});
			
			return{
				showTags,
				tagList,
				isActive,
				closeTags
			}
		},

	}
</script>

<style>
	.tags{
		position: relative;
		overflow: hidden;
		height: 30px;
	}
	.tags-ul {
	    /* float: left; */
	}
	.tags-li{
		position: absolute;
		/* float: left; */
		margin: -15px 5px 2px 3px;
		border-radius: 3px;
		font-size: 12px;
		overflow: hidden;
		cursor: pointer;
		height: 27px;
		line-height: 23px;
		border: 1px solid #666;
		background-color: #c8c9cc;
		padding: 0 5px 0 12px;
		vertical-align: middle;
		color: #FFF;
		box-shadow: 0 5px 10px #1D1E1F;
		-webkit-transition: all 0.3s ease-in;
		-moz-transition: all 0.3s ease-in;
		transition: all 0.3s ease-in;
		display: inline;
		
	}
	
	 .tags-li.active{
		background-color: #606266;
	}	
	
	.tags-li.active .tags-li-title {
	    color: #fff;
	}
	
	.tags-li-title {
	    float: left;
	    max-width: 80px;
	    overflow: hidden;
	    white-space: nowrap;
	    text-overflow: ellipsis;
	    margin-right: 5px;
		margin-top: 2px;
	    color: #666;
		text-decoration:none;
	}
	
	.tags-li-icon{
		
	}
</style>
