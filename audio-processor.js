import { SoundTouch , SimpleFilter } from './soundtouch.js'


// console.log(SoundTouch);

class MyAudioProcessor extends AudioWorkletProcessor {
  constructor() {
      super();
      this.soundTouch = new SoundTouch(); // Initialize SoundTouch
      this.bufferSize = 128; // Adjust buffer size as needed
      this.buffer = new Float32Array(this.bufferSize * 2); // Stereo audio
      this.soundTouch.pitch = 0.6; // Set the initial pitch
      this.soundTouch.tempo = 0.6; // Set the initial tempo
  }

  process(inputs, outputs, parameters) {
      const input = inputs[0];
      const output = outputs[0];
      const leftChannel = input[0];
      const rightChannel = input[1];

      for (let i = 0; i < this.bufferSize; i++) {
          // Process audio for both left and right channels
          this.buffer[i] = leftChannel[i];
          this.buffer[i + this.bufferSize] = rightChannel[i];
      }

      // this.soundTouch.tempo = 0.6;
      // this.soundTouch.pitch = 0.6;

      this.processChunk(this.buffer, this.bufferSize * 2);

      for (let i = 0; i < this.bufferSize; i++) {
          // Set processed audio for both left and right channels
          output[0][i] = this.buffer[i];
          output[1][i] = this.buffer[i + this.bufferSize];
      }

      return true;
  }

  processChunk(buffer, size) {
      // Process the audio chunk using SoundTouch
      // You need to implement this part based on how SoundTouch processes audio
      this.soundTouch.process(buffer, size);
  }

  setTempo(value) {
    console.log(value);
      this.soundTouch.tempo = value;
  }

  setPitch(value) {
      this.soundTouch.pitch = value;
  }
}


registerProcessor('audio-processor', MyAudioProcessor);
// class MyAudioProcessor extends AudioWorkletProcessor {
//   constructor() {
//       super();
//       this.soundTouch = new SoundTouch();
//       this.bufferSize = 8196; // Adjust as needed
//       this.buffer = new Float32Array(this.bufferSize);
//       this.tempo = 1.0; // Default tempo
//       this.pitch = 0.5; // Default pitch
//   }

//   process(inputs, outputs, parameters) {
//       const input = inputs[0];
//       const output = outputs[0];
//       const channel = input[0];

//       // Process audio in chunks
//       let offset = 0;
//       while (offset < channel.length) {
//           const chunkSize = Math.min(channel.length - offset, this.bufferSize);
//           this.buffer.set(channel.subarray(offset, offset + chunkSize));

//           this.soundTouch.tempo = this.tempo;
//           this.soundTouch.pitch = this.pitch;

//           // Process the chunk of audio
//           this.processChunk(this.buffer, chunkSize);

//           // Write the processed audio to the output
//           output[0].set(this.buffer.subarray(0, chunkSize), offset);

//           offset += chunkSize;
//       }

//       return true;
//   }

//   processChunk(buffer, chunkSize) {
//       // Process the chunk of audio using the SoundTouch library
//       // You need to implement this part based on how SoundTouch processes audio
//       this.soundTouch.process(buffer, chunkSize);
//   }

//   setTempo(value) {
//       this.tempo = value;
//   }

//   setPitch(value) {
//       this.pitch = value;
//   }
// }

// class MyAudioProcessor extends AudioWorkletProcessor {
//   constructor() {
//       super();
//       this.soundTouch = new SoundTouch();
//       this.bufferSize = 512; // Adjust as needed
//       this.buffer = new Float32Array(this.bufferSize);
//       this.tempo = 1.0; // Default tempo
//       this.pitch = 1.0; // Default pitch
//   }

//   process(inputs, outputs, parameters) {
//       const input = inputs[0];
//       const output = outputs[0];
//       const channel = input[0];

//       // Process audio in chunks
//       let offset = 0;
//       while (offset < channel.length) {
//           const chunkSize = Math.min(channel.length - offset, this.bufferSize);
//           this.buffer.set(channel.subarray(offset, offset + chunkSize));

//           this.soundTouch.tempo = this.tempo;
//           this.soundTouch.pitch = this.pitch;
          
//           this.soundTouch.putBuffer(this.buffer, chunkSize);

//           const frames = this.soundTouch.receiveSamples(this.buffer, chunkSize);

