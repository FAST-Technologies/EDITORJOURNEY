import React, { useState } from "react";
import PropTypes from "prop-types";
import { Stage, Layer, Line } from "react-konva";
import DrawToolbar from "./DrawToolbar";
import { MODE, COLOR_MAP } from "./constants";

const getScaledPoint = (stage, scale) => {
  const { x, y } = stage.getPointerPosition();
  return { x: x / scale, y: y / scale };
};

const DrawPane = props => {
  let stage = null;
  const [color, setColor] = useState("DARK");
  const [scale, setScale] = useState(1);
  const [mode, setMode] = useState(MODE.PENCIL);
  const [mode1, setMode1] = useState(MODE.BRUSH);
  const [currentLine, setCurrentLine] = useState(null);
  const [lines, setLines] = useState([]);

  const onMouseDown = () => {
    const { x, y } = getScaledPoint(stage, scale);
    setCurrentLine({ points: [x, y], color });
  };

  const onMouseMove = () => {
    if (currentLine) {
      const { x, y } = getScaledPoint(stage, scale);
      switch (mode) {
        case MODE.PENCIL:
            setCurrentLine({
                ...currentLine,
                points: [...currentLine.points, x, y]
            });
            break;
        case MODE.LINE:
            const [x0, y0] = currentLine.points;
            setCurrentLine({
                ...currentLine,
                points: [x0, y0, x, y]
            });
            break;
        default:
      }
      // eslint-disable-next-line
      switch (mode1) {
        case MODE.PENCIL:
            setCurrentLine({
                ...currentLine,
                points: [...currentLine.points, x, y]
            });
            break;
      }
    }
  };
    
 

  const onMouseUp = () => {
    const { x, y } = getScaledPoint(stage, scale);
    setCurrentLine(null);
    setLines([
      ...lines,
      { ...currentLine, points: [...currentLine.points, x, y] }
    ]);
  };

  const onSetMode = mode => {
    setMode(mode);
  };
  // eslint-disable-next-line
  const onSetMode1 = mode1 => {
    setMode1(mode1);
  };

  const setStageRef = ref => {
    if (ref) {
      stage = ref;
    }
  };

  const onChangeColor = color => {
    setColor(color);
  };

  const onChangeScale = delta => {
    setScale(scale + delta);
  };

  return (
    <div className="main-layout">
        <DrawToolbar
            mode={mode}
            color={color}
            scale={scale}
            onChangeColor={onChangeColor}
            onSetMode={onSetMode}
            onChangeScale={onChangeScale}
        />
        <Stage
            ref={setStageRef}
            className="konva-container"
            width={props.width * scale}
            height={props.height * scale}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
        >
            <Layer>
                <Line
                    {...currentLine}
                    scale={{x: scale, y: scale}}
                    strokeWidth={1}
                    stroke={COLOR_MAP[color]}
                />
                {lines.map((line, index) => (
                    <Line
                        key={index}
                        {...line}
                        scale={{x: scale, y: scale}}
                        strokeWidth={1}
                        stroke={COLOR_MAP[line.color]}
                    />
                ))}
            </Layer>
        </Stage>
    </div>
  );
};

DrawPane.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number
};

export default DrawPane;
