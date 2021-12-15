//四時間以上センサーが反応しなかったときのメッセージ
function YesNo_message() {
  
  //LINE developerで登録をした、CHANNEL_ACCESS_TOKENを宣言
  var CHANNEL_ACCESS_TOKEN = "exzSrT/9yaMr5tURuE1Uu+1wP/0ihoVoPdcoVIw/2IaahuTI5+Q1xw6tl+pIP+dXkWilJdVWeuAoa82oqP/ATMBcI1JOAgQaOIQ0F6OZm67e7mmsALg+TJ4DHhof4pIQIQ0aWv6mKHrPMIfmb5TW8gdB04t89/1O/w1cDnyilFU="; 
  
  //送る先のユーザーID(本人)
  var USER_ID = "U6cbd66f2c1c4138094263f939d857804";

  //送るデータの格納(POST)
  var postData = {
    "to": USER_ID,
   
    //メッセージ内容
    "messages": [{
      "type": "template",
      "altText": "this is a confirm template",
      "template": {
        "type": "confirm",
        "text": "外出してますか？",
        "actions": [
          {
            "type": "message",
            "label": "はい",
            "text": "外出しています"
          },
          {
            "type": "message",
            "label": "いいえ",
            "text": "家にいます"
          }
      ]
  }
}]
  };
  
  //アクセス先(メッセージを送信)
  var url = "https://api.line.me/v2/bot/message/push";
  
  //optionsで使用するheadersを作成
  var headers = {
    
    //jsonという形式のファイルを使用
    "Content-Type": "application/json",
    
    //WebAPI へアクセスするためのセキュリティトークン（アクセストークン等）を利用して認証・認可する
    'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN,
  };

  //送るオプションの格納(POST)
  var options = {
    "method": "post",
    "headers": headers,
    //JSON.strigfyを使用してjson形式に変換
    "payload": JSON.stringify(postData)
  };
  
  //送る先にリクエスト(POST)
  var response = UrlFetchApp.fetch(url, options);
}

//四時間半以上本人からレスポンスがなかった場合、家族のグループLINEにメッセージを送る
function familyline() {
  
  //LINE developerで登録をした、CHANNEL_ACCESS_TOKENを宣言
  var CHANNEL_ACCESS_TOKEN = "exzSrT/9yaMr5tURuE1Uu+1wP/0ihoVoPdcoVIw/2IaahuTI5+Q1xw6tl+pIP+dXkWilJdVWeuAoa82oqP/ATMBcI1JOAgQaOIQ0F6OZm67e7mmsALg+TJ4DHhof4pIQIQ0aWv6mKHrPMIfmb5TW8gdB04t89/1O/w1cDnyilFU="; 
  
  //送る先のユーザーID(家族)
  var USER_ID = "Ua891e347d55cc171e3614a793f90f36e";

  //送るデータの格納(POST)
  var postData = {
    "to": USER_ID,
    
    //メッセージ内容
    "messages" : [
      {
        'type':'text',
        'text':'4時間半反応がありません。危険な状態かもしれません。',
      }
    ]
  };
  
  //アクセス先(メッセージを送信)
  var url = "https://api.line.me/v2/bot/message/push";
  
  //optionsで使用するheadersを作成
  var headers = {
    
    //jsonという形式のファイルを使用
    "Content-Type": "application/json",
    
    //WebAPI へアクセスするためのセキュリティトークン（アクセストークン等）を利用して認証・認可する
    'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN,
  };

  //送るオプションの格納(POST)
  var options = {
    "method": "post",
    "headers": headers,
   
    //JSON.strigfyを使用してjson形式に変換
    "payload": JSON.stringify(postData)
  };
  
  //送る先にリクエスト(POST)
  var response = UrlFetchApp.fetch(url, options);
}

//4時間半以上反応がないとき(スプレッドシートのフラグが1のとき)
//YesNo_message.gsのfanction familylineugoを呼び出す
function ugokaku(){
  
  //Spreadsheet(このExcel)のシート１を指定
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('シート1');
  
  //シート１にある4時間半フラグを格納したセル(マス)を指定
  var flg = sheet.getRange(2,6).getValue();
  if(flg == 1){
    familylineugo();
  }
}

//家族のグループLINEに連絡をしたあとに動きがあった場合
function familylineugo() {
  
  myFunction('a');
  
  //LINE developerで登録をした、CHANNEL_ACCESS_TOKENを宣言
  var CHANNEL_ACCESS_TOKEN = "exzSrT/9yaMr5tURuE1Uu+1wP/0ihoVoPdcoVIw/2IaahuTI5+Q1xw6tl+pIP+dXkWilJdVWeuAoa82oqP/ATMBcI1JOAgQaOIQ0F6OZm67e7mmsALg+TJ4DHhof4pIQIQ0aWv6mKHrPMIfmb5TW8gdB04t89/1O/w1cDnyilFU="; 
 
  //送る先のユーザーID(家族)
  var USER_ID = "Ua891e347d55cc171e3614a793f90f36e";

  //送るデータの格納(POST)
  var postData = {
    "to": USER_ID,
    //メッセージ内容
    "messages" : [
      {
        'type':'text',
        'text':'反応がありました。大丈夫そうです。',
      }
    ]
  };
  
  //アクセス先(メッセージを送信)
  var url = "https://api.line.me/v2/bot/message/push";
  
  //optionsで使用するheadersを作成
  var headers = {
    
    //jsonという形式のファイルを使用
    "Content-Type": "application/json",
    
    //WebAPI へアクセスするためのセキュリティトークン（アクセストークン等）を利用して認証・認可する
    'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN,
  };

  //送るオプションの格納(POST)
  var options = {
    "method": "post",
    "headers": headers,
    
    //JSON.strigfyを使用してjson形式に変換
    "payload": JSON.stringify(postData)
  };
  
  //送る先にリクエスト(POST)
  var response = UrlFetchApp.fetch(url, options);
}
