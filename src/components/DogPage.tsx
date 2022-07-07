import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Tooltip from './Tooltip';

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
  margin: 24px auto;
  overflow: scroll;
  height: 94vh;
  border: 1px solid black;
`;
const Blocks = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  width: 100%;
  position: sticky;
  // background-color: white;
  top: 0px;
  z-index: 10;
`;
const VerticalBlocks = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
`;
const SubtitleBlock = styled.div`
  border: 1px solid black;
  border-top: 0px;
  border-left: 0px;
  border-right: 0px;
  height: 25px;
  flex-grow: 2;
  min-width: 300px;
  padding: 4px;
  display: flex;
  align-items: center;
`;
const TitleBlock = styled.div`
  border: 1px solid black;
  border-top: 0px;
  border-left: 0px;
  height: 67px;
  flex-grow: 2;
  padding: 0px 8px;
  display: flex;
  justify-content: start;
  align-items: center;
  font-size: 24px;
`;

const HeroContainer = styled.div`
  width: 70vw;
  margin: 0 auto;
`;

const HeroText = styled.h3`
  font-family: 'Times New Roman', monospace;
  font-size: 36px;
  line-height: 80px;
`;
const HeroImageInline = styled.img`
  height: 96px;
  margin: 0 12px;
  display: inline;
  vertical-align: middle;
`;

const BodyText = styled.p`
  font-family: Avenir, sans-serif;
  font-size: 18px;
  line-height: 22px;
`;

const ColumnContent = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  margin: 48px;
`;

const RedDiv = styled.div`
  grid-column: 1 / span 6;
`;
const BlueDiv = styled.div`
  grid-column: 1 / span 4;
`;

function DogPage(props: DogProps) {
  const { dogName } = props;
  return (
    <Background>
      <Content>
        <Blocks>
          <TitleBlock>{`02. ${dogName}`}</TitleBlock>
          <VerticalBlocks>
            <SubtitleBlock>Info A</SubtitleBlock>
            <SubtitleBlock> Info B</SubtitleBlock>
          </VerticalBlocks>
          <VerticalBlocks>
            <SubtitleBlock>Info C</SubtitleBlock>
            <SubtitleBlock> Info D</SubtitleBlock>
          </VerticalBlocks>
        </Blocks>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
          </ul>
        </nav>
        <ColumnContent>
          <RedDiv>
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
          </RedDiv>

          <BlueDiv>
            <BodyText>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Commodo
              non ut quis porttitor. Erat sit imperdiet mi quam. Massa, at lacus
              vivamus lacus, aliquam habitant nullam. Id maecenas et ultrices
              lectus eleifend curabitur. Mauris viverra risus, condimentum nunc
              id. Sed interdum imperdiet malesuada ut arcu nisl orci.
            </BodyText>
          </BlueDiv>
        </ColumnContent>
      </Content>
    </Background>
  );
}

export default DogPage;
