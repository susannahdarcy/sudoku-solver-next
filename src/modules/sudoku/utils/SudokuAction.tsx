import { cloneDeep } from 'lodash-es';

import { ICell } from '@/modules/sudoku/types/ICell';
import { convert1DIndexTo2DIndex } from '@/modules/sudoku/utils/Sudoku';

enum SudokuActionType {
  CHANGE_TABLE = 'CHANGE_TABLE',
  CHANGE_CELL = 'CHANGE_CELL',
}

type ISudokuAction = {
  type: SudokuActionType;
  priorCell?: ICell;
  priorTable?: ICell[][];
};

class SudokuActionStack {
  sudokuActionsStack: Array<ISudokuAction>;

  constructor() {
    this.sudokuActionsStack = [];
  }

  isEmpty(): boolean {
    return this.sudokuActionsStack.length === 0;
  }

  pushCellChange(priorCell: ICell) {
    this.sudokuActionsStack.push({
      type: SudokuActionType.CHANGE_CELL,
      priorCell,
    });
  }

  pushChangeTable(priorTable: ICell[][]) {
    this.sudokuActionsStack.push({
      type: SudokuActionType.CHANGE_TABLE,
      priorTable,
    });
  }

  popSudokuActionStack(currentTable: ICell[][]): ICell[][] {
    const sudokuAction = this.sudokuActionsStack.pop();

    if (sudokuAction) {
      switch (sudokuAction.type) {
        case SudokuActionType.CHANGE_TABLE: {
          if (sudokuAction.priorTable) {
            return sudokuAction.priorTable;
          }
          break;
        }

        case SudokuActionType.CHANGE_CELL: {
          if (sudokuAction.priorCell) {
            const { priorCell } = sudokuAction;
            const [i, j] = convert1DIndexTo2DIndex(priorCell.index);
            const priorTable = cloneDeep(currentTable);
            priorTable[i]![j] = priorCell;
            return priorTable;
          }
          break;
        }

        default: {
          console.log(`Action type ${sudokuAction.type} not handled`);
          break;
        }
      }
    }
    return currentTable;
  }
}

export { SudokuActionStack };
