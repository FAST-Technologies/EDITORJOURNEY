import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import { ReactComponent as PencilIcon } from "./icons/pencil.svg";
import { ReactComponent as LineIcon } from "./icons/line.svg";
import { ReactComponent as BrushIcon } from "./icons/brush.svg";
import { MODE } from "./constants";
import ColorPalette from "./ColorPalette";
import ZoomPanel from "./ZoomPanel";
import Rubber from "./Rubber";

function DrawToolbar(props) {
  const onChangeMode = (mode) => () => {
    props.onSetMode(mode);
  };

  return (
    <div className="toolbar">
      <PencilIcon
        className={cn({
          selected: props.mode === MODE.PENCIL
        })}
        width="16"
        height="16"
        onClick={onChangeMode(MODE.PENCIL)}
      />
      <LineIcon
        className={cn({
          selected: props.mode === MODE.LINE
        })}
        width="16"
        height="16"
        onClick={onChangeMode(MODE.LINE)}
      />
      <BrushIcon
        className={cn({
          selected: props.mode === MODE.BRUSH
        })}
        width="16"
        height="16"
        onClick={onChangeMode(MODE.BRUSH)}
      />
      <ColorPalette color={props.color} onChangeColor={props.onChangeColor} />
      <ZoomPanel scale={props.scale} onChangeScale={props.onChangeScale} />
    </div>
  );
}

DrawToolbar.propTypes = {
  scale: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  onSetMode: PropTypes.func.isRequired,
  onChangeColor: PropTypes.func.isRequired,
  onChangeScale: PropTypes.func.isRequired
};

export default DrawToolbar;
