function generateNewTable(tmp_sheetName) {
  var spreadsheet = SpreadsheetApp.openById(spreadsheetId);
  var latestClassesSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(tmp_sheetName+'_'+"latest");
  if(latestClassesSheet){
    latestClassesSheet.setName(tmp_sheetName+"_"+Utilities.formatDate(latestClassesSheet.getRange(1,1).getValue(),"JST","yyyy/MM/dd"));
  }
  // 新しいシートをテンプレートから作成
  var newSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(tmp_sheetName).copyTo(spreadsheet);
  // シート名は「'テンプレート名'_'日付'」
  newSheet.setName(tmp_sheetName+'_'+'latest');
  newSheet.getRange(1,1).setValue(Utilities.formatDate(new Date(), "JST", "yyyy/MM/dd"));
}


function test(){
  generateNewTable(LogSheetName);
}