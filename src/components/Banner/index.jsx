import React from "react";
import styled from "styled-components";
import { ERAS } from "../../data/eras";
import { useState } from "react";
import LuckyDraw from "../LuckyDraw";

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
  position: relative;
  display: flex;
  font-family: ${(props) => props.eras.font};
  background-color: ${(props) => props.bg};
  width: ${(props) => (props.active === true ? `100%` : `10%`)};
  //width: ${(props) => (props.active === true ? `35%` : `${65 / 9}%`)};
  height: calc(100vh);
  color: ${(props) => props.txt};
  opacity: 1;
  transition: all 1s ease-in-out;
  cursor: pointer;
  @media (max-width: 768px) {
    height: calc(40vh);
  }
`;
const AlbumName = styled.span`
  text-align: center;
  vertical-align: middle;
  height: 200px;
  width: 100%;
  font-size: 100px !important;
  transform: translate(-50%, -50%) ;
  overflow: hidden;
`;
const Tracks = styled.div`
  font-size: 26px;
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
              <AlbumName>{eras.name}</AlbumName>
              <Tracks>
                {active === i &&
                  eras.tracks.items.map((track) => {
                    return <p>{track.track.name}</p>;
                  })}
              </Tracks>
            </EraButton>
          );
        })}
      </Banner>
    </Container>
  );
};
export default ErasBanner;