//           for (let i = 0; i < frames; i++) {
//               output[0][offset + i] = this.buffer[i];
//           }

//           offset += chunkSize;
//       }

//       return true;
//   }

//   setTempo(value) {
//       this.tempo = value;
//   }

//   setPitch(value) {
//       this.pitch = value;
//   }
// }
// class MyAudioProcessor extends AudioWorkletProcessor {
//   constructor() {
//       super();
//       this.soundTouch = new SoundTouch();
//       this.bufferSize = 512; // Adjust as needed
//       this.buffer = new Float32Array(this.bufferSize);
//   }

//   process(inputs, outputs, parameters) {
//       const input = inputs[0];
//       const output = outputs[0];
//       const channel = input[0];

//       // Process audio in chunks
//       let offset = 0;
//       while (offset < channel.length) {
//           const chunkSize = Math.min(channel.length - offset, this.bufferSize);
//           this.buffer.set(channel.subarray(offset, offset + chunkSize));

//           // this.soundTouch.tempo = /* adjust tempo here */;
//           // this.soundTouch.pitch = /* adjust pitch here */;
//                   // Set tempo and pitch based on input range values
//           this.soundTouch.tempo = parseFloat(tempoRange.value);
//           this.soundTouch.pitch = parseFloat(pitchRange.value);
          
//           this.soundTouch.putSamples(this.buffer, chunkSize);

//           const frames = this.soundTouch.receiveSamples(this.buffer, chunkSize);

//           for (let i = 0; i < frames; i++) {
//               output[0][offset + i] = this.buffer[i];
//           }

//           offset += chunkSize;
//       }

//       return true;
//   }
// }

// class MyAudioProcessor extends AudioWorkletProcessor {
//   constructor() {
//       super();
//       this.soundTouch = new SoundTouch();
//       this.bufferSize = 512; // Adjust as needed
//       this.inputBuffer = new FifoSampleBuffer();
//       this.outputBuffer = new FifoSampleBuffer();
//   }

//   process(inputs, outputs, parameters) {
//       const input = inputs[0];
//       const output = outputs[0];
//       const channel = input[0];

//       // Process audio in chunks
//       let offset = 0;
//       while (offset < channel.length) {
//           const chunkSize = Math.min(channel.length - offset, this.bufferSize);
//           this.inputBuffer.putSamples(channel.subarray(offset, offset + chunkSize));

//           this.soundTouch.process(this.inputBuffer, this.outputBuffer, chunkSize);

//           const frames = this.outputBuffer.receiveSamples(this.buffer, chunkSize);

//           for (let i = 0; i < frames; i++) {
//               output[0][offset + i] = this.buffer[i];
//           }

//           offset += chunkSize;
//       }

//       return true;
//   }
// }



// class MyAudioProcessor extends AudioWorkletProcessor {
//   constructor() {
//       super();
//       this.soundTouch = new SoundTouch();
//       this.bufferSize = 512; // Adjust as needed
//       this.buffer = new Float32Array(this.bufferSize);
//       this.port.onmessage = (event) => {
//           if (event.data.type === 'tempo') {
//               this.soundTouch.tempo = event.data.value;
//           } else if (event.data.type === 'pitch') {
//               this.soundTouch.pitch = event.data.value;
//           }
//       };
//   }

//   process(inputs, outputs, parameters) {
//       const input = inputs[0];
//       const output = outputs[0];
//       const channel = input[0];

//       this.buffer.set(channel);
//       this.soundTouch.putSamples(this.buffer);
//       const frames = this.soundTouch.receiveSamples(this.buffer);

//       for (let i = 0; i < frames; i++) {
//           output[0][i] = this.buffer[i];
//       }

//       return true;
//   }
// }

// class MyAudioProcessor extends AudioWorkletProcessor {
//   process(inputs, outputs, parameters) {
//     // Audio processing logic goes here
//     const input = inputs[0];
//     const output = outputs[0];

//     for (let channel = 0; channel < input.length; channel++) {
//       const inputChannel = input[channel];
//       const outputChannel = output[channel];

//       // Process audio samples in real-time
//       for (let i = 0; i < inputChannel.length; i++) {
//         outputChannel[i] = inputChannel[i] * 1; // Example: Reduce volume by half
//       }
//     }

//     return true;
//   }
// }

// registerProcessor('audio-processor', MyAudioProcessor);