(function () {
    chrome.contextMenus.create({
        title: '生成二维码', // %s表示选中的文字
        contexts: ['selection', 'link'],
        onclick: function (data) {
            var content = data.selectionText || data.linkUrl
            var rezWin = window.open('', '', 'width=360,height=390,top=200,left=500')
            rezWin.document.title = '生成结果'
            var div = document.createElement('div')
            // https://github.com/davidshimjs/qrcodejs
            new QRCode(div, {
                width: 328,
                height: 328,
                text: content,
            });
            rezWin.document.body.appendChild(div);
            rezWin.focus()
        }
    })
    chrome.contextMenus.create({
        title: '扫描图片中的二维码',
        contexts: ['image'],
        onclick: function (data) {
            console.log(data.srcUrl)
            qrcodeReader.decode(data.srcUrl)
        }
    })
    qrcodeReader.callback = function (data) {
        prompt('扫描结果：', data)
    }
})();
