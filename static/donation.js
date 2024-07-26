// donation.js
document.addEventListener("DOMContentLoaded", function() {
    // 创建打赏区域的HTML结构
    const donationHtml = `
<div id="donation-section" class="donation-container">
    <h3>支持作者</h3>
    <p>如果你觉得这篇文章对你有帮助，可以通过以下方式支持作者：</p>
    <div class="qr-codes">
        <div class="qr-code">
            <img src="https://cdn.jsdelivr.net/gh/hepingfly/images@main/%E5%BE%AE%E4%BF%A1%E8%B5%9E%E8%B5%8F%E7%A0%81.JPG" alt="微信支付二维码" class="qr-image">
            <div class="qr-label">微信支付</div>
        </div>
        <div class="qr-code">
            <img src="https://cdn.jsdelivr.net/gh/hepingfly/images@main/%E6%94%AF%E4%BB%98%E5%AE%9D%E6%94%B6%E6%AC%BE%E7%A0%81.jpg" alt="支付宝二维码" class="qr-image">
            <div class="qr-label">支付宝</div>
        </div>
    </div>
</div>
    `;

    // 将打赏区域的HTML插入到页面底部
    document.body.insertAdjacentHTML('beforeend', donationHtml);

    const donationSection = document.getElementById("donation-section");

    // 检查本地存储，如果用户选择不再显示，则隐藏打赏区域
    const showDonation = localStorage.getItem("showDonation");
    if (showDonation === "false") {
        donationSection.style.display = "none";
    }

    // 点击打赏区域后隐藏，并设置本地存储不再显示
    donationSection.addEventListener("click", function() {
        localStorage.setItem("showDonation", "false");
        donationSection.style.display = "none";
    });
});

// 动态添加CSS样式
var style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = `
.donation-container {
    text-align: center;
    padding: 1em;
    border-top: 1px solid #eee;
}

.donation-container h3 {
    margin-top: 0;
}

.donation-container p {
    margin-bottom: 1em;
}

.qr-codes {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
}

.qr-code {
    margin: 0.5em;
    flex-basis: calc(50% - 1em); /* 减去间距，适应两列布局 */
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    border-radius: 4px;
    overflow: hidden;
}

.qr-image {
    width: 100%;
    height: auto;
    margin-bottom: 0.5em; /* 留出标签空间 */
}

.qr-label {
    padding: 0.2em;
    background-color: rgba(0,0,0,0.05);
    text-align: center;
}

@media (max-width: 768px) {
    .qr-code {
        flex-basis: 100%; /* 在小屏幕上，每个二维码占满一行 */
    }
}
`;
document.head.appendChild(style);