import React from "react";
import styled from "styled-components";
import { theme } from "../../styles/theme";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const Button = styled.button`
  padding: 0.5rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  background: ${theme.colors.primary};
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
`;

const TimerControls = ({ isRunning, start, pause, reset }) => (
  <Wrapper>
    {!isRunning ? (
      <Button onClick={start}>Começar</Button>
    ) : (
      <Button onClick={pause}>Pausar</Button>
    )}
    <Button onClick={reset}>Zerar</Button>
  </Wrapper>
);

export default TimerControls;
