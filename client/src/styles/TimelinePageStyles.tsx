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
  max-width: 1090px;
  margin: 0 auto;
  position: absolute;
  top: 20px;
  width: 96vw;
  height: 37px;
  left: 0;
  right: 0;
  z-index: 4;
`;
export const PinContainer = styled.div`
  max-width: 1090px;
  margin: 0 auto;
  position: absolute;
  top: 60px;
  width: 96vw;
  height: 37px;
  left: 0;
  right: 0;
  z-index: 4;
  // background-color: red;
  display: flex;
  justify-content: space-between;
`;
export const Content = styled.div`
  background-color: white;
  width: 96vw;
  max-width: 1100px;
  margin: 44px auto;
  overflow: scroll;
  height: 94vh;
  max-height: 1000px;
  border: 1.5px solid #333333;
  position: relative;
  z-index: 3;
`;
export const ResizingSvg = styled.svg`
  z-index: 1;
  height: auto;
  min-height: 500px;
  margin-top: -50px;
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

export const Footer = styled.div`
  background-color: #fff;
  color: black;
  font-size: 18px;
  font-weight: 300;
  line-height: 32px;
  display: flex;
  flex-direction: row;
  padding: 32px 32px;
  border-top: 1.5px solid #333333;
  @media (max-width: 780) {
    flex-direction: column;
  }
`;
export const Copyright = styled.div`
  background-color: #fff;
  color: black;
  font-size: 18px;
  font-weight: 300;
  line-height: 32px;
  display: flex;
  flex-direction: row;
  padding: 12px 32px;
  border-top: 1.5px solid #333333;
  text-align: center;
  justify-content: center;
`;
export const ParaLeft = styled.p`
  margin-right: 48px;
  flex: 3 1 0;
`;
export const ParaRight = styled.p`
  flex: 2 1 0;
`;

export const WebLink = styled.a`
  color: #000;
  text-decoration: none;
  border-bottom: 0.125em solid #ff8745;
  box-shadow: inset 0 -0.125em 0 #ff8745;
  transition: box-shadow 270ms cubic-bezier(0.77, 0, 0.175, 1),
    color 270ms cubic-bezier(0.77, 0, 0.295, 1);
  margin-left: 3px;
  &:hover {
    box-shadow: inset 0 -2.125em 0 #ff8745;
    color: #00;
  }
  &:focus {
    background: #fff;
    outline: none;
    background: #ff8745;
    color: #fff;
    box-shadow: 8px 8px 24px rgba(0, 0, 0, 0.2);
  }
`;
