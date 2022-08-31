import styled from 'styled-components';
import bgPic from '../data/bgWhite.png';

export const Background = styled.div`
  background-color: white;
  margin: 0px;
  padding: 0;
  height: 100vh;
  overflow: hidden;
  background-image: url(${bgPic});
  background-position: center top;
  background-repeat: no-repeat;
`;
export const Content = styled.div`
  background-color: white;
  width: 96vw;
  max-width: 1180px;
  overflow-y: scroll;
  overflow-x: hidden;
  margin: 44px auto;
  height: 94vh;
  max-height: 990px;
  border: 1px solid black;
  position: relative;
`;
export const BlurryGradient = styled.div`
  position: absolute;
  background-clip: content-box;
  top: -200px;
  left: 300px;
  transform: translate(-50%, 0%);
  width: 1200px;
  height: 900px;
  border-radius: 50% 22% 40% 80%;
  filter: blur(100px);
  background: radial-gradient(
    circle at 50% 50%,
    rgba(235, 205, 203, 1),
    rgba(243, 220, 146, 1),
    rgba(249, 235, 71, 0)
  );
  opacity: 0.7;
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
`;
export const Blocks = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  overflow: hidden;
  z-index: 2;
  position: relative;
  @media (max-width: 900px) {
    flex-direction: column;
  }
`;
export const DogImage = styled.img`
  margin-left: 24px;
  height: 160px;
  @media (max-width: 900px) {
    margin-left: 16px;
    height: 120px;
  }
`;
export const VerticalBlocks = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: left;
  margin-left: 24px;
  min-width: 330px;
`;
export const TitleItalics = styled.p`
  font-style: italic;
  font-weight: 400;
  font-size: 40px;
  line-height: 40px;
  @media (max-width: 900px) {
    font-size: 32px;
    line-height: 16px;
  }
`;
export const TitleDogName = styled.p`
  font-weight: 600;
  font-size: 64px;
  line-height: 80px;
  @media (max-width: 900px) {
    font-size: 48px;
  }
`;
export const DescripPara = styled.p`
  font-size: 24px;
  line-height: 40px;
  margin: 0 44px;
  @media (max-width: 900px) {
    margin: 16px;
  }
`;
export const OverflowPara = styled.p`
  font-size: 24px;
  line-height: 40px;
  margin-top: 24px;
  @media (max-width: 900px) {
    margin: 16px;
  }
`;
export const LeftBlock = styled.div`
  border: 1px solid black;
  border-left: 1px;
  padding: 4px;
  display: flex;
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: start;
  min-width: 440px;
  padding: 24px 0px;
  @media (max-width: 900px) {
    border-bottom: 0px;
    border-right: 0px;
  }
`;
export const RightBlock = styled.div`
  border: 1px solid black;
  border-left: 0px;
  border-right: 0px;
  padding: 4px;
  display: flex;
  align-items: center;
`;
export const BottomBlock = styled.div`
  border: 1px solid black;
  border-left: 0px;
  border-right: 0px;
  flex-grow: 3;
  height: 132px;
  position: relative;
`;
export const TimelineBlock = styled.button`
  border: 1px solid black;
  border-bottom: 0.5px;
  background: none;
  cursor: pointer;
`;
export const NavLink = styled.a`
  color: black;
  font-family: 'Cormorant', sans-serif;
  font-size: 16px;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
  padding: 12px;
  line-height: 32px;
`;
export const HeroText = styled.h3`
  font-size: 48px;
  line-height: 102px;
  font-weight: 400;
  @media (max-width: 900px) {
    font-size: 40px;
    line-height: 80px;
  }
`;
export const ColumnContent = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  margin: 48px;
  z-index: 2;
  position: relative;
  @media (max-width: 900px) {
    margin: 24px;
  }
`;
export const HeroDiv = styled.div`
  grid-column: 1 / span 6;
`;
export const TextDiv = styled.div`
  grid-column: 1 / span 5;
  @media (max-width: 900px) {
    grid-column: 1 / span 6;
  }
`;
export const PictureScroll = styled.div`
  overflow-x: scroll;
  overflow-y: hidden;
  height: 500px;
  white-space: nowrap;
  grid-column: 1 / span 6;
  margin: 24px 0px;
  @media (max-width: 900px) {
    height: 300px;
  }
`;
export const Bolded = styled.span`
  font-weight: 600;
`;
export const Flip = styled.span`
  display: inline-block;

  -moz-transform: scaleX(-1); /* Gecko */
  -o-transform: scaleX(-1); /* Opera */
  -webkit-transform: scaleX(-1); /* Webkit */
  transform: scaleX(-1); /* Standard */

  filter: FlipH; /* IE 6/7/8 */
`;
