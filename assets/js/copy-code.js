document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("pre").forEach((pre) => {
      // 创建复制按钮
      const button = document.createElement("button");
      button.innerText = "Copy";
      button.className = "copy-btn";
      button.style.position = "absolute";
      button.style.top = "10px";
      button.style.right = "10px";
  
      // 为代码块添加包裹容器
      const wrapper = document.createElement("div");
      wrapper.style.position = "relative";
      wrapper.appendChild(pre);
      wrapper.appendChild(button);
      pre.parentNode.replaceChild(wrapper, pre);
  
      // 按钮点击事件
      button.addEventListener("click", () => {
        const code = pre.textContent;
        navigator.clipboard.writeText(code).then(() => {
          button.innerText = "Copied!";
          setTimeout(() => (button.innerText = "Copy"), 2000);
        });
      });
    });
  });
  