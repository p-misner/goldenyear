/* eslint-disable no-nested-ternary */
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { scaleTime } from 'd3-scale';
import second from '../data/dogSvgs/second.svg';

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
  // overflow: hidden;
`;
const Content = styled.div`
  background-color: white;
  width: 96vw;
  max-width: 1180px;
  margin: 24px auto;
  // overflow: scroll;
  // height: 94vh;
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
  height: auto;
`;
const TitleSVGText = styled.text`
  font-family: 'Cormorant', serif;
  font-size: 24px;
  font-weight: 700;
`;
const MonthSVGText = styled.text`
  font-family: 'Cormorant', serif;
  font-size: 16px;
`;
const years = [
  '2012',
  '2013',
  '2014',
  '2015',
  '2016',
  '2017',
  '2018',
  '2019',
  '2020',
  '2021',
  '2022'
];
type MonthDaysProp = {
  month: string;
  days: number;
  startDate: string;
  endDate: string;
};
type MonthDaysArray = MonthDaysProp[];
const MonthDays: MonthDaysArray = [
  {
    month: 'Jan',
    days: 31,
    startDate: '1/1/2012',
    endDate: '1/31/2012'
  },
  {
    month: 'Feb',
    days: 29,
    startDate: '2/1/2012',
    endDate: '2/29/2012'
  },
  {
    month: 'Mar',
    days: 31,
    startDate: '3/1/2012',
    endDate: '3/31/2012'
  },
  {
    month: 'Apr',
    days: 30,
    startDate: '4/1/2012',
    endDate: '4/30/2012'
  },
  {
    month: 'May',
    days: 31,
    startDate: '5/1/2012',
    endDate: '5/31/2012'
  },
  {
    month: 'Jun',
    days: 30,
    startDate: '6/1/2012',
    endDate: '6/30/2012'
  },
  {
    month: 'Jul',
    days: 31,
    startDate: '7/1/2012',
    endDate: '7/31/2012'
  },
  {
    month: 'Aug',
    days: 31,
    startDate: '8/1/2012',
    endDate: '8/31/2012'
  },
  {
    month: 'Sep',
    days: 30,
    startDate: '9/1/2012',
    endDate: '9/30/2012'
  },
  {
    month: 'Oct',
    days: 31,
    startDate: '10/1/2012',
    endDate: '10/31/2012'
  },
  {
    month: 'Nov',
    days: 30,
    startDate: '11/1/2012',
    endDate: '11/30/2012'
  },
  {
    month: 'Dec',
    days: 31,
    startDate: '12/1/2012',
    endDate: '12/31/2012'
  },
  {
    month: 'Jan',
    days: 31,
    startDate: '1/1/2013',
    endDate: '1/31/2013'
  },
  {
    month: 'Feb',
    days: 29,
    startDate: '2/1/2013',
    endDate: '2/29/2013'
  },
  {
    month: 'Mar',
    days: 31,
    startDate: '3/1/2013',
    endDate: '3/31/2013'
  },
  {
    month: 'Apr',
    days: 30,
    startDate: '4/1/2013',
    endDate: '4/30/2013'
  },
  {
    month: 'May',
    days: 31,
    startDate: '5/1/2013',
    endDate: '5/31/2013'
  },
  {
    month: 'Jun',
    days: 30,
    startDate: '6/1/2013',
    endDate: '6/30/2013'
  },
  {
    month: 'Jul',
    days: 31,
    startDate: '7/1/2013',
    endDate: '7/31/2013'
  },
  {
    month: 'Aug',
    days: 31,
    startDate: '8/1/2013',
    endDate: '8/31/2013'
  },
  {
    month: 'Sep',
    days: 30,
    startDate: '9/1/2013',
    endDate: '9/30/2013'
  },
  {
    month: 'Oct',
    days: 31,
    startDate: '10/1/2013',
    endDate: '10/31/2013'
  },
  {
    month: 'Nov',
    days: 30,
    startDate: '11/1/2013',
    endDate: '11/30/2013'
  },
  {
    month: 'Dec',
    days: 31,
    startDate: '12/1/2013',
    endDate: '12/31/2013'
  },
  {
    month: 'Jan',
    days: 31,
    startDate: '1/1/2014',
    endDate: '1/31/2014'
  },
  {
    month: 'Feb',
    days: 29,
    startDate: '2/1/2014',
    endDate: '2/29/2014'
  },
  {
    month: 'Mar',
    days: 31,
    startDate: '3/1/2014',
    endDate: '3/31/2014'
  },
  {
    month: 'Apr',
    days: 30,
    startDate: '4/1/2014',
    endDate: '4/30/2014'
  },
  {
    month: 'May',
    days: 31,
    startDate: '5/1/2014',
    endDate: '5/31/2014'
  }
];
const MonthDays2: MonthDaysArray = [
  {
    month: 'Jan',
    days: 31,
    startDate: '1/1/',
    endDate: '1/31/'
  },
  {
    month: 'Feb',
    days: 29,
    startDate: '2/1/',
    endDate: '2/29/'
  },
  {
    month: 'Mar',
    days: 31,
    startDate: '3/1/',
    endDate: '3/31/'
  },
  {
    month: 'Apr',
    days: 30,
    startDate: '4/1/',
    endDate: '4/30/'
  },
  {
    month: 'May',
    days: 31,
    startDate: '5/1/',
    endDate: '5/31/'
  },
  {
    month: 'Jun',
    days: 30,
    startDate: '6/1/',
    endDate: '6/30/'
  },
  {
    month: 'Jul',
    days: 31,
    startDate: '7/1/',
    endDate: '7/31/'
  },
  {
    month: 'Aug',
    days: 31,
    startDate: '8/1/',
    endDate: '8/31/'
  },
  {
    month: 'Sep',
    days: 30,
    startDate: '9/1/',
    endDate: '9/30/'
  },
  {
    month: 'Oct',
    days: 31,
    startDate: '10/1/',
    endDate: '10/31/'
  },
  {
    month: 'Nov',
    days: 30,
    startDate: '11/1/',
    endDate: '11/30/'
  },
  {
    month: 'Dec',
    days: 31,
    startDate: '12/1/',
    endDate: '12/31/'
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
type DayPosProps = {
  pixelPerDay: number;
  date: Date;
  screenWidth: number;
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
type YOffsetProps = {
  screenWidth: number;
  rowHeight: number;
  year: number;
  pixelPerDay: number;
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

type MonthRectProps = {
  startDateAsNum: number;
  endDateAsNum: number;
  screenWidth: number;
  rowHeight: number;
  startOffset: number;
  pixelPerDay: number;
  month: string;
  year: number;
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
function DayPos({ pixelPerDay, date, screenWidth }: DayPosProps) {
  const oneDayScale = scaleTime()
    .domain([new Date(2012, 0, 1), new Date(2012, 0, 2)]) // first dog Date, first Dog Date + 1 day
    .range([0, pixelPerDay]);
  // year overflow add on ONLY in X
  // screenwidth

  return oneDayScale(new Date(2012, date.getUTCMonth(), date.getDate()));
}

// there might be a small offset equal to rowHeight/2 for each year
function yOffset({ year, screenWidth, rowHeight, pixelPerDay }: YOffsetProps) {
  const oneYearHeight =
    returnYPos({
      dateAsNum: DayPos({
        pixelPerDay,
        date: new Date(year, 11, 31),
        screenWidth
      }),
      screenWidth,
      rowHeight
    }) *
    (year - 2012);

  return oneYearHeight;
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

// new x y position calculator
// based on the year you ahve an y offset
// x position of every year starts from 0
function monthRect({
  startDateAsNum,
  endDateAsNum,
  screenWidth,
  rowHeight,
  startOffset,
  pixelPerDay,
  month,
  year
}: MonthRectProps) {
  const totalOffset =
    startOffset +
    yOffset({ year, screenWidth, rowHeight, pixelPerDay }) +
    (year - 2012) * (rowHeight / 2 + 50);
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

  if (numLines.length === 1) {
    return (
      <g>
        <rect
          x={startX}
          y={startDateRow + totalOffset - rowHeight / 2}
          height={rowHeight}
          width={endX - startX + pixelPerDay}
          style={{
            stroke: '#BDBDBD',
            strokeWidth: '1px',
            strokeDasharray: '4 4',
            fill: 'white'
          }}
        />
        <MonthSVGText
          x={startX + 5}
          y={startDateRow + totalOffset - rowHeight / 2 + 15}
          fill="#BDBDBD"
        >
          {month}
        </MonthSVGText>
        {month === 'Dec' && (
          <rect
            x={endX + pixelPerDay + 1}
            y={startDateRow + totalOffset - rowHeight / 2}
            height={rowHeight}
            width={screenWidth - endX}
            fill="#F2F2F2"
          />
        )}
        {month === 'Dec' && (
          <line
            x1="0"
            x2={screenWidth}
            y1={endDateRow + totalOffset + rowHeight / 2}
            y2={endDateRow + totalOffset + rowHeight / 2}
            stroke="#BDBDBD"
            strokeWidth="2"
          />
        )}
      </g>
    );
  }
  return (
    <g>
      <rect
        x={startX}
        y={startDateRow + totalOffset - rowHeight / 2}
        height={rowHeight}
        width={screenWidth - startX + pixelPerDay}
        style={{
          stroke: '#BDBDBD',
          strokeWidth: '1px',
          strokeDasharray: '4 4',
          fill: 'white'
        }}
      />
      <MonthSVGText
        x={startX + 5}
        y={startDateRow + totalOffset - rowHeight / 2 + 15}
        fill="#BDBDBD"
      >
        {month}
      </MonthSVGText>
      <rect
        x={0}
        y={endDateRow + totalOffset - rowHeight / 2}
        height={rowHeight}
        width={endX + pixelPerDay}
        style={{
          stroke: '#BDBDBD',
          strokeWidth: '1px',
          strokeDasharray: '4 4',
          fill: 'white'
        }}
      />
      {month === 'Dec' && (
        <rect
          x={endX + pixelPerDay + 1}
          y={endDateRow + totalOffset - rowHeight / 2}
          height={rowHeight}
          width={screenWidth - endX}
          fill="#F2F2F2"
        />
      )}
      {month === 'Dec' && (
        <line
          x1="0"
          x2={screenWidth}
          y1={endDateRow + totalOffset + rowHeight / 2}
          y2={endDateRow + totalOffset + rowHeight / 2}
          stroke="#BDBDBD"
          strokeWidth="2"
        />
      )}
      <line
        x1="0"
        x2={screenWidth}
        y1={totalOffset}
        y2={totalOffset}
        stroke="#E0E0E0"
        strokeWidth="2"
      />
    </g>
  );
}

function Test({ isLoading, records }: HomePageProps) {
  const rowHeight = 60;
  const pixelPerDay = 8;
  const startOffset = 100;
  const [width, setWidth] = useState({ width: 1, numRows: 0 });
  const widthRef = useRef<any>();
  const totalTimeWidth = OneWeek({
    pixelPerDay,
    date: new Date(2022, 0, 2)
  });

  // console.log(
  //     yOffset({ year: 2015, screenWidth: width.width, pixelPerDay, rowHeight })
  //   );

  //   console.log(
  //     returnYPos({
  //       dateAsNum: OneWeek({
  //         pixelPerDay,
  //         date: new Date(2015, 0, 1)
  //       }),
  //       screenWidth: width.width,
  //       rowHeight
  //     })
  //   );
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
          <TitleBlock> Testing</TitleBlock>
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
            height={width.numRows * rowHeight * 2 + rowHeight}
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
              <linearGradient
                id="fullGrad"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
                gradientUnits="userSpaceOnUse"
              >
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

            {years.map(
              (yr: string) =>
                // eslint-disable-next-line implicit-arrow-linebreak
                MonthDays2.map(
                  (x: MonthDaysProp, i: number) =>
                    // eslint-disable-next-line implicit-arrow-linebreak
                    monthRect({
                      startDateAsNum: DayPos({
                        pixelPerDay,
                        date: new Date(`${x.startDate}${yr}`),
                        screenWidth: width.width
                      }),
                      endDateAsNum: DayPos({
                        pixelPerDay,
                        date: new Date(`${x.endDate}${yr}`),
                        screenWidth: width.width
                      }),
                      screenWidth: width.width,
                      rowHeight,
                      startOffset,
                      pixelPerDay,
                      month: x.month,
                      year: new Date(`${x.startDate}${yr}`).getFullYear()
                    })
                  // eslint-disable-next-line function-paren-newline
                )
              // eslint-disable-next-line function-paren-newline
            )}

            {years.map((yr: string) => (
              <TitleSVGText
                key={yr}
                x={20}
                y={
                  startOffset +
                  yOffset({
                    year: parseInt(yr, 10),
                    screenWidth: width.width,
                    rowHeight,
                    pixelPerDay
                  }) +
                  (parseInt(yr, 10) - 2012) * (rowHeight / 2 + 50) -
                  15
                }
                fill="#BDBDBD"
              >
                {`${parseInt(yr, 10)} - some extra words`}
              </TitleSVGText>
            ))}

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

export default Test;
