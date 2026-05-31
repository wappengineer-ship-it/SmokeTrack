import { useState, useEffect } from 'react'; 
import './App.css'

function App() {
  useEffect(()=>{
    document.title = "SmokeTrack";
  }, [])

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

  //const [className, setClassName] = useState<string>("theme-dark");
  return (
    <>
      <nav>
        <button onClick={() => switchTheme()}><p>Switch Theme</p></button>
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
}//identify the toggle switch HTML element

//function that changes the theme, and sets a localStorage variable to track the theme between page loads
function switchTheme() {
  let theme = localStorage.getItem('theme');

  if (theme === 'dark' || !theme){
    localStorage.setItem('theme', 'light');

  } else {
    localStorage.setItem('theme', 'dark');
  }
   
  setTheme();
}
function setTheme () {
  const theme = localStorage.getItem('theme');
  if (theme === 'light'){
    document.documentElement.setAttribute('data-theme', 'light');
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
}
setTheme();

export default App
