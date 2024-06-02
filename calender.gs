// 未完成　absensecalendarの名前は不適、授業の予定が全部入るから命名を変更すべき。
function createAbsenseCalender(){
  var absenceCalender = CalendarApp.createCalendar("Absence_latest",{
    timeZone : 'Asia/Tokyo'
  });
  
  var startTime = new Date();startTime.setFullYear(startTime.getFullYear(),3,1);
  var endTime = new Date();endTime.setFullYear(startTime.getFullYear()+1);
  var holidayCalender = CalendarApp.getCalendarById('ja.japanese#holiday@group.v.calendar.google.com');
  var holidays = holidayCalender.getEvents(startTime,endTime);

  for ( var key in holidays){
    var eve = absenceCalender.createEvent('休校 '+holidays[key].getTitle(),holidays[key].getStartTime(),holidays[key].getEndTime());
    eve.setColor(10);
  }
  var calendarId = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(ClassesListSheetName+"_latest").getRange(1,calendarIdColunm).setValue(absenceCalender.getId());
}


// 未完成　カレンダーに時間割を追加していく関数　前期後期で判断できるようにしたい。
function insertClassToCalender(){
  // 休校情報のカレンダー取得
  var calendarId = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(ClassesListSheetName+"_latest").getRange(1,calendarIdColunm).getValue();
  var calendar = CalendarApp.getCalendarById(calendarId);
  // もしカレンダーが存在すれば
  if(calendar){
    var schedule = getClassSchedule();
    var startTime = new Date(new Date().getFullYear(),3,1);
    if(new Date().getMonth()>10 || new Date().getMonth()<3)startTime = new Date(new Date().getFullYear()-1,3,1)
    var endTime = new Date(startTime.getFullYear(),7,6);

    for (var currentDate = new Date(startTime); currentDate <= endTime; currentDate.setDate(currentDate.getDate()+1)){
      if(currentDate.getDay()!=0 &&currentDate.getDay()!=6){
        var nowDay = currentDate.getDay();
        var events = calendar.getEventsForDay(currentDate);
        if(!events.length){
          for(let key in schedule[NumToDay[nowDay]]){
            var eve = calendar.createAllDayEvent(schedule[NumToDay[nowDay]][key][1]+'/'+schedule[NumToDay[nowDay]][key][0],currentDate);
            eve.setColor(Number(key)+1);
          }
        }
      }
    }

  }
}

// 授業管理のシートから時間割情報を取得して、GASで扱える配列にして返す。
function getClassSchedule(){
  var classSchedule = {
    "月":[],
    "火":[],
    "水":[],
    "木":[],
    "金":[],
  }

  var classSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(ClassesListSheetName+"_latest");
  if(classSheet){
    var value = classSheet.getRange(classSheetStartRow,1,classSheet.getLastRow(),classSheet.getLastColumn()).getValues();
    for(var key in value){
      if(value[key][classSheetDayColumn-1])classSchedule[value[key][classSheetDayColumn-1]].push([value[key][classSheetTitleColumn-1],value[key][classSheetWariColumn-1]]);
    }
  }

  return classSchedule;
}
