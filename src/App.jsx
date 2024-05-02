// import React, { useEffect } from "react";
// import Ball from "./Ball";
// import Paddle from "./Paddle";

// const App = () => {
//   useEffect(() => {
//     const ball = new Ball(document.getElementById("ball"));
//     const playerPaddle = new Paddle(document.getElementById("player-paddle"));
//     const compPaddle = new Paddle(document.getElementById("computer-paddle"));
//     const playerscore = document.getElementById("player-score");
//     const compscore = document.getElementById("computer-score");

//     const update = (time) => {
//       if (lastTime != null) {
//         const delta = time - lastTime;
//         ball.update(delta, [playerPaddle.rect(), compPaddle.rect()]);
//         compPaddle.update(delta, ball.y);
//         // playerPaddle.update(delta, ball.y)
//       }

//       if (isLose()) handleLoose();
//       lastTime = time;
//       window.requestAnimationFrame(update);
//     };

//     const isLose = () => {
//       const rect = ball.rect();
//       return rect?.right >= window.innerWidth || rect?.left <= 0;
//     };

//     const handleLoose = () => {
//       const rect = ball.rect();
//       if (rect?.right >= window.innerWidth) {
//         playerscore.textContent = parseInt(playerscore.textContent) + 1;
//         compPaddle.speed += 0.001
//       } else {
//         compscore.textContent = parseInt(compscore.textContent) + 1;
//         compPaddle.speed -= 0.001
//       }
//       ball.reset();
//       compPaddle.reset();
//     };

//     const onMouseMove = (e) => {
//       playerPaddle.position = (e.clientY / window.innerHeight) * 100;
//     };

//     let lastTime;

//     document.addEventListener("mousemove", onMouseMove);

//     window.requestAnimationFrame(update);

//     return () => {
//       document.removeEventListener("mousemove", onMouseMove);
//     };
//   }, []);

//   return (
//     <>
//       <div className="score">
//         <div id="player-score">0</div>
//         <div id="computer-score">0</div>
//       </div>
//       <div className="ball" id="ball"></div>
//       <div className="paddle left" id="player-paddle"></div>
//       <div className="paddle right" id="computer-paddle"></div>
//     </>
//   );
// };

// export default App;
import React, { useEffect } from "react";
import Ball from "./Ball";
import Paddle from "./Paddle";

const App = () => {
  useEffect(() => {
    const ball = new Ball(document.getElementById("ball"));
    const playerPaddle = new Paddle(document.getElementById("player-paddle"));
    const compPaddle = new Paddle(document.getElementById("computer-paddle"));
    const playerscore = document.getElementById("player-score");
    const compscore = document.getElementById("computer-score");
    const root = document.documentElement;

    // Function to update the hue
    function updateHue() {
      // Get the current value of --hue from CSS
      const currentHue = parseInt(getComputedStyle(root).getPropertyValue("--hue"));
    
      // Increment the hue by a certain amount (for example, 10)
      const newHue = (currentHue + 30) % 360;
    
      // Set the updated hue value back to CSS
      root.style.setProperty("--hue", parseInt(newHue));
    }
    
    const update = () => {
      const delta = Date.now() - lastTime;
      ball.update(delta, [playerPaddle.rect(), compPaddle.rect()]);
      compPaddle.update(delta, ball.y);
      // updateHue()
      // playerPaddle.update(delta, ball.y)
      if (isLose()) handleLoose();
      lastTime = Date.now();
    };

    const isLose = () => {
      const rect = ball.rect();
      return rect?.right >= window.innerWidth || rect?.left <= 0;
    };

    const handleLoose = () => {
      updateHue()
      const rect = ball.rect();
      if (rect?.right >= window.innerWidth) {
        playerscore.textContent = parseInt(playerscore.textContent) + 1;
        compPaddle.speed += 0.003;

      } else {
        compscore.textContent = parseInt(compscore.textContent) + 1;
        compPaddle.speed -= 0.0007;
      }
      ball.reset();
      compPaddle.reset();
    };

    const onMouseMove = (e) => {
      playerPaddle.position = (e.clientY / window.innerHeight) * 100;
    };

    let lastTime = Date.now();

    document.addEventListener("mousemove", onMouseMove);

    const intervalId = setInterval(update, 16); // Adjust interval as needed (60 FPS)

    return () => {
      clearInterval(intervalId);
      document.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <>
      <div className="score">
        <div id="player-score">0</div>
        <div id="computer-score">0</div>
      </div>
      <div className="ball" id="ball"></div>
      <div className="paddle left" id="player-paddle"></div>
      <div className="paddle right" id="computer-paddle"></div>
    </>
  );
};

export default App;
