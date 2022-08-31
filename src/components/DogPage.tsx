/* eslint-disable indent */
/* eslint-disable no-return-assign */
/* eslint-disable max-len */
/* eslint-disable no-confusing-arrow */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { scaleTime } from 'd3-scale';
import Tooltip from './Tooltip';
import bgPic from '../data/bgWhite.png';

import '../stylesheet/fonts.css';

// code inspo links
// https://codepen.io/creme/pen/gOYrvxM
type TimelineRecordsProp = {
  dogName: string;
  startDate: string;
  endDate: string;
  imgSrc: string;
};
interface DogProps {
  dogName: string;
  nextDog: string;
  timelineRecords: TimelineRecordsProp[];
}
type RecordsProp = {
  id: string;
  dogName: string;
  dogSvg: string;
  fosterNum: string;
  summaryText: any;
  heroText: any;
  overflowText: string[];
  gallery: any[];
};
type DayPosProps = {
  pixelPerDay: number;
  date: Date;
};
const Background = styled.div`
  background-color: white;
  margin: 0px;
  padding: 0;
  height: 100vh;
  overflow: hidden;
  background-image: url(${bgPic});
  background-position: center top;
  background-repeat: no-repeat;
`;
const Content = styled.div`
  background-color: white;
  width: 96vw;
  max-width: 1180px;
  overflow-y: scroll;
  overflow-x: hidden;
  margin: 44px auto;
  height: 94vh;
  max-height: 990px;
  border: 1px solid black;
  position: relative;
`;
const BlurryGradient = styled.div`
  position: absolute;
  background-clip: content-box;
  top: -200px;
  left: 300px;
  transform: translate(-50%, 0%);
  width: 1200px;
  height: 900px;
  border-radius: 50% 22% 40% 80%;
  filter: blur(100px);
  background: radial-gradient(
    circle at 50% 50%,
    rgba(235, 205, 203, 1),
    rgba(243, 220, 146, 1),
    rgba(249, 235, 71, 0)
  );
  opacity: 0.7;
`;
const SpiralContainer = styled.div`
  max-width: 1180px;
  margin: 0 auto;
  position: absolute;
  top: 20px;
  width: 96vw;
  height: 37px;
  left: 0;
  right: 0;
`;
const Blocks = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  overflow: hidden;
  z-index: 2;
  position: relative;
  @media (max-width: 900px) {
    flex-direction: column;
  }
`;
const DogImage = styled.img`
  margin-left: 24px;
  height: 160px;
  @media (max-width: 900px) {
    margin-left: 16px;
    height: 120px;
  }
`;
const VerticalBlocks = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: left;
  margin-left: 24px;
  min-width: 330px;
`;
const TitleItalics = styled.p`
  font-style: italic;
  font-weight: 400;
  font-size: 40px;
  line-height: 40px;
  @media (max-width: 900px) {
    font-size: 32px;
    line-height: 16px;
  }
`;
const TitleDogName = styled.p`
  font-weight: 600;
  font-size: 64px;
  line-height: 80px;
  @media (max-width: 900px) {
    font-size: 48px;
  }
`;
const DescripPara = styled.p`
  font-size: 24px;
  line-height: 40px;
  margin: 0 44px;
  @media (max-width: 900px) {
    margin: 16px;
  }
`;
const OverflowPara = styled.p`
  font-size: 24px;
  line-height: 40px;
  margin-top: 24px;
  @media (max-width: 900px) {
    margin: 16px;
  }
`;
const LeftBlock = styled.div`
  border: 1px solid black;
  border-left: 1px;
  padding: 4px;
  display: flex;
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: start;
  min-width: 440px;
  padding: 24px 0px;
  @media (max-width: 900px) {
    border-bottom: 0px;
    border-right: 0px;
  }
`;
const RightBlock = styled.div`
  border: 1px solid black;
  border-left: 0px;
  border-right: 0px;
  padding: 4px;
  display: flex;
  align-items: center;
`;
const BottomBlock = styled.div`
  border: 1px solid black;
  border-left: 0px;
  border-right: 0px;
  flex-grow: 3;
  height: 132px;
  position: relative;
`;
const TimelineBlock = styled.button`
  border: 1px solid black;
  border-bottom: 0.5px;
  background: none;
  cursor: pointer;
`;
const NavLink = styled.a`
  color: black;
  font-family: 'Cormorant', sans-serif;
  font-size: 16px;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
  padding: 12px;
  line-height: 32px;
`;
const HeroText = styled.h3`
  font-size: 48px;
  line-height: 102px;
  font-weight: 400;
  @media (max-width: 900px) {
    font-size: 40px;
    line-height: 80px;
  }
`;
const ColumnContent = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  margin: 48px;
  z-index: 2;
  position: relative;
  @media (max-width: 900px) {
    margin: 24px;
  }
