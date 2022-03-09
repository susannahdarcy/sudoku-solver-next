import React from 'react';

import { cloneDeep, flatten, map } from 'lodash-es';

import Cell from '@/modules/sudoku/components/Cell';
import { CellState, ICellComponent } from '@/modules/sudoku/types/ICell';
import { ISudokuTableData } from '@/modules/sudoku/types/ISudoku';
import { convert1DIndexTo2DIndex } from '@/modules/sudoku/utils/Sudoku';

const SudokuTable = ({ getTableData, setTableData }: ISudokuTableData) => {
  const sudokuTable = getTableData();
  const flatTable = flatten(sudokuTable);

  const handleSetTable = (index: number, value: number) => {
    const [i, j] = convert1DIndexTo2DIndex(index);
    const copy = cloneDeep(sudokuTable);
    copy[i][j].value = value;
    copy[i][j].index = index;
    copy[i][j].cellState = CellState.UNKNOWN;
    setTableData(copy);
  };

  return (
    <div className="grid grid-cols-9">
      {map(
        flatTable,
        ({ value, index, prefilled, cellState }: ICellComponent) => (
          <Cell
            key={index}
            {...{
              value,
              index,
              prefilled,
              cellState,
            }}
            handleSetTable={handleSetTable}
          />
        )
      )}
    </div>
  );
};

export { SudokuTable };
