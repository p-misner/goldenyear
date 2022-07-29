/* eslint-disable no-nested-ternary */
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { scaleTime } from 'd3-scale';
import second from '../data/dogSvgs/second.svg';
import '../stylesheet/fonts.css';

const Background = styled.div`
  background: rgb(34, 193, 195);
  background: linear-gradient(
    83deg,
    rgba(253, 195, 215, 0.8055555555555556) 0%,
    rgba(239, 242, 234, 0.5300925925925926) 36%,
    rgba(248, 209, 118, 0.3287037037037037) 55%,
    rgba(240, 239, 222, 0.4189814814814815) 71%,
    rgba(253, 187, 45, 0.21064814814814814) 100%
  );
  margin: 0px;
  padding: 0;
  height: 100vh;
  overflow: hidden;
`;
const Content = styled.div`
  background-color: white;
  width: 96vw;
  max-width: 1180px;
  margin: 24px auto;
  overflow: scroll;
  height: 94vh;
  border: 1px solid black;
`;
const Blocks = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  width: 100%;
  position: sticky;
  background-color: white;
  top: 0px;
  z-index: 10;
`;
const VerticalBlocks = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
`;
const SubtitleBlock = styled.div`
  border: 1px solid black;
  border-top: 0px;
  border-left: 0px;
  border-right: 0px;
  height: 25px;
  flex-grow: 2;
  min-width: 300px;
  padding: 4px;
  display: flex;
  align-items: center;
`;
const TitleBlock = styled.div`
  border: 1px solid black;
  border-top: 0px;
  border-left: 0px;
  height: 67px;
  flex-grow: 2;
  padding: 0px 8px;
  display: flex;
  justify-content: start;
  align-items: center;
  font-size: 24px;
`;
const ResizingSvg = styled.svg`
  z-index: 1;
`;

const MonthDays = [
  {
    month: 'Jan',
    days: 31
  },
  {
    month: 'Feb',
    days: 28
  },
  {
    month: 'Mar',
    days: 31
  },
  {
    month: 'Apr',
    days: 30
  },
  {
    month: 'May',
    days: 31
  },
  {
    month: 'Jun',
    days: 30
  },
  {
    month: 'Jul',
    days: 31
  },
  {
    month: 'Aug',
    days: 31
  },
  {
    month: 'Sep',
    days: 30
  },
  {
    month: 'Oct',
    days: 31
  },
  {
    month: 'Nov',
    days: 30
  },
  {
    month: 'Dec',
    days: 31
  }
];

type RecordsProp = { dogName: string; startDate: string; endDate: string };
interface HomePageProps {
  isLoading: boolean;
  records: RecordsProp[];
}
type OneWeekProps = {
  pixelPerDay: number;
  date: Date;
};

type XPosProps = {
  dateAsNum: number;
  screenWidth: number;
};
type YPosProps = {
  dateAsNum: number;
  screenWidth: number;
  rowHeight: number;
};
type DateCircleProps = {
  dateAsNum: number;
  screenWidth: number;
  rowHeight: number;
};
type PathReturnProps = {
  currentLine: number;
  screenWidth: number;
  numLines: number[];
  startX: number;
  endX: number;
  startDateRow: number;
  rowHeight: number;
  startOffset: number;
};
type DatePathProps = {
  startDateAsNum: number;
  endDateAsNum: number;
  screenWidth: number;
  rowHeight: number;
  startOffset: number;
  dogName: string;
};

function OneWeek({ pixelPerDay, date }: OneWeekProps) {
  const oneDayScale = scaleTime()
    .domain([new Date(2012, 0, 1), new Date(2012, 0, 2)]) // first dog Date, first Dog Date + 1 day
    .range([0, pixelPerDay]);
  return oneDayScale(date);
}
function returnXPos({ dateAsNum, screenWidth }: XPosProps) {
  return dateAsNum % screenWidth;
}
function returnYPos({ dateAsNum, screenWidth, rowHeight }: YPosProps) {
  return Math.floor(dateAsNum / screenWidth) * rowHeight + rowHeight / 2;
}

