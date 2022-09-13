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
import coverPhoto from '../data/DogCoverPhoto.png';
import coverPhotoMobile from '../data/CoverPhotoMobile.png';

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
  const startOffset = 48;
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
  }, [isLoading]);

  // update width on window resize
  useEffect(() => {
    window.addEventListener('resize', updateWidth);
  }, []);

  return (
    <S.Background>
      <S.Content ref={widthRef}>
        <div
          style={{
            width: '100%',
            height: width.width > 750 ? '600px' : '450px',
            backgroundImage: `url(${coverPhoto})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center top'
          }}
        />

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
        <S.Footer>
          <S.ParaLeft>
            Over the years, the Misner family has fostered many, many golden
            retrievers through the rescue organization{' '}
            <S.WebLink
              href="https://www.https://trueloverescue.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              {' '}
              True Love Rescue
            </S.WebLink>
            . Each dog that passes through our home takes a bit of our heart
            with them. I created this online calendar to record and celebrate
            all the dogs that have filled our home with joy and fur on their
            journey to their forever families.
          </S.ParaLeft>
          <S.ParaRight>
            Built with d3.js, React, handdrawn images and love. Read more about
            my process here.{' '}
          </S.ParaRight>
        </S.Footer>
        <S.Copyright>
          © 2022{' '}
          <S.WebLink
            href="https://www.priyamisner.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            {' '}
            Priya Misner
          </S.WebLink>
          . All Rights Reserved.{' '}
        </S.Copyright>
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
      <S.PinContainer>
        <svg
          id="pushpinleft"
          width="50"
          height="88"
          viewBox="0 0 50 88"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g filter="url(#filter0_f_508_3999)">
            <path
              d="M28.9652 75.8841C21.2927 78.0167 14.7447 50.1157 12.4297 35.8987C18.8234 33.1219 32.2724 27.5684 34.918 27.5684C38.2251 27.5684 38.5559 73.2184 28.9652 75.8841Z"
              fill="#BDBDBD"
            />
          </g>
          <path
            d="M39.4981 26.8238C39.4981 35.983 31.5792 43.461 21.7432 43.461C11.9072 43.461 3.98828 35.983 3.98828 26.8238C3.98828 17.6646 11.9072 10.1865 21.7432 10.1865C31.5792 10.1865 39.4981 17.6646 39.4981 26.8238Z"
            fill="#333333"
            stroke="#D9D9D9"
          />
          <path
            d="M12.027 30.8245C13.4923 28.5904 11.4164 25.2391 10.1953 23.8428H15.6902C17.1555 23.8428 17.8272 26.3252 17.9798 27.5664C19.5062 29.273 23.2915 32.0347 26.2222 29.4282C29.8855 26.17 34.4646 24.7737 34.0066 26.17C33.5487 27.5664 27.5959 33.1518 27.5959 35.9445C27.5959 38.7372 23.0168 40.1335 16.6061 39.2026C10.1953 38.2717 10.1953 33.6172 12.027 30.8245Z"
            fill="white"
            fill-opacity="0.3"
          />
          <path
            d="M30.5588 13.4118C30.5588 20.5058 24.3161 26.3235 16.5294 26.3235C8.74275 26.3235 2.5 20.5058 2.5 13.4118C2.5 6.31772 8.74275 0.5 16.5294 0.5C24.3161 0.5 30.5588 6.31772 30.5588 13.4118Z"
            fill="#333333"
            stroke="#D9D9D9"
          />
          <path
            d="M5.91016 21.4219C7.52454 24.899 13.9572 30.2885 26.7729 24.0297C21.5572 25.7683 10.0827 27.6807 5.91016 21.4219Z"
            fill="white"
          />
          <defs>
            <filter
              id="filter0_f_508_3999"
              x="0.429688"
              y="15.5684"
              width="48.5898"
              height="72.4316"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="6"
                result="effect1_foregroundBlur_508_3999"
              />
            </filter>
          </defs>
        </svg>
        <svg
          width="50"
          height="88"
          viewBox="0 0 50 88"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g filter="url(#filter0_f_508_4027)">
            <path
              d="M21.0348 75.8841C28.7073 78.0167 35.2553 50.1157 37.5703 35.8987C31.1766 33.1219 17.7276 27.5684 15.082 27.5684C11.7749 27.5684 11.4441 73.2184 21.0348 75.8841Z"
              fill="#BDBDBD"
            />
          </g>
          <path
            d="M10.498 26.8238C10.498 35.983 18.4169 43.461 28.2529 43.461C38.0889 43.461 46.0078 35.983 46.0078 26.8238C46.0078 17.6646 38.0889 10.1865 28.2529 10.1865C18.4169 10.1865 10.498 17.6646 10.498 26.8238Z"
            fill="#333333"
            stroke="#D9D9D9"
          />
          <path
            d="M37.973 30.8245C36.5077 28.5904 38.5836 25.2391 39.8047 23.8428H34.3098C32.8445 23.8428 32.1728 26.3252 32.0202 27.5664C30.4938 29.273 26.7085 32.0347 23.7778 29.4282C20.1145 26.17 15.5354 24.7737 15.9934 26.17C16.4513 27.5664 22.4041 33.1518 22.4041 35.9445C22.4041 38.7372 26.9832 40.1335 33.3939 39.2026C39.8047 38.2717 39.8047 33.6172 37.973 30.8245Z"
            fill="white"
            fill-opacity="0.3"
          />
          <path
            d="M19.4412 13.4118C19.4412 20.5058 25.6839 26.3235 33.4706 26.3235C41.2573 26.3235 47.5 20.5058 47.5 13.4118C47.5 6.31772 41.2573 0.5 33.4706 0.5C25.6839 0.5 19.4412 6.31772 19.4412 13.4118Z"
            fill="#333333"
            stroke="#D9D9D9"
          />
          <path
            d="M44.0898 21.4219C42.4755 24.899 36.0428 30.2885 23.2271 24.0297C28.4428 25.7683 39.9173 27.6807 44.0898 21.4219Z"
            fill="white"
          />
          <defs>
            <filter
              id="filter0_f_508_4027"
              x="0.980469"
              y="15.5684"
              width="48.5898"
              height="72.4316"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="6"
                result="effect1_foregroundBlur_508_4027"
              />
            </filter>
          </defs>
        </svg>
      </S.PinContainer>
    </S.Background>
  );
}

export default Timeline;
