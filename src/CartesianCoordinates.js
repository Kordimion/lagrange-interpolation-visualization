import React from 'react';
import {Line, Text} from 'react-konva';

export default function CartesianCoordinates(props) {
  let {width, height, scale} = props;
  if (scale === undefined) scale = 20;
  if (width === undefined) width = 600;
  if (height === undefined) height = 600;
  const strokes = () => {
    //configuration for all strokes and text
    const interval = 25;
    const strokeSize = 2;
    const stroke = 'red';
    const strokeWidth = 1;
    const numbersColor = '#999';
    const numbersOffsetHorisontal = 5;
    const numbersFontSize = 8;
    const numbersFontFamily = 'Helvetica';

    // this loop generates horisontal strokes with numbers for scale
    // it does this in both ways at the same time for consistency
    const res = [];
    for (let i = width / 2 + interval; i < width - 10; i += interval) {
      res.push(
        <Line
          points={[i, height / 2 - strokeSize, i, height / 2 + strokeSize]}
          stroke={stroke}
          strokeWidth={strokeWidth}
        />,
      );
      res.push(
        <Text
          text={Math.round((i - height / 2) * ((scale * 2) / height) * 10) / 10}
          width={interval}
          x={i - interval / 2}
          y={height / 2 + strokeSize}
          fontSize={numbersFontSize}
          fill={numbersColor}
          fontFamily={numbersFontFamily}
          align="center"
        />,
      );
      res.push(
        <Text
          text={Math.round((height / 2 - i) * ((scale * 2) / height) * 10) / 10}
          width={interval}
          x={height - i - interval / 2}
          y={height / 2 + strokeSize}
          fontSize={numbersFontSize}
          fill={numbersColor}
          fontFamily={numbersFontFamily}
          align="center"
        />,
      );
      res.push(
        <Line
          points={[
            width - i,
            height / 2 - strokeSize,
            width - i,
            height / 2 + strokeSize,
          ]}
          stroke={stroke}
          strokeWidth={strokeWidth}
        />,
      );
    }
    // this loop generates vertical strokes with numbers for scale
    // it does this in both ways at the same time for consistency
    for (let i = height / 2 + interval; i < height - 10; i += interval) {
      res.push(
        <Line
          points={[width / 2 - strokeSize, i, width / 2 + strokeSize, i]}
          stroke={stroke}
          strokeWidth={strokeWidth}
        />,
      );
      res.push(
        <Text
          text={Math.round((width / 2 - i) * ((scale * 2) / width) * 10) / 10}
          x={width / 2 - strokeSize + numbersOffsetHorisontal}
          y={i - numbersFontSize / 2}
          fontSize={numbersFontSize}
          fill={numbersColor}
          fontFamily={numbersFontFamily}
        />,
      );
      res.push(
        <Text
          text={Math.round((((i - width / 2) * (scale * 2)) / width) * 10) / 10}
          x={width / 2 - strokeSize + numbersOffsetHorisontal}
          y={height - i - numbersFontSize / 2}
          fontSize={numbersFontSize}
          fill={numbersColor}
          fontFamily={numbersFontFamily}
        />,
      );
      res.push(
        <Line
          points={[
            width / 2 - strokeSize,
            height - i,
            width / 2 + strokeSize,
            height - i,
          ]}
          stroke={stroke}
          strokeWidth={strokeWidth}
        />,
      );
    }
    return res;
  };

  return (
    <>
      <Line
        points={[width / 2, 12, width / 2, height]}
        stroke="black"
        strokeWidth={1}
      />
      <Text text="X" x={width - 10} y={height / 2 - 5} fontSize={12} />
      <Text text="Y" x={width / 2 - 4} y={0} fontSize={12} />
      <Line
        points={[0, height / 2, width - 12, height / 2]}
        stroke="black"
        strokeWidth={1}
      />
      {strokes()}
    </>
  );
}
