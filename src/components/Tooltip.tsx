import React, { useState, createRef, useRef, useCallback } from 'react';
import styled from 'styled-components';

type TooltipContainerProps = {
  xPos: number;
  yPos: number;
};

const TooltipContainer = styled.div.attrs<TooltipContainerProps>((props) => ({
  style: {
    left: `${props.xPos + 10 || 500}px`,
    top: `${props.yPos + 10 || 500}px`
  }
}))<TooltipContainerProps>`
  background-color: white;
  border: 2px solid black;
  position: absolute;
  font-family: Georgia, Times New Roman, serif;
  padding: 4px 8px;
  font-size: 16px;
  line-height: 24px;
  max-width: 300px;
`;

const TooltipWrapper = styled.div`
  height: 96px;
  width: 96px;
  margin: 0 12px;
  display: inline;
  vertical-align: middle;
`;

const TargetImage = styled.img`
  height: 96px;
  vertical-align: middle;
`;
// display of relative on Wrapper causing positioning issue with cursor
const Arrow = styled.div`
  position: absolute;
  top: -20px;
  right: 0px;
  // display: none;
  color: white;
  line-height: 12px;
  font-size: 20px;
  font-weight: 800;
  text-shadow: 2px black;
`;

// Tooltip Wrapper wraps TooltipTarget and TooltipCOntainer

type TooltipProps = {
  text: string;
  imgString: string;
};

type PosProps = {
  xPos: number;
  yPos: number;
};

function Tooltip({ text, imgString }: TooltipProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const targetRef = useRef(null);
  const showTooltip = isHovered || isFocused;
  const [pos, setPos] = useState<PosProps>({ xPos: 5, yPos: 5 });
  const cursor = useRef<HTMLImageElement>(null);

  const updatePosition = useCallback((event: { pageX: any; pageY: any }) => {
    setPos({ xPos: event.pageX, yPos: event.pageY });
  }, []);

  return (
    <TooltipWrapper>
      <TargetImage
        ref={cursor}
        src={imgString}
        alt="dog picture"
        onMouseEnter={() => {
          setIsHovered(true);
          document.addEventListener('mousemove', updatePosition);
        }}
        onMouseLeave={() => {
          document.removeEventListener('mousemove', updatePosition);
          setIsHovered(false);
        }}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />

      {showTooltip && (
        <TooltipContainer xPos={pos.xPos} yPos={pos.yPos}>
          {text}
        </TooltipContainer>
      )}
    </TooltipWrapper>
  );
}
export default Tooltip;
