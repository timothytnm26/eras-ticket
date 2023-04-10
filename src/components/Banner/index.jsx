import React from "react";
import styled from "styled-components";
import { ERAS } from "../../constants/eras";
import { useState } from "react";
const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
`;
const Banner = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  position: relative;
`;
const EraButton = styled.div`
  background-color: ${(props) => props.bg};
  width: ${(props) => (props.active === true ? `35%` : `${65 / 9}%`)};
  height: calc(100vh);
  color: ${(props) => props.txt};
  opacity: 1;
  transition: all 1s ease-in-out;
  cursor: pointer;
  @media (max-width: 768px) {
    height: calc(40vh);
  }
`;

const ErasBanner = () => {
  const [active, setActive] = useState(9);

  return (
    <Container>
      <Banner>
        {ERAS.map((eras, i) => {
          return (
            <EraButton
              key={i}
              bg={eras.color1}
              txt={eras.color2}
              eras={eras}
              active={active === i}
              onClick={() => {
                setActive(i);
                document.body.setAttribute("data-theme", eras.id);
              }}
            >
              {eras.name}
            </EraButton>
          );
        })}
      </Banner>
    </Container>
  );
};
export default ErasBanner;