function pathReturn({
  currentLine,
  screenWidth,
  startDateRow,
  numLines,
  startX,
  endX,
  rowHeight,
  startOffset
}: PathReturnProps) {
  if (currentLine === 0) {
    if (numLines.length === 1) {
      return (
        <path
          strokeWidth="2"
          fill="url(#grad1)"
          filter="url(#distort)"
          d={`M${startX} ${
            startDateRow + startOffset
          } v -4 H${endX}  v 4 h.01 v4`}
        />
      );
    }

    return (
      <path
        strokeWidth="2"
        fill="url(#grad1)"
        d={`M${startX} ${
          startDateRow + startOffset
        } v -4 H${screenWidth}  v 4 h.01 v4`}
        filter="url(#distort)"
      />
    );
  }
  if (currentLine + 1 === numLines.length) {
    return (
      <path
        strokeWidth="2"
        fill="url(#grad1)"
        filter="url(#distort)"
        d={`M0 ${
          startDateRow + currentLine * rowHeight + startOffset
        } v -4 H${endX}  v 4 h.01 v4`}
      />
    );
  }
  return (
    <path
      strokeWidth="2"
      fill="url(#grad1)"
      filter="url(#distort)"
      d={`M0 ${
        startDateRow + currentLine * rowHeight + startOffset
      } v -4 H${screenWidth}  v 4 h.01 v4`}
    />
  );
}
function datePath({
  startDateAsNum,
  endDateAsNum,
  screenWidth,
  rowHeight,
  startOffset,
  dogName
}: DatePathProps) {
  const startDateRow = returnYPos({
    dateAsNum: startDateAsNum,
    screenWidth,
    rowHeight
  });
  const endDateRow = returnYPos({
    dateAsNum: endDateAsNum,
    screenWidth,
    rowHeight
  });
  const startX = returnXPos({
    dateAsNum: startDateAsNum,
    screenWidth
  });
  const endX = returnXPos({
    dateAsNum: endDateAsNum,
    screenWidth
  });

  const numLines = new Array((endDateRow - startDateRow) / rowHeight + 1).fill(
    0
  );

  return (
    <g>
      <Link to={`/${dogName.replace(' ', '')}`}>
        <image
          href={second}
          style={{ cursor: 'pointer' }}
          height="50"
          x={startX - 64}
          y={startDateRow + startOffset - 54}
        />
      </Link>
      {numLines.fill(0).map(
        (x, i) =>
          // eslint-disable-next-line implicit-arrow-linebreak
          pathReturn({
            currentLine: i,
            screenWidth,
            startDateRow,
            numLines,
            startX,
            endX,
            rowHeight,
            startOffset
          })
        // eslint-disable-next-line function-paren-newline
      )}
    </g>
  );
}

function HomePage({ isLoading, records }: HomePageProps) {
  const rowHeight = 60;
  const pixelPerDay = 8;
  const startOffset = 100;
  const [width, setWidth] = useState({ width: 1, numRows: 0 });
  const widthRef = useRef<any>();
  const totalTimeWidth = OneWeek({
    pixelPerDay,
    date: new Date(2022, 0, 2)
  });

  // function that updates width
  const updateWidth = () => {
    const newWidth = widthRef.current.clientWidth;
    setWidth({
      width: newWidth,
      numRows: totalTimeWidth / newWidth
    });
  };

  // get width on initial render
  useEffect(() => {
    updateWidth();
  }, []);

  // update width on window resize
  useEffect(() => {
    window.addEventListener('resize', updateWidth);
  }, []);

  return (
    <Background>
      <Content ref={widthRef}>
        <Blocks>
          <TitleBlock> The Golden Years</TitleBlock>
          <VerticalBlocks>
            <SubtitleBlock>
              The golden retrievers we have loved and
            </SubtitleBlock>
            <SubtitleBlock> fostered since 2012.</SubtitleBlock>
          </VerticalBlocks>
        </Blocks>
        {!isLoading ? (
          <ResizingSvg
            width={width.width}
            height={width.numRows * rowHeight + rowHeight}
          >
            <defs>
              <filter id="distort" y="-10" height="20">
                <feTurbulence baseFrequency="0.007" type="fractalNoise" />
                <feDisplacementMap
                  in="SourceGraphic"
                  xChannelSelector="R"
                  yChannelSelector="G"
                  scale="20"
                />
                <feGaussianBlur stdDeviation="2" />
              </filter>
              <filter id="noiseFilter">
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency="6.29"
                  numOctaves="6"
                  stitchTiles="stitch"
                />
              </filter>
              <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop
                  offset="0%"
                  style={{ stopColor: 'rgb(255,139,86)', stopOpacity: '1' }}
                />
                <stop
                  offset="100%"
                  style={{ stopColor: 'rgb(231,170,14)', stopOpacity: '1' }}
                />
              </linearGradient>
            </defs>

            {records.map(
              (x: RecordsProp) =>
                // eslint-disable-next-line implicit-arrow-linebreak
                datePath({
                  startDateAsNum: OneWeek({
                    pixelPerDay,
                    date: new Date(x.startDate)
                  }),
                  endDateAsNum: OneWeek({
                    pixelPerDay,
                    date: new Date(x.endDate)
                  }),
                  screenWidth: width.width,
                  rowHeight,
                  startOffset,
                  dogName: x.dogName
                })

              // eslint-disable-next-line function-paren-newline
            )}
          </ResizingSvg>
        ) : null}
      </Content>
    </Background>
  );
}

export default HomePage;
