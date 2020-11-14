exports.counts = function (students) {
  students[0].u_NoType = null
  if (students[0].u_Type == '学生') {
    students[0].u_Name = students[0].u_Name + "同学"
    students[0].u_NoType = "学号"
    // console.log(students[0])
  } else {
    students[0].u_Name = students[0].u_Name + "老师"
    students[0].u_NoType = "工号"
  }
  return students
}