import React from "react";
import styled from "styled-components";

const Foot = styled.footer`
  width: 100%;
  padding: 1.2rem 0;
  text-align: center;
  color: rgba(255,255,255,0.9);
  margin-top: auto;
`;

const Footer = () => (
  <Foot>
    <div>Feito com ❤️ — Hércules Arthur Nardelli</div>
  </Foot>
);

export default Footer;
