let キー入力の許可=true;
let DMすでに出てる=false;
window.addEventListener('load', function(){

    //ロード終わったら2秒後に操作するように予約しておく
    setTimeout(function(){
        //DMの表示を自動で行う
        let DM親 = document.getElementById("layers").firstElementChild.firstElementChild.firstElementChild.firstElementChild;
        
        DMすでに出てる=DM親.classList.contains("r-5wli1b");//DMの頭が出てればこいつがTRUE。それすらないとFALSE。あと、そもそもページが細すぎると要素がないのでこれもFALSEだが、知らん！
        //DM開く
        document.dispatchEvent( new KeyboardEvent( "keypress",{keyCode:105})) ;//"i"を入力。指定の方法は色々あるようだけどこの形式でやっと反応した。

        if(DMすでに出てる){
        }else{
            //DMが開き機ってないのでもっかい開く
            setTimeout(function(){
                document.dispatchEvent( new KeyboardEvent( "keypress",{keyCode:105})) ;//"i"を入力
            },1000);
        }
        キー入力の許可=false;//これ以降の入力禁止ー！！
    },2000);

});

document.addEventListener('keydown', function (e) {//ショートカットとかいう機能が誤爆しまくるので無効化したぜ！
    if(!キー入力の許可){
        e.preventDefault();//キー入力によっておきる特殊な動作を阻止することができる。ただし入力自体はちゃんと通る…らしい。→じゃあショートカット全部無効化できるじゃーん
    }
});