import React from 'react';

import { cloneDeep, flatten, map } from 'lodash-es';

import { Cell, TableGrid } from '@/modules/sudoku/components/Cell';
import { CellState, ICell, ICellComponent } from '@/modules/sudoku/types/ICell';
import { ISudokuTableData } from '@/modules/sudoku/types/ISudoku';
import { convert1DIndexTo2DIndex } from '@/modules/sudoku/utils/Sudoku';

const SudokuTable = ({
  getTableData,
  setTableData,
  pushCellChange,
}: ISudokuTableData) => {
  const sudokuTable = getTableData();
  const flatTable: ICell[] = flatten(sudokuTable);

  const handleSetTable = (index: number, value: number) => {
    const [i, j] = convert1DIndexTo2DIndex(index);
    const copy = cloneDeep(sudokuTable);
    pushCellChange(sudokuTable[i][j]);
    copy[i][j].value = value;
    copy[i][j].index = index;
    copy[i][j].cellState = CellState.UNKNOWN;
    setTableData(copy);
  };

  return (
    <div className="grid relative grid-cols-9 mb-5 bg-white shadow-3xl">
      <div className="grid absolute top-0 left-0 grid-cols-9">
        {map(flatTable, (cell) => (
          <TableGrid key={`grid${cell.index}`} index={cell.index} />
        ))}
      </div>
      {map(
        flatTable,
        ({ value, index, prefilled, cellState }: ICellComponent) => (
          <Cell
            key={`cell${index}`}
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
