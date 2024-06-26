import React, { useEffect, useRef, useState } from "react";

const Canvas = ({ width, height,onSaveCanvas }) => {
  const [isDrawing, setisDrawing] = useState(false);
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 });
  const canvasRef = useRef(null);
  const handleSaveCanvas = () =>{
    const canvas = canvasRef.current;
    onSaveCanvas(canvas);
  }
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.fillStyle = "#FFF5E0";
    context.fillRect(0, 0, width, height);
  }, [width, height]);
  const startDrawing = ({nativeEvent}) => {
    const {offsetX,offsetY} = nativeEvent;
    setisDrawing(true);
    setLastPosition({x: offsetX, y:offsetY})
    
  };
  const Draw = ({ nativeEvent }) => {
    if(!isDrawing) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const {offsetX,offsetY} = nativeEvent;
    context.beginPath();
    context.moveTo(lastPosition.x,lastPosition.y);
    context.lineTo(offsetX,offsetY);
    context.stroke();
    setLastPosition({ x : offsetX, y : offsetY});
  };
  const stopDrawing = () => {
    setisDrawing(false);
  };

  return ( <div style={{position:'relative'}}>
    <canvas 
    
    ref={canvasRef} 
    width={width}
    height={height} 
    onMouseDown={startDrawing}
    onMouseMove = {Draw}
    onMouseUp={stopDrawing}
    onMouseLeave={stopDrawing}
/>
 <button onClick={handleSaveCanvas} style={{position:'absolute',top:'1rem',left:'1rem',borderRadius:'25px',padding:'0.3rem'}}>Confirm Drawing</button>
 <button style={{position:'absolute',top:'4rem',left:'1rem',borderRadius:'25px',padding:'0.3rem'}}>Reset Drawing</button>
  </div>
  );
};


export default Canvas;
