import Image from "next/image";

const TOTAL_CELLS = 64;
const TEXT_CELLS = 10;
const TEXT = "bomb"; // or any text you want

// Utility: pick 10 unique random indices from 0 to 63
const getRandomIndices = (count: number, max: number): number[] => {
  const indices = new Set<number>();
  while (indices.size < count) {
    indices.add(Math.floor(Math.random() * max));
  }
  return Array.from(indices);
};

export default function Home() {

  const filledIndices = getRandomIndices(TEXT_CELLS, TOTAL_CELLS);

  return (
    <div className="bg-black h-screen w-screen flex items-center justify-center">
      <div className="text-center text-white grid grid-cols-8 gap-4 p-2">
        {Array.from({ length: TOTAL_CELLS }, (_, i) => (
          <div key={i} className="aspect-square bg-blue-500 text-white font-bold flex items-center justify-center rounded cursor-pointer">
            {filledIndices.includes(i) ? TEXT : ''}
          </div>
        ))}
      </div>
    </div>
  );
}
