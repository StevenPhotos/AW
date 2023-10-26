import { SoundTouch , SimpleFilter } from './soundtouch.js'

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

      this.soundTouch.tempo = 0.6;
      this.soundTouch.pitch = 0.6;

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
