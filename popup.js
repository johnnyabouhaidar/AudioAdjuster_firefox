browser.runtime.onMessage.addListener((message) => {
    if (message.audioLevel !== undefined) {
      document.getElementById('audioLevel').textContent = message.audioLevel.toFixed(2);
    }
  });