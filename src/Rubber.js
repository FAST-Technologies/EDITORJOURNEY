import React from "react";
import PropTypes from "prop-types";

function Rubber(props) {
  // return (
  // )
}

Rubber.propTypes = {
  scale: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  onSetMode: PropTypes.func.isRequired,
  onChangeColor: PropTypes.func.isRequired,
  onChangeScale: PropTypes.func.isRequired
};

export default Rubber;
