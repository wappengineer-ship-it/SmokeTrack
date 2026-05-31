import { useState, useEffect } from 'react'; 
import './App.css'

function App() {
  //Title not changing when I set it in index.html
  useEffect(()=>{
    document.title = "SmokeTrack";
  }, [])

  //Number of cigarettes smoked today
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

  //Goal
  const [goal, setGoal] = useState<number>(()=>{
    const saved = localStorage.getItem('goal');
    if (saved) {
      return JSON.parse(saved);
    } else {
      return 0;
    }
  });

  useEffect(()=>{
    localStorage.setItem('goal', JSON.stringify(goal));
  }, [goal])

  //Get Up Time
  const [getUpTime, setGetUpTime] = useState<string>(()=>{
    const saved = localStorage.getItem('getUpTime');
    if (saved) {
      return JSON.parse(saved);
    } else {
      return null
    }
  });

  useEffect(()=>{
    localStorage.setItem('getUpTime', JSON.stringify(getUpTime));
  }, [getUpTime])

  //Sleep Time
  const [sleepTime, setSleepTime] = useState<string>(()=>{
    const saved = localStorage.getItem('sleepTime');
    if (saved) {
      return JSON.parse(saved);
    } else {
      return null;
    }
  });

  useEffect(()=>{
    localStorage.setItem('sleepTime', JSON.stringify(sleepTime));
  }, [sleepTime])

  //SmokeTimes
  const [smokeTimes, setSmokeTimes] = useState<string>('');

  useEffect(() => {
    setSmokeTimes(getSmokeTimes());
  }, [goal, getUpTime, sleepTime])
  
  function getSmokeTimes(): string {
    if (!getUpTime || !sleepTime){
      return '';
    }
    var d1 = new Date('2026-05-31:' + getUpTime + '.000') //Any date for now
    var d2 = new Date('2026-05-31:' + sleepTime + '.000')

    const d1Hours: number = d1.getHours();
    const d2Hours: number = d2.getHours();
    const d1Minutes: number = d1.getMinutes();
    const d2Minutes: number = d2.getMinutes();

    const totalminutes = Math.abs((d2Hours*60 + d2Minutes) - (d1Hours*60+d1Minutes));
    const interval: number = totalminutes/(goal-1);
    

    let t: string = '';

    let addedHours: number;
    let addedMinutes: number;
    let newHours: number;
    let newMinutes: number;
    let newHoursString: string;
    let newMinutesString: string;

    for (let i = 0; i < goal; i++){
      addedHours = Math.floor((interval*i)/60);
      addedMinutes = interval*i - addedHours*60;
      newHours = d1Hours + addedHours;
      newMinutes = d1Minutes + addedMinutes;
      newHoursString = String(newHours);
      newMinutesString = String(newMinutes);

  

      if (String(newMinutes).length === 1){
        newMinutesString = newMinutes + '0';
      }

      t += newHoursString + ':' + newMinutesString;

      if (i < goal - 1){
        t += ' - '
      }
      //t += new Date(d1 + interval*i).getMinutes()
    }
    return t;
  }

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

      <section id="goalSection">
        <div id="goalDiv">
          <h2>Goal</h2>
          <form>
            <label htmlFor="goalInput">How many cigarettes do you want to smoke per day?</label>
            <input 
              id="goalInput" 
              type="number"
              onChange={(e:any)=>setGoal(e.target.value)}
              value={goal}
            />
          </form>
        </div>
        <div id="smokeSpacing">
          <h2>Smoke spacing</h2>
          <p>Space   smokes out each day for your goal.</p>
          <form>
            <label htmlFor="getUpInput">What time did you get up?</label>
            <input 
              id="getUpInput" 
              type="time"
              onChange={(e:any)=>setGetUpTime(e.target.value)}
              value={getUpTime}
            />
            <br/>
            <label htmlFor="sleepInput">What time will you go to bed?</label>
            <input 
              id="sleepInput" 
              type="time"
              onChange={(e:any)=>setSleepTime(e.target.value)}
              value={sleepTime}

            />
          </form>

          <div>Smoke times: {smokeTimes}
          </div>
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
