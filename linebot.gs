// メッセージを送信する関数
function pushMessage(m,u) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(BotConfigSheet);
  var accessToken = sheet.getRange(Token,2).getValue();

  var user = sheet.getRange(BotToMe,2).getValue();

  var value = sheet.getRange(1,1,sheet.getLastRow(),2);

  for(var key in value){
    if(value[key][0]==u){
      user = value[key][1];
    }
  }

  var header={
    'Content-type': 'application/json',
    'Authorization': 'Bearer '+accessToken
  }

  var src_payload={
    'to':user,
    "messages":[{
      'type':'text',
      'text':m
    }]
  }

  var params={
    'method': 'post',
    'headers':header,
    'payload':JSON.stringify(src_payload)
  }

  UrlFetchApp.fetch(pushUrl,params);

}

// LINEBot用の返信関数
function replyMessage(m,re_token){
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(BotConfigSheet);
  var accessToken = sheet.getRange(Token,2);

  var header={
    'Content-Type':'application/json',
    'Authorization':'Bearer ' +accessToken
  }
  var src_payload={
    'replyToken':re_token,
    'messages':[{
      'type':'text',
      'text':m
    }]
  }

  var params={
    'method':'post',
    'headers':header,
    'payload':JSON.stringify(src_payload)
  }

  UrlFetchApp.fetch(replyUrl,params);
}


// 送られた文字列から返信用の文字列を返す
function Textbranch(key){
  // 稼ぎとか聞かれたら
  if(key.match('稼')){
    if(i=key.match('月')){
      src=Number(key[i.index-1]);
      if(judgeNum(key[i.index-2]))src+=10*Number(key[i.index-2])
      return salay(src).toString()+' JPY';
    }else{
      return salay(new Date().getMonth()).toString()+' JPY';
    }
  }
  // 給料てことば入ってたら
  else if(key.match('給料')){
    if(i=key.match('月')){
      src=Number(key[i.index-1]);
      if(judgeNum(key[i.index-2]))src+=10*Number(key[i.index-2])
      return salay(src-1).toString()+' JPY';
    }else{
      return salay(new Date().getMonth()).toString()+' JPY';
    }
  }
  // 予定聞かれたら
  else if(key.match('予定')){
    now = new Date();
    if(i=key.match('月')){
      if(j=key.match('日')){
        Msrc=key[i.index-1];
        if(judgeNum(key[i.index-2]))Msrc+=10*Number(key[i.index-2]);
        Dsrc=Number(key[j.index-1]);
        if(judgeNum(key[j.index-2]))Dsrc+=10*Number(key[j.index-2]);
        return getDayEvents(now.getFullYear(),Msrc,Dsrc);
      }else{
        return 'error\n～日まで入力して'
      }
    }
    else if(i=key.match('日')){
      if(key.match('明日')){
      }else{
        Dsrc=Number(key[i.index-1]);
        if(judgeNum(key[i.index-2]))Dsrc+=10*Number(key[i.index-2]);
        return getDayEvents(now.getFullYear(),now.getMonth()+1,Dsrc);
      }
    }else{
      return getDayEvents(now.getFullYear(),now.getMonth()+1,now.getDate());
    }
  }
  // それ以外
  else{
    return 'なに言ってんの？';
  }
}


// その日のイベントを返す。デフォルトのカレンダーのみ
function getDayEvents(y,m,d){
  time = new Date(y,m-1,d);
  var calendar =CalendarApp.getDefaultCalendar();
  var events=calendar.getEventsForDay(time);
  src=time.getFullYear()+'年'+(time.getMonth()+1)+'月'+time.getDate()+'日';
  if(events.length==0){src+='は';src+='なにもないよ！';}
  else{
    src+='\n';
    for(let i=0;i<events.length;i++){
      src+=events[i].getTitle();src+='  ';
      src+=events[i].getStartTime().getHours()+':';
      src+=events[i].getStartTime().getMinutes();
      if(events[i].getStartTime().getMinutes()==0)src+=0;
      src+='～'
      src+=events[i].getEndTime().getHours()+':';
      src+=events[i].getEndTime().getMinutes();
      if(events[i].getEndTime().getMinutes()==0)src+=0;
      src+='\n';
    }
    src+='合計'+events.length+'個の予定があるよ！'
  }
  return src;
}

// monthの月のばの予定の時間*時給を返す
// 時給を定数化したい
function salay(month) {
  var now=new Date();
  var startTime=new Date(now.getFullYear(),month-1,1);
  var endTime=new Date(now.getFullYear(),month,0);
  
  var events = CalendarApp.getDefaultCalendar().getEvents(startTime,endTime,{search:'ば'});
  let workTime=0;
  
  for(let i=0;i<events.length;i++){
    let d=events[i].getEndTime()-events[i].getStartTime()
    workTime+=(d/1000/60/60);
  }
  // 最低自給
  return workTime*1023
}

// morningCallを朝のイベントとして登録しとく
function morningCall(){
  pushMessage('おはよう！','toMe');
  pushMessage(Textbranch('予定'),'toMe');
}


function judgeNum(key){
  if(Number(key)===0||Number(key)===1||Number(key)===2||Number(key)===3||Number(key)===4||Number(key)===5||Number(key)===6||Number(key)===7||Number(key)===8||Number(key)===9)return true;
  else return false;
}