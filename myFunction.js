// 判断用户的身份并计算剩余的还书时间
exports.counts=function (students,borrows) {
    students[0].u_NoType=null
    if (students[0].u_Type=='学生'){
        students[0].u_Name=students[0].u_Name+"同学"
        students[0].u_NoType="学号"
        // console.log(students[0])
    }else {
        students[0].u_Name=students[0].u_Name+"老师"
        students[0].u_NoType="工号"
        // console.log(students[0])
    }
    // 获取当前时间
    let datas=students[0].datas

 
    for (let i=0;i<borrows.length;i++){
        let countDown=new Date(borrows[i].ret_Time).getTime()-datas

        borrows[i].countDown=parseInt((((countDown/1000)/60)/60)/24)
    }

    return {students,borrows}
}

exports.adminFunction = function (admin) {
    admin
}

// 计算假期时间是否与还书时间冲突
exports.holidayTime=function (students,holidays,borrows) {
    let datas=new Date().getTime()
    students[0].datas=datas
    for (let i=0;i<holidays.length;i++){
        let holidayStart=new Date(holidays[i].h_Start).getTime()
        let holidayEnd=new Date(holidays[i].h_End).getTime()

        // 判断假期是否在之后
        if (datas-holidayStart<0 || datas-holidayEnd<86400000){
            // 循环判断还书时间是否在假期内或者在假期之后
            for (let j=0;j<borrows.length;j++){
                let ret_Time=new Date(borrows[j].ret_Time).getTime()
                if (ret_Time-holidayStart>=0&&ret_Time-holidayEnd<=86400000){
                    let times=new Date(holidayEnd+86400000)
                    borrows[j].ret_Time=times.getFullYear()+"-"+(times.getMonth()+1)+"-"+times.getDate()
                }
            }

        }
    }

    return {students,borrows}
}
