document.addEventListener("DOMContentLoaded", function() {
    createTOC();

    const css = `
    .toc {
        position: fixed;
        top: 130px;
        left: 70%;
        transform: translateX(-50%);
        width: 200px;
        border: 1px solid #e1e4e8;
        border-radius: 6px;
        padding: 10px;
        overflow-y: auto;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        max-height: 70vh;
    }
    .toc-title {
        font-weight: bold;
        text-align: center;
        border-bottom: 1px solid #ddd;
        padding-bottom: 8px;
    }
    .toc-end {
        font-weight: bold;
        text-align: center;
        visibility: hidden;
    }
    .toc a {
        display: block;
        color: var(--color-diff-blob-addition-num-text);
        text-decoration: none;
        padding: 5px 0;
        font-size: 14px;
        line-height: 1.5;
        border-bottom: 1px solid #e1e4e8;
    }
    .toc a:last-child {
        border-bottom: none;
    }
    .toc a:hover {
        background-color: var(--color-select-menu-tap-focus-bg);
    }

    @media (max-width: 768px) {
        .toc {
            position: static;
            top: auto;
            left: auto;
            transform: none;
            width: 100%;
            padding: 10px;
            margin-bottom: 20px;
        }
        .toc a {
            padding: 8px 0;
        }
        .toc-title {
            padding-bottom: 5px;
        }
    }
    `;

    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);

    window.onscroll = function() {
        const backToTopButton = document.querySelector('.toc-end');
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            backToTopButton.style.visibility = 'visible';
        } else {
            backToTopButton.style.visibility = 'hidden';
        }
    };

});

function createTOC() {
    const tocElement = document.createElement('div');
    tocElement.className = 'toc';
    const contentContainer = document.getElementById('content');
    if (!contentContainer) {
        console.error('Content container not found');
        return;
    }
    contentContainer.prepend(tocElement);
    const headings = contentContainer.querySelectorAll('h1, h2, h3, h4, h5, h6');
    tocElement.insertAdjacentHTML('afterbegin', '<div class="toc-title">文章目录</div>');
    headings.forEach(heading => {
        if (!heading.id) {
            heading.id = heading.textContent.trim().replace(/\s+/g, '-').toLowerCase();
        }
        const link = document.createElement('a');
        link.href = '#' + heading.id;
        link.textContent = heading.textContent;
        link.className = 'toc-link';
        link.style.paddingLeft = `${(parseInt(heading.tagName.charAt(1)) - 1) * 10}px`;
        tocElement.appendChild(link);
    });
    tocElement.insertAdjacentHTML('beforeend', '<a href="#" class="toc-end" onclick="window.scrollTo({top:0,behavior: \'smooth\'});">Top</a>');
}
