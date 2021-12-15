function changetimemidnight() {
  //LINE developerで登録をした、CHANNEL_ACCESS_TOKENを宣言
  var CHANNEL_ACCESS_TOKEN = "exzSrT/9yaMr5tURuE1Uu+1wP/0ihoVoPdcoVIw/2IaahuTI5+Q1xw6tl+pIP+dXkWilJdVWeuAoa82oqP/ATMBcI1JOAgQaOIQ0F6OZm67e7mmsALg+TJ4DHhof4pIQIQ0aWv6mKHrPMIfmb5TW8gdB04t89/1O/w1cDnyilFU="; 
  
  //送る先のユーザーID(本人)
  var USER_ID = "U6cbd66f2c1c4138094263f939d857804";

  //対象のシートを取得
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('シート1');
  
  //本人への夜間の連絡時間取得
  var percontime1 = sheet.getRange(5,6).getValue();
  var percontime2 = sheet.getRange(5,7).getValue();
  
  //送るデータの格納(POST)
  var postData = {
    "to": USER_ID,
   
//    //メッセージ内容
//    "messages" : [
//      {
//        'type':'text',
//        'text':'緊急ボタンが押されました。直ちに連絡してください。',
//      }
//    ]
    
    //メッセージ内容
    "messages": [{
      "type": "template",
      "altText": "this is a confirm template",
      "template": {
        "type": "confirm",
        "text": "現在の設定時間は" + percontime1 +"時から"+ percontime2　+"時まで停止しています\n変更しますか？",
        "actions": [
          {
            "type": "message",
            "label": "はい",
            "text": "変更します"
          },
          {
            "type": "message",
            "label": "いいえ",
            "text": "変更しません"
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


//本人が「変更します」の時(深夜の時間帯)
function changemidnightyes() {
  
  //対象のシートを取得
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('シート1');
  
  //フラグを1にセット
  sheet.getRange(5,8).setValue(1);
  
  //LINE developerで登録をした、CHANNEL_ACCESS_TOKENを宣言
  var CHANNEL_ACCESS_TOKEN = "exzSrT/9yaMr5tURuE1Uu+1wP/0ihoVoPdcoVIw/2IaahuTI5+Q1xw6tl+pIP+dXkWilJdVWeuAoa82oqP/ATMBcI1JOAgQaOIQ0F6OZm67e7mmsALg+TJ4DHhof4pIQIQ0aWv6mKHrPMIfmb5TW8gdB04t89/1O/w1cDnyilFU="; 
  
  //送る先のユーザーID(本人)
  var USER_ID = "U6cbd66f2c1c4138094263f939d857804";

  //送るデータの格納(POST)
  var postData = {
    "to": USER_ID,
   
    //メッセージ内容
    "messages" : [
      {
        'type':'text',
        'text':'何時から停止しますか？\n24時間表記、数字のみで入力してください\n(例)：23',
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

//本人が「変更します」フラグが立っているか確認
function changemidnghtflg() {
  
  //対象のシートを取得
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('シート1');
  
  //フラグを確認
  var changemidnightyesflg = sheet.getRange(5,8).getValue();
  
  //0以外のとき(フラグが立っているとき)
  if(changemidnightyesflg != 0){
    
    //LINE developerで登録をした、CHANNEL_ACCESS_TOKENを宣言
    var CHANNEL_ACCESS_TOKEN = "exzSrT/9yaMr5tURuE1Uu+1wP/0ihoVoPdcoVIw/2IaahuTI5+Q1xw6tl+pIP+dXkWilJdVWeuAoa82oqP/ATMBcI1JOAgQaOIQ0F6OZm67e7mmsALg+TJ4DHhof4pIQIQ0aWv6mKHrPMIfmb5TW8gdB04t89/1O/w1cDnyilFU="; 
      
    //送る先のユーザーID(本人)
    var USER_ID = "U6cbd66f2c1c4138094263f939d857804";
      
    
    //対象のシートを取得
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('シート1');
    
    if(changemidnightyesflg > 0){
      sheet.getRange(5,8).setValue(changemidnightyesflg + 1);
      
      //送るデータの格納(POST)
      var postData = {
        "to": USER_ID,
        
        //メッセージ内容
        "messages" : [
          {
            'type':'text',
            'text':'何時から停止しますか？\n24時間表記、数字のみで入力してください\n(例)：23\n変更しない場合、「変更をやめる」と入力してください',
          }
        ]
      };
    }else{
      sheet.getRange(5,8).setValue(changemidnightyesflg - 1);
      
      
      //送るデータの格納(POST)
      var postData = {
        "to": USER_ID,
        
        //メッセージ内容
        "messages" : [
          {
            'type':'text',
            'text':'何時から開始しますか？\n24時間表記、数字のみで入力してください\n(例)：7\n変更しない場合、「変更をやめる」と入力してください',
          }
        ]
      };
    }
    
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
    
  
//  }else if(changemidnightyesflg == 1){
//    //対象のシートを取得
//    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('シート1');
//    
//    //フラグを確認
//    var changemidnightyesflg = sheet.getRange(5,8).getValue();
//    sheet.getRange(5,8).setValue(changemidnightyesflg + 1);
//    
//    changemidnghtflg();
    return true;
  }else{
    return false;
  }
}

//時刻変更の可能性がある場合(数字の場合)
function mnumber(time) {
 
  //対象のシートを取得
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('シート1');
  
  //フラグを確認
  var changemidnightyesflg = sheet.getRange(5,8).getValue();
  sheet.getRange(1,8).setValue(time);
  sheet.getRange(2,8).setValue(changemidnightyesflg);
  //0以外のとき(フラグが立っているとき)
  if(changemidnightyesflg != 0){
    if(changemidnightyesflg > 0){
      
      //停止時刻変更固定するやつ
      midnightstoptime(time);
    }else{
      
      //開始時刻変更固定するやつ
      midnightstarttime(time);
      
    }
    return true;
  }else{
   //フラグ立ってないのに数字打ってきた…
    return false;
    
  }
}


//停止時刻変更固定するやつ
function midnightstoptime(time) {
  
  
  //対象のシートを取得
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('シート1');
  
    
  sheet.getRange(5,6).setValue(time);
  sheet.getRange(5,8).setValue(-1);
  
  //LINE developerで登録をした、CHANNEL_ACCESS_TOKENを宣言
    var CHANNEL_ACCESS_TOKEN = "exzSrT/9yaMr5tURuE1Uu+1wP/0ihoVoPdcoVIw/2IaahuTI5+Q1xw6tl+pIP+dXkWilJdVWeuAoa82oqP/ATMBcI1JOAgQaOIQ0F6OZm67e7mmsALg+TJ4DHhof4pIQIQ0aWv6mKHrPMIfmb5TW8gdB04t89/1O/w1cDnyilFU="; 
    
    //送る先のユーザーID(本人)
    var USER_ID = "U6cbd66f2c1c4138094263f939d857804";
    
    //送るデータの格納(POST)
    var postData = {
      "to": USER_ID,
      
      //メッセージ内容
      "messages" : [
        {
          'type':'text',
          'text':'停止時刻を' + time + '時に設定しました\n何時から開始しますか？\n24時間表記、数字のみで入力してください\n(例)：7',
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



//開始時刻変更固定するやつ
function midnightstarttime(time) {
  
  
    //対象のシートを取得
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('シート1');
    var sttime = sheet.getRange(5,6).getValue();
    sheet.getRange(5,7).setValue(time);
  
  //対象のシートを取得
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('シート1');
  
    
  sheet.getRange(5,7).setValue(time);
  sheet.getRange(5,8).setValue(0);
  
  //LINE developerで登録をした、CHANNEL_ACCESS_TOKENを宣言
    var CHANNEL_ACCESS_TOKEN = "exzSrT/9yaMr5tURuE1Uu+1wP/0ihoVoPdcoVIw/2IaahuTI5+Q1xw6tl+pIP+dXkWilJdVWeuAoa82oqP/ATMBcI1JOAgQaOIQ0F6OZm67e7mmsALg+TJ4DHhof4pIQIQ0aWv6mKHrPMIfmb5TW8gdB04t89/1O/w1cDnyilFU="; 
    
    //送る先のユーザーID(本人)
    var USER_ID = "U6cbd66f2c1c4138094263f939d857804";
    
    //送るデータの格納(POST)
    var postData = {
      "to": USER_ID,
      
      //メッセージ内容
      "messages" : [
        {
          'type':'text',
          'text':'開始時刻を' + time + '時に設定しました\n' + sttime + '時から' + time + '時の間、通知を停止します',
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



//変更をやめる場合
function changestop() {
 
  
    //対象のシートを取得
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('シート1');
    
    sheet.getRange(5,8).setValue(0);
  
  
}