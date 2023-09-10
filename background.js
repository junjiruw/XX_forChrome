

chrome.runtime.onInstalled.addListener(function(){//拡張機能インストール時のみ実行

    const X_Share = chrome.contextMenus.create({//右クリックしたらあらわれる。permission:"contextMenus"が必要
        id: "X_Share",
        title: "Xで共有",
        contexts: ["all"],//どこで表示する？
    });
});

chrome.contextMenus.onClicked.addListener(function(){//項目をクリックされたら？
    let ページタイトル="";
    let ページURL="";
    let 表示URL="";
    let もうXあるよ=false;
    let X_tab_id=0;
    
    //console.log(ページタイトル);// 拡張機能を導入するページの”ビューを検証”を押すとそこに出るでありんすよ

    chrome.tabs.query({active:true, currentWindow: true},function(tab){//今見てるウィンドウの今見てるタブの取得　permission:"tabs"が必要
        ページタイトル=tab[0].title;
        ページURL=tab[0].url.split("?")[0];//URLのパラメータの部分は消し去るぜ！消し去らないほうがいいこともあるぜ！
        表示URL="https://twitter.com/intent/tweet?text=" + ページタイトル + "%0A&url=" + ページURL;
        //%0Aで改行

        chrome.tabs.query({url: "https://twitter.com/home"},function(tabs){//タブを全取得。　　　{currentWindow: true}でクティブウィンドウの中でのみにできる。わかりにくいならこれに切り替えるカモ
            //すでにXを開いてるなら、そこに移動して入力。開いてなさそうなら新規で開く。
            
            if(tabs.length>0){
                もうXあるよ=true;
                X_tab_id=tabs[0].id;
                chrome.tabs.update(X_tab_id, {active: true});//タブをアクティブに
            }

            if(もうXあるよ){
                //じゃあそのタブで開くぜ！
                //XX.jsに投げるぜ！
                chrome.tabs.sendMessage(X_tab_id,表示URL);

            }else{
                chrome.tabs.create({//Xを開いてツイートするぜ！←Xだっつってんだろ！
                    url:表示URL
                });
            }
        });

    });

})