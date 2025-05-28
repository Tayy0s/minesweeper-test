'use client';
import React from 'react';
import { useState } from 'react';

const TOTAL_CELLS = 64;
const GRID_SIZE = 8;
const FIRE_COUNT = 10;
const FIRE_TEXT = "🔥";

  const [isOpen, setIsOpen] = useState<boolean>(false);

// Helper: Get 10 unique random fire cell indices
const getRandomFireIndices = (count: number, max: number): number[] => {
  const indices = new Set<number>();
  while (indices.size < count) {
    indices.add(Math.floor(Math.random() * max));
  }
  return Array.from(indices);
};

// Get neighbors of a given cell index in a 2D grid
const getNeighborIndices = (index: number): number[] => {
  const neighbors: number[] = [];
  const row = Math.floor(index / GRID_SIZE);
  const col = index % GRID_SIZE;

  for (let dr = -1; dr <= 1; dr++) {
    for (let dc = -1; dc <= 1; dc++) {
      if (dr === 0 && dc === 0) continue; // skip self
      const newRow = row + dr;
      const newCol = col + dc;

      if (
        newRow >= 0 &&
        newRow < GRID_SIZE &&
        newCol >= 0 &&
        newCol < GRID_SIZE
      ) {
        neighbors.push(newRow * GRID_SIZE + newCol);
      }
    }
  }

  return neighbors;
};

const handleClick = () => {
  setIsOpen(true);
}

const Grid: React.FC = () => {

  const fireIndices = new Set(getRandomFireIndices(FIRE_COUNT, TOTAL_CELLS));

  // Build the final grid: 🔥, number, or ''
  const gridContent: (string | number)[] = Array(TOTAL_CELLS).fill('');

  for (let i = 0; i < TOTAL_CELLS; i++) {
    if (fireIndices.has(i)) {
      gridContent[i] = FIRE_TEXT;
    } else {
      const neighbors = getNeighborIndices(i);
      const fireCount = neighbors.filter((n) => fireIndices.has(n)).length;
      gridContent[i] = fireCount > 0 ? fireCount : '';
    }
  }

  return (
    <div>
    <div className="w-screen h-screen flex items-center justify-center bg-black">
      <div className="grid grid-cols-8 grid-rows-8 gap-1 w-[90vmin] h-[90vmin]">
        {gridContent.map((content, i) => (
          <button
            key={i}
            className={`aspect-square flex items-center justify-center text-sm font-bold rounded
              ${content === FIRE_TEXT ? 'bg-red-600 text-white'
              : content !== '' ? 'bg-blue-500 text-white'
              : 'bg-gray-300'} cursor-pointer`}
              onClick={setIsOpen(true)}
          >
            {content}
          </button>
        ))}
      </div>
    </div>
  </div>
  );
};

export default Grid;
