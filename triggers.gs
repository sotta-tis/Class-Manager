function onOpen(e){
  // メニューバーに完了確認を追加
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('科目設定')
      .addItem('新学期', 'createClassDetailTable')
      .addToUi();
}

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
