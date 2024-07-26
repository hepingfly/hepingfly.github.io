document.addEventListener("DOMContentLoaded", function() {
    // 创建打赏按钮和文本的HTML结构
    const buttonAndTextHtml = `
<button id="donation-button" class="donation-button">打赏</button>
<div id="donation-text" style="text-align: center; margin: 10px auto;">
    <p>感谢您的支持！</p>
</div>
`;

    // 创建打赏区域的HTML结构
    const donationSectionHtml = `
<div id="donation-section" class="donation-container" style="display: none;">
    <img src="https://cdn.jsdelivr.net/gh/hepingfly/images@main/%E5%BE%AE%E4%BF%A1%E8%B5%9E%E8%B5%8F%E7%A0%81.JPG" alt="微信支付二维码" class="qr-code">
    <img src="https://cdn.jsdelivr.net/gh/hepingfly/images@main/%E6%94%AF%E4%BB%98%E5%AE%9D%E6%94%B6%E6%AC%BE%E7%A0%81.jpg" alt="支付宝二维码" class="qr-code">
</div>
`;

    // CSS样式
    const style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = `
        .donation-container {
            text-align: center;
            padding: 20px;
            border-top: 1px solid #eee;
        }
        .qr-code {
            width: 300px;
            height: 300px;
            margin: 20px;
        }
        .donation-button {
            background-color: #4CAF50;
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            display: block;
            margin: 0 auto 20px; /* 水平居中并添加底部外边距 */
        }
        .donation-button:hover {
            background-color: #45a049;
        }
        #donation-text p {
            display: inline-block;
            margin: 0;
        }
        @media (max-width: 768px) {
            .qr-code {
                width: 100px;
                height: 100px;
            }
        }
    `;
    document.head.appendChild(style);

    // 获取页面上你希望按钮插入的div元素
    const targetDiv = document.querySelector('#postBody'); // 确保页面中有id为targetDiv的元素

    // 将打赏按钮和文本的HTML插入到目标div里面
    targetDiv.insertAdjacentHTML('beforeend', buttonAndTextHtml);

    // 将打赏区域的HTML插入到按钮的下方
    targetDiv.insertAdjacentHTML('afterend', donationSectionHtml);

    // 点击打赏按钮切换显示状态
    const donationButton = document.getElementById("donation-button");
    const donationSection = document.getElementById("donation-section");
    donationButton.addEventListener("click", function() {
        donationSection.style.display = donationSection.style.display === 'block' ? 'none' : 'block';
    });
});
