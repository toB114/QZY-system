<template>
<!-- 	<h1>SideBar</h1>
 -->
 <div class="sidebar-left">
	 <el-menu class="sidbar-menu"
		:default-active="onRoutes"
		background-color="#909399"
		text-color="#fff"
		active-text-color="#000"
		:collapse-transition="collpase"
		:collapse="collpase"
		:unique-opened="true"
		:router="true"
		>
		<template v-for="item in items">
			<template v-if="item.subs">
				<el-sub-menu :index="item.index">
					<template #title>
						<component :is="item.icon" :class="iconClass"></component>
						<span>{{item.title}}</span>
					</template>
					<el-menu-item-group>
						<template v-for="subItem in item.subs">
							<el-menu-item :index="subItem.index">{{subItem.title}}</el-menu-item>
						</template>
					</el-menu-item-group>
				</el-sub-menu>
			</template>
			<template v-else>
				<el-menu-item :index="item.index">
					<component :is="item.icon" :class="iconClass"></component>
					<template #title>
						{{item.title}}
					</template>
				</el-menu-item>
			</template>
		</template>
		
	 </el-menu>
 </div>
</template>

<script>
	import {computed, onMounted} from 'vue';
	import {useStore} from 'vuex';
	import { useRouter } from "vue-router";
	export default{
		name:'SideBar',
		setup(){
			const onRoutes = computed(() => {
			    return route.path;
			});
			const store = useStore();
			const collpase = computed(() => {return store.state.collpase});
			return {
				collpase
			}
		},
		data(){
			return{
				//collapse:false,
				iconClass:"sidbar-icon",
				
				items:[
					{
						title:"系统首页",
						index:"1",
						icon:'HomeFilled'
					},
					{
						title:"用户管理",
						index:"2",
						icon:'User'
					},
					{
						title:"学生管理",
						index:"3",
						icon:'User-filled',
						subs:[
							{
								title:"学生信息管理",
								index:"3-1"
							},
							{
								title:"学生请假管理",
								index:"3-2"
							}
						]
					},
					{
						title:"教师管理",
						index:"4",
						icon:'Avatar',
						subs:[
							{
								title:"教室信息管理",
								index:"4-1"
							}
						]
					},
					{
						title:"疫情管控",
						index:"5",
						icon:'Aim',
						subs:[
							{
								title:"疫情政策",
								index:"5-1"
							},
							{
								title:"监控信息管理",
								index:"5-2"
							}
						]
					}
				]
			}
		}
	}
</script>

<style>
	.sidebar-left{
		width: 300px;
		position: absolute;
	}
	.sidbar-menu{
		height: 100vh;
	}
	.sidbar-icon{
		width: 30px;
		height: 30px;
		margin: 0 5px;
	}
</style>
