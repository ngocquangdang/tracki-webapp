// Dependencies
import React, { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import moment from 'moment';

// Variables
const spinRadius = 4;
const keyStep = 10;
let duration = 0;

// RangeSlider component
const RangeSlider = ({
  min,
  max,
  onChangeValues,
  labelCount = 10,
  width = 100,
}) => {
  const [activeSpin, setActiveSpin] = useState(null);
  const firstSpinRef = useRef();
  const secondSpinRef = useRef();
  const activeBarRef = useRef();
  const containerRef = useRef();
  const barRef = useRef();

  const step = duration < labelCount ? 1 : duration / labelCount;
  labelCount =
    duration < labelCount ? duration : Math.ceil(duration / Math.round(step));
  let pos1 = 0,
    pos2 = 0;

  useEffect(() => {
    moveSpin(firstSpinRef.current, 0);
    moveSpin(secondSpinRef.current, width);
    console.log('range slider first _____');
  }, []);

  useEffect(() => {
    duration = Math.round(moment(max).diff(moment(min), 'h') / 24);
    makeDraggable(firstSpinRef.current);
    makeDraggable(secondSpinRef.current);
    moveSpin(firstSpinRef.current, 0);
    moveSpin(secondSpinRef.current, 0);
    window.onkeydown = onKeyDown;
    console.log('range slider _____');
    return () => {
      window.onkeydown = null;
    };
  }, [min, max, activeSpin, makeDraggable, moveSpin]);

  const onKeyDown = e => {
    if (activeSpin) {
      if (e.key === 'ArrowRight') {
        moveSpin(activeSpin, keyStep);
      }
      if (e.key === 'ArrowLeft') {
        moveSpin(activeSpin, -keyStep);
      }
    }
  };

  const moveSpin = (element, distance) => {
    const minValue =
      element === firstSpinRef.current ? 0 : firstSpinRef.current.offsetLeft;
    const maxValue =
      element === firstSpinRef.current
        ? secondSpinRef.current.offsetLeft
        : width;

    if (element.offsetLeft + distance < minValue) {
      element.style.left = minValue + 'px';
    } else {
      if (element.offsetLeft + distance > maxValue) {
        element.style.left = maxValue + 'px';
      } else {
        element.style.left = element.offsetLeft + distance + 'px';
      }
    }

    if (element === firstSpinRef.current) {
      activeBarRef.current.style.left = element.style.left;
    }

    activeBarRef.current.style.width =
      secondSpinRef.current.offsetLeft - firstSpinRef.current.offsetLeft + 'px';
    onChangeValues(
      moment(min)
        .add((firstSpinRef.current.offsetLeft / width) * duration * 1440, 'm')
        .toDate(),
      moment(min)
        .add((secondSpinRef.current.offsetLeft / width) * duration * 1440, 'm')
        .toDate()
    );
  };

  const makeDraggable = element => {
    const onMouseUp = () => {
      document.onmouseup = null;
      containerRef.current.onmousemove = null;
    };

    const onMouseMove = e => {
      e.preventDefault();
      pos1 = pos2 - e.clientX;
      pos2 = e.clientX;
      moveSpin(element, -pos1);
    };

    element.onmousedown = e => {
      e.preventDefault();
      pos2 = e.clientX;
      containerRef.current.onmousemove = onMouseMove;
      document.onmouseup = onMouseUp;
      setActiveSpin(element);
    };
  };

  return (
    <Container ref={containerRef}>
      <Bar ref={barRef}>
        <Spin ref={firstSpinRef}>
          <Circle />
        </Spin>
        <Spin ref={secondSpinRef}>
          <Circle />
        </Spin>
        <ActiveBar ref={activeBarRef} width={width} />
      </Bar>
      <LabelWrapper>
        <Label left={0}>
          |<br />
          {moment(min).format('DD MMM')}
        </Label>
        {new Array(labelCount === 0 ? 0 : labelCount - 1)
          .fill(0)
          .map((_, index) => (
            <Label
              key={index}
              left={
                (width / (duration === 0 ? 1 : duration)) *
                Math.round(step) *
                (index + 1)
              }
            >
              |<br />
              {moment(min)
                .add(Math.round(step) * (index + 1), 'd')
                .format('DD MMM')}
            </Label>
          ))}
        <Label left={width}>
          |<br />
          {moment(max).format('DD MMM')}
        </Label>
      </LabelWrapper>
    </Container>
  );
};

// Styles
const Container = styled.div`
  flex: 1;
  padding: 20px 0;
  margin: 0 35px;
`;

const Bar = styled.div`
  flex: 1;
  background-color: rgba(29, 122, 70, 0.4);
  height: 3px;
  position: relative;
`;

const ActiveBar = styled.div`
  height: 100%;
  background-color: #168449;
  position: absolute;
  top: 0;
  left: ${props => (props.left && props.left ? props.left : 0)}px;
  width: ${props => (props.width && props.width ? props.width : 0)}px;
`;

const LabelWrapper = styled.div`
  position: relative;
  margin-top: 10px;
  font-size: 12px;
  color: #666666;
  font-weight: 500;
`;

const Label = styled.div`
  position: absolute;
  text-align: center;
  margin-left: -20px;

  ${props =>
    !!props.left &&
    css`
      left: ${props.left}px;
    `}
`;

const Spin = styled.div`
  position: absolute;
  top: -5px;
  cursor: pointer;
`;

const Circle = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 6px;
  background-color: #168449;
  margin-left: -${spinRadius}px;
`;

export default RangeSlider;
