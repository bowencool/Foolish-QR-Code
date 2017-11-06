(function () {
    qrcodeReader.callback = function (data) {
        prompt('扫描结果：', data)
    }
    chrome.contextMenus.create({
        title: '生成二维码', // %s表示选中的文字
        contexts: ['selection', 'link'],
        onclick: function (data) {
            var content = data.selectionText || data.linkUrl
            var qr = qrcodeGenerator(4, 'L');
            qr.addData(encodeURIComponent(content));
            qr.make();
            if (qr.createImgTag(8).match(/src="([^"]+)/)) {
                chrome.tabs.create({
                    url: RegExp.$1
                });
            }
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

    /*function notify(title, message) {
        chrome.notifications.create(null, {
            type: 'basic',
            iconUrl: '../img/icon.png',
            title,
            message,
            buttons: [{
                title: '复制到粘贴板'
            }, {
                title: '打开网址'
            }]
        });
        chrome.notifications.onButtonClicked.addListener((id, btnI) => {
            // chrome.notifications.clear(id)
            if (btnI === 0) {
                // 暂不支持复制到clipboard
            }
            if (btnI === 1) {
                // 打开网址
                chrome.tabs.create({ url: message })
            }
        })
    }*/

})();
