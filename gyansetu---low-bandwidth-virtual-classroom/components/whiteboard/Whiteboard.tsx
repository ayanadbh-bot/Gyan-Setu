import React, { useRef, useEffect, useState } from 'react';
import { DrawingData } from '../../types';

interface WhiteboardProps {
  isEducator: boolean;
  classId: string;
}

const Whiteboard: React.FC<WhiteboardProps> = ({ isEducator, classId }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const drawingDataRef = useRef<DrawingData[]>([]);
  // Fix: Add a ref to store the last point for drawing line segments.
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);

  const STORAGE_KEY = `gyansetu_whiteboard_${classId}`;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set canvas size to fill parent container
    const resizeCanvas = () => {
        const parent = canvas.parentElement;
        if(parent) {
            canvas.width = parent.clientWidth;
            canvas.height = parent.clientHeight;
        }
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);


    const context = canvas.getContext('2d');
    if (context) {
      context.lineCap = 'round';
      context.strokeStyle = 'black';
      context.lineWidth = 3;
      contextRef.current = context;
    }
    
    // Load initial data and set up listener for updates
    loadAndDraw();
    window.addEventListener('storage', handleStorageChange);

    return () => {
        window.removeEventListener('resize', resizeCanvas);
        window.removeEventListener('storage', handleStorageChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [classId]);

  const handleStorageChange = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) {
      loadAndDraw();
    }
  };

  const loadAndDraw = () => {
    const data = localStorage.getItem(STORAGE_KEY);
    const context = contextRef.current;
    const canvas = canvasRef.current;
    if (data && context && canvas) {
      const parsedData: DrawingData[] = JSON.parse(data);
      drawingDataRef.current = parsedData;
      
      // Clear canvas before redrawing
      context.clearRect(0, 0, canvas.width, canvas.height);
      
      parsedData.forEach(line => {
        context.strokeStyle = line.color;
        context.beginPath();
        context.moveTo(line.x0, line.y0);
        context.lineTo(line.x1, line.y1);
        context.stroke();
      });
      // Reset to default color for next drawing
      context.strokeStyle = 'black';
    }
  };
  
  const getCoords = (e: React.MouseEvent | React.TouchEvent): {x: number, y: number} => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    
    if (window.TouchEvent && e.nativeEvent instanceof TouchEvent && e.nativeEvent.touches.length > 0) {
        return {
            x: e.nativeEvent.touches[0].clientX - rect.left,
            y: e.nativeEvent.touches[0].clientY - rect.top
        };
    }
    const mouseEvent = e as React.MouseEvent;
    return {
        x: mouseEvent.clientX - rect.left,
        y: mouseEvent.clientY - rect.top,
    };
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isEducator) return;
    const { x, y } = getCoords(e);
    contextRef.current?.beginPath();
    contextRef.current?.moveTo(x, y);
    setIsDrawing(true);
    // Fix: Store the starting point.
    lastPointRef.current = { x, y };
  };

  const finishDrawing = () => {
    if (!isEducator || !isDrawing) return;
    contextRef.current?.closePath();
    setIsDrawing(false);
    // Fix: Clear the last point when drawing finishes.
    lastPointRef.current = null;
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing || !isEducator) return;
    e.preventDefault(); // Prevent scrolling on touch devices
    
    const { x, y } = getCoords(e);
    const context = contextRef.current;
    // Fix: Replace incorrect usage of 'currentPath' with a ref to track the previous point.
    // 'currentPath' is not a standard property on CanvasRenderingContext2D.
    if (context && lastPointRef.current) {
        const x0 = lastPointRef.current.x;
        const y0 = lastPointRef.current.y;

        context.lineTo(x, y);
        context.stroke();
        
        const newLine: DrawingData = {
          x0: x0,
          y0: y0,
          x1: x,
          y1: y,
          color: context.strokeStyle as string
        };
        
        drawingDataRef.current.push(newLine);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(drawingDataRef.current));

        // Fix: Update the last point to the current point for the next segment.
        lastPointRef.current = { x, y };
    }
  };
  
  const clearCanvas = () => {
    if(!isEducator) return;
    const canvas = canvasRef.current;
    const context = contextRef.current;
    if (canvas && context) {
      context.clearRect(0, 0, canvas.width, canvas.height);
      drawingDataRef.current = [];
      localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
    }
  };
  
  const setColor = (color: string) => {
    if(!isEducator || !contextRef.current) return;
    contextRef.current.strokeStyle = color;
  };

  return (
    <div className="w-full h-full relative">
        <canvas
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseUp={finishDrawing}
            onMouseOut={finishDrawing}
            onMouseMove={draw}
            onTouchStart={startDrawing}
            onTouchEnd={finishDrawing}
            onTouchMove={draw}
            className={`w-full h-full ${isEducator ? 'cursor-crosshair' : 'cursor-default'}`}
        />
        {isEducator && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-gray-700 p-2 rounded-lg shadow-lg flex space-x-2">
                <button onClick={() => setColor('black')} className="w-8 h-8 bg-black rounded-full border-2 border-white"></button>
                <button onClick={() => setColor('red')} className="w-8 h-8 bg-red-500 rounded-full"></button>
                <button onClick={() => setColor('blue')} className="w-8 h-8 bg-blue-500 rounded-full"></button>
                <button onClick={() => setColor('green')} className="w-8 h-8 bg-green-500 rounded-full"></button>
                <button onClick={clearCanvas} className="px-3 py-1 bg-gray-200 text-black rounded-md text-sm font-semibold">Clear</button>
            </div>
        )}
        {!isEducator && (
             <div className="absolute top-2 left-2 bg-black bg-opacity-50 px-3 py-1 rounded-full text-sm">
                Viewing Mode
            </div>
        )}
    </div>
  );
};

export default Whiteboard;
