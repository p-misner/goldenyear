/* eslint-disable indent */
/* eslint-disable no-nested-ternary */
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { scaleTime } from 'd3-scale';

import bgPic from '../data/bgColor.png';
import second from '../data/dogSvgs/dog_threequarters.svg';
import bobo from '../data/dogSvgs/BoboSvg.svg';
import boss from '../data/dogSvgs/BossSvg.svg';

const Background = styled.div`
  padding: 0px;
  height: 100vh;
  overflow: hidden;
  position: relative;
  background-image: url(${bgPic});
  background-position: center top;
  background-repeat: no-repeat;
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
  z-index: 4;
`;
const Content = styled.div`
  background-color: white;
  width: 96vw;
  max-width: 1180px;
  margin: 44px auto;
  overflow: scroll;
  height: 94vh;
  max-height: 1000px;
  border: 1px solid black;
  position: relative;
  z-index: 3;
`;
const ResizingSvg = styled.svg`
  z-index: 1;
  height: auto;
  min-height: 500px;
`;
const TitleSVGText = styled.text`
  font-family: 'Cormorant', serif;
  font-size: 48px;
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
type DayPosProps = {
  pixelPerDay: number;
  date: Date;
};
type XPosProps = {
  dateAsNum: number;
  screenWidth: number;
  year: number;
};
type YPosProps = {
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
  dogName: string;
  num: number;
};
type DatePathProps = {
  startDateAsNum: number;
  endDateAsNum: number;
  screenWidth: number;
  rowHeight: number;
  startOffset: number;
  dogName: string;
  yearStart: number;
  yearEnd: number;
  pixelPerDay: number;
  num: number;
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

const monthDashGray = '#e4e4e4';
const lineBorderGray = '#E0E0E0';
const monthTextGray = '#E0E0E0';

function DayPos({ pixelPerDay, date }: DayPosProps) {
  const oneDayScale = scaleTime()
    .domain([new Date(2012, 0, 1), new Date(2012, 0, 2)]) // first dog Date, first Dog Date + 1 day
    .range([0, pixelPerDay]);
  return oneDayScale(date);
}
function returnXPos({ dateAsNum, screenWidth, year }: XPosProps) {
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
  startOffset,
  dogName,
  num
}: PathReturnProps) {
  const elem = document.getElementById('dogs');
  const dogGroup = document.getElementById(dogName);

  if (currentLine === 0) {
    if (numLines.length === 1) {
      return (
        <path
          strokeWidth="2"
          filter="url(#distort)"
          d={`M${startX} ${
            startDateRow + startOffset + (num % 3) * 10 - 10
          } v -4 H${endX}  v 4 h.01 v4`}
        />
      );
    }

    return (
      <path
        strokeWidth="2"
        d={`M${startX} ${
          startDateRow + startOffset + (num % 3) * 10 - 10
        } v -4 H${screenWidth}  v 4 h.01 v4`}
        filter="url(#distort)"
      />
    );
  }
  if (currentLine + 1 === numLines.length) {
    return (
      <path
        strokeWidth="2"
        filter="url(#distort)"
        d={`M0 ${
          startDateRow +
          currentLine * rowHeight +
          startOffset +
          (num % 3) * 10 -
          10
        } v -4 H${endX}  v 4 h.01 v4`}
      />
    );
  }
  return (
    <path
      strokeWidth="2"
      filter="url(#distort)"
      d={`M0 ${
        startDateRow +
        currentLine * rowHeight +
        startOffset +
        (num % 3) * 10 -
        10
      } v -4 H${screenWidth}  v 4 h.01 v4`}
    />
  );
}

// startDateRow, endDateRow, startX, endX
function datePath({
  startDateAsNum,
  endDateAsNum,
  screenWidth,
  rowHeight,
  startOffset,
  dogName,
  yearStart,
  yearEnd,
  pixelPerDay,
  num
}: DatePathProps) {
  const startDateRow = returnYPos({
    dateAsNum: startDateAsNum + 30 * (yearStart - 2011) * pixelPerDay,
    screenWidth,
    rowHeight
  });
  const endDateRow = returnYPos({
    dateAsNum: endDateAsNum + 30 * (yearEnd - 2011) * pixelPerDay,
    screenWidth,
    rowHeight
  });
  const startX = returnXPos({
    dateAsNum: startDateAsNum + 30 * (yearStart - 2011) * pixelPerDay,
    screenWidth,
    year: yearStart
  });
  const endX = returnXPos({
    dateAsNum: endDateAsNum + 30 * (yearEnd - 2011) * pixelPerDay,
    screenWidth,
    year: yearEnd
  });

  const numLines = new Array((endDateRow - startDateRow) / rowHeight + 1).fill(
    0
  );
  const elem = document.getElementById('dogs');
  const elemImgs = document.getElementsByClassName(
    'dogImg'
    // eslint-disable-next-line no-undef
  ) as HTMLCollectionOf<HTMLElement>;
  const dogGroup = document.getElementById(dogName);
  const dogImg = document.getElementById(`${dogName}img`);
  return (
    <g id={dogName} className="golden">
      <g
        onMouseOver={() => {
          if (elem) elem.style.fill = '#E0E0E0';
          // eslint-disable-next-line no-plusplus
          for (let i = 0; i < elemImgs.length; i++) {
            elemImgs[i].style.opacity = '0.2';
          }
          if (dogGroup) dogGroup.style.fill = 'url(#fullGrad)';
          if (dogImg) dogImg.style.opacity = '1';
        }}
        onMouseLeave={() => {
          if (elem) elem.style.fill = '';
          // eslint-disable-next-line no-plusplus
          for (let i = 0; i < elemImgs.length; i++) {
            elemImgs[i].style.opacity = '1';
          }
          if (dogGroup) dogGroup.style.fill = '';
        }}
      >
        <Link to={`/${dogName.replace(' ', '')}`}>
          <image
            className="dogImg"
            id={`${dogName}img`}
            href={
              dogName === 'Bobo' ? bobo : dogName === 'Boss' ? boss : second
            }
            style={{ cursor: 'pointer' }}
            height="90"
            x={startX - 64}
            y={startDateRow + startOffset - 54 + (num % 3) * 10 - 10}
          />
        </Link>
      </g>
      {numLines.map((x, i) =>
        pathReturn({
          currentLine: i,
          screenWidth,
          startDateRow,
          numLines,
          startX,
          endX,
          rowHeight,
          startOffset,
          dogName,
          num
        })
      )}
    </g>
  );
}

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
  const totalOffset = startOffset;
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
    screenWidth,
    year
  });
  const endX = returnXPos({
    dateAsNum: endDateAsNum,
    screenWidth,
    year
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
            stroke: monthDashGray,
            strokeWidth: '1px',
            strokeDasharray: '4 4',
            fill: 'white'
          }}
        />
        <MonthSVGText
          x={startX + 5}
          y={startDateRow + totalOffset - rowHeight / 2 + 15}
          fill={monthTextGray}
        >
          {month}
        </MonthSVGText>

        {month === 'Dec' && (
          <line
            x1="0"
            x2={screenWidth}
            y1={endDateRow + totalOffset + rowHeight / 2}
            y2={endDateRow + totalOffset + rowHeight / 2}
            stroke={lineBorderGray}
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
          stroke: monthDashGray,
          strokeWidth: '1px',
          strokeDasharray: '4 4',
          fill: 'white'
        }}
      />
      <MonthSVGText
        x={startX + 5}
        y={startDateRow + totalOffset - rowHeight / 2 + 15}
        fill={monthTextGray}
      >
        {month}
      </MonthSVGText>
      <rect
        x={0}
        y={endDateRow + totalOffset - rowHeight / 2}
        height={rowHeight}
        width={endX + pixelPerDay}
        style={{
          stroke: monthDashGray,
          strokeWidth: '1px',
          strokeDasharray: '4 4',
          fill: 'white'
        }}
      />

      {month === 'Dec' && (
        <line
          x1="0"
          x2={screenWidth}
          y1={endDateRow + totalOffset + rowHeight / 2}
          y2={endDateRow + totalOffset + rowHeight / 2}
          stroke={lineBorderGray}
          strokeWidth="2"
        />
      )}
      <line
        x1="0"
        x2={screenWidth}
        y1={totalOffset}
        y2={totalOffset}
        stroke={lineBorderGray}
        strokeWidth="2"
      />
    </g>
  );
}

function TestTwo({ isLoading, records }: HomePageProps) {
  const rowHeight = 60;
  const pixelPerDay = 8;
  const startOffset = 650;
  const [width, setWidth] = useState({ width: 1, numRows: 0 });
  const widthRef = useRef<any>();
  const totalTimeWidth = DayPos({
    pixelPerDay,
    date: new Date(2022, 11, 31)
  });
  const updateWidth = () => {
    const newWidth = widthRef.current.clientWidth;
    setWidth({
      width: newWidth,
      numRows: (totalTimeWidth + 10 * 30 * pixelPerDay) / newWidth
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
        {!isLoading ? (
          <ResizingSvg
            width={width.width}
            height={width.numRows * rowHeight + startOffset + rowHeight / 2}
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
              <linearGradient
                id="fullGrad"
                x1="-30%"
                y1="-30%"
                x2="100%"
                y2="100%"
                gradientUnits="userSpaceOnUse"
              >
                <stop
                  offset="0%"
                  style={{ stopColor: 'rgb(255,0,0)', stopOpacity: '1' }}
                />
                <stop
                  offset="33%"
                  style={{ stopColor: '#FFE669', stopOpacity: '.8' }}
                />
                <stop
                  offset="66%"
                  style={{ stopColor: '#FFA837', stopOpacity: '.8' }}
                />
                <stop
                  offset="100%"
                  style={{ stopColor: '#FF5100', stopOpacity: '.8' }}
                />
              </linearGradient>
            </defs>
            <g id="monthRects">
              {years.map((yr: string) =>
                MonthDays2.map((x: MonthDaysProp) =>
                  monthRect({
                    startDateAsNum:
                      DayPos({
                        pixelPerDay,
                        date: new Date(`${x.startDate}${yr}`)
                      }) +
                      (parseInt(yr, 10) - 2011) * 30 * pixelPerDay,
                    endDateAsNum:
                      DayPos({
                        pixelPerDay,
                        date: new Date(`${x.endDate}${yr}`)
                      }) +
                      (parseInt(yr, 10) - 2011) * 30 * pixelPerDay,
                    screenWidth: width.width,
                    rowHeight,
                    startOffset,
                    pixelPerDay,
                    month: x.month,
                    year: new Date(`${x.startDate}${yr}`).getFullYear()
                  })
                )
              )}
            </g>

            <g fill="url(#fullGrad)" id="dogs">
              {records.map((x: RecordsProp, i: number) =>
                datePath({
                  startDateAsNum: DayPos({
                    pixelPerDay,
                    date: new Date(x.startDate)
                  }),
                  endDateAsNum: DayPos({
                    pixelPerDay,
                    date: new Date(x.endDate)
                  }),
                  screenWidth: width.width,
                  rowHeight,
                  startOffset,
                  dogName: x.dogName,
                  yearStart: new Date(x.startDate).getFullYear(),
                  yearEnd: new Date(x.endDate).getFullYear(),
                  pixelPerDay,
                  num: i
                })
              )}
            </g>
            <g id="years">
              {years.map((yr: string) => {
                const monthRectOverflow =
                  returnXPos({
                    dateAsNum:
                      DayPos({
                        pixelPerDay,
                        date: new Date(`1/1/${yr}`)
                      }) +
                      (parseInt(yr, 10) - 2012) * 30 * pixelPerDay +
                      0,
                    screenWidth: width.width,
                    year: parseInt(yr, 10)
                  }) +
                  30 * pixelPerDay;
                return (
                  <g key={yr} fill="url(#fullGrad)">
                    <rect
                      x={returnXPos({
                        dateAsNum:
                          DayPos({
                            pixelPerDay,
                            date: new Date(`1/1/${yr}`)
                          }) +
                          (parseInt(yr, 10) - 2012) * 30 * pixelPerDay +
                          0,
                        screenWidth: width.width,
                        year: parseInt(yr, 10)
                      })}
                      y={
                        returnYPos({
                          dateAsNum:
                            DayPos({
                              pixelPerDay,
                              date: new Date(`1/1/${yr}`)
                            }) +
                            (parseInt(yr, 10) - 2012) * 30 * pixelPerDay,
                          screenWidth: width.width,
                          rowHeight
                        }) +
                        startOffset -
                        rowHeight / 2
                      }
                      height={rowHeight}
                      width={30 * pixelPerDay}
                      fill="#f8f8f8"
                      strokeWidth="2"
                      stroke="#BDBDBD"
                      strokeDasharray={`${30 * pixelPerDay} ${rowHeight}`}
                    />
                    <rect
                      x={0}
                      y={
                        returnYPos({
                          dateAsNum:
                            DayPos({
                              pixelPerDay,
                              date: new Date(`1/1/${yr}`)
                            }) +
                            (parseInt(yr, 10) - 2012) * 30 * pixelPerDay,
                          screenWidth: width.width,
                          rowHeight
                        }) +
                        rowHeight +
                        startOffset -
                        rowHeight / 2
                      }
                      height={rowHeight}
                      width={
                        monthRectOverflow % width.width > 29.9 * pixelPerDay
                          ? 0
                          : monthRectOverflow % width.width
                      }
                      fill="#f8f8f8"
                      strokeWidth="2"
                      stroke="#BDBDBD"
                      strokeDasharray={`${
                        monthRectOverflow % width.width
                      } ${rowHeight}`}
                    />
                    {returnXPos({
                      dateAsNum:
                        DayPos({
                          pixelPerDay,
                          date: new Date(`1/1/${yr}`)
                        }) +
                        (parseInt(yr, 10) - 2012) * 30 * pixelPerDay,
                      screenWidth: width.width,
                      year: parseInt(yr, 10)
                    })}
                    <TitleSVGText
                      x={
                        returnXPos({
                          dateAsNum:
                            DayPos({
                              pixelPerDay,
                              date: new Date(`1/1/${yr}`)
                            }) +
                            (parseInt(yr, 10) - 2012) * 30 * pixelPerDay,
                          screenWidth: width.width,
                          year: parseInt(yr, 10)
                        }) +
                        pixelPerDay * 10
                      }
                      y={
                        returnYPos({
                          dateAsNum:
                            DayPos({
                              pixelPerDay,
                              date: new Date(`1/1/${yr}`)
                            }) +
                            (parseInt(yr, 10) - 2012) * 30 * pixelPerDay +
                            40,
                          screenWidth: width.width,
                          rowHeight
                        }) +
                        startOffset +
                        9
                      }
                    >
                      {yr}
                    </TitleSVGText>
                    {monthRectOverflow % width.width < 29.9 * pixelPerDay && (
                      <TitleSVGText
                        x={(monthRectOverflow % width.width) - pixelPerDay * 20}
                        y={
                          returnYPos({
                            dateAsNum:
                              DayPos({
                                pixelPerDay,
                                date: new Date(`1/1/${yr}`)
                              }) +
                              (parseInt(yr, 10) - 2012) * 30 * pixelPerDay +
                              40,
                            screenWidth: width.width,
                            rowHeight
                          }) +
                          rowHeight +
                          startOffset +
                          9
                        }
                      >
                        {yr}
                      </TitleSVGText>
                    )}
                  </g>
                );
              })}
            </g>
          </ResizingSvg>
        ) : null}
        <div style={{ background: '#333333', height: '250px' }} />
      </Content>
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

export default TestTwo;
