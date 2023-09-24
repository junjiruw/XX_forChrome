let キー入力の許可=true;


function DM出現判定(){
    let DM親 = document.querySelector('[data-testid="DMDrawer"]');
    return DM親.classList.contains("r-5wli1b");
    //DMの頭が出てればこいつがTRUE。それすらないとFALSE。あと、そもそもページが細すぎると要素がないのでこれもFALSEだが、知らん！
    //ただ、この判定法は万能ではないっぽい（出ててもFALSEのことがある。知らん！）
}

window.addEventListener('load', function(){

    //ロード終わったら3秒後に操作するように予約しておく
    setTimeout(function(){
        //DMの表示を自動で行う
        //まあこれめっちゃ失敗するんだけど（笑）
       

        //DM開く
        document.dispatchEvent( new KeyboardEvent( "keypress",{keyCode:105})) ;//"i"を入力。指定の方法は色々あるようだけどこの形式でやっと反応した。

        if(!DM出現判定()){            
            //DMが開き機ってないのでもっかい開く
            setTimeout(function(){
                document.dispatchEvent( new KeyboardEvent( "keypress",{keyCode:105})) ;//"i"を入力
            },500);
        }
        setTimeout(function(){
            キー入力の許可=false;//これ以降の入力禁止ー！！

            //で、本当にDM表示できたの？
            if(!DM出現判定()){
                //初回のDM表示失敗することがあるから押せるボタンも用意しておこう
                let DM_Button = document.createElement("button"); 
                DM_Button.innerText="DM";
                document.body.appendChild(DM_Button);
                DM_Button.id = "DM_Button";
                DM_Button.onclick = function(){
                    
                    キー入力の許可=true;//入力許可
                    document.dispatchEvent( new KeyboardEvent( "keypress",{keyCode:105})) ;//"i"を入力
                    //DM開く
                    setTimeout(function(){
                        document.dispatchEvent( new KeyboardEvent( "keypress",{keyCode:105})) ;//"i"を入力
                    },500);
                    
                    setTimeout(function(){
                        キー入力の許可=false;//これ以降の入力禁止ー！！

                        //で、本当にDM表示できたの？
                        if(DM出現判定()){
                            DM_Button.remove();//DMでてたからボタン削除
                        }
                    },1000);
                }
            }
        },1000);
    },3000);
});

document.addEventListener('keydown', function (e) {//ショートカットとかいう機能が誤爆しまくるので無効化したぜ！
    if(!キー入力の許可){
        if(document.activeElement.role!="textbox" && document.activeElement.role!="combobox"){
            //アクティブウィンドウを見て、入力欄 or 検索欄 にいるならキー入力を許可しよう
            if(!e.ctrlKey){
                //まあctrl押してたら有効にするか…
                
                e.preventDefault();
                //キー入力によっておきる特殊な動作を阻止することができる。→じゃあショートカット全部無効化できるじゃーん
                //てか Ctrl + C　すら死ぬぞ
                //ただし入力自体はちゃんと通る…？いや、これ日本語入力が変態的だから通るだけだな
            }

        }
    }
});

chrome.runtime.onMessage.addListener(function(request,sender,res) {//background.jsからメッセージを受け取れる。
    //Xで共有したい文字列を入力した状態でページリロードする
    window.location.href = request;

    //これさあ、入力箇所に直接文字入れてあげるだけでよかったんじゃないのお？
        //　↑　1.入力箇所の取得がめんどい
        //2.見た目の変化がすくなすぎてなんかわかりにくい
});