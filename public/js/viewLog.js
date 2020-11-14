$(function () {
  var pageNum = $('#pageNum').val();
  // console.log(pageNum)
  var htmlLet = "";
  for (var i = 1; i <= pageNum;i++){
    htmlLet += "<li><a class='btn btn -default' role='button' href='/superManager/viewLog?page="+i+"'>"+i+"</a></li>";
  }
  $('#pageList').html(htmlLet)


})
