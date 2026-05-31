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
      <nav>
        <div className="box theme-light">Ligth Theme</div>
        <br />

        <div className="box theme-dark">Dark Theme</div>
      </nav>
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
        <div id="goalDiv">
          <h2>Goal</h2>
          <form>
            <label htmlFor="goalInput">How many cigarettes do you want to smoke per day?</label>
            <input id="goalInput" type="number"/>
          </form>
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

function setTheme(themeName, setClassName) {
    localStorage.setItem('theme', themeName);
    setClassName(themeName);
}

function keepTheme(setClassName) {
  const theme = localStorage.getItem('theme');
  if (theme) {
    setTheme(theme, setClassName);
    return;
  }

  const prefersLightTheme = window.matchMedia('(prefers-color-scheme: light)');
  if (prefersLightTheme.matches) {
    setTheme('theme-light', setClassName);
    return;
  }

  setTheme('theme-dark', setClassName);
}
export default App
