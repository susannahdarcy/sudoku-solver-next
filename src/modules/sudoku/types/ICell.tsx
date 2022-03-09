interface ICell {
  value: number;
  index: number;
  prefilled: boolean;
  cellState: CellState;
}

interface ICellComponent extends ICell {
  handleSetTable: Function;
}

export type { ICell, ICellComponent };

enum CellState {
  ERROR,
  UNKNOWN,
  PROCESSING,
  CORRECT,
}

export { CellState };
