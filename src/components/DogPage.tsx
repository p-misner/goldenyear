/* eslint-disable indent */
/* eslint-disable no-return-assign */
/* eslint-disable max-len */
/* eslint-disable no-confusing-arrow */
/* eslint-disable react/jsx-one-expression-per-line */
import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useRef,
  useCallback
} from 'react';
import { Link } from 'react-router-dom';
import { scaleTime } from 'd3-scale';
import Tooltip from './Tooltip';
import * as S from '../styles/DogPageStyles';
import '../styles/fonts.css';

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
  useLayoutEffect(() => {
    updateWidth();
  }, [isLoading]);

  // update width on window resize
  useEffect(() => {
    window.addEventListener('resize', updateWidth);
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
    [width, dogName]
  );

  useEffect(() => {
    async function getRecords() {
      const response = await fetch(
        `https://goldenyearsapp.herokuapp.com:3001/dogRecords/${dogName}`
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
    <S.Background>
      {!isLoading && (
        <S.Content ref={widthRef}>
          <S.BlurryGradient />

          <S.Blocks style={{ paddingTop: '24px' }}>
            <S.LeftBlock>
              {records?.dogSvg && (
                <S.DogImage src={records?.dogSvg} alt="handdrawn" />
              )}
              <S.VerticalBlocks>
                <S.TitleItalics> foster {records?.fosterNum}</S.TitleItalics>
                <S.TitleDogName>{dogName}</S.TitleDogName>
              </S.VerticalBlocks>
            </S.LeftBlock>
            <S.RightBlock>
              <S.DescripPara>
                {records?.summaryText &&
                  records?.summaryText.map((x: any, i: number) =>
                    x.type === 'bold' ? (
                      <S.Bolded key={x.text}>{x.text} </S.Bolded>
                    ) : (
                      <span key={x.text}>{x.text} </span>
                    )
                  )}
              </S.DescripPara>
            </S.RightBlock>
          </S.Blocks>
          <S.ColumnContent>
            <S.HeroDiv>
              <S.HeroText>
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
              </S.HeroText>
            </S.HeroDiv>

            {records?.gallery && (
              <S.PictureScroll>
                {records?.gallery.map((x: any, i: number) => (
                  <Tooltip
                    key={
                      x.tooltipText +
                      (Math.random() + 1).toString(36).substring(7)
                    }
                    text={x.tooltipText}
                    imgString={x.imgSrc}
                    type="large"
                  />
                ))}
              </S.PictureScroll>
            )}

            <S.TextDiv>
              {records?.overflowText &&
                records?.overflowText.map((x: any, i: number) => (
                  <S.OverflowPara
                    key={(Math.random() + 1).toString(36).substring(7)}
                  >
                    {x}
                  </S.OverflowPara>
                ))}
            </S.TextDiv>
          </S.ColumnContent>
          <Link to="/">
            <S.TimelineBlock>
              <S.NavLink>
                <S.Flip>⤴</S.Flip> Return to Timeline
              </S.NavLink>
            </S.TimelineBlock>
          </Link>
          <S.BottomBlock>
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
          </S.BottomBlock>
        </S.Content>
      )}
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

export default DogPage;
