<template>
	<div class="login-container">
		<el-card class="login-card box-card">
			<div class="login-title">曲职院管理系统</div>
			<el-form ref="loginForm" :model="param">
				<el-form-item prop="user">
					<el-input placeholder="请输入用户名" v-model="param.user">
						<template #prepend>
							<el-button>
								<el-icon>
									<user />
								</el-icon>
							</el-button>
						</template>
					</el-input>
				</el-form-item>
				<el-form-item prop="pass">
					<el-input type="password" v-model="param.pass">
						<template #prepend>
							<el-button>
								<el-icon>
									<unlock />
								</el-icon>
							</el-button>
						</template>
					</el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" class="sub-btn" @click="subLogin">登录</el-button>
					<el-button type="info" class="login-btn" @click="loginUser">注册</el-button>
				</el-form-item>
			</el-form>
		</el-card>
	</div>
</template>

<script>
	export default {
		name: 'MyLogin',
		data() {
			return {
				param: {
					user: "",
					pass: ""
				}
			}
		},
		methods: {
			subLogin() {
				this.$axios.post("CheckUserServlet", this.param).then(
					(reponse) => {
						if (reponse.data.result == "1") {
							this.$router.push("/main");
						} else {
							//错误提示
							ElMessage('错误，重新填写');
							this.$refs.loginForm.resetFields();
						}
					}
				);
				//this.$router.push('/main');
			},
			loginUser(){
				this.$router.push('/TestForm');
			}
		}
	}
</script>

<style>
	.login-container {
		background-color: #fff;
		height: 100vh;
		background-image: url(../../assets/bg-img.jpg);
		background-repeat: no-repeat;
		background-size: 100%;
		position: relative;
	}

	.login-card {
		position: absolute;
		width: 400px;
		height: 300px;
		left: 35%;
		top: 25%;
		background-color: rgba(255, 255, 255, 0.5) !important;

		/* box-shadow: gray; */

	}

	.login-title {
		width: 100%;
		height: 30px;
		text-align: center;
		color: white;
		font-size: 25px;
		line-height: 30px;
		margin: 0px 0px 20px 0px;
	}

	.sub-btn {
		width: 100%;
	}
	.login-btn{
		width: 100%;
		margin-top: 20px;
		margin-left: 0px !important;
		
	}
</style>
