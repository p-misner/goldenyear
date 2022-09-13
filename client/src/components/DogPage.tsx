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
        `https://goldenyearsapp.herokuapp.com/dogRecords/${dogName}`
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

export default DogPage;
