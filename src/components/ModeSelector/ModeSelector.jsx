import React from "react";
import styled from "styled-components";
import { theme } from "../../styles/theme";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin: 1rem 0;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  font-size: 1.2rem;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  background: ${({ active }) => (active ? theme.colors.primary : "#ccc")};
  color: #fff;
`;

const MODES = ["focus", "short", "long"];

const ModeSelector = ({ mode, setMode }) => (
  <Wrapper>
    {MODES.map((m) => (
      <Button key={m} active={mode === m} onClick={() => setMode(m)}>
        {m === "focus" ? "Foco" : m === "short" ? "Curto" : "Longo"}
      </Button>
    ))}
  </Wrapper>
);

export default ModeSelector;
