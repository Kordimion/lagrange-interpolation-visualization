import React from 'react';
import CartesianCoordinates from './CartesianCoordinates.js';
import {Stage, Line, Layer} from 'react-konva';
import AnchorPoint from './AnchorPoint.js';
import {Center, Box} from '@chakra-ui/react';

export default function Canvas(props) {
  const [anchorPoints, setAnchorPoints] = React.useState([]);

  const createAnchorPoint = (x, y) => {
    setAnchorPoints([...anchorPoints, {x: x, y: y}]);
  };

  const {width, height} = props;

  const updateMovingPoint = (prevX, prevY) => (newX, newY) => {
    //console.log('searching for: ', newX, newY);
    //console.log('current state = ', anchorPoints);
    const index = anchorPoints.findIndex(
      obj => obj.x === prevX && obj.y === prevY,
    );
    //console.log('index: ', index);
    if (index !== -1)
      if (newX > width || newX < 0 || newY > height || newY < 0)
        anchorPoints.splice(index, 1);
      else {
        anchorPoints[index] = {x: newX, y: newY};
      }
    setAnchorPoints([...anchorPoints]);
  };
  const drawAnchorPoints = () => {
    return anchorPoints.map(point => (
      <AnchorPoint
        x={point.x}
        y={point.y}
        updatePosition={updateMovingPoint(point.x, point.y)}
      />
    ));
  };
  // this is a lagrange interpolation algorithm in JS way
  const getY = x => {
    if (anchorPoints && anchorPoints.length > 0)
      return anchorPoints.reduce((res, point) => {
        const lagrangeMultiplier = anchorPoints.reduce((l, otherPoint) => {
          if (point.x !== otherPoint.x)
            return (l * (x - otherPoint.x)) / (point.x - otherPoint.x);
          return l;
        }, 1);
        return res + point.y * lagrangeMultiplier;
      }, 0);
    return -1;
  };

  const drawGraph = () => {
    const points = [];
    for (let i = -1; i < width + 1; i += 5) {
      points.push(i);
      points.push(getY(i));
    }
    return <Line x={0} y={0} tension={0.1} points={points} stroke="black" />;
  };

  return (
    <Center bg="white" borderEndWidth alignSelf="center">
      <Box shadow="2px 2px 3px 4px lightgray">
        <Stage
          width={width}
          height={height}
          onContentClick={e => {
            createAnchorPoint(e.evt.layerX, e.evt.layerY);
          }}>
          <Layer>
            <CartesianCoordinates width={width} height={height} scale={12} />
            {drawGraph()}
            {drawAnchorPoints()}
          </Layer>
        </Stage>
      </Box>
    </Center>
  );
}
