<template>
	<h1>TestForm</h1>
	<el-form style="width:400px;" label-width="120px" ref="ruleFormRef" :model="ruleForm" :rules="rules">
		<el-form-item label="姓名:" prop="name">
			<el-input v-model="ruleForm.name"></el-input>
		</el-form-item>
		<!--<el-form-item label="年龄:" prop="age">
			<el-select v-model="ruleForm.age">
				<el-option label="18岁" value="18"></el-option>
				<el-option label="19岁" value="19"></el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="性别:" prop="sex">
			<el-radio-group v-model="ruleForm.sex">
				<el-radio label="男" value="1"></el-radio>
				<el-radio label="女" value="0"></el-radio>
			</el-radio-group>
		</el-form-item>
		<el-form-item label="数字:" prop="num">
			<el-input v-model="ruleForm.num"></el-input>
		</el-form-item> -->
		<el-form-item label="座机:" prop="tel">
			<el-input v-model="ruleForm.tel"></el-input>
		</el-form-item>
		<el-form-item>
			<el-button type="primary" @click="subForm">提交</el-button>
			<el-button type="default" @click="resetForm">重置</el-button>
		</el-form-item>
	</el-form>
</template>

<script>
	/*创建表单数据模型对象*/
	const ruleForm = {
		name: "张三",
		// age: "",
		// sex: "",
		// num: 0,
		tel: ""
	};
	import {
		reg_name
	} from "@/common/regex.js"

	// import axios from 'axios'

	/*创建表单验证规则对象*/

	const checkTel = (rule, value, callback) => {
		if (!value || value.length == 0) {
			callback(new Error("座机不能为空！"))
		} else if (value.split("-").length != 2) {
			callback(new Error("座机格式不对！"))
		}
	};

	import axios from '@/plugins/axiosinstance.js';
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
		name:[
			{required:true,message:"用户名必须填写！",trigger:"blur"},
			{asyncValidator:checkName,trigger:"blur"}
		],
		tel: [{
			validator: checkTel,
			trigger: "blur"
		}]

	};



	export default {
		name: "TestForm",
		data() {
			return {
				ruleForm,
				rules

			}
		},
		methods: {
			subForm() {
				console.log(this.$refs.ruleFormRef)
				this.$refs.ruleFormRef.validate((valid) => {
					if (!valid) {
						console.log('wrong')
						return false;
					} else {
						return true;
					}
				});
			},
			resetForm() {
				this.$refs.ruleFormRef.resetFields();
			}

		}

	}
</script>

<style>
</style>
