import React from "react";
import DrawPane from "./DrawPane";
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <h1>Konva Demo</h1>
      <DrawPane width={720} height={500} />
    </div>
  );
}
