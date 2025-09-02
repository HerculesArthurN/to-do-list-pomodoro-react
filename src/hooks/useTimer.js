import { useState, useEffect, useRef } from "react";

const MODES = {
  focus: 25 * 60,
  short: 5 * 60,
  long: 15 * 60,
};

const useTimer = () => {
  const [time, setTime] = useState(MODES.focus);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState("focus");
  const intervalRef = useRef(null);
  // audio refs pointing to files in public/sounds
  const startAudioRef = useRef(typeof Audio !== 'undefined' ? new Audio('/sounds/start.mp3') : null);
  const pauseAudioRef = useRef(typeof Audio !== 'undefined' ? new Audio('/sounds/pause.mp3') : null);
  const endAudioRef = useRef(typeof Audio !== 'undefined' ? new Audio('/sounds/end.mp3') : null);

  useEffect(() => {
    setTime(MODES[mode]);
  }, [mode]);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  // play sound helpers (play may return a promise)
  const play = (audio) => {
    if (!audio) return;
    try {
      const p = audio.play();
      if (p && typeof p.then === "function") p.catch(() => {});
    } catch (e) {
      // ignore play errors (user gesture required in some browsers)
    }
  };

  const start = () => setIsRunning(true);
  const pause = () => setIsRunning(false);
  const reset = () => setTime(MODES[mode]);

  // trigger sounds when starting/pausing via the hook API
  // use refs to avoid recreating audio objects on each render
  const startWithSound = () => {
    setIsRunning(true);
    play(startAudioRef.current);
  };

  const pauseWithSound = () => {
    setIsRunning(false);
    play(pauseAudioRef.current);
  };

  const resetWithSound = () => {
    setTime(MODES[mode]);
    // no sound on reset by default
  };

  // when time reaches 0 while running, stop and play end sound
  useEffect(() => {
    if (time === 0 && isRunning) {
      setIsRunning(false);
      play(endAudioRef.current);
      clearInterval(intervalRef.current);
    }
  }, [time, isRunning]);

  const total = MODES[mode];
  const percent = total > 0 ? time / total : 0;

  // expose sound-enabled start/pause while keeping original names for compatibility
  return {
    time,
    isRunning,
    start: startWithSound,
    pause: pauseWithSound,
    reset: resetWithSound,
    mode,
  setMode,
  total,
  percent,
  };
};

export default useTimer;
