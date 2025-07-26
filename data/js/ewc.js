(function () {
  // 檢查是否已經插入過
  if (window.IntelliconWidgetLoaded) return;
  window.IntelliconWidgetLoaded = true;

  // 建立 iframe 元素
  var iframe = document.createElement('iframe');
  iframe.src = 'https://intellicon.app/ewc/2E6utZm';
  iframe.style.position = 'fixed';
  iframe.style.bottom = '20px';
  iframe.style.right = '20px';
  iframe.style.width = '360px';
  iframe.style.height = '540px';
  iframe.style.border = 'none';
  iframe.style.borderRadius = '12px';
  iframe.style.zIndex = '9999';
  iframe.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
  iframe.setAttribute('title', 'Intellicon Chat');

  // 插入到 body 中
  window.addEventListener('load', function () {
    document.body.appendChild(iframe);
  });
})();
