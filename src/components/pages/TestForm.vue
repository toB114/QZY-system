<template>
	<h1>TestForm</h1>
	<el-form style="width: 400px;" label-width="120px" ref="ruleFormRef" :model="ruleForm" :rules="rules">
		<el-form-item label="姓名" prop="name">
			<el-input v-model="ruleForm.name"></el-input>
		</el-form-item>
		<el-form-item label="身份证号码" prop="IdCard">
			<el-input v-model="ruleForm.IdCard"></el-input>
		</el-form-item>
		<el-form-item label="年龄" prop="age">
			<el-select v-model="ruleForm.age">
				<el-option label="18" value="18"></el-option>
				<el-option label="19" value="19"></el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="性别:" prop="sex">
			<el-radio-group v-model="ruleForm.sex">
				<el-radio label="男" value="1"></el-radio>
				<el-radio label="女" value="0"></el-radio>
			</el-radio-group>
		</el-form-item>
		<el-form-item>
			<el-button type="primary" @click="subForm">提交</el-button>
			<el-button type="default" @click="resetForm">重置</el-button>
		</el-form-item>
	</el-form>
</template>

<script>
	//导入vue中的reactive和ref函数(响应式)
	import {
		reactive,
		ref
	} from 'vue'

	//创建表单函数模型
	const ruleForm = {
		name: '张三',
		IdCard: '',
		age: '',
		sex: ''
	};
	import axios from '@/plugins/axiosinstance.js';
	import {
		reg_name
	} from '../common/regex.js'
	const checkName = async (rule,value,callback) => {
		await axios.get('CheckNameServlet',{
			params:{
				name:value
			}
		}).then((response)=>{
			if(response.data.result == "1"){
				callback(new Error("用户名重复！"));
			}
		});
		
	};

	const rules = {
		name: [{
				required: true,
				message: '必填',
				trigger: 'blur'
			},
			{
				asyncValidator: checkName,
				trigger: 'blur'
			}

		],
		IdCard: [{
			required: true,
			pattern: /^(([1-9][0-9]{5}(19|20)[0-9]{2}((0[1-9])|(1[0-2]))([0-2][1-9]|10|20|30|31)[0-9]{3}([0-9]|X|x))|([1-9][0-9]{5}[0-9]{2}((0[1-9])|(1[0-2]))([0-2][1-9]|10|20|30|31)[0-9]{3}))$/,
			message: '输入正确的身份证号码',
			trigger: 'blur'
		}],
		age: [{
			required: true,
			message: '必须选择一个年龄',
			trigger: 'change'
		}],
		sex: [{
			required: true,
			message: '选择至少一个',
			trigger: 'change'
		}]
	};

	export default {
		name: 'TestForm',
		data() {
			return {
				ruleForm,
				rules
			}
		},
		methods: {
			subForm() {
				this.$refs.ruleFormRef.validate((valid) => {
					if (!valid) {

						return false;
					} else {
						// //发送异步请求，验证用户名和密码
						// await axios.post("CheckUserServlet",ruleForm).then(
						// 	(response)=>
						// )
						return true;
					}
				});
			},
			resetForm() {
				this.$refs.ruleFormRef.resetFields();
			}
		}
	};
</script>

<style>
</style>
