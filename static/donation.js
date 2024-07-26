document.addEventListener("DOMContentLoaded", function() {
    // 创建打赏区域的HTML结构
    const donationHtml = `
<div id="donation-section" class="donation-container" style="display: none;">
    <p>感谢您的支持！</p>
    <img src="https://cdn.jsdelivr.net/gh/hepingfly/images@main/%E5%BE%AE%E4%BF%A1%E8%B5%9E%E8%B5%8F%E7%A0%81.JPG" alt="微信支付二维码" class="qr-code">
    <img src="https://cdn.jsdelivr.net/gh/hepingfly/images@main/%E6%94%AF%E4%BB%98%E5%AE%9D%E6%94%B6%E6%AC%BE%E7%A0%81.jpg" alt="支付宝二维码" class="qr-code">
</div>
<button id="donation-button" class="donation-button">打赏</button>
    `;

    // 将打赏区域的HTML插入到页面底部
    document.body.insertAdjacentHTML('beforeend', donationHtml);

    // CSS样式
    const style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = `
        .donation-container {
            text-align: center;
            padding: 20px;
            border-top: 1px solid #eee;
        }
        .donation-container p {
            margin-bottom: 10px;
        }
        .donation-container img {
            width: 150px;
            height: 150px;
            margin: 10px;
        }
        .donation-button {
            background-color: #4CAF50;
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            margin-bottom: 20px;
        }
        .donation-button:hover {
            background-color: #45a049;
        }
        @media (max-width: 768px) {
            .donation-container img {
                width: 100px;
                height: 100px;
            }
        }
    `;
    document.head.appendChild(style);

    // 获取打赏按钮和打赏区域的DOM元素
    const donationButton = document.getElementById("donation-button");
    const donationSection = document.getElementById("donation-section");

    // 点击打赏按钮切换显示状态
    donationButton.addEventListener("click", function() {
        donationSection.style.display = donationSection.style.display === 'none' ? 'block' : 'none';
    });
});
