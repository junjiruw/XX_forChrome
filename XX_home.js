

window.addEventListener('load', function(){
    //ロード終わったら0.1秒後に操作するように予約しておく
        setTimeout(function(){
        //タイムラインのさあ、一番上、いらなくね？
        const タイムライン要素 = document.querySelector('[aria-label="ホームタイムライン"]');
        const 一番上の邪魔な奴=タイムライン要素.firstElementChild;
        一番上の邪魔な奴.remove();
    },100);
});