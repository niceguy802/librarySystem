function getCookie(userCode) {
  var contentKey = userCode;
  var arr = document.cookie.match(new RegExp("(^| )" + contentKey + "=([^;]*)(;|$)"));
  if (arr != null) {
    return decodeURI(arr[2]);
  } else {
    return null;
  }
}

window.onload = function () {
  // let userName = getCookie('userName')
  userName = window.sessionStorage.getItem("userName");
  document.querySelector("#userName").innerText =userName;
}
