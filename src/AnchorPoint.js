import React from 'react';
import {Circle} from 'react-konva';

export default function AnchorPoint(props) {
  const {x, y, updatePosition} = props;
  const [isDragging, setIsDragging] = React.useState(false);
  return (
    <Circle
      x={x}
      y={y}
      radius={6}
      fill={isDragging ? 'red' : 'green'}
      draggable
      onDragStart={() => {
        setIsDragging(true);
      }}
      onDragEnd={e => {
        console.log(e.evt.layerX, e.evt.layerY);
        setIsDragging(false);
        updatePosition(e.evt.layerX, e.evt.layerY);
      }}
    />
  );
}
