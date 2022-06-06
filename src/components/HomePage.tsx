import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import second from '../data/dogSvgs/second.svg';

const Background = styled.div`
  background: rgb(34, 193, 195);
  background: linear-gradient(
    83deg,
    rgba(34, 193, 195, 0.3055555555555556) 0%,
    rgba(239, 242, 234, 0.5300925925925926) 36%,
    rgba(248, 209, 118, 0.3287037037037037) 55%,
    rgba(240, 239, 222, 0.4189814814814815) 71%,
    rgba(253, 187, 45, 0.21064814814814814) 100%
  );
  margin: 0px;
  padding: 0;
  height: 100vh;
  overflow: hidden;
`;
const Content = styled.div`
  background-color: white;
  width: 96vw;
  max-width: 1180px;
  height: 400px;
  margin: 24px auto;
  overflow: scroll;
  border: 1px solid black;
`;

const Blocks = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  width: 100%;
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

function HomePage() {
  return (
    <Background>
      {'  '}
      <nav>
        <ul>
          <li>
            <Link to="/pageB">To Page B</Link>
          </li>
        </ul>
      </nav>
      <Content>
        <Blocks>
          <TitleBlock> The Golden Years</TitleBlock>
          <VerticalBlocks>
            <SubtitleBlock>
              The golden retrievers we have loved and
            </SubtitleBlock>
            <SubtitleBlock> fostered since 2012.</SubtitleBlock>
          </VerticalBlocks>
        </Blocks>
        <svg width="600" height="100">
          <image href={second} width="100px" />
          <path d="M60,60 H 100" stroke="red" strokeWidth="3px" />
        </svg>
      </Content>
    </Background>
  );
}

export default HomePage;
