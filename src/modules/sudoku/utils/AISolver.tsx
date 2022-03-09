import {
  clone,
  cloneDeep,
  difference,
  each,
  floor,
  map,
  range,
} from 'lodash-es';

import { CellState, ICell } from '@/modules/sudoku/types/ICell';

import { getValuesFromCellArray } from './SudokuValidater';

const getGroup = (table: ICell[][], cellIndex: [number, number]) => {
  const [i, j] = cellIndex;
  const groupI = floor(i / 3) * 3;
  const groupJ = floor(j / 3) * 3;

  const group: ICell[] = [];
  each(range(groupI, groupI + 3), (indexI) => {
    each(range(groupJ, groupJ + 3), (indexJ) =>
      group.push(table[indexI]![indexJ]!)
    );
  });

  return group;
};

const getPossibleValuesForCell = (
  table: ICell[][],
  cellIndex: [number, number]
): number[] => {
  const [i, j] = cellIndex;
  const CHECKER_ARRAY = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const missingVales: number[] = [];

  // Get cells row,
  const rowValues = getValuesFromCellArray(table[i]!);
  each(rowValues, (value) => missingVales.push(value));

  // get cells column,
  const columnValues = getValuesFromCellArray(map(table, (row) => row[j]!));
  each(columnValues, (value) => missingVales.push(value));

  // get cells group,
  const groupValues = getValuesFromCellArray(getGroup(table, [i, j]));
  each(groupValues, (value) => missingVales.push(value));

  // find missing values from row, column, group
  const diff: number[] = difference(CHECKER_ARRAY, missingVales);
  return diff || [];
};

const getUnassignedCell = (table: ICell[][]): [number, number] => {
  for (let i = 0; i < 9; i += 1) {
    for (let j = 0; j < 9; j += 1) {
      if (table[i]![j]!.value === 0) {
        return [i, j];
      }
    }
  }
  return [-1, -1];
};

const isValid = (
  table: ICell[][],
  cellIndexes: [number, number],
  value: number
) => {
  const [i, j] = cellIndexes;

  // Check row
  for (let cellJ = 0; cellJ < 9; cellJ += 1) {
    if (table[i]![cellJ]!.value === value) {
      return false;
    }
  }

  // Check column
  for (let cellI = 0; cellI < 9; cellI += 1) {
    if (table[cellI]![j]!.value === value) {
      return false;
    }
  }

  // Check group
  const groupI = floor(i / 3) * 3;
  const groupJ = floor(j / 3) * 3;

  for (let cellI = groupI; cellI < groupI + 3; cellI += 1) {
    for (let cellJ = groupJ; cellJ < groupJ + 3; cellJ += 1) {
      if (table[cellI]![cellJ]!.value === value) {
        return false;
      }
    }
  }

  return true;
};

const backtrackingSearch = (table: ICell[][], solvingProcess: ICell[]) => {
  const emptyCell = getUnassignedCell(table);

  if (emptyCell[0] === -1) return true;

  const [i, j] = emptyCell;
  const cellProcess = clone(table[i]![j]);

  // Get possible values for cell. fetching per loop allows for forward checking.
  const domain = getPossibleValuesForCell(table, emptyCell);

  for (let index = 0; index < domain.length; index += 1) {
    const value = domain[index];
    if (cellProcess && value) {
      cellProcess.value = value;
      cellProcess.cellState = CellState.PROCESSING;
      solvingProcess.push(cellProcess);

      if (isValid(table, emptyCell, value)) {
        table[i]![j]!.value = value;
        if (backtrackingSearch(table, solvingProcess)) {
          cellProcess.value = value;
          cellProcess.cellState = CellState.CORRECT;
          solvingProcess.push(cellProcess);
          return true;
        }
        table[i]![j]!.value = 0;

        cellProcess.value = value;
        cellProcess.cellState = CellState.PROCESSING;
        solvingProcess.push(cellProcess);
      }
    }
  }
  return false;
};

function AISolver(table: ICell[][]): ICell[] {
  const solvedTable = cloneDeep(table);
  const solvingProcess: ICell[] = [];
  backtrackingSearch(solvedTable, solvingProcess);
  return solvingProcess;
}

export default AISolver;
