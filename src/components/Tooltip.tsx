/* eslint-disable no-unsafe-optional-chaining */
import React, { useState, createRef, useRef, useCallback } from 'react';
import ReactTooltip from 'react-tooltip';

import styled from 'styled-components';

const TooltipWrapper = styled.div`
  margin: 0 12px;
  display: inline-block;
  vertical-align: middle;
  @media (max-width: 900px) {
    height: 80px;
  }
`;

const TargetImage = styled.img`
  height: 96px;
  vertical-align: middle;
  @media (max-width: 900px) {
    height: 80px;
  }
`;

// Tooltip Wrapper wraps TooltipTarget and TooltipCOntainer

type TooltipProps = {
  text: string;
  imgString: string;
  boundRect: string;
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
  width: 200px;
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

function Tooltip({ text, imgString, boundRect }: TooltipProps) {
  return (
    <TooltipWrapper>
      <TooltipTest content={text} direction="right" delay={100}>
        <TargetImage
          src={imgString}
          alt="dog picture"
          data-tip
          data-for="registerTip"
        />
      </TooltipTest>
    </TooltipWrapper>
  );
}
export default Tooltip;
