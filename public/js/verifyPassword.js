
$(function () {
    var pass1=0;
    var pass2=0;
    var userNo=null;


    $("#originalPassword").blur(function () {
        let p=$("#originalPassword").val();
        if(p){
            userNo=$("#userNo").val()
            const xhr=new XMLHttpRequest()
            xhr.open('get','/students/verification?userNo='+userNo+'&p='+p)

            // xhr.send("userNo="+userNo+"")
            xhr.send()
            console.log(userNo)
            xhr.onreadystatechange=function () {
                console.log(xhr.readyState)
                if (xhr.readyState===4){
                    if (xhr.status>=200&&xhr.status<300){
                        // console.log(xhr.status)
                        // console.log(xhr.statusText)
                        // console.log(xhr.getAllResponseHeaders())

                        if (xhr.response=='false'){
                            // console.log(xhr.response)
                            $(".information").html("密码错误").css("color","red");
                        }else{
                            $(".information").html("")
                        }
                    }
                }
            }
        }
    })

    $("#exampleInputEmail1").blur(function () {
        let p=$("#exampleInputEmail1").val();
        if(p){
            pass1=p;
            console.log(pass1);
        }
    })
    $("#exampleInputPassword1").blur(function () {
        let p=$("#exampleInputPassword1").val();
        if(p){
            pass2=p;
            console.log(pass2);
            if(pass1==pass2){
                $("#information2").html("");
                $("#newpass").val(pass2);
            }else{
                $("#information2").html("密码不一致").css("color","red");
            }
        }
    })

    $("#goBack").click(function () {
        history.go(-1);
    })
})