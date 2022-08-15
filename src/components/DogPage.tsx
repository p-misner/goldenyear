/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Tooltip from './Tooltip';
import second from '../data/dogSvgs/ivy.svg';
import bgPic from '../data/bgWhite.png';

import '../stylesheet/fonts.css';

// code inspo links
// https://codepen.io/creme/pen/gOYrvxM

interface DogProps {
  dogName: string;
}

const Background = styled.div`
  background-color: white;
  margin: 0px;
  padding: 0;
  height: 100vh;
  overflow: hidden;
  background-image: url(${bgPic});
  background-position: center top;
  background-repeat: no-repeat;
`;
const Content = styled.div`
  background-color: white;

  width: 96vw;
  max-width: 1180px;
  overflow: scroll;
  margin: 44px auto;
  height: 94vh;
  max-height: 990px;
  border: 1px solid black;
  position: relative;
`;

const BlurryGradient = styled.div`
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
const SpiralContainer = styled.div`
  max-width: 1180px;
  margin: 0 auto;
  position: absolute;
  top: 20px;
  width: 96vw;
  height: 37px;
  left: 0;
  right: 0;
`;
const Blocks = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  overflow: hidden;
  z-index: 2;
  position: relative;
`;
const DogImage = styled.img`
  margin-left: 24px;
  height: 160px;
`;
const VerticalBlocks = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: left;
  margin-left: 24px;
  min-width: 330px;
`;
const TitleItalics = styled.p`
  font-style: italic;
  font-weight: 400;
  font-size: 40px;
  line-height: 50px;
`;
const TitleDogName = styled.p`
  font-weight: 600;
  font-size: 64px;
  line-height: 80px;
`;
const DescripPara = styled.p`
  font-size: 24px;
  line-height: 32px;
  margin: 0 44px;
`;
const LeftBlock = styled.div`
  border: 1px solid black;
  border-left: 1px;
  flex-grow: 1;
  padding: 4px;
  display: flex;
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: start;
  padding: 24px 0px;
`;
const RightBlock = styled.div`
  border: 1px solid black;
  border-left: 0px;
  border-right: 0px;
  flex-grow: 3;
  padding: 4px;
  display: flex;
  align-items: center;
`;
const BottomBlock = styled.div`
  border: 1px solid black;
  border-left: 0px;
  border-right: 0px;
  flex-grow: 3;
  height: 132px;
  position: relative;
`;

const TimelineBlock = styled.button`
  border: 1px solid black;
  border-bottom: 0.5px;
  background: none;
  // width: 210px;
  cursor: pointer;
`;

const NavLink = styled.a`
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

const HeroText = styled.h3`
  font-size: 48px;
  line-height: 120px;
  font-weight: 400;
`;

const ColumnContent = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  margin: 48px;
  z-index: 2;
  position: relative;
`;

const TextDiv = styled.div`
  grid-column: 1 / span 6;
`;

const Bolded = styled.span`
  font-weight: 600;
`;
const Flip = styled.span`
  display: inline-block;

  -moz-transform: scaleX(-1); /* Gecko */
  -o-transform: scaleX(-1); /* Opera */
  -webkit-transform: scaleX(-1); /* Webkit */
  transform: scaleX(-1); /* Standard */

  filter: FlipH; /* IE 6/7/8 */
`;

function DogPage(props: DogProps) {
  const { dogName } = props;
  return (
    <Background>
      <Content>
        <BlurryGradient />

        <Blocks style={{ paddingTop: '24px' }}>
          <LeftBlock>
            <DogImage src={second} alt="handdrawn" />
            <VerticalBlocks>
              <TitleItalics> foster 3</TitleItalics>
              <TitleDogName>{dogName}</TitleDogName>
            </VerticalBlocks>
          </LeftBlock>
          <RightBlock>
            <DescripPara>
              Eight year old Casey first arrived{' '}
              <Bolded>August 4, 2022.</Bolded> She stayed for{' '}
              <Bolded>146 days</Bolded> before her adoption on{' '}
              <Bolded>September 18</Bolded>. She spent many happy years with her
              family before passing away in 2016.
            </DescripPara>
          </RightBlock>
        </Blocks>
        <ColumnContent>
          <TextDiv>
            <HeroText>
              Fond of eating dirt
              <Tooltip
                text="random"
                imgString="https://i.ibb.co/7gW1j9N/277809399-5426573314027553-5845920547943345123-n.jpg"
              />
              and lying down,
              <Tooltip
                text="this one is kind of really long like it should probably be two lines long"
                imgString="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/golden-retriever-royalty-free-image-506756303-1560962726.jpg?crop=0.672xw:1.00xh;0.166xw,0&resize=640:*"
              />
              Frank is the goodest of boys. He spends his days drooling on the
              ground,
              <Tooltip
                text="random"
                imgString="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/golden-retriever-royalty-free-image-506756303-1560962726.jpg?crop=0.672xw:1.00xh;0.166xw,0&resize=640:*"
              />
              napping, resting his eyes, and invading the personal space of
              others.
            </HeroText>
          </TextDiv>
        </ColumnContent>
        <Link to="/">
          <TimelineBlock>
            <NavLink>
              <Flip>⤴</Flip> Return to Timeline
            </NavLink>
          </TimelineBlock>
        </Link>
        <Blocks>
          <BottomBlock>
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

              <text fill="#000" x="45" y="73" fontSize="24" fontWeight="500">
                Dog 4⤵
              </text>
            </svg>
          </BottomBlock>
        </Blocks>
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

export default DogPage;
