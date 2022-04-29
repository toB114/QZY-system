<template>
 <div class="wrapper">
 	<Header></Header>
	<SideBar></SideBar>
	<div class="container-box" :class="{'container-box-left':isContainerLeft}">
		<v-tags></v-tags>
		<div class="content">
			<router-view v-slot="{Component}">
				<transition name="move" mode="out-in">
					<keep-alive include="tagsList">
						<component :is="Component"></component>
					</keep-alive>
				</transition>
			</router-view>
			<el-backtop target=".content"></el-backtop>
		</div>
	</div>
  </div>
</template>

<script>
	import Header from './Header.vue';
	import SideBar from './SideBar.vue';
	import VTags from './VTags.vue';
	import {computed, onMounted} from 'vue';
	import {useStore} from 'vuex';
	export default{
		name:'Main',
		setup(){
			const store = useStore();
			const isContainerLeft = computed(()=>store.state.collpase);
			//const showTags = computed(()=>store.state.tagList.length>0)
			return {
				isContainerLeft,
				//showTags
			}
			
		},
		data(){
			return{
				//isContainerLeft:false,//控制正文div是否向左边移动
				//tagsList:[]
			}
		},
		components:{
			Header,
			SideBar,
			VTags
		},
		methods:{
		}
	}
</script>

<style>
	.container-box{
		position: absolute;
		/* width: 80.5%; */
		height: 100vh;
		background-color: #e9e9eb;
		top:70px;
		left: 300px;
		right: 0;
		bottom: 0;
		padding-bottom: 30px;
	}
	
	.container-box-left{
		left: 60px;
	}
	
	.content{
		width: auto;
		height: 100%;
		/* padding: 10px; */
		box-sizing: border-box;
		overflow-y: scroll;
	}
</style>
