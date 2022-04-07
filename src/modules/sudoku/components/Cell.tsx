import React from 'react';

import clsx from 'clsx';
import { concat, includes, range } from 'lodash-es';
import PropTypes from 'prop-types';

import { CellState, ICellComponent, IGrid } from '@/modules/sudoku/types/ICell';

// Grouping Border Logic
const topBorderCells = concat(range(0, 9), range(27, 36), range(54, 63));
const isTopBorder = (index: number) => includes(topBorderCells, index);

const bottomBorderCells = concat(range(18, 27), range(45, 54), range(72, 81));
const isBottomBorder = (index: number) => includes(bottomBorderCells, index);

const isLeftBorder = (index: number) => index % 3 === 0;
const isRightBorder = (index: number) => index % 3 === 2;

const Cell = ({
  value,
  index,
  prefilled,
  handleSetTable,
  cellState,
}: ICellComponent) => {
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

  const cellStyles = clsx(
    'border border-gray-100',
    'z-0',
    'h-[2.25rem] sm:h-16',
    'w-[2.25rem] sm:w-16',
    'text-2xl',
    'text-center',
    'bg-transparent',
    prefilled && ['font-bold', 'flex', 'justify-center', 'items-center'],
    cellState === CellState.UNKNOWN && 'bg-inherit',
    cellState === CellState.ERROR && 'bg-red-600/50',
    cellState === CellState.PROCESSING && 'bg-orange-300/50',
    cellState === CellState.CORRECT && 'bg-lime-500/50'
  );

  const inputStyles = clsx(
    'z-50',
    'h-[2.25rem] sm:h-16',
    'w-[2.25rem] sm:w-16',
    'text-2xl',
    'text-center',
    'focus:border-[2.5px]',
    cellState === CellState.UNKNOWN && 'bg-inherit',
    cellState === CellState.ERROR && 'bg-red-600/50',
    cellState === CellState.PROCESSING && 'bg-orange-300/50',
    cellState === CellState.CORRECT && 'bg-lime-500/50'
  );

  const cellElement = prefilled ? (
    <div>{value}</div>
  ) : (
    <input
      id={index.toString()}
      className={inputStyles}
      maxLength={1}
      onChange={onChange}
      value={displayValue}
    />
  );

  return <div className={cellStyles}>{cellElement}</div>;
};

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
  cellState: PropTypes.string,
};

const TableGrid = ({ index }: IGrid) => {
  const gridStyles = clsx(
    'z-10',
    'bg-transparent',
    'pointer-events-none',
    'h-[2.25rem] sm:h-16',
    'w-[2.25rem] sm:w-16',
    isTopBorder(index) && 'border-t-2 border-t-grey-blue sm:border-t-3',
    isBottomBorder(index) && 'border-b-2 border-b-grey-blue sm:border-b-3',
    isLeftBorder(index) && 'border-l-2 border-l-grey-blue sm:border-l-3',
    isRightBorder(index) && 'border-r-2 border-r-grey-blue sm:border-r-3'
  );

  return <div className={gridStyles}></div>;
};

export { Cell, TableGrid };
