document.addEventListener("DOMContentLoaded", function() {
    // 创建打赏区域的HTML结构
    const donationSectionHtml = `
<div id="donation-section" class="donation-container" style="display: none;">
    <p>感谢您的支持！</p>
    <img src="https://cdn.jsdelivr.net/gh/hepingfly/images@main/%E5%BE%AE%E4%BF%A1%E8%B5%9E%E8%B5%8F%E7%A0%81.JPG" alt="微信支付二维码" alt="微信支付二维码" class="qr-code">
    <img src="https://cdn.jsdelivr.net/gh/hepingfly/images@main/%E6%94%AF%E4%BB%98%E5%AE%9D%E6%94%B6%E6%AC%BE%E7%A0%81.jpg" alt="支付宝二维码" class="qr-code">
</div>
    `;

    // 创建打赏按钮的DOM元素
    const donationButton = document.createElement('button');
    donationButton.textContent = '打赏'; // 设置按钮文本
    donationButton.className = 'donation-button'; // 设置按钮类名

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
            display: block; /* 使按钮独占一行 */
            margin: 20px auto; /* 水平居中 */
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

    // 获取页面上你希望按钮插入的div元素
    const targetDiv = document.querySelector('#postBody'); // 确保页面中有id为targetDiv的元素

    // 将打赏区域的HTML插入到目标div后面
    targetDiv.insertAdjacentHTML('afterend', donationSectionHtml);

    // 将打赏按钮插入到打赏区域之后
    targetDiv.insertAdjacentElement('afterend', donationButton);

    // 点击打赏按钮切换显示状态
    donationButton.addEventListener("click", function() {
        const donationSection = document.getElementById("donation-section");
        donationSection.style.display = donationSection.style.display === 'none' ? 'block' : 'none';
    });
});
