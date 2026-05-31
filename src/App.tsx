import { useState, useEffect } from 'react'; 
import './App.css'

function App() {
  const [count, setCount] = useState<number>(()=>{
    const saved = localStorage.getItem('count');
    if (saved) {
      return JSON.parse(saved);
    } else {
      return 0;
    }
  });

  useEffect(()=>{
    localStorage.setItem('count', JSON.stringify(count));
  }, [count])

  return (
    <>
      <section id="center">
        <div className="hero">
          <h1>SmokeTrack</h1>
          <p>
            A tracker for smokers trying to quit.
          </p>
        </div>
        <button
          type="button"
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Cigarettes smoked today: {count}
        </button>
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <h2>Documentation</h2>
          <p>Your questions, answered</p>
        </div>
        <div id="social">
          <h2>Connect with us</h2>
          <p>Join the Vite community</p>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
