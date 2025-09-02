import React from "react";
import styled, { keyframes } from "styled-components";

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.03); }
  100% { transform: scale(1); }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin: 1.5rem 0;
`;

const Digital = styled.div`
  font-size: 3.5rem;
  font-family: 'Montserrat', sans-serif;
  background: rgba(0,0,0,0.6);
  color: #fff;
  padding: 0.6rem 1.2rem;
  border-radius: 12px;
  box-shadow: 0 6px 18px rgba(0,0,0,0.18);
  animation: ${pulse} 3s ease-in-out infinite;
  font-weight: 600;
`;

const ProgressBar = styled.div`
  width: 260px;
  height: 8px;
  background: rgba(255,255,255,0.12);
  border-radius: 999px;
  overflow: hidden;
`;

const ProgressFill = styled.div`
  height: 100%;
  width: ${(p) => `${Math.round(p * 100)}%`};
  background: linear-gradient(90deg, #ff6b6b, #ff8a6b);
  transition: width 320ms ease;
`;

const Analog = styled.div`
  width: 160px;
  height: 160px;
  border-radius: 50%;
  background: linear-gradient(180deg, rgba(255,255,255,0.06), rgba(0,0,0,0.02));
  display: grid;
  place-items: center;
  box-shadow: inset 0 6px 12px rgba(0,0,0,0.06), 0 8px 20px rgba(0,0,0,0.08);
  position: relative;
`;

const Hand = styled.div`
  position: absolute;
  width: 3px;
  height: 42%;
  background: #fff;
  left: 50%;
  transform-origin: 50% 90%;
  bottom: 50%;
  border-radius: 2px;
  transition: transform 300ms cubic-bezier(.22,.9,.32,1);
  transform: translateX(-50%) rotate(0deg);
`;

const Pin = styled.div`
  position: absolute;
  width: 10px;
  height: 10px;
  background: #fff;
  border-radius: 50%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 2px 6px rgba(0,0,0,0.2);
`;

const formatTime = (time) => {
  const minutes = Math.floor(time / 60).toString().padStart(2, "0");
  const seconds = (time % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
};

const TimerDisplay = ({ time, percent, mode = 'focus' }) => {
  const computedPercent = typeof percent === 'number' ? percent : (mode === 'focus' ? time / (25*60) : mode === 'short' ? time / (5*60) : time / (15*60));
  const secondsAngle = (1 - computedPercent) * 360; // rotate hand based on progress
  return (
    <Wrapper>
      <Analog>
          <Hand style={{ transform: `translateX(-50%) rotate(${secondsAngle}deg)` }} />
          <Pin />
        </Analog>
      <Digital role="status" aria-live="polite">{formatTime(time)}</Digital>
      <ProgressBar role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round((1-computedPercent)*100)}>
        <ProgressFill p={1-computedPercent} />
      </ProgressBar>
    </Wrapper>
  );
};

export default TimerDisplay;
