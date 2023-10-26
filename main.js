(async () => {
  const audioContext = new AudioContext();
  await audioContext.audioWorklet.addModule('audio-processor.js');

  const audioElement = document.getElementById('myAudio');
  const source = audioContext.createMediaElementSource(audioElement);
  const workletNode = new AudioWorkletNode(audioContext, 'audio-processor');

  source.connect(workletNode);
  workletNode.connect(audioContext.destination);

  const playButton = document.getElementById('playButton');
  const pauseButton = document.getElementById('pauseButton');
  const tempoRange = document.getElementById('tempoRange');
  const pitchRange = document.getElementById('pitchRange');
  const audioInput = document.getElementById('audioInput');

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

audioInput.addEventListener('change', async (event) => {
  const file = event.target.files[0];
  if (file) {
    const fileBuffer = await file.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(fileBuffer);
    audioElement.src = URL.createObjectURL(file);
    audioElement.load();
    const source = audioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(workletNode);
    workletNode.connect(audioContext.destination);
    audioElement.play();
  }
});


  workletInput.addEventListener('change', async (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileReader = new FileReader();
      fileReader.onload = function () {
        workletBlob = new Blob([fileReader.result], { type: 'application/javascript' });
      };
      fileReader.readAsArrayBuffer(file);
    }
  });

})();
// tempoRange.addEventListener('input', () => {
//   // Adjust the tempo based on the input range value
//   workletNode.parameters.get('tempo').value = parseFloat(tempoRange.value);
// });

// pitchRange.addEventListener('input', () => {
//   // Adjust the pitch based on the input range value
//   workletNode.parameters.get('pitch').value = parseFloat(pitchRange.value);
// });


// (async () => {
//   const audioContext = new AudioContext();

//   const workletInput = document.getElementById('workletInput');
//   let workletBlob = null;

//   workletInput.addEventListener('change', async (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const fileReader = new FileReader();
//       fileReader.onload = function () {
//         workletBlob = new Blob([fileReader.result], { type: 'application/javascript' });
//       };
//       fileReader.readAsArrayBuffer(file);

//       // Load the AudioWorklet module from the selected file
//       if (workletBlob) {
//         try {
//           await audioContext.audioWorklet.addModule(URL.createObjectURL(workletBlob));
//           console.log('AudioWorklet module loaded successfully.');
//           initializeAudio(); // Continue with the audio initialization
//         } catch (error) {
//           console.error('Error loading AudioWorklet module:', error);
//         }
//       }
//     }
//   });

//   function initializeAudio() {
//     const playButton = document.getElementById('playButton');
//     const pauseButton = document.getElementById('pauseButton');
//     const tempoRange = document.getElementById('tempoRange');
//     const pitchRange = document.getElementById('pitchRange');
//     const audioInput = document.getElementById('audioInput');
//     const audioElement = document.getElementById('myAudio');

//     playButton.addEventListener('click', () => {
//       audioElement.play();
//     });

//     pauseButton.addEventListener('click', () => {
//       audioElement.pause();
//     });

//     tempoRange.addEventListener('input', () => {
//       // Adjust the tempo based on the input range value
//       // Your workletNode implementation
//     });

//     pitchRange.addEventListener('input', () => {
//       // Your pitch adjustment code
//     });

//     audioInput.addEventListener('change', async (event) => {
//       const file = event.target.files[0];
//       if (file) {
//         const fileBuffer = await file.arrayBuffer();
//         const audioBuffer = await audioContext.decodeAudioData(fileBuffer);
//         audioElement.src = URL.createObjectURL(file);
//         audioElement.load();
//         const source = audioContext.createBufferSource();
//         source.buffer = audioBuffer;
//         // Connect the source to your AudioWorkletNode
//         // Your workletNode implementation
//         audioElement.play();
//       }
//     });
//   }
// })();