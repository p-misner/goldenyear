/* eslint-disable no-unsafe-optional-chaining */
import React, { useState } from 'react';

import styled from 'styled-components';

const TooltipWrapper = styled.div`
  margin: 0 12px;
  display: inline-block;
  vertical-align: middle;
  cursor: nesw-resize;
  @media (max-width: 900px) {
    height: 80px;
  }
`;
type TargetImgProps = { type: string };
const TargetImage = styled.img<TargetImgProps>`
  height: ${(props) => (props.type === 'small' ? '112px' : '500px')};
  vertical-align: middle;
  @media (max-width: 900px) {
    height: ${(props) => (props.type === 'small' ? '80px' : '300px')};
  }
`;

type TooltipProps = {
  text: string;
  imgString: string;
  type: string;
};

const TooltipTestWrapper = styled.div`
  display: inline-block;
  position: relative;
`;

const TooltipTestTip = styled.div`
  position: absolute;
  border: 1px solid black;
  left: 50%;
  top: 60%;
  transform: translateX(5%) translateY(0%);
  padding: 8px 12px;
  color: black;
  background: rgba(255, 255, 255, 1);
  font-size: 14px;
  line-height: 1.5;
  z-index: 100;
  min-width: 200px;
  filter: drop-shadow(6px 6px 12px rgba(255, 155, 123, 0.3));
`;

function TooltipTest(props: {
  delay: number;
  children: any;
  content: any;
  direction: string;
}) {
  const { delay, children, direction, content } = props;
  let timeout: any;
  const [active, setActive] = useState(false);
  const showTip = () => {
    timeout = setTimeout(() => {
      setActive(true);
    }, delay || 400);
  };

  const hideTip = () => {
    clearInterval(timeout);
    setActive(false);
  };

  return (
    <TooltipTestWrapper
      // When to show the tooltip
      onMouseEnter={showTip}
      onMouseLeave={hideTip}
    >
      {/* Wrapping */}
      {children}
      {active && (
        <TooltipTestTip className={`Tooltip-Tip ${direction || 'top'}`}>
          {/* Content */}
          {content}
        </TooltipTestTip>
      )}
    </TooltipTestWrapper>
  );
}

function Tooltip({ text, imgString, type }: TooltipProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <TooltipWrapper onClick={() => setIsOpen(!isOpen)}>
      <TooltipTest content={text} direction="right" delay={100}>
        <TargetImage
          src={imgString}
          alt="dog picture"
          data-tip
          data-for="registerTip"
          type={type}
        />
      </TooltipTest>
      {isOpen ? (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            width: '100vw',
            backgroundColor: 'rgba(0,0,0,0.7)',
            cursor: 'sw-resize',
            zIndex: '300'
          }}
        >
          <img
            src={imgString}
            alt="dog"
            style={{
              height: '90%',
              width: 'auto'
            }}
          />
        </div>
      ) : null}
    </TooltipWrapper>
  );
}
export default Tooltip;
