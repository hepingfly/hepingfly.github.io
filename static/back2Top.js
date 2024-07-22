// 创建按钮
var btn = document.createElement("button");
btn.id = "backToTopBtn";
btn.setAttribute('aria-label', '返回顶部'); // 增加可访问性

// SVG图标作为按钮内容
btn.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 19V5M5 12l7-7 7 7" stroke="black" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>';

// 按钮CSS
btn.style.cssText = "display: none; position: fixed; bottom: 80px; right: 20px; z-index: 99; border: 2px solid black; background-color: white; border-radius: 10px; cursor: pointer; padding: 7px; outline: none; transition: background-color 0.5s, color 0.5s;";

// SVG样式
var svg = btn.querySelector("svg");
var path = svg.querySelector("path");
path.style.cssText = "transition: stroke 0.5s;";

// 悬停时反转颜色
btn.onmouseover = function() {
  btn.style.backgroundColor = "black";
  path.style.stroke = "white";
};
btn.onmouseout = function() {
  btn.style.backgroundColor = "white";
  path.style.stroke = "black";
};

// 回到顶部
btn.addEventListener("click", function clickHandler() {
  let timer = setInterval(function() {
    var distanceY = window.pageYOffset || document.documentElement.scrollTop;
    if (distanceY === 0) {
      clearInterval(timer);
      btn.style.backgroundColor = "white";
      path.style.stroke = "black";
      return;
    }
    var speed = Math.ceil(distanceY / 16) + 5;
    window.scrollTo(0, distanceY - speed);
  }, 10);
});

// 将按钮添加到body
document.body.appendChild(btn);

// 滚动时检查是否显示按钮
function scrollFunction() {
  var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  btn.style.display = window.innerWidth < 1000 || scrollTop < 20 ? "none" : "block";
}

// 初始检查窗口宽度和滚动位置
scrollFunction();

// 滚动时检查是否显示按钮
window.onscroll = function() {
  scrollFunction();
};

// 当窗口大小改变时检查窗口宽度
window.onresize = function() {
  scrollFunction();
};