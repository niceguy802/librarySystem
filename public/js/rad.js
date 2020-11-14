function send() {
  var u_Name = document.getElementById("u_Name").value;
  var u_Password = document.getElementById("u_Password").value;
  var rads = document.getElementsByName("rad");
  window.sessionStorage.setItem('userName',u_Name)
  var u_Rad = "";
  for (var i = 0; i < rads.length; i++) {
    if (rads[i].checked) {
      u_Rad = rads.value;
    }
  }

  var xmlhttp;
  if (window.XMLHttpRequest) {
    xmlhttp = new XMLHttpRequest();
  } else {
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }

  var url = "ceshi?u_Name=" + u_Name + "&u_Password=" + u_Password + "&u_Rad=" + u_Rad;
  xmlhttp.open("post", url, true);
  xmlhttp.send();

  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      var responseText = xmlhttp.responseText;
      alert(responseText);
    }
  };
}
window.onload = function () { 
  let submitBtn = document.querySelector("#submit");
  submitBtn.addEventListener('click',function(){
    send()
  })
}