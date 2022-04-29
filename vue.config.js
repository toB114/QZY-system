const { 
	defineConfig
	 } = require('@vue/cli-service')
const AutoImport = require('unplugin-auto-import/webpack') 
const Components = require('unplugin-vue-components/webpack')
const { 
	ElementPlusResolver
	 } =require('unplugin-vue-components/resolvers')
//const webpack = require()
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,//取消语法检查
  configureWebpack:{
	  plugins: [
	      AutoImport({
	        resolvers: [ElementPlusResolver()],
	      }),
	      Components({
	        resolvers: [ElementPlusResolver()],
	      }),
	    ],
  }
  
})
