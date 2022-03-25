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
//计算最终的等待时间函数
function waittime(starttime,endtime,number,seating,runningtime){
        var stime = Date.parse(new Date(starttime));//获得开始时间的毫秒数
        var etime = Date.parse(new Date(endtime));//获得结束时间的毫秒数
        var usedTime = etime - stime; 
        var days = Math.floor(usedTime / (24 * 3600 * 1000));
        if(days!=0)
              return "需等候大于一天"
        //计算出小时数
        var leave1 = usedTime % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
        var hours = Math.floor(leave1 / (3600 * 1000));//将剩余的毫秒数转化成小时数
        if(hours!=0)
                return "需等候大于1小时"
    //计算相差分钟数
        var leave2 = leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数
        var minutes = Math.floor(leave2 / (60 * 1000));//将剩余的毫秒数转化成分钟
        var waittime=parseInt(number/seating)*runningtime+runningtime*1-minutes
        if(waittime>=120)
                 return "需等候大于2小时"
        if(waittime>60)
                  return "需等候"+Math.floor(waittime/60)+"小时"+waittime%60+"分钟"
       return "需等候"+waittime+"分钟";
  }

  
  //判断用户左移动或是右移动
  const getTouchData = (endX, endY, startX, startY,same)=> {
    let turn = "";
    if(same=='false'){  //两次项目(被点击和已经处于左滑项目)不同,则已经左滑的项目回归原位即右滑
      turn ="right"
      return turn;
    }
    if(same=='true' && endX<=315 && endX>=280){ //两次项目相同，且接触点位于图标位置(用户正在预约)保持原状
          turn='left';
          return turn;
    }
  
    if (endX - startX > 10 && Math.abs(endY - startY) < 50) {      //右滑
      turn = "right";
      return turn;
    } else if(endX - startX < -10 && Math.abs(endY - startY) < 50){   //左滑
      turn = "left";
      return turn;
    }
   
  }
  
  module.exports = {
    formatTime,
    waittime,
    getTouchData
  }