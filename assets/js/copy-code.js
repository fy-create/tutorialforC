document.addEventListener('DOMContentLoaded', () => {
  // 查找所有带有代码块的 div
  document.querySelectorAll('div.highlight').forEach((highlightDiv) => {
    const pre = highlightDiv.querySelector('pre'); // 查找 <pre>
    const codeBlock = pre?.querySelector('code'); // 查找 <code>

    if (codeBlock) {
      // 创建 "Copy code" 文本
      const copyText = document.createElement('span');
      copyText.innerText = 'Copy code';
      copyText.className = 'copy-text';

      // 设置点击事件
      copyText.addEventListener('click', () => {
        navigator.clipboard.writeText(codeBlock.textContent).then(
          () => {
            copyText.innerText = 'Copied!';
            setTimeout(() => (copyText.innerText = 'Copy code'), 2000);
          },
          (err) => {
            console.error('Failed to copy: ', err);
          }
        );
      });

      // 添加到代码块
      highlightDiv.style.position = 'relative'; // 确保文本相对定位
      highlightDiv.appendChild(copyText);
    }
  });
});

  

  // document.addEventListener('DOMContentLoaded', () => {
  //   // 查找所有带有代码块的 div
  //   document.querySelectorAll('div.highlight').forEach((highlightDiv) => {
  //     const pre = highlightDiv.querySelector('pre'); // 查找 <pre>
  //     const codeBlock = pre?.querySelector('code'); // 查找 <code>
  
  //     if (codeBlock) {
  //       // 创建 "Copy" 按钮
  //       const button = document.createElement('button');
  //       button.innerText = 'Copy';
  //       button.className = 'copy-button';
  
  //       // 设置按钮点击事件
  //       button.addEventListener('click', () => {
  //         navigator.clipboard.writeText(codeBlock.textContent).then(
  //           () => {
  //             button.innerText = 'Copied!';
  //             setTimeout(() => (button.innerText = 'Copy'), 2000);
  //           },
  //           (err) => {
  //             console.error('Failed to copy: ', err);
  //           }
  //         );
  //       });
  
  //       // 将按钮添加到代码块的父级
  //       highlightDiv.style.position = 'relative'; // 确保按钮相对定位
  //       highlightDiv.appendChild(button);
  //     }
  //   });
  // });
  