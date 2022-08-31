import React from 'react';
import { scaleTime } from 'd3-scale';

// TYPES
export type MonthDaysProp = {
  month: string;
  days: number;
  startDate: string;
  endDate: string;
};
export type RecordsProp = {
  dogName: string;
  startDate: string;
  endDate: string;
  imgSrc: string;
};
export interface HomePageProps {
  isLoading: boolean;
  records: RecordsProp[];
}
export type PathReturnProps = {
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
export type DatePathProps = {
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
  firstYear: number;
  imgSrc: string;
};
export type MonthRectProps = {
  startDateAsNum: number;
  endDateAsNum: number;
  screenWidth: number;
  rowHeight: number;
  startOffset: number;
  pixelPerDay: number;
  month: string;
};

type DayPosProps = {
  pixelPerDay: number;
  date: Date;
  firstYear: number;
};
export function DayPos({ pixelPerDay, date, firstYear }: DayPosProps) {
  const oneDayScale = scaleTime()
    .domain([new Date(firstYear, 0, 1), new Date(firstYear, 0, 2)])
    .range([0, pixelPerDay]);
  return oneDayScale(date);
}

type XPosProps = {
  dateAsNum: number;
  screenWidth: number;
};
export function returnXPos({ dateAsNum, screenWidth }: XPosProps) {
  return dateAsNum % screenWidth;
}

type YPosProps = {
  dateAsNum: number;
  screenWidth: number;
  rowHeight: number;
};
export function returnYPos({ dateAsNum, screenWidth, rowHeight }: YPosProps) {
  return Math.floor(dateAsNum / screenWidth) * rowHeight + rowHeight / 2;
}
