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
  const [smokeTimes, setSmokeTimes] = useState<number[]>([])
  const [smokeTimesString, setsmokeTimesString] = useState<string>('');

  useEffect(() => {
    setsmokeTimesString(getSmokeTimes());
  }, [goal, getUpTime, sleepTime])
  
  function getSmokeTimes(): string {
    if (!getUpTime || !sleepTime || !goal){
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
    let smokeTimesArray: number[] = [];

    for (let i = 0; i < goal; i++){
      addedHours = Math.floor((interval*i)/60);
      addedMinutes = interval*i - addedHours*60;
      newHours = d1Hours + addedHours;
      newMinutes = Math.floor(d1Minutes + addedMinutes);
      newHoursString = String(newHours);
      newMinutesString = String(newMinutes);

      if (newMinutesString.length === 1){
        newMinutesString = newMinutes + '0';
      }

      t += newHoursString + ':' + newMinutesString;
      smokeTimesArray.push(newHours*60 + newMinutes)

      if (i < goal - 1){
        t += ' - '
      }
    }
    setSmokeTimes(smokeTimesArray)
    return t;
  }

  //Time to next smoke
  const [timeToNextSmoke, setTimeToNextSmoke] = useState<string>('');

  useEffect(() => {
    const interval = setInterval(function(){
      const now = new Date();
      const minutes: number = now.getHours()*60 + now.getMinutes();

      let TotalMinutes: number;
     
      let MinutesToNextSmoke: number;

      for(let i = 0; i < smokeTimes.length; i++){
        TotalMinutes = smokeTimes[i];
    
        if (TotalMinutes > minutes){
          MinutesToNextSmoke = TotalMinutes - minutes
          setTimeToNextSmoke(String(MinutesToNextSmoke) + 'min')
          break
        }
      }
    }, 1000)
      return () => clearInterval(interval);
  })

  //Time resisted 
  const [lastSmoke, setLastSmoke] = useState<string>(() => {
    const saved = localStorage.getItem('lastSmoke');
    if (saved) {
      return JSON.parse(saved);
    } else {
      const D = new Date();
      return String(D.getHours()) + ':' + String(D.getMinutes());
    }
  });

  useEffect(() => {
    const D = new Date();
    setLastSmoke(String(D.getHours()) + ':' + String(D.getMinutes()));
    localStorage.setItem('lastSmoke', JSON.stringify(lastSmoke));
  }, [count])

  //Time resisted
  const [timeResisted, setTimeResisted] = useState<string>('0h:00');

  useEffect(() => {
    const interval = setInterval(function(){
      const now = new Date();
      const nowH = now.getHours();
      const nowM = now.getMinutes()
      const minutesNow: number = nowH*60 + nowM;

      const lastH = parseInt(lastSmoke.split(':')[0]);
      const lastM = parseInt(lastSmoke.split(':')[1]);
      const totalMinutesOfLast = lastH*60 + lastM;

      const minutesToLast = minutesNow - totalMinutesOfLast;

      const resistedH = Math.floor(minutesToLast/60);
      const resistedM = minutesToLast - resistedH*60;

      const resistedH_str = String(resistedH);
      let resistedM_str = String(resistedM);

      if (resistedM_str.length === 1){
        resistedM_str = "0" + resistedM_str;
      }


      setTimeResisted(resistedH_str + 'h' + resistedM_str)

    }, 1000)
      return () => clearInterval(interval);
  })

  
  return (
    <>
      <nav>
        <button onClick={() => switchTheme()}><p>Switch Theme</p></button>
      </nav>
      <section id="center">
        <h1>SmokeTrack</h1>
        <p>
          A tracker for smokers trying to quit.
        </p>
        <div className='spacerDiv'></div>
        <div className="hero">
          <div>
            <h2>Cigarettes smoked today</h2>
            <button 
              type="button"
              className="counter"
              onClick={() => setCount((count) => count + 1)}
            >
            {count}
            </button>
            <button 
              type="button"
              className="counter"
              onClick={() => setCount(0)}
            >
            ↺
            </button>
            <div className='spacerDiv'></div>

          </div>

          <div>
            <h2>Time to next smoke</h2>
            <button className='counter' id="timeToNextSmoke">{timeToNextSmoke}</button>

            <h2>Time resisted</h2>
            <button className='counter' id="timeToNextSmoke">{timeResisted}</button>
            
            <div className='spacerDiv'></div>

          </div>
        </div>
      </section>

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
          <div id='smokeSpacingDiv'>
            <h3>Space smokes out each day for your goal.</h3>
            <form id="smokeSpacingForm">
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

            <div>
              <h4>Smoke times:</h4>
              <p>{smokeTimesString}</p> 
            </div>
          </div>
        </div>
      </section>
      <section id='spacer'></section>

    </>
  )
}

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
