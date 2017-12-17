##requrieP

##该插件是讲requirejs中的require转换成类似promise语法
  使用在webpack打包下进行异步加载  

## 使用
````
    //通用
    requireP(['jquery:$','Vue']).then(function(lib){
        var $ = lib.$;
        var Vue = lib.Vue;
    })

   //AMD
   require(['requireP'],function(requireP){
         let testComponet = async function (resolve) {
             resolve(await requireP('test'));
         };
   })  
   
   //commonJs
   const requireP = require('requireP');
   
   async function test (){
        let Vue = await requireP('Vue') 
   }
   
   test()
   
   //使用数组别名
   async function test2(){
        let {Vue,$} = await requireP(['Vue','jquery:$'])
   }
   
   test2()
````