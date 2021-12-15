//呼び出しが発信されたとき
function people() {
   //LINE developerで登録をした、CHANNEL_ACCESS_TOKENを宣言
  var CHANNEL_ACCESS_TOKEN = "exzSrT/9yaMr5tURuE1Uu+1wP/0ihoVoPdcoVIw/2IaahuTI5+Q1xw6tl+pIP+dXkWilJdVWeuAoa82oqP/ATMBcI1JOAgQaOIQ0F6OZm67e7mmsALg+TJ4DHhof4pIQIQ0aWv6mKHrPMIfmb5TW8gdB04t89/1O/w1cDnyilFU="; 
  
  //送る先のユーザーID(家族)
  var USER_ID = "U486473a4ee5928b39a708f1e94ba8f2b";

  //送るデータの格納(POST)
  var postData = {
    "to": USER_ID,
    
    //メッセージ内容
    "messages" : [
      {
        'type':'text',
        'text':'よばれたよ～',
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
