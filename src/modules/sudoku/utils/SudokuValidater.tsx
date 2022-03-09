import {
  cloneDeep,
  concat,
  countBy,
  difference,
  each,
  flatten,
  isEmpty,
  keys,
  map,
  pullAt,
  range,
  reduce,
} from 'lodash-es';

import { ICell } from '@/modules/sudoku/types/ICell';

const getValuesFromCellArray = (cellArray: ICell[]): number[] =>
  map(cellArray, (cell) => cell.value);

const getCellsInError = (cells: ICell[]): ICell[] => {
  // Check if array contains all numbers
  const values = getValuesFromCellArray(cells);
  const CHECKER_ARRAY = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const diff = difference(CHECKER_ARRAY, values);

  // If not. Find cells which are in error (duplicate values)
  const wrongCells: ICell[] = [];

  if (!isEmpty(diff)) {
    const counts = countBy(cloneDeep(cells), 'value');
    const duplicates = reduce(
      counts,
      (results: number[], count, value) => {
        const num = parseInt(value, 10);

        return count > 1 ? concat(results, num) : results;
      },
      []
    );

    // Add duplicate cells
    each(duplicates, (dup) => {
      each(cells, (cell: ICell) => {
        if (cell.value === dup && !cell.prefilled) {
          wrongCells.push(cell);
        }
      });
    });

    // Add cells with no entry (value === 0)
    each(cells, (cell) => {
      if (cell.value === 0 && !cell.prefilled) {
        wrongCells.push(cell);
      }
    });
  }
  return wrongCells;
};

const getCellsInColumn = (table: ICell[][], column: number): ICell[] => {
  if (column < 0 && column > 8) throw new Error('column number out of bounds');
  const colGroup = map(table, (row) => {
    if (!row[column]) throw new Error('cell is undefined');

    return row[column];
  }) as ICell[];

  return colGroup;
};

const getCellGrouping = (table: ICell[][], group: number): ICell[] => {
  let groupedCells: ICell[] = [];

  if (group < 0 && group > 8) return groupedCells;

  // Get Row
  // 0,1,2 -> 0 : 3,4,5 -> 3 : 6,7,8 -> 6
  const i = group - (group % 3);

  // Get Column:
  // 0,3,6 -> 0 : 1,4,7 -> 1 : 2,5,8 -> 2
  const j = (group % 3) * 3;

  const cloneTable = cloneDeep(table);

  each(range(3), (offset) => {
    groupedCells = concat(
      groupedCells,
      pullAt(cloneTable[i + offset]!, range(j, j + 3))
    );
  });

  return groupedCells;
};

const vaildateSudoku = (table: ICell[][]) => {
  const cellsInError: ICell[][] = [];
  for (let i = 0; i < 9; i += 1) {
    // Check row
    cellsInError.push(getCellsInError(table[i]!));
    // Check Column
    cellsInError.push(getCellsInError(getCellsInColumn(table, i)));
    // Check Group
    cellsInError.push(getCellsInError(getCellGrouping(table, i)));
  }

  const flat: ICell[] = flatten(cellsInError);

  // Remove Duplicates, and get cells indexes that are in error.
  const errorCounts = countBy(cloneDeep(flat), (cell) => cell.index);
  return keys(errorCounts);
};

export {
  vaildateSudoku,
  getCellGrouping,
  getCellsInColumn,
  getValuesFromCellArray,
};
