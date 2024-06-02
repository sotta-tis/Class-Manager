
const pushUrl='https://api.line.me/v2/bot/message/push';
const replyUrl='https://api.line.me/v2/bot/message/reply';


function doPost(e){
  data = JSON.parse(e.postData.contents);

  reT=data.events[0].replyToken;
  t=data.events[0].type;
  if(t=='message'){
    key=data.events[0].message.type;
    src=data.events[0].message.text;
    if(key=='text')replyMessage(Textbranch(src),reT);
    
  }
  
  


}


