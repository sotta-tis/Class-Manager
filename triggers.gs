function onOpen(e){

  // メニューバーに完了確認を追加
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('科目設定')
      .addItem('新学期', 'createClassDetailTable')
      .addToUi();
}

