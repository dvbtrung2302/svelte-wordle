export const createGrid = () => {
  const grid: string[][] = [];

  for (let i = 0; i < 6; i++) {
    grid.push([]);
    for (let j = 0; j < 5; j++) {
      grid[i][j] = "";
    }
  }

  return grid;
};
