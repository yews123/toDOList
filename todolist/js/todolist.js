$(function(){
    load();
    //1.按下回车 把完整的数据 存储到本地存储里面
    //存储数据的格式 var todolist=[{title:"xxx",done:false}]
    $("#title").on("keydown",function(event){
        if(event.keyCode===13){
            if($(this).val()===""){
                alert("请输入您要的操作");
            }else{
                //先读取本地存储原来的数据
                var local =getDate();
                //把local数组进行跟新数据，把最新的数据追加给local数组
                local.push({title:$(this).val(),done:false})
                //把这个数组local 存储给本地存储
                saveDate(local);
                load();
                $(this).val("");
            }
        }
    })

    //3.todolist删除操作
    $("ol,ul").on("click","a",function(){
        //先获取本地存储
        var data=getDate();
        //修改数据
        var index=$(this).attr("id");
        console.log(index);
        data.splice(index,1);
        //保存到本地存储
        saveDate(data);
        //重新渲染页面
        load();

    })

    //4.todolist 正在进行和已完成选项的操作
    $("ol, ul").on("click","input",function(){
        //先获取本地存储的数据
        var data=getDate();
        //修改数据
        var index=$(this).siblings("a").attr("id");
        console.log(index);
        //data[?].done=?
        data[index].done=$(this).prop("checked");
        console.log(data);
        //保存到本地存储
        saveDate(data);
        //重新渲染页面
        load();
    })

    //读取本地存储的数据 
    function getDate(){
        var data = localStorage.getItem("todolist");
        if(data!==null){
            //本地存储里面的数据是字符串格式的，但我们需要的是对象格式的
            return JSON.parse(data);
        }else{
            return [];
        }
    }


    //保存本地存储数据
    function saveDate(data){
        localStorage.setItem("todolist",JSON.stringify(data));
    }


    //渲染加载数据
    function load(){
        //读取本地存储的数据
        var data=getDate();
        console.log(data);
        //遍历之前先要清空ol ul里面的元素内容
        $("ol,ul").empty();
        var donecount=0;//统计已完成的个数
        var todocount=0;//统计正在进行的个数
        //遍历这个数据
        $.each(data,function(i,n){
            if(n.done){
                $("ul").prepend("<li><input type='checkbox' checked='checked'> <p>"+n.title+"</p> <a href='javascript:;' id="+i+">删除</a> </li>");
                donecount++;
            }
            else{
                $("ol").prepend("<li><input type='checkbox'> <p>"+n.title+"</p> <a href='javascript:;' id="+i+">删除</a> </li>");
                todocount++;
            }
        })
        $("#donecount").text(donecount);
        $("#todocount").text(todocount);
    }
})