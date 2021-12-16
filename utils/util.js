const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}
function waittime(starttime,endtime,number,seating,runningtime){
       var waittime=parseInt(number/seating)*runningtime+begintime(starttime,endtime)
       return waittime;
  }
  function begintime(starttime,endtime){
    var stime = Date.parse(new Date(starttime));//获得开始时间的毫秒数
    var etime = Date.parse(new Date(endtime));//获得结束时间的毫秒数
    var usedTime = etime - stime;
    
    return  Math.floor(usedTime / (60 * 1000));
  }
  
  module.exports = {
    formatTime,
    waittime
  }