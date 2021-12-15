function Sp_30_minutes() {
  //対象のシートを取得
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('シート1');
  
  //最終行取得
  const FValues = sheet.getRange('A:A').getValues();　 //F列の値を全て取得
  const lastRow1 = FValues.filter(String).length;　　//空白の要素を除いた長さを取得
  Logger.log(lastRow1);
  
  //最終行の日付取得
  const lastValue = (sheet.getRange(lastRow1, 1).getValue());
  Logger.log(lastValue);
  
  var date = new Date(lastValue);
  date.setMinutes(date.getMinutes() - 30);
  
  sheet.getRange(lastRow1, 1).setValue(date);
  
  myFunction();
}

function SpNow() {
  
  //対象のシートを取得
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('シート1');
  
  //最終行取得
  var lastRow1 = sheet.getRange(1, 1).getNextDataCell(SpreadsheetApp.Direction.DOWN).getRow();
  Logger.log(lastRow1);

  //今日を取得
  var dd = new Date();
  
  sheet.getRange(lastRow1, 1).setValue(dd);
  
  myFunction();
}

function Sp_4_hours() {
  
  //対象のシートを取得
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('シート1');
  
  //最終行取得
  var lastRow1 = sheet.getRange(1, 1).getNextDataCell(SpreadsheetApp.Direction.DOWN).getRow();
  Logger.log(lastRow1);
  
  //最終行の日付取得
  var date = new Date(sheet.getRange(lastRow1, 1).getValue());
  date.setHours(date.getHours() - 4);
  
  sheet.getRange(lastRow1, 1).setValue(date);
  
  myFunction();
}
