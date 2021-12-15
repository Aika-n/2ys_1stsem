//編集時と30分毎に動く
function myFunction() {
  
  //対象のシートを取得
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('シート1');
  
  sheet.getRange(2,6).setValue('0');
  //最終行取得
  var lastRow1 = sheet.getRange(1, 1).getNextDataCell(SpreadsheetApp.Direction.DOWN).getRow();
  Logger.log(lastRow1); //5
  
  //最終行の日付取得
  const lastValue = (sheet.getRange(lastRow1, 1).getValue());
  Logger.log(lastValue);
  
  //今日を取得
  var dd = new Date();
  
  //現在の時間取得
  var ho = dd.getHours();
  
  //差分を計算
  var subad = ( dd - lastValue ) / (1000 * 60 * 60); 
  Logger.log(ho);
  
  //差分をスプレッドシートに記載
  sheet.getRange(1,6).setValue(subad);
  
  
  //追記 連絡する時間を自由に変更可能にするため、スプレッドシートから値を取得
  //本人へ連絡するまでの時間
  var pertime = sheet.getRange(4,6).getValue();
  Logger.log('本人へ連絡するまでの時間'+pertime);
  
  //グループLINEへ連絡するまでの時間(本人へ連絡するまでの時間+30分後)
  var famtime = pertime + 0.5
  Logger.log('グループLINEへ連絡するまでの時間'+famtime);
  
  //本人への夜間の連絡時間
  var percontime1 = sheet.getRange(5,6).getValue();
  var percontime2 = sheet.getRange(5,7).getValue();
  
  //グループLINEへの夜間の連絡時間
  var famcontime1 = sheet.getRange(6,6).getValue();
  var famcontime2 = sheet.getRange(6,7).getValue();
  
  //4時間半を超えたら家族グループLINEに連絡&フラグを立てる
  //但し、朝5時～夜11時の間にメッセージを送る(デフォルト)
    if(subad >= famtime && ho >= famcontime2 && ho < famcontime1){
    
      sheet.getRange(2,6).setValue('1');
      
      //YesNo_message.gsのfanctionを呼び出す
      familyline();
      
      //4時間超えたら本人に連絡
    }else if(subad >= pertime && percontime2 >= percontime2 && ho < percontime1){
      
      //YesNo_message.gsのfanctionを呼び出す
      YesNo_message();
      
    }
}

//外出していると返信があった時
function ChengeTime(){
  
  //対象のシートを取得【シート１】
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('シート1');
  
  //シート1に8時間後の値を入れておく。->もしセンサーが反応したら勝手に更新されるので８時間は無効になる
  var lastRow = sheet.getLastRow();
  
  //今日+8時間
  var dd = new Date();
  Logger.log(dd);
  dd.setHours(dd.getHours() + 8);
  
  //今日
  var date = new Date();
  
  //スプレッドシートに今日+8時間, メッセージの種類(sp), 現在時刻を記載
  sheet.getRange(lastRow + 1, 1).setValue(dd);
  sheet.getRange(lastRow + 1, 2).setValue('sp');
  sheet.getRange(lastRow + 1, 3).setValue(date);
  
  //追記 外出フラグを立てる
  sheet.getRange(3,6).setValue('1');
  
}


//家にいると返信があった時
function ReChengeTime(){
  
  //対象のシートを取得【シート１】
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('シート1');
  
  //シート1に8時間後の値を入れておく。->もしセンサーが反応したら勝手に更新されるので８時間は無効になる
  var lastRow = sheet.getLastRow();
  
  //今日+8時間
  var dd = new Date();
  Logger.log(dd);
  dd.setHours(dd.getHours());
  
  //今日
  var date = new Date();
  
  //スプレッドシートに今日+8時間, メッセージの種類(sp), 現在時刻を記載
  sheet.getRange(lastRow + 1, 1).setValue(dd);
  sheet.getRange(lastRow + 1, 2).setValue('line');
  sheet.getRange(lastRow + 1, 3).setValue(date);
  
  //追記 外出フラグを0にする
  sheet.getRange(3,6).setValue('0');
  
}


//対象者からLINEがあった時
function getline(){

  //対象のシートを取得
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('シート1');
  
  //最終行取得
  var lastRow = sheet.getLastRow();
  
  //追記 外出フラグを確認 0->家:時刻書く 1->外出中:書かない
  var gooutflg = sheet.getRange(3,6).getValue();
  if(gooutflg == '0'){
    
    //現在時刻
    var dd = new Date();
    Logger.log(dd);
    
    //スプレッドシートに現在時刻, メッセージの種類(line), 現在時刻を記載
    sheet.getRange(lastRow + 1, 1).setValue(dd);
    sheet.getRange(lastRow + 1, 2).setValue('line');
    sheet.getRange(lastRow + 1, 3).setValue(dd);
  }

}
