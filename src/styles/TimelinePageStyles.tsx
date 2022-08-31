import styled from 'styled-components';
import bgPic from '../data/bgColor.png';

export const Background = styled.div`
  padding: 0px;
  height: 100vh;
  overflow: hidden;
  position: relative;
  background-image: url(${bgPic});
  background-position: center top;
  background-repeat: no-repeat;
`;
export const SpiralContainer = styled.div`
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
export const Content = styled.div`
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
export const ResizingSvg = styled.svg`
  z-index: 1;
  height: auto;
  min-height: 500px;
`;
export const TitleSVGText = styled.text`
  font-family: 'Cormorant', serif;
  font-size: 48px;
  font-weight: 700;
`;
export const MonthSVGText = styled.text`
  font-family: 'Cormorant', serif;
  font-size: 16px;
`;
