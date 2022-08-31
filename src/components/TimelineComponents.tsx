import React from 'react';
import { Link } from 'react-router-dom';
import {
  PathReturnProps,
  DatePathProps,
  MonthRectProps,
  returnYPos,
  returnXPos
} from './utils';
import { MonthSVGText } from '../styles/TimelinePageStyles';

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
  if (currentLine === 0) {
    if (numLines.length === 1) {
      return (
        <path
          key={dogName}
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
        key={`${dogName}currLine${currentLine}`}
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
        key={`${dogName}currLine${currentLine}`}
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
      key={`${dogName}currLine${currentLine}`}
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

export function datePath({
  startDateAsNum,
  endDateAsNum,
  screenWidth,
  rowHeight,
  startOffset,
  dogName,
  yearStart,
  yearEnd,
  pixelPerDay,
  num,
  imgSrc,
  firstYear
}: DatePathProps) {
  const startDateRow = returnYPos({
    dateAsNum:
      startDateAsNum + 30 * (yearStart - (firstYear - 1)) * pixelPerDay,
    screenWidth,
    rowHeight
  });
  const endDateRow = returnYPos({
    dateAsNum: endDateAsNum + 30 * (yearEnd - (firstYear - 1)) * pixelPerDay,
    screenWidth,
    rowHeight
  });
  const startX = returnXPos({
    dateAsNum:
      startDateAsNum + 30 * (yearStart - (firstYear - 1)) * pixelPerDay,
    screenWidth
  });
  const endX = returnXPos({
    dateAsNum: endDateAsNum + 30 * (yearEnd - (firstYear - 1)) * pixelPerDay,
    screenWidth
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
    <g id={dogName} key={dogName} className="golden">
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
            href={imgSrc}
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

const monthDashGray = '#e4e4e4';
const lineBorderGray = '#E0E0E0';
const monthTextGray = '#E0E0E0';

export function monthRect({
  startDateAsNum,
  endDateAsNum,
  screenWidth,
  rowHeight,
  startOffset,
  pixelPerDay,
  month
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
      <g key={`numLength1${startX}${endX}`}>
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
    <g key={`${month}${startDateAsNum}`}>
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
