$(function () {
  $('#h_End').on("blur",function () {
    console.log($('#h_End').val())
    var start = $('#h_Start').val();
    var end = $('#h_End').val()
    // 计算两个时间有多少天
    var result = datedifference(start,end)
    $('#h_Day').val(result)
    
  });

  })


//两个时间相差天数 
function datedifference(sDate1, sDate2) {    //sDate1和sDate2是2006-12-18格式  
  var dateSpan,
    tempDate,
    iDays;
  sDate1 = Date.parse(sDate1);
  sDate2 = Date.parse(sDate2);
  dateSpan = sDate2 - sDate1;
  dateSpan = Math.abs(dateSpan);
  iDays = Math.floor(dateSpan / (24 * 3600 * 1000));
  return iDays
};