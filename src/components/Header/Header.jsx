import React from "react";
import styled from "styled-components";

const HeaderWrapper = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.8rem 0;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 1.6rem;
  color: #fff;
  letter-spacing: 0.6px;
  font-weight: 600;
`;

const Header = () => (
  <HeaderWrapper>
    <Title>Tarefas com Pomodoro</Title>
  </HeaderWrapper>
);

export default Header;
