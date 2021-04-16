import React from 'react';
import {Circle} from 'react-konva';

export default function AnchorPoint(props) {
  const {x, y, updatePosition} = props;
  const [isDragging, setIsDragging] = React.useState(false);
  return (
    <Circle
      x={x}
      y={y}
      radius={10}
      fill={isDragging ? '#744da9' : '#8e8cd8'}
      draggable
      onDragStart={() => {
        setIsDragging(true);
      }}
      onDragEnd={e => {
        const pos = e.target;
        //console.log(pos.x(), pos.y());
        setIsDragging(false);
        updatePosition(pos.x(), pos.y());
      }}
    />
  );
}
