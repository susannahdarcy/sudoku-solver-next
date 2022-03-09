import React, { useEffect, useState } from 'react';

import { cloneDeep, isEmpty, pullAt } from 'lodash-es';

import Modal from '@/common/components//Modal';
import { SudokuTable } from '@/modules/sudoku/components/SudokuTable';
import { ICell } from '@/modules/sudoku/types/ICell';
import AISolver from '@/modules/sudoku/utils/AISolver';
import {
  convert1DIndexTo2DIndex,
  getCheckedTable,
  getClearedTable,
  getNextTable,
  inputSudoku,
  loadExamples,
} from '@/modules/sudoku/utils/Sudoku';
import { vaildateSudoku } from '@/modules/sudoku/utils/SudokuValidater';

function Sudoku() {
  const firstSudokuString = loadExamples(0);
  if (firstSudokuString === '') throw new Error('failed to load sudoku string');
  const firstTable = inputSudoku(firstSudokuString);

  const [loadFromLocalStorage, setLoadFromLocalStorage] = useState(true);

  const [sudokuTable, setTable] = useState(firstTable);

  const getTableData = () => sudokuTable;

  const setTableData = (table: ICell[][]) => {
    setTable(table);
  };

  const [areButtonsDisabled, setAreButtonsDisabled] = useState(false);

  const [currentQuizNumber, setCurrentQuizNumber] = useState(0);

  const setCurrentQuiz = (quizNumber: number) => {
    setCurrentQuizNumber(quizNumber);
  };

  const [showSuccessModal, setSuccessModal] = useState(false);

  const getShowSuccessModal = () => showSuccessModal;

  const setShowSuccessModal = (showModal: boolean) => {
    setSuccessModal(showModal);
  };

  useEffect(() => {
    if (loadFromLocalStorage) {
      const savedTable = localStorage.getItem('sudokuTable');
      if (savedTable) {
        const parseTable: ICell[][] = JSON.parse(savedTable);
        if (typeof parseTable !== 'undefined') setTable(parseTable);
      }

      const savedQuizNumber = localStorage.getItem('currentQuizNumber');
      if (savedQuizNumber) setCurrentQuizNumber(JSON.parse(savedQuizNumber));
    } else {
      localStorage.setItem('sudokuTable', JSON.stringify(sudokuTable));
      localStorage.setItem(
        'currentQuizNumber',
        JSON.stringify(currentQuizNumber)
      );
    }
    setLoadFromLocalStorage(false);
  }, [sudokuTable, currentQuizNumber, loadFromLocalStorage]);

  const handleLoadTable = () => {
    const nextQuiz = currentQuizNumber + 1;
    const nextTable = getNextTable(nextQuiz, sudokuTable);

    setCurrentQuiz(nextQuiz);
    setTable(nextTable);
  };

  const handleCheckTable = () => {
    const cellsInError = vaildateSudoku(sudokuTable);
    const checkedTable = getCheckedTable(sudokuTable, cellsInError);

    setTable(checkedTable);

    if (isEmpty(cellsInError)) setShowSuccessModal(true);
  };

  const handleClearTable = () => {
    setTable(getClearedTable(sudokuTable));
  };

  const handleSolveTable = () => {
    const solvingProcess = AISolver(sudokuTable);

    // Table to keep track of changes;
    const trackingTable = cloneDeep(sudokuTable);

    // Disable buttons while process interval is running.
    setAreButtonsDisabled(true);
    const showProcessInterval = setInterval(() => {
      const processTable = cloneDeep(trackingTable);
      const cell = pullAt(solvingProcess, 0)[0];
      if (cell) {
        const [i, j] = convert1DIndexTo2DIndex(cell.index);
        processTable[i]![j]!.value = cell.value;
        processTable[i]![j]!.cellState = cell.cellState;
        setTable(processTable);

        trackingTable[i]![j]!.value = cell.value;
        trackingTable[i]![j]!.cellState = cell.cellState;
      } else {
        setAreButtonsDisabled(false);
        clearInterval(showProcessInterval);
      }
    }, 5);
  };

  const handleModalLoadNext = () => {
    setSuccessModal(false);
    handleLoadTable();
  };

  return (
    <div className="py-10 w-100 sm:w-168">
      <div className="flex justify-between py-1">
        <div className="font-mono text-xs sm:text-base">
          <button
            type="button"
            disabled={areButtonsDisabled}
            onClick={handleLoadTable}
          >
            Load next level
          </button>
        </div>
        <div className="font-mono text-xs sm:text-base">
          <button
            type="button"
            disabled={areButtonsDisabled}
            onClick={handleClearTable}
          >
            Clear it
          </button>
        </div>
      </div>

      {getShowSuccessModal() && (
        <Modal setShowModal={setShowSuccessModal}>
          <div className="place-self-end pr-2 font-mono text-xs sm:text-base">
            <button
              type="button"
              disabled={areButtonsDisabled}
              onClick={() => setSuccessModal(false)}
            >
              x
            </button>
          </div>
          <div className="w-[10rem] h-[10rem] sm:w-[20rem] sm:h-[20rem]">
            {/* <SuccessLottie /> */}
          </div>

          <div className="flex flex-col gap-2 justify-center items-center pb-5">
            <h3 className="font-mono text-3xl font-black text-center">
              Complete!
            </h3>

            <div className="font-mono text-xs sm:text-base">
              <button
                type="button"
                disabled={areButtonsDisabled}
                onClick={handleModalLoadNext}
              >
                Load next level
              </button>
            </div>
          </div>
        </Modal>
      )}

      <SudokuTable {...{ getTableData, setTableData }} />

      <div className="flex justify-between py-2">
        <div className="font-mono text-xs sm:text-base">
          <button
            type="button"
            disabled={areButtonsDisabled}
            onClick={handleSolveTable}
          >
            Solve it for me
          </button>
        </div>

        <div className="font-mono text-xs sm:text-base">
          <button
            type="button"
            disabled={areButtonsDisabled}
            onClick={handleCheckTable}
          >
            Check it
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sudoku;
