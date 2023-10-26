const audioInput = document.getElementById('audioInput');
(async () => {
  audioInput.addEventListener('change', async (event) => {
    const file = event.target.files[0];
    if (file) {
      const audioContext = new AudioContext();
      await audioContext.audioWorklet.addModule('audio-processor.js');
    
      const audioElement = document.getElementById('myAudio');
      audioElement.src = URL.createObjectURL(file);
      
      let source = audioContext.createMediaElementSource(audioElement);
      let workletNode = new AudioWorkletNode(audioContext, 'audio-processor');

      source.connect(workletNode);
      workletNode.connect(audioContext.destination);

      const playButton = document.getElementById('playButton');
      const pauseButton = document.getElementById('pauseButton');
      const tempoRange = document.getElementById('tempoRange');
      const pitchRange = document.getElementById('pitchRange');

      playButton.addEventListener('click', () => {
        audioElement.play();
      });

      pauseButton.addEventListener('click', () => {
        audioElement.pause();
      });

      tempoRange.addEventListener('input', () => {
          // Adjust the tempo based on the input range value
          workletNode.port.postMessage({ type: 'tempo', value: parseFloat(tempoRange.value) });
      });

      pitchRange.addEventListener('input', () => {
        const pitchValue = parseFloat(pitchRange.value);
        console.log('Pitch Value:', pitchValue);
        workletNode.port.postMessage({ type: 'pitch', value: pitchValue });
      });
    }
  });
})();
