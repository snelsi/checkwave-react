import { useRef, useState, useEffect } from "react";

interface WaveActions {
  startWave: (x: number, y: number) => void;
  setCells: (boolean: boolean[][]) => void;
}

const copyArray = (array: any[][]) => array.map((arr) => arr.slice());

export const useWave = (size: number): [boolean[][], WaveActions] => {
  const [cells, setCells] = useState<boolean[][]>(() =>
    Array.from({ length: size }).map(() => Array.from({ length: size })),
  );

  const cellsRef = useRef(cells);

  useEffect(() => {
    const newArray: boolean[][] = Array.from({ length: size }).map(() =>
      Array.from({ length: size }),
    );
    setCells(newArray);
    cellsRef.current = newArray;
  }, [size]);

  /**
   * Toggles all values in '◇' rhombus shape with center in 'x,y' and given radius
   */
  const toggleRhombus = (x: number, y: number, radius: number) => {
    const setCopy = copyArray(cellsRef.current);

    const toggle = (x: number, y: number) => {
      if (x >= 0 && x < size && y >= 0 && y < size) {
        setCopy[y][x] = !setCopy[y][x];
      }
    };

    if (radius <= 0) {
      toggle(x, y);
    } else {
      for (let j = 0; j < radius; j++) {
        toggle(x - radius + j, y - j); // from left to up
        toggle(x + j, y - radius + j); // from top ro right
        toggle(x + radius - j, y + j); // from right to bottom
        toggle(x - j, y + radius - j); // from bottom to left
      }
    }

    cellsRef.current = setCopy;
    setCells(setCopy);
  };

  /**
   * Consistently toggles all values, starting from given center
   */
  const startWave = (x: number, y: number, delay = 40) => {
    const iterations = Math.max(x, size - x, y, size - y) * 2;

    for (let i = 0; i <= iterations; i++) {
      try {
        setTimeout(() => toggleRhombus(x, y, i), i * delay);
      } catch {
        // Window size changed during transition, reset
        break;
      }
    }
  };

  return [
    cells,
    {
      startWave,
      setCells,
    },
  ];
};