`;
const HeroDiv = styled.div`
  grid-column: 1 / span 6;
`;
const TextDiv = styled.div`
  grid-column: 1 / span 5;
  @media (max-width: 900px) {
    grid-column: 1 / span 6;
  }
`;
const PictureScroll = styled.div`
  overflow-x: scroll;
  overflow-y: hidden;
  height: 500px;
  white-space: nowrap;
  grid-column: 1 / span 6;
  margin: 24px 0px;
  @media (max-width: 900px) {
    height: 300px;
  }
`;
const Bolded = styled.span`
  font-weight: 600;
`;
const Flip = styled.span`
  display: inline-block;

  -moz-transform: scaleX(-1); /* Gecko */
  -o-transform: scaleX(-1); /* Opera */
  -webkit-transform: scaleX(-1); /* Webkit */
  transform: scaleX(-1); /* Standard */

  filter: FlipH; /* IE 6/7/8 */
`;

const timelineWidth = 3000;
const firstYear = 2016;
const years = [
  // '2012',
  // '2013',
  // '2014',
  // '2015',
  '2016',
  '2017',
  '2018',
  '2019',
  '2020',
  '2021',
  '2022'
];

function DayPos({ pixelPerDay, date }: DayPosProps) {
  const oneDayScale = scaleTime()
    .domain([new Date(firstYear, 0, 1), new Date(firstYear, 0, 2)])
    .range([0, pixelPerDay]);
  return oneDayScale(date);
}

function DogPage(props: DogProps) {
  const { dogName, nextDog, timelineRecords } = props;
  const [isLoading, setLoading] = useState(true);
  const [records, setRecords] = useState<RecordsProp>();
  const [width, setWidth] = useState({ width: 1 });

  const widthRef = useRef<any>();

  const pixelPerDay = timelineWidth / (365 * years.length);

  const updateWidth = () => {
    const newWidth = widthRef.current?.clientWidth;
    setWidth({
      width: newWidth
    });
  };

  // get width on initial render
  useEffect(() => {
    updateWidth();
  }, []);

  const timelineRef = useCallback(
    (node: any) => {
      const currDogData = timelineRecords.filter(
        (x) => x.dogName === dogName
      )[0].startDate;
      if (node !== null) {
        // eslint-disable-next-line no-param-reassign
        node.scrollLeft =
          DayPos({
            pixelPerDay,
            date: new Date(currDogData)
          }) -
          width.width / 2;
      }
    },
    [dogName]
  );

  // update width on window resize
  useEffect(() => {
    window.addEventListener('resize', updateWidth);
  }, []);

  useEffect(() => {
    async function getRecords() {
      const response = await fetch(
        `http://localhost:3001/dogRecords/${dogName}`
      );

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const recs = await response.json();
      setRecords(recs);
      setLoading(false);
    }

    getRecords();
  }, [dogName]);

  return (
    <Background>
      {!isLoading && (
        <Content ref={widthRef}>
          <BlurryGradient />

          <Blocks style={{ paddingTop: '24px' }}>
            <LeftBlock>
              {records?.dogSvg && (
                <DogImage src={records?.dogSvg} alt="handdrawn" />
              )}
              <VerticalBlocks>
                <TitleItalics> foster {records?.fosterNum}</TitleItalics>
                <TitleDogName>{dogName}</TitleDogName>
              </VerticalBlocks>
            </LeftBlock>
            <RightBlock>
              <DescripPara>
                {records?.summaryText &&
                  records?.summaryText.map((x: any, i: number) =>
                    x.type === 'bold' ? (
                      <Bolded key={i}>{x.text} </Bolded>
                    ) : (
                      <span key={i}>{x.text} </span>
                    )
                  )}
              </DescripPara>
            </RightBlock>
          </Blocks>
          <ColumnContent>
            <HeroDiv>
              <HeroText>
                {records?.heroText &&
                  records?.heroText.map((x: any, i: number) =>
                    x.type === 'text' ? (
                      x.text
                    ) : (
                      <Tooltip
                        text={x.tooltipText}
                        imgString={x.imgSrc}
                        type="small"
                      />
                    )
                  )}
              </HeroText>
            </HeroDiv>

            {records?.gallery && (
              <PictureScroll>
                {records?.gallery.map((x: any, i: number) => (
                  <Tooltip
                    key={i}
                    text={x.tooltipText}
                    imgString={x.imgSrc}
                    type="large"
                  />
                ))}
              </PictureScroll>
            )}

            <TextDiv>
              {records?.overflowText &&
                records?.overflowText.map((x: any, i: number) => (
                  <OverflowPara key={i}>{x}</OverflowPara>
                ))}
            </TextDiv>
          </ColumnContent>
          <Link to="/">
            <TimelineBlock>
              <NavLink>
                <Flip>⤴</Flip> Return to Timeline
              </NavLink>
            </TimelineBlock>
          </Link>
          <BottomBlock>
            {nextDog !== 'Timeline' && (
              <svg
                width="222"
                height="133"
                viewBox="0 0 222 133"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  position: 'absolute',
                  right: 0,
                  filter: 'drop-shadow( 5px 8px 6px rgba(0, 0, 0, .15))'
                }}
              >
                <path
                  d="M1 133L5.12051 131.518C31.5921 118.754 32.5 51.0246 32.5 1C43.7 39 163.5 51.8333 222 53.5L5.12051 131.518C3.8106 132.149 2.43809 132.646 1 133Z"
                  fill="white"
                  stroke="#333333"
                />
                <Link to={`/${nextDog.replace(' ', '')}`}>
                  <text
                    fill="#000"
                    x="45"
                    y="73"
                    fontSize="24"
                    fontWeight="500"
                  >
                    {nextDog}⤵
                  </text>
                </Link>
              </svg>
            )}

            <div
              id="toScroll"
              ref={timelineRef}
              style={{ width: width.width - 200, overflowX: 'scroll' }}
            >
              <svg
                width={timelineWidth}
                height="132"
                style={{ backgroundColor: 'none' }}
              >
                <defs>
                  <linearGradient id="gray" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop
                      offset="0%"
                      style={{
                        stopColor: 'rgb(248,246,246)',
                        stopOpacity: '1'
                      }}
                    />
                    <stop
                      offset="100%"
                      style={{
                        stopColor: 'rgb(233, 231, 231)',
                        stopOpacity: '1'
                      }}
                    />
                  </linearGradient>
                  <linearGradient id="golden" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop
                      offset="0%"
                      style={{
                        stopColor: 'rgb(255,189,161)',
                        stopOpacity: '1'
                      }}
                    />
                    <stop
                      offset="100%"
                      style={{
                        stopColor: 'rgb(255,225,151)',
                        stopOpacity: '1'
                      }}
                    />
                  </linearGradient>
                </defs>
                {years.map((x, i) => (
                  <g key={x}>
                    <line
                      x1={pixelPerDay * 365 * i}
                      x2={pixelPerDay * 365 * i}
                      y1="0"
                      y2="132"
                      stroke="black"
                      strokeWidth="1"
                    />
                    <text x={pixelPerDay * 365 * i + 20} y="20" fontSize="24px">
                      {' '}
                      {x}
                    </text>
                  </g>
                ))}
                {timelineRecords.map((x: TimelineRecordsProp, i: number) => (
                  <Link key={x.dogName} to={`/${x.dogName.replace(' ', '')}`}>
                    <rect
                      x={DayPos({ pixelPerDay, date: new Date(x.startDate) })}
                      y={(i % 3) * 15 + (i % 2) * 3 + 40}
                      width={
                        DayPos({ pixelPerDay, date: new Date(x.endDate) }) -
                        DayPos({ pixelPerDay, date: new Date(x.startDate) })
                      }
                      height="30"
                      fill={
                        x.dogName === dogName ? 'url(#golden)' : 'url(#gray)'
                      }
                      stroke="black"
                      strokeWidth={x.dogName === dogName ? '1' : '.5'}
                    />
                  </Link>
                ))}
              </svg>
            </div>
          </BottomBlock>
        </Content>
      )}
      <SpiralContainer>
        <svg width="100%" height="37px">
          <pattern
            id="pattern"
            x="0"
            y="0"
            patternUnits="userSpaceOnUse"
            width="50"
            height="37"
          >
            <g transform="translate(3,0)">
              {' '}
              <path
                d="M4.49818 23.4467C2.49818 16.6134 -0.701821 2.7467 2.49818 1.9467C6.49818 0.946695 8.5 0.446695 9 1.9467C9.4 3.1467 8.83333 16.78 8.5 23.4467"
                stroke="#333333"
                strokeWidth="2"
                fill="none"
              />
            </g>

            <rect fill="#333333" x="2" y="20" width="14" height="14">
              {' '}
            </rect>
          </pattern>
          <rect x="0" y="0" width="100%" height="37px" fill="url(#pattern)" />
        </svg>
      </SpiralContainer>
    </Background>
  );
}

export default DogPage;
