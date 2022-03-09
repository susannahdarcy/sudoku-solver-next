import {
  cloneDeep,
  each,
  isEmpty,
  map,
  range,
  split,
  toNumber,
} from 'lodash-es';

import sudokuExamples from '@/common/assets/sudokuExample.json';
import { CellState, ICell } from '@/modules/sudoku/types/ICell';

// Convert 1D array to 2D array functions
const convert1DIndexTo2DIndex = (index1D: number): [number, number] => {
  const i: number = Math.floor(index1D / 9);
  const j: number = index1D % 9;
  return [i, j];
};

const loadExamples = (quizNumber: number): string => {
  if (!sudokuExamples[quizNumber])
    throw new Error('Failed to load sudoku puzzle json');

  return sudokuExamples[quizNumber]![0] || '';
};

const getCheckedTable = (table: ICell[][], cellsInError: string[]) => {
  const copy = cloneDeep(table);
  // Set all cells to be not in error
  if (isEmpty(cellsInError)) {
    for (let i = 0; i < 9; i += 1) {
      for (let j = 0; j < 9; j += 1) {
        if (copy[i] === undefined || copy[i]![j] === undefined)
          throw new Error('cell is undefined');
        copy[i]![j]!.cellState = CellState.CORRECT;
      }
    }
  } else {
    each(cellsInError, (index) => {
      const [i, j] = convert1DIndexTo2DIndex(parseInt(index, 10));
      if (copy[i] === undefined || copy[i]![j] === undefined)
        throw new Error('cell is undefined');
      copy[i]![j]!.cellState = CellState.ERROR;
    });
  }

  return copy;
};

const getNextTable = (quizToLoad: number, table: ICell[][]) => {
  const sudokuString = loadExamples(quizToLoad);

  const nextTable = cloneDeep(table);
  const inputArray: number[] = map(split(sudokuString, ''), toNumber);

  each(inputArray, (value: number, index: number) => {
    const [i, j] = convert1DIndexTo2DIndex(index);
    if (nextTable[i] === undefined || nextTable[i]![j] === undefined)
      throw new Error('cell is undefined');
    nextTable[i]![j] = {
      value,
      prefilled: value !== 0,
      index,
      cellState: CellState.UNKNOWN,
    };
  });

  return nextTable;
};

const getClearedTable = (table: ICell[][]) => {
  const clearedTable = cloneDeep(table);

  for (let i = 0; i < 9; i += 1) {
    for (let j = 0; j < 9; j += 1) {
      if (clearedTable[i] === undefined || clearedTable[i]![j] === undefined)
        throw new Error('cell is undefined');
      clearedTable[i]![j]!.cellState = CellState.UNKNOWN;
      if (!clearedTable[i]![j]!.prefilled) clearedTable[i]![j]!.value = 0;
    }
  }

  return clearedTable;
};

const baseTable = map(range(9), () => {
  const row: ICell[] = [];
  each(range(9), () => {
    const cell: ICell = {
      value: 0,
      prefilled: false,
      index: 0,
      cellState: CellState.UNKNOWN,
    };

    row.push(cell);
  });
  return row;
});

const inputSudoku = (sudokuString: string) => {
  const inputtedTable = cloneDeep(baseTable);
  const inputArray: number[] = map(split(sudokuString, ''), toNumber);

  each(inputArray, (value: number, index: number) => {
    const [i, j] = convert1DIndexTo2DIndex(index);
    if (inputtedTable[i] === undefined || inputtedTable[i]![j] === undefined)
      throw new Error('cell is undefined');
    inputtedTable[i]![j] = {
      value,
      prefilled: value !== 0,
      index,
      cellState: CellState.UNKNOWN,
    };
  });

  return inputtedTable;
};

export {
  convert1DIndexTo2DIndex,
  loadExamples,
  getCheckedTable,
  getNextTable,
  getClearedTable,
  baseTable,
  inputSudoku,
};
