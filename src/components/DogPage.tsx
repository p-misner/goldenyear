/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Tooltip from './Tooltip';
import second from '../data/dogSvgs/ivy.svg';
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
`;
const Content = styled.div`
  background: rgb(34, 193, 195);
  background: linear-gradient(
    83deg,
    rgba(253, 195, 215, 0.8055555555555556) 0%,
    rgba(239, 242, 234, 0.5300925925925926) 36%,
    rgba(248, 209, 118, 0.3287037037037037) 55%,
    rgba(240, 239, 222, 0.4189814814814815) 71%,
    rgba(253, 187, 45, 0.21064814814814814) 100%
  );
  width: 96vw;
  max-width: 1180px;
  overflow: scroll;
  margin: 44px auto;
  overflow: scroll;
  height: 94vh;
  border: 1px solid black;
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
  padding-top: 24px;
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

const HeroText = styled.h3`
  font-size: 48px;
  line-height: 120px;
  font-weight: 400;
`;
const HeroImageInline = styled.img`
  height: 96px;
  margin: 0 12px;
  display: inline;
  vertical-align: middle;
`;

const ColumnContent = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  margin: 48px;
`;

const TextDiv = styled.div`
  grid-column: 1 / span 6;
`;

const Bolded = styled.span`
  font-weight: 600;
`;

function DogPage(props: DogProps) {
  const { dogName } = props;
  return (
    <Background>
      <Content>
        <Blocks>
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
              <Bolded>August 4, 2022.</Bolded> She stayed for 146 days before
              getting adopted on September 18th. She spent many happy years with
              her family before passing away in 2016.
            </DescripPara>
          </RightBlock>
        </Blocks>
        <ColumnContent>
          <TextDiv>
            <HeroText>
              Fond of eating dirt
              <Tooltip
                text="random"
                imgString="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/golden-retriever-royalty-free-image-506756303-1560962726.jpg?crop=0.672xw:1.00xh;0.166xw,0&resize=640:*"
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
