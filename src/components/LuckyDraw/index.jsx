import React from "react";
import styled from "styled-components";
import "./../../index.css";
const LuckyDrawWrapper = styled.div`
  background-color: var(--era-color-2);
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: var(--era-color-1);
  width: 1200px;
  height: 200px;
  transition: all 1s ease-in-out;
`;
const LuckyDraw = () => {
  return (
    <LuckyDrawWrapper>
      <h1>Lucky Draw</h1>
    </LuckyDrawWrapper>
  );
};
export default LuckyDraw;
