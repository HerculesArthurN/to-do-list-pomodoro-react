import React from "react";
import Header from "./components/Header/Header";
import ModeSelector from "./components/ModeSelector/ModeSelector";
import TimerDisplay from "./components/TimerDisplay/TimerDisplay";
import TimerControls from "./components/TimerControls/TimerControls";
import TaskList from "./components/TaskList/TaskList";
import useTimer from "./hooks/useTimer";
import Footer from "./components/Footer/Footer";

const App = () => {
  const { time, isRunning, start, pause, reset, mode, setMode, percent } = useTimer();

  return (
    <>
  <Header mode={mode} isRunning={isRunning} time={time} setMode={setMode} />
      <ModeSelector mode={mode} setMode={setMode} />
  <TimerDisplay time={time} percent={percent} mode={mode} />
      <TimerControls
        isRunning={isRunning}
        start={start}
        pause={pause}
        reset={reset}
      />
      <TaskList />
  <Footer />
    </>
  );
};

export default App;
