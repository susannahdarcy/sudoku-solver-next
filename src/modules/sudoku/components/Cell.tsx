import React from 'react';

import clsx from 'clsx';
import { concat, includes, range } from 'lodash-es';
import PropTypes from 'prop-types';

import { CellState, ICellComponent } from '@/modules/sudoku/types/ICell';

function Cell({
  value,
  index,
  prefilled,
  handleSetTable,
  cellState,
}: ICellComponent) {
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.currentTarget.value;

    // Restore cell to empty state.
    if (input === '') {
      handleSetTable(index, 0);
      return;
    }

    if (/[1-9]/.test(input)) {
      handleSetTable(index, parseInt(input, 10));
    }
  };

  const displayValue = value !== 0 ? value.toString() : '';

  // Grouping Border Logic
  const topBorderCells = concat(range(0, 9), range(27, 36), range(54, 63));
  const isTopBorder = includes(topBorderCells, index);

  const bottomBorderCells = concat(range(18, 27), range(45, 54), range(72, 81));
  const isBottomBorder = includes(bottomBorderCells, index);

  const isLeftBorder = index % 3 === 0;

  const isRightBorder = index % 3 === 2;

  const styles = clsx(
    'border',
    'h-[2.25rem] sm:h-16',
    'w-[2.25rem] sm:w-16',
    'text-2xl',
    'text-center',
    prefilled && ['font-bold', 'flex', 'justify-center', 'items-center'],
    cellState === CellState.UNKNOWN && 'bg-inherit',
    cellState === CellState.ERROR && 'bg-red-600/50',
    cellState === CellState.PROCESSING && 'bg-orange-300/50',
    cellState === CellState.CORRECT && 'bg-lime-500/50',
    isTopBorder && 'border-t-2 sm:border-t-3',
    isBottomBorder && 'border-b-2 sm:border-b-3',
    isLeftBorder && 'border-l-2 sm:border-l-3',
    isRightBorder && 'border-r-2 sm:border-r-3'
  );

  const cellElement = prefilled ? (
    <div className={styles}>{value}</div>
  ) : (
    <input
      id={index.toString()}
      className={styles}
      maxLength={1}
      onChange={onChange}
      value={displayValue}
    />
  );

  return <div>{cellElement}</div>;
}

Cell.defaultProps = {
  value: 0,
  index: 0,
  prefilled: false,
  handleSetTable: () => {},
  cellState: CellState.UNKNOWN,
};

Cell.propTypes = {
  value: PropTypes.number,
  index: PropTypes.number,
  prefilled: PropTypes.bool,
  handleSetTable: PropTypes.func,
  cellState: PropTypes.number,
};

export default Cell;
