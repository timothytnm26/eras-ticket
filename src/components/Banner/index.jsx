import React, { useEffect } from "react";
import styled from "styled-components";
import { ERAS } from "../../data/eras";
import { useState } from "react";
import "./../../index.css";
const Container = styled.div`
  width: 100%;
  max-height: 100vh;
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
  box-sizing: border-box;
  border-width: ${(props) =>
    props.active === true && props.isRunning === true ? `4px` : "none"};
  border-style: ${(props) =>
    props.active === true && props.isRunning === true ? `solid` : "none"};
  filter: ${(props) =>
    props.isRunning === false
      ? ""
      : props.active === true
      ? ""
      : "grayscale(100%)"};
  background-image: ${(props) =>
    `url(${
      props.isRunning === false
        ? props.isRandomAlbum === false
          ? props.eras.taylor
          : props.active === false
          ? props.taylor
          : ""
        : props.active === true
        ? props.taylor
        : ""
    }Bg.png)`};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-blend-mode: luminosity;
  user-select: none;
  padding: 10px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  font-family: ${(props) => props.eras.font};
  background-color: ${(props) => props.bg};
  width: ${(props) =>
    props.isRandomAlbum === false
      ? ` 10%`
      : props.active === true
      ? `50%`
      : `${50 / 9}%`};
  height: calc(100vh);
  color: ${(props) => props.txt};
  cursor: pointer;
`;
const AlbumName = styled.div`
  color: ${(props) => (props.isRandomAlbum === false ? "white" : "")};
  z-index: 1;
  user-select: none;
  font-size: 45px !important;
  writing-mode: ${(props) =>
    props.active === false || props.isRandomAlbum === false
      ? "vertical-lr"
      : "horizontal-tb"};
  position: ${(props) => (props.active === false ? "absolute" : "relative")};
  top: ${(props) => (props.active === false ? "50%" : "0")};
  left: ${(props) => (props.active === false ? "50%" : "0")};
  height: ${(props) => (props.active === false ? "100%" : "")};
  transform: ${(props) =>
    props.active === false ? "translate(-50%, -50%)" : "translate(0, 0)"};
`;
const Tracks = styled.div`
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  user-select: none;
  max-height: 100vh;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
`;
const Track = styled.div`
  user-select: none;
  font-size: ${(props) => (props.trackActive === true ? "20px" : "14px")};
  font-weight: ${(props) => (props.trackActive === true ? "700" : "300")};
`;
const TaylorSwift = styled.img`
  display: ${(props) => (props.active === false ? "none" : "block")};
  position: absolute;
  z-index: 0;
  height: ${(props) => (props.isRandomAlbum === false ? "300px" : "200px")};
  left: 50%;
  bottom: 0;
  transform: translate(-50%, 0);
  user-select: none;
  opacity: 0.5;
`;
const Random = styled.div`
  display: ${(props) => (props.randomButton === false ? "none" : "block")};
  user-select: none;
  cursor: pointer;
  position: absolute;
  z-index: 3;
  width: 100px;
  height: 100px;
  left: 50%;
  bottom: 5%;
  transform: translate(-50%, -50%);
  background-color: transparent;
  border-radius: 50%;
  font-family: "Midnights";
  line-height: 100px;
  font-size: 50px;
`;
const ErasBanner = () => {
  const [active, setActive] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [isTrackRunning, setIsTrackRunning] = useState(false);
  const [isRandomAlbum, setIsRandomAlbum] = useState(false);
  const [intervalDuration, setIntervalDuration] = useState(200);
  const [albumTracks, setAlbumTracks] = useState([]);
  const [trackActive, setTrackActive] = useState(null);
  const [randomButton, setRandomButton] = useState(true);
  const handleClick = () => {
    if (!isRunning) {
      setIsRunning(true);
      setIntervalDuration(200);
      setActive(null); // Reset the active index
    }
    if (isRandomAlbum) {
      setIsRandomAlbum(false);
    }
    setRandomButton(false);
  };
  useEffect(() => {
    if (isRandomAlbum) {
      setAlbumTracks(ERAS[active].tracks);
      setTrackActive(ERAS[active].tracks.items[0]);
      setIsTrackRunning(true);
      setIntervalDuration(200);
    }
  }, [isRandomAlbum]);
  useEffect(() => {
    if (isTrackRunning === true) {
      const interval = setInterval(() => {
        const randomIndex = Math.floor(
          Math.random() * albumTracks.items.length
        );
        setTrackActive(albumTracks.items[randomIndex]);
      }, intervalDuration);
      setTimeout(() => {
        clearInterval(interval);
        // Select a final element after 10 seconds
        const finalIndex = Math.floor(Math.random() * 10);
        setTrackActive(albumTracks.items[finalIndex]);
        setIsTrackRunning(false);
        setRandomButton(true);
      }, 10000);
      const intervalDurationTimeout = setInterval(() => {
        setIntervalDuration((prevDuration) => prevDuration + 100);
      }, 200);
      return () => {
        clearInterval(interval);
        clearInterval(intervalDurationTimeout);
      };
    }
  }, [isTrackRunning]);
  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * 10);
        setActive(randomIndex);
      }, intervalDuration);

      setTimeout(() => {
        clearInterval(interval);
        // Select a final element after 10 seconds
        const finalIndex = Math.floor(Math.random() * 10);
        setActive(finalIndex);
        setIsRunning(false);
        setIsRandomAlbum(true);
      }, 10000);
      const intervalDurationTimeout = setInterval(() => {
        setIntervalDuration((prevDuration) => prevDuration + 100);
      }, 200);
      return () => {
        clearInterval(interval);
        clearInterval(intervalDurationTimeout);
      };
    }
  }, [isRunning]);
  return (
    <Container>
      <Banner>
        {ERAS.map((eras, i) => {
          return (
            <EraButton
              taylor={eras.taylor}
              isRandomAlbum={isRandomAlbum}
              isRunning={isRunning}
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
              <AlbumName active={active === i} isRandomAlbum={isRandomAlbum}>
                <a
                  href={trackActive !== null ? eras.sharingInfo.shareUrl : ""}
                  target="_blank"
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                  }}
                >
                  {eras.name}
                </a>
              </AlbumName>
              <Tracks>
                {active === i &&
                  isRandomAlbum === true &&
                  trackActive !== null &&
                  eras.tracks.items.map((track, i) => {
                    return (
                      <Track key={i} trackActive={track === trackActive}>
                        {track.track.name}
                      </Track>
                    );
                  })}
              </Tracks>
              {/* <TaylorSwift src={eras.taylor} isRandomAlbum={isRandomAlbum} /> */}
            </EraButton>
          );
        })}
        <Random onClick={handleClick} randomButton={randomButton}>
          <img
            src="./images/erasParty.png"
            alt="erasParty"
            style={{
              height: "80px",
            }}
          />
        </Random>
      </Banner>
    </Container>
  );
};
export default ErasBanner;
