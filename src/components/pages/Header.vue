<template>
	<div class="header">
		<!-- 折叠按钮 -->
		<div class="collapse-btn" @click="changeCollpase">
			<el-icon :size="size">
				<fold v-if="collpase"/>
				<expand v-else/>
			</el-icon>
		</div>
		<div class="logo">曲职院管理系统</div>
		<div class="school-logo">
			<img src="../../assets/qzy.png">
		</div>
		<div class="header-right">
			<div class="header-user-con">
				<div class="btn-fullscreen" @click="changeFullScreen">
					<el-tooltip class="box-item"
					        effect="dark"
					        :content="fullScreen ?'取消全屏'  :'全屏显示' "
					        placement="bottom">
						<el-icon :size="size"><rank /></el-icon>
					</el-tooltip>
				</div>
				<div class="btn-bell">
					<el-tooltip
							effect="dark"
							:content="message?'有'+message+'条消息':'消息中心'"
							placement="bottom">
						<el-icon :size="size"><bell /></el-icon>

					</el-tooltip>
					<span class="btn-bell-babge" v-if="message"></span>
				</div>
				<!-- 用户头像 -->
				<div class="user-avator">
				<!-- <el-avatar :size="50" :src="circleUrl" />
								-->			
					<img src="../../assets/200.png" >
				</div>
				<div class="btn-user-info">
					<el-dropdown trigger="click" @command="doItem">
						<span style="color: #FFF;">admin<el-icon style="top: 3px; cursor: pointer;"><caret-bottom /></el-icon></span>
						<template #dropdown>
							<el-dropdown-menu>
								<el-dropdown-item command="xmck">项目仓库</el-dropdown-item>
								<el-dropdown-item divided command="loginout">退出登陆</el-dropdown-item>
							</el-dropdown-menu>
						</template>
					</el-dropdown>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {computed, onMounted} from 'vue';
	import {useStore} from 'vuex';
	import { useRouter } from "vue-router";
	export default{
		name:'Header',
		setup(){
			const store = useStore();
			const collpase = computed(()=>store.state.collpase);
			return {
				collpase,store
			}
		},
		data(){
			return{
				//collpase:false,
				fullScreen:false,
				message:0,
				
				size:30
			}
		},
		methods:{
			//侧边栏折叠事件
			changeCollpase(){
				//改变collapse的值，控制展开按钮图标的形式
				this.store.commit('controllCollpase',!this.collpase);
				//更改侧边栏
				//this.$emit("control");
			},
			//全屏事件
			changeFullScreen(){
				let htmlElement = document.documentElement;
				//判断组件FullScreen属性值，false全屏，true取消全屏
				console.log(htmlElement)
				if(this.fullScreen){//取消全屏
					if (document.exitFullscreen) {
					  document.exitFullscreen();
					 } else if (document.mozCancelFullScreen) {
					  document.mozCancelFullScreen();
					 } else if (document.webkitCancelFullScreen) {
					  document.webkitCancelFullScreen();
					 } else if (document.msExitFullscreen) {
					  document.msExitFullscreen();
					 }
				}else{//打开全屏
					 if (htmlElement.requestFullscreen) {
				       htmlElement.requestFullscreen();
				      } else if (htmlElement.mozRequestFullScreen) {
				       htmlElement.mozRequestFullScreen();
				      } else if (htmlElement.webkitRequestFullScreen) {
				       htmlElement.webkitRequestFullScreen();
				      } else if (htmlElement.msRequestFullscreen) {
				       htmlElement.msRequestFullscreen();
				      }
				}
				//改变fullScreen的值
				this.fullScreen = !this.fullScreen;
			},
			doItem(command){
				if(command == "loginout"){
					this.$router.push("/");
				}
			}
		}
	}
</script>

<style>
	.header{
		position: relative;
		box-sizing: border-box;
		width: 100%;
		height: 70px;
		font-size: 22px;
		background-color: #73767a;
		color: #fff;
	}
	
	.collapse-btn{
		float: left;
		padding: 7px 21px;
		padding-left: 20px;
		cursor: pointer;
		line-height: 70px;
		
	}
	
	.header .logo{
		line-height: 70px;
		float: left;
		margin-left: 10px;
		
	}
	.logo{
		position: absolute;
		left: 125px;
	}
	
	.header-right{
		float: right;
		
		padding-right: 50px;
	}
	
	.header-user-con{
		display: flex;
		height: 70px;
		align-items: center;
	}
	
	.btn-fullscreen{
		margin-right: 5px;
		transform: rotate(45deg);
		cursor: pointer;
	}
	
	.btn-bell{
		margin: 0px 10px 0px 10px;
		position: relative;
		cursor: pointer;
		
	}
	
	.btn-bell-babge{
		position: absolute;
		height: 8px;
		width: 8px;
		background-color: #f00;
		border-radius: 4px;
		right: 0;
	}
	
	.user-avator{
		margin-left: 10px;
	}
	.user-avator>img{
		width: 40px;
		height: 40px;
		border-radius: 20px;
	}
	
	.btn-user-info{
		margin-left: 10px;
	}
	
	.school-logo{
		margin-left: 20px;
		margin-right: 20px;
		margin-top: 10px;
		position: absolute;
		left: 45px;
		top: 1px;
		
	}
	
	.school-logo>img{
		width: 50px;
		height: 50px;
		border-radius: 25px;
	}
</style>
