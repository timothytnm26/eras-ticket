import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import useSound from 'use-sound';
import mayHem from './mayHem.mp3';
import bingo from './bingo.mp3';
import { ERAS } from "../../data/eras";
import { useState } from "react";
import "./../../index.css";
import { Star1, Star2, Star3, Star4, Star5, Star6 } from "../Stars";
import ErasParty from "../ErasParty";
import Confetti from "react-confetti";
const ALBUM_TIME = 10000;
const TRACK_TIME = 5000;
const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
`;
const Banner = styled.div`
  width: 100%;
  max-height: 98vh;
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
    `url(${props.isRunning === false
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
  font-family: ${(props) => props.eras.font};
  background-color: ${(props) => props.bg};
  width: ${(props) =>
    props.isRandomAlbum === false
      ? ` 10%`
      : props.active === true
        ? `50%`
        : `${50 / 9}%`};
  height: 100vh;
  color: ${(props) => props.txt};
  cursor: pointer;
`;
const AlbumName = styled.div`
  color: ${(props) => (props.isRandomAlbum === false ? "white" : "")};
  z-index: 1;
  user-select: none;
  font-size: ${(props) => (props.active ? "50px" : "45px")} !important;
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
  filter: ${(props) =>
    props.active === true && props.isRandomAlbum === false
      ? "drop-shadow(0 0 13px #fffdef)"
      : ""};
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
  position: relative;
  user-select: none;
  font-size: ${(props) => (props.trackActive === true ? "25px" : "16px")};
  font-weight: ${(props) => (props.trackActive === true ? "700" : "300")};
  z-index: ${(props) => (props.trackActive === true ? "99" : "0")};
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  .star-1,
  .star-2,
  .star-3 {
    filter: drop-shadow(0 0 5px ${(props) => props.color});
    z-index: 3;
    height: auto;
    width: 10px;
    display: ${(props) => (props.trackActive === true ? "block" : "none")};
  }
  .star-1 {
    left: 100%;
    width: 26px;
    transition: all 1s cubic-bezier(0.05, 0.83, 0.43, 0.96);
  }

  .star-2 {
    left: 0%;
    width: 13px;
    transform: translateY(20%);
    transition: all 1s cubic-bezier(0, 0.4, 0, 1.01);
  }
  .star-3 {
    left: 0%;
    width: 19px;
    transform: translateY(-20%);
    transition: all 1s cubic-bezier(0, 0.4, 0, 1.01);
  }
  .fil0 {
    fill: ${(props) => props.color};
  }
`;
// const TaylorSwift = styled.img`
//   display: ${(props) => (props.active === false ? "none" : "block")};
//   position: absolute;
//   z-index: 0;
//   height: ${(props) => (props.isRandomAlbum === false ? "300px" : "200px")};
//   left: 50%;
//   bottom: 0;
//   transform: translate(-50%, 0);
//   user-select: none;
//   opacity: 0.5;
// `;
const Random = styled.div`
  --glow-color: rgb(217, 176, 255);
  --glow-spread-color: rgba(191, 123, 255, 0.781);
  --enhanced-glow-color: rgb(231, 206, 255);
  --btn-color: rgb(100, 61, 136);
  display: ${(props) => (props.randomButton === false ? "none" : "block")};
  user-select: none;
  cursor: pointer;
  position: absolute;
  z-index: 3;
  width: 60px;
  height: auto;
  transform: translate(-50%, -50%);
  background-color: transparent;
  border-radius: 50%;
  font-family: "Midnights";
  line-height: 100px;
  font-size: 50px;
  .star-1,
  .star-2,
  .star-3,
  .star-4,
  .star-5,
  .star-6 {
    position: absolute;
    z-index: -5;
    height: auto;
    top: 50%;
    left: 50%;
    width: 10px;
    transform: translate(-50%, -50%);
  }
  .star-1 {
    transition: all 1s cubic-bezier(0.05, 0.83, 0.43, 0.96);
  }

  .star-2 {
    transition: all 1s cubic-bezier(0, 0.4, 0, 1.01);
  }

  .star-3 {
    transition: all 1s cubic-bezier(0, 0.4, 0, 1.01);
  }

  .star-4 {
    transition: all 0.8s cubic-bezier(0, 0.4, 0, 1.01);
  }

  .star-5 {
    transition: all 0.6s cubic-bezier(0, 0.4, 0, 1.01);
  }

  .star-6 {
    transition: all 0.8s ease;
  }

  :hover {
    background: transparent;
    filter: drop-shadow(0 0 7px #fffdef);
    .star-1,
    .star-2,
    .star-3,
    .star-4,
    .star-5,
    .star-6 {
      filter: drop-shadow(0 0 7px #fffdef);
      position: absolute;
      z-index: 4;
      height: auto;
    }
    .star-1 {
      top: -80%;
      left: -30%;
      width: 25px;
    }

    .star-2 {
      top: -25%;
      left: 10%;
      width: 15px;
    }

    .star-3 {
      top: 55%;
      left: -30%;
      width: 50px;
    }

    .star-4 {
      top: 30%;
      left: 100%;
      width: 10px;
    }

    .star-5 {
      top: -40%;
      left: 115%;
      width: 30px;
    }

    .star-6 {
      top: 60%;
      left: 140%;
      width: 20px;
    }
  }
  .fil0 {
    fill: #fffdef;
  }
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
  const [position, setPosition] = useState({
    x: window.innerWidth * 0.5,
    y: window.innerHeight * 0.93,
  });
  const [dragging, setDragging] = useState(false);
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const confetiRef = useRef(null);
  const [play, { stop: stop }] = useSound(mayHem);
  const [playBingo] = useSound(bingo, {
    volume: 1.5,
  });
  const [isPlay, setIsPlay] = useState(false);
  useEffect(() => {
    isPlay ? play() : stop()
  }, [isPlay])
  useEffect(() => {
    if (trackActive !== null) {
      setHeight(confetiRef.current.clientHeight);
      setWidth(confetiRef.current.clientWidth);
    }
  }, [trackActive]);

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (dragging) {
        setPosition({
          x: position.x + event.movementX,
          y: position.y,
        });
      }
    };
    const handleMouseUp = () => {
      setDragging(false);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging, position]);

  const handleMouseDown = () => {
    setDragging(true);
  };
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
    setIsPlay(true)
  };
  useEffect(() => {
    if (isRandomAlbum) {
      setAlbumTracks(ERAS[active].tracks);
      setIsTrackRunning(true);
      setIntervalDuration(200);
    }
  }, [isRandomAlbum]);
  useEffect(() => {
    if (isTrackRunning === true) {
      setTimeout(() => {
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
          setIsPlay(false)
          playBingo()
        }, TRACK_TIME);
        const intervalDurationTimeout = setInterval(() => {
          setIntervalDuration((prevDuration) => prevDuration + 100);
        }, 200);
        return () => {
          clearInterval(interval);
          clearInterval(intervalDurationTimeout);
          setIsPlay(false)

        };
      }, 2000);
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
        const finalIndex = Math.floor(Math.random() * 10);
        setActive(finalIndex);
        setIsRunning(false);
        setIsRandomAlbum(true);
      }, ALBUM_TIME);
      const intervalDurationTimeout = setInterval(() => {
        setIntervalDuration((prevDuration) => prevDuration + 100);
      }, 300);
      return () => {
        clearInterval(interval);
        clearInterval(intervalDurationTimeout);

      };
    }
  }, [isRunning]);
  return (
    <Container>
      <Banner ref={confetiRef}>
        {trackActive !== null && isTrackRunning === false && isRandomAlbum && (
          <Confetti numberOfPieces={150} width={width} height={height} />
        )}
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
                  href={
                    trackActive !== null ? eras.sharingInfo.shareUrl : "none"
                  }
                  rel="noreferrer"
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
                      <Track
                        key={i}
                        trackActive={track === trackActive}
                        color={eras.color2}
                      >
                        <Star1 />
                        {track.track.name}

                        <Star2 />
                        <Star3 />
                      </Track>
                    );
                  })}
              </Tracks>
              {/* <TaylorSwift src={eras.taylor} isRandomAlbum={isRandomAlbum} /> */}
            </EraButton>
          );
        })}
        <Random
          style={{ position: "absolute", left: position.x, top: position.y }}
          onDoubleClick={handleClick}
          randomButton={randomButton}
          onMouseDown={handleMouseDown}
        >
          <ErasParty />
          <Star1 />
          <Star2 />
          <Star3 />
          <Star4 />
          <Star5 />
          <Star6 />
        </Random>
      </Banner>
    </Container>
  );
};
export default ErasBanner;
