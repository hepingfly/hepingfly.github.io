function createBusuanziContainer(id, position, text) {
    var container = document.createElement('div');
    container.id = id;
    container.style.display = 'none';
    container.style.cssText = 'float:left;margin-top:8px;font-size:small;';
    container.innerHTML = text + '<span id="' + id + '"></span>次';
    document.body.insertAdjacentElement(position, container);
}

function createBSZ() {
    var postBody = document.getElementById('postBody');
    if (postBody) {
        createBusuanziContainer('busuanzi_container_page_pv', 'postBody', '本文浏览量');
    }

    var runday = document.getElementById('runday');
    if (runday) {
        createBusuanziContainer('busuanzi_container_site_pv', 'runday', '总浏览量');
    }
}

document.addEventListener("DOMContentLoaded", function() {
    createBSZ();
    var script = document.createElement('script');
    script.src = '//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js';
    script.async = true; // 异步加载脚本
    document.head.appendChild(script);
});
