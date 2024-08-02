(async function() {
    if (window.audioContext) return; // Prevent multiple injections
  
    const video = document.querySelector('video');
    if (!video) return;
  
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();

    

    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 256;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
  
    const source = audioContext.createMediaElementSource(video);
    source.connect(analyser);
    analyser.connect(audioContext.destination);
    
    //

    function getAudioLevel() {
      analyser.getByteTimeDomainData(dataArray);
  
      let sum = 0;
      for (let i = 0; i < bufferLength; i++) {
        sum += (dataArray[i] - 128) * (dataArray[i] - 128);
      }
      const rms = Math.sqrt(sum / bufferLength);
      const audioLevel = rms; // This is the audio level
  


      window.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const gainNode = window.audioContext.createGain();
      gainNode.connect(window.audioContext.destination);
      gainNode.gain.value = 40;
      window.setAudioVolume = (volume) => {
        
      };
            // Send audio level to background script
            browser.runtime.sendMessage({ audioLevel });

      // Call this function again to continuously get the audio level
      requestAnimationFrame(getAudioLevel);
    }
  
    getAudioLevel();
  })();