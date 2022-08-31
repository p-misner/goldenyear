/* eslint-disable indent */
/* eslint-disable no-nested-ternary */
import React, { useState, useEffect, useRef } from 'react';
import * as S from '../styles/TimelinePageStyles';
import {
  HomePageProps,
  MonthDaysProp,
  RecordsProp,
  DayPos,
  returnYPos,
  returnXPos
} from './utils';
import { datePath, monthRect } from './TimelineComponents';

import second from '../data/dogSvgs/dog_threequarters.svg';

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

const firstYear = 2016;
const MonthDays2: MonthDaysProp[] = [
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

// startDateRow, endDateRow, startX, endX

function Timeline({ isLoading, records }: HomePageProps) {
  const rowHeight = 60;
  const pixelPerDay = 8;
  const startOffset = 650;
  const [width, setWidth] = useState({ width: 1, numRows: 0 });
  const widthRef = useRef<any>();

  const totalTimeWidth = DayPos({
    pixelPerDay,
    date: new Date(2022, 11, 31),
    firstYear
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
    <S.Background>
      <S.Content ref={widthRef}>
        {!isLoading ? (
          <S.ResizingSvg
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
                        date: new Date(`${x.startDate}${yr}`),
                        firstYear
                      }) +
                      (parseInt(yr, 10) - (firstYear - 1)) * 30 * pixelPerDay,
                    endDateAsNum:
                      DayPos({
                        pixelPerDay,
                        date: new Date(`${x.endDate}${yr}`),
                        firstYear
                      }) +
                      (parseInt(yr, 10) - (firstYear - 1)) * 30 * pixelPerDay,
                    screenWidth: width.width,
                    rowHeight,
                    startOffset,
                    pixelPerDay,
                    month: x.month
                  })
                )
              )}
            </g>

            <g fill="url(#fullGrad)" id="dogs">
              {records.map((x: RecordsProp, i: number) =>
                datePath({
                  startDateAsNum: DayPos({
                    pixelPerDay,
                    date: new Date(x.startDate),
                    firstYear
                  }),
                  endDateAsNum: DayPos({
                    pixelPerDay,
                    date: new Date(x.endDate),
                    firstYear
                  }),
                  screenWidth: width.width,
                  rowHeight,
                  startOffset,
                  dogName: x.dogName,
                  yearStart: new Date(x.startDate).getFullYear(),
                  yearEnd: new Date(x.endDate).getFullYear(),
                  pixelPerDay,
                  num: i,
                  firstYear,
                  imgSrc: x.imgSrc || second
                })
              )}
            </g>

            {/* try to do this within the dogs svg group so stacking */}

            <g id="years">
              {years.map((yr: string) => {
                const monthRectOverflow =
                  returnXPos({
                    dateAsNum:
                      DayPos({
                        pixelPerDay,
                        date: new Date(`1/1/${yr}`),
                        firstYear
                      }) +
                      (parseInt(yr, 10) - firstYear) * 30 * pixelPerDay +
                      0,
                    screenWidth: width.width
                  }) +
                  30 * pixelPerDay;
                return (
                  <g key={yr} fill="url(#fullGrad)">
                    <rect
                      x={returnXPos({
                        dateAsNum:
                          DayPos({
                            pixelPerDay,
                            date: new Date(`1/1/${yr}`),
                            firstYear
                          }) +
                          (parseInt(yr, 10) - firstYear) * 30 * pixelPerDay +
                          0,
                        screenWidth: width.width
                      })}
                      y={
                        returnYPos({
                          dateAsNum:
                            DayPos({
                              pixelPerDay,
                              date: new Date(`1/1/${yr}`),
                              firstYear
                            }) +
                            (parseInt(yr, 10) - firstYear) * 30 * pixelPerDay,
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
                              date: new Date(`1/1/${yr}`),
                              firstYear
                            }) +
                            (parseInt(yr, 10) - firstYear) * 30 * pixelPerDay,
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
                          date: new Date(`1/1/${yr}`),
                          firstYear
                        }) +
                        (parseInt(yr, 10) - firstYear) * 30 * pixelPerDay,
                      screenWidth: width.width
                    })}
                    <S.TitleSVGText
                      x={
                        returnXPos({
                          dateAsNum:
                            DayPos({
                              pixelPerDay,
                              date: new Date(`1/1/${yr}`),
                              firstYear
                            }) +
                            (parseInt(yr, 10) - firstYear) * 30 * pixelPerDay,
                          screenWidth: width.width
                        }) +
                        pixelPerDay * 10
                      }
                      y={
                        returnYPos({
                          dateAsNum:
                            DayPos({
                              pixelPerDay,
                              date: new Date(`1/1/${yr}`),
                              firstYear
                            }) +
                            (parseInt(yr, 10) - firstYear) * 30 * pixelPerDay +
                            40,
                          screenWidth: width.width,
                          rowHeight
                        }) +
                        startOffset +
                        9
                      }
                    >
                      {yr}
                    </S.TitleSVGText>
                    {monthRectOverflow % width.width < 29.9 * pixelPerDay && (
                      <S.TitleSVGText
                        x={(monthRectOverflow % width.width) - pixelPerDay * 20}
                        y={
                          returnYPos({
                            dateAsNum:
                              DayPos({
                                pixelPerDay,
                                date: new Date(`1/1/${yr}`),
                                firstYear
                              }) +
                              (parseInt(yr, 10) - firstYear) *
                                30 *
                                pixelPerDay +
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
                      </S.TitleSVGText>
                    )}
                  </g>
                );
              })}
            </g>
          </S.ResizingSvg>
        ) : null}
        <div style={{ background: '#333333', height: '250px' }} />
      </S.Content>
      <S.SpiralContainer>
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
      </S.SpiralContainer>
    </S.Background>
  );
}

export default Timeline;
