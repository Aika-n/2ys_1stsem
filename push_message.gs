//LINE developerで登録をした、CHANNEL_ACCESS_TOKENを宣言
var CHANNEL_ACCESS_TOKEN = 'exzSrT/9yaMr5tURuE1Uu+1wP/0ihoVoPdcoVIw/2IaahuTI5+Q1xw6tl+pIP+dXkWilJdVWeuAoa82oqP/ATMBcI1JOAgQaOIQ0F6OZm67e7mmsALg+TJ4DHhof4pIQIQ0aWv6mKHrPMIfmb5TW8gdB04t89/1O/w1cDnyilFU='; // Channel_access_tokenを登録
//アクセス先(本人に返信)
var url = 'https://api.line.me/v2/bot/message/reply';
//Spreadsheet(このExcel)のシート２を指定
var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('シート2');
//送る先のユーザーID
var USER_ID = "U6cbd66f2c1c4138094263f939d857804";

/**
 * postされたときの処理(受信)
 */
function doPost(e) {
    //受信した内容を格納
    var contents = e.postData.contents;
    //内容をjson形式に変換(解析)する
    var obj = JSON.parse(contents)
    //取り出したものから「events」の所を抽出
    var events = obj["events"];
    for(var i = 0; i < events.length; i++){
        switch(events[i].type) {
            
            //フォローの場合
          case "follow":
            //push_message.gsのfanction followMessageを呼び出す
            followMessage(events[i]);
            
            //メッセージの場合
          case "message":
            //push_message.gsのfanction getMessageを呼び出す
            getMessage(events[i]);
            break;
            
            //それ以外の時
          default:
            break;
        }

    }
}

//フォローされたとき
function followMessage(e){
  
  var user_id = e.source.userId;
  var group_id = e.source.groupId;
  var room_id = e.source.roomId;
  
  //スプレッドシート(シート2)の一番下の行にIDを追加
  sheet.appendRow([user_id, group_id, room_id]);
  
  //フォロー時に返信するメッセージ
  var message = {
    "replyToken" : e.replyToken,
    //メッセージ内容
    "messages" : [
      {
        "type" : "text",
        "text" : "フォローありがとう！"
      }
    ]
  };
  //送るオプションの格納(フォロー時)
  var options = {
    "method" : "post",
    "headers" : {
      //jsonという形式のファイルを使用
      "Content-Type" : "application/json",
      //WebAPI へアクセスするためのトークン（アクセストークン等）を利用して認証・認可する
      "Authorization" : "Bearer " + channel_token
    },
    //JSON.strigfyを使用してjson形式に変換
    "payload" : JSON.stringify(message)
  };
  //送る先にリクエスト(POST)
  UrlFetchApp.fetch(url, options);
  
}

/**
 * 参加したときの処理
 */
function joinMessage(e) {
  
  var user_id = "";
  var group_id = "";
  var room_id = "";
  
  user_id = e.source.userId;
  group_id = e.source.groupId;
  room_id = e.source.roomId;
  
  if(user_id != "" && group_id != ""){
    //スプレットシートにグループIDを書き込む
    sheet.appendRow(group_id);
  }else if(user_id != ""){
    //ユーザIDを書き込む
    sheet.appendRow(user_id);
  }
  
}

/**
 * メッセージを受け取ったときの処理
 */
function getMessage(e) {
  
  var user_id = e.source.userId;
  var group_id = e.source.groupId;
  var room_id = e.source.roomId;
  
 //スプレッドシート(シート2)の一番下の行にIDを追加
  sheet.appendRow([user_id, group_id, room_id]);
  
  //送られてきたメッセージの内容
  var input_text = e.message.text;
  //返信するメッセージの内容
  var reply_text = "";
  
//対象なら
  if(user_id == "U6cbd66f2c1c4138094263f939d857804"){
    //送られてきたメッセージ内容ごとに処理
    switch(input_text){
      //メッセージ内容が「外出しています」
      case "外出しています":
        reply_text = "お気をつけて";;
        getline();
        ugokaku()
        ChengeTime();
        break;
      //メッセージ内容が「家にいます」
      case "家にいます":
        reply_text = "分かりました";
        ReChengeTime();
        getline();
        ugokaku()
        break;
      //メッセージ内容が「家族に連絡します」
      case "たすけて":
        reply_text = "家族に連絡します";
        helpme();
        getline();
        break;
      //メッセージ内容が「深夜の通知時間を変更したい」
      case "深夜の通知時間を変更したい":
//        reply_text = "深夜の通知時間を変更します";
        getline();
        changetimemidnight();
        break;
      //メッセージ内容が「設定時間を変更したい」
      case "係を呼び出しています。":
        getline();
        people();
        break;
      //メッセージ内容が「変更します」
      case "変更します":
//        reply_text = "何時間に変更しますか？数字のみで答えてください";
        changemidnightyes();
        break;
      //メッセージ内容が「変更しません」
      case "変更しません":
        reply_text = "分かりました"
        break;
      //メッセージ内容がそれ以外のとき
      case "変更をやめる":
        changestop();
        break;
      default:
        
//        sheet.getRange(1,4).setValue(input_text);
//        sheet.getRange(2,4).setValue(Number(input_text));
        if(isNaN(input_text)){
          if(changemidnghtflg()){
//            changemidnghtflg()
            break;
          }
          reply_text = input_text;
          getline();
          ugokaku();
          break;
        }else{
        
          if(mnumber(input_text)){
            break;
          }
          reply_text = input_text;
          getline();
          ugokaku();
          break;
        }
        //
//        if(changemidnghtflg()){
//          break;
//        }
//        changemidnghtflg()
//        getline();
//        ugokaku();
//        break;
    }
    
  //追記 メッセージが対象以外の個人のとき
//  }else if(user_id != "U486473a4ee5928b39a708f1e94ba8f2b"){
//    switch(input_text){
//      //メッセージ内容が「設定時間を変更したい」
//      case "設定時間を変更したい":
//        reply_text = "本人へ通知するまでの時間を変更します";
//        timechange();
//        break;
//        
//      //メッセージ内容が上記以外のとき【オウム返し】
//      default:
//        reply_text = input_text;
//        break;
//    }
  //個人ではないとき【オウム返し】
  }else{
    reply_text = input_text;
  }
  
  var ids = [user_id, group_id, room_id];
  //送るデータの格納(POST)
  var postData = {
    "replyToken" : e.replyToken,
    //メッセージ内容
    "messages" : [
      {
        "type" : "text",
        "text" : reply_text
      }
    ]
  };
  //送るオプションの格納(POST)
  var options = {
    "method" : "post",
    "headers" : {
      //jsonという形式のファイルを使用
      "Content-Type" : "application/json",
      //WebAPI へアクセスするためのトークン（アクセストークン等）を利用して認証・認可する
      "Authorization" : "Bearer " + CHANNEL_ACCESS_TOKEN
    },
    //JSON.strigfyを使用してjson形式に変換
    "payload" : JSON.stringify(postData)
  };
  //送る先にリクエスト(POST)
  UrlFetchApp.fetch("https://api.line.me/v2/bot/message/reply", options);
}
