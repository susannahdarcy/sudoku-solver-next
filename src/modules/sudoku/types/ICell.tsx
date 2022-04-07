interface ICell {
  value: number;
  index: number;
  prefilled: boolean;
  cellState: CellState;
}

interface IGrid {
  index: number;
}

interface ICellComponent extends ICell {
  handleSetTable: Function;
}

export type { ICell, ICellComponent, IGrid };

enum CellState {
  ERROR = 'ERROR',
  UNKNOWN = 'UNKNOWN',
  PROCESSING = 'PROCESSING',
  CORRECT = 'CORRECT',
}

export { CellState };
