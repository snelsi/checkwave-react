import React, { useMemo, useEffect } from "react";

import { useWave } from "useWave";
import { useWindowSize } from "useWindowSize";

const toKey = (x: number, y: number) => `${x}-${y}`;

function App() {
  const { width } = useWindowSize();
  const size = useMemo(() => {
    if (!width) return 20;
    const count = Math.round((width - 40) / 32);
    if (count > 20) return 20;
    if (count < 4) return 4;
    return count;
  }, [width]);
  const gridStyles = useMemo(
    () => ({
      "--size": size,
    }),
    [size],
  ) as React.CSSProperties;

  const [cells, { startWave }] = useWave(size);

  useEffect(() => {
    setTimeout(() => startWave(0, 0), 400);
  }, []);

  return (
    <div className="App">
      <div className="grid" style={gridStyles}>
        {cells.map((row, y) =>
          row.map((checked, x) => (
            <label key={toKey(x, y)}>
              <input
                type="checkbox"
                checked={checked}
                data-checked={checked}
                onChange={() => startWave(x, y)}
              />
            </label>
          )),
        )}
      </div>
    </div>
  );
}

export default App;
