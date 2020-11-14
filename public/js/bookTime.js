
$(function () {
    $(".Books").each(function () {
        let bTime=parseInt($(this).find(".text-muted>.countDown").html());
        // 判断距离还书时间是否小于7天
        if (bTime<=7){
            $(this).find(".text-muted>.countDown").css("color","red");
        }
        // 判断是否逾期
        if (bTime<0){
            $(this).find(".borrowingBooks").css("display","block");
        }
    })
    // var bTime=parseInt($(".countDown").html());
    // 判断距离还书时间是否小于7天
    // if (bTime<=7){
    //     $(".countDown").css("color","red");
    // }
    // console.log(bTime);
    // console.log(typeof(bTime));
    // 判断是否逾期
    // if (bTime<0){
    //     $(".borrowingBooks").css("display","block");
    // }
})