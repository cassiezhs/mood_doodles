import React, { useState } from 'react';
import Sketch from 'react-p5';
import * as Tone from 'tone';  // Import Tone.js for sound

function App() {
  const [mood, setMood] = useState('happy');  // State for the current mood
  let synth = new Tone.Synth().toDestination();  // Create a synthesizer and connect it to the audio output

  // Mood settings: title, brush color, and sound frequency for each mood
  const moodSettings = {
    happy: { color: [255, 0, 0], title: 'Please draw a happy apple', soundFreq: 600 },  // Red brush, higher pitch for happy
    sad: { color: [255, 255, 0], title: 'Please draw a sad pear', soundFreq: 200 },     // Yellow brush, lower pitch for sad
    angry: { color: [255, 0, 0], title: 'Please draw an angry orange', soundFreq: 900 }, // Red brush, aggressive high pitch for angry
    calm: { color: [0, 0, 255], title: 'Please draw a calm lake', soundFreq: 400 },      // Blue brush, soothing tone for calm
  };

  // Handle mood change when dropdown value changes
  const handleMoodChange = (event) => {
    setMood(event.target.value);  // Update the selected mood
  };

  // p5.js setup function
  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(600, 400).parent(canvasParentRef);  // Create the canvas
    p5.background(255);  // Set initial background to white
  };

  // p5.js draw function with sound generation
  const draw = (p5) => {
    if (p5.mouseIsPressed) {
      const brushColor = moodSettings[mood].color;  // Get brush color based on mood
      p5.stroke(...brushColor);  // Set brush color
      p5.strokeWeight(5);  // Set brush thickness
      p5.line(p5.pmouseX, p5.pmouseY, p5.mouseX, p5.mouseY);  // Draw brush stroke

      // Play sound when drawing
      const freq = moodSettings[mood].soundFreq;  // Get frequency based on mood
      synth.triggerAttackRelease(freq, '8n');  // Trigger a note with the selected frequency
    }
  };

  return (
    <div>
      <h1>{moodSettings[mood].title}</h1>  {/* Display mood-specific title */}

      {/* Dropdown for selecting mood */}
      <select value={mood} onChange={handleMoodChange}>
        <option value="happy">Happy</option>
        <option value="sad">Sad</option>
        <option value="angry">Angry</option>
        <option value="calm">Calm</option>
      </select>

      {/* p5.js Sketch Component */}
      <Sketch setup={setup} draw={draw} />
    </div>
  );
}

export default App;
