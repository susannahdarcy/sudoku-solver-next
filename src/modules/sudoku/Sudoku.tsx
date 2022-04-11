import React, { useEffect, useState } from 'react';

import { faLightbulb } from '@fortawesome/free-regular-svg-icons';
import {
  faArrowLeftRotate,
  faCheck,
  faEraser,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { cloneDeep, isEmpty, pullAt } from 'lodash-es';

import Modal from '@/common/components//Modal';
import { IconButton } from '@/common/components/IconButton';
import { Timer } from '@/common/components/Timer';
import { getFromLocalStorage } from '@/common/utils/localStorage';
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
  SudokuDifficulty,
} from '@/modules/sudoku/utils/Sudoku';
import { SudokuActionStack } from '@/modules/sudoku/utils/SudokuAction';
import { vaildateSudoku } from '@/modules/sudoku/utils/SudokuValidater';

let sudokuActionStack = new SudokuActionStack();

function Sudoku() {
  const firstSudokuString = loadExamples(SudokuDifficulty.MEDIUM, 0);
  if (firstSudokuString === '') throw new Error('failed to load sudoku string');
  const firstTable = inputSudoku(firstSudokuString);

  const [loadFromLocalStorage, setLoadFromLocalStorage] = useState(true);

  const [sudokuTable, setTable] = useState(firstTable);

  const getTableData = () => sudokuTable;

  const setTableData = (table: ICell[][]) => {
    setTable(table);
  };

  const [currentQuizNumber, setCurrentQuizNumber] = useState(0);

  const setCurrentQuiz = (quizNumber: number) => {
    setCurrentQuizNumber(quizNumber);
  };

  const [quizDifficulty] = useState(SudokuDifficulty.EASY);

  const [areButtonsDisabled, setAreButtonsDisabled] = useState(false);

  const [showSuccessModal, setSuccessModal] = useState(false);

  const getShowSuccessModal = () => showSuccessModal;

  const setShowSuccessModal = (showModal: boolean) => {
    setSuccessModal(showModal);
  };

  const [timerIsActive, setTimerIsActive] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);

  const resetTimer = () => {
    setTimerIsActive(false);
    setTimerSeconds(0);
  };

  useEffect(() => {
    if (loadFromLocalStorage) {
      setTable(getFromLocalStorage('sudokuTable'));

      setCurrentQuizNumber(getFromLocalStorage('currentQuizNumber'));

      setTimerSeconds(getFromLocalStorage('sudokuTimer'));
    } else {
      localStorage.setItem('sudokuTable', JSON.stringify(sudokuTable));
      localStorage.setItem(
        'currentQuizNumber',
        JSON.stringify(currentQuizNumber)
      );
      localStorage.setItem('sudokuTimer', JSON.stringify(timerSeconds));
    }
    setLoadFromLocalStorage(false);
  }, [sudokuTable, currentQuizNumber, loadFromLocalStorage, timerSeconds]);

  const pushCellChange = (priorCell: ICell) => {
    sudokuActionStack.pushCellChange(priorCell);
  };

  const handleLoadTable = () => {
    const nextQuiz = currentQuizNumber + 1;
    const nextTable = getNextTable(nextQuiz, sudokuTable);

    setCurrentQuiz(nextQuiz);
    setTable(nextTable);
    sudokuActionStack = new SudokuActionStack();
    resetTimer();
  };

  const handleCheckTable = () => {
    const cellsInError = vaildateSudoku(sudokuTable);
    const checkedTable = getCheckedTable(sudokuTable, cellsInError);

    setTable(checkedTable);

    if (isEmpty(cellsInError)) setShowSuccessModal(true);
  };

  const handleClearTable = () => {
    sudokuActionStack.pushChangeTable(sudokuTable);
    setTable(getClearedTable(sudokuTable));
  };

  const handleSolveTable = () => {
    sudokuActionStack.pushChangeTable(sudokuTable);
    const solvingProcess = AISolver(getClearedTable(sudokuTable));

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

  const handleUndo = () => {
    const priorTable = sudokuActionStack.popSudokuActionStack(sudokuTable);
    setTable(priorTable);
  };

  const handleModalLoadNext = () => {
    setSuccessModal(false);
    handleLoadTable();
    resetTimer();
  };

  return (
    <div className="pb-10 w-100 sm:w-168">
      <div className="flex flex-row justify-between items-center pb-3">
        <div className="uppercase ">{quizDifficulty.toString()}</div>
        <div className="">
          <Timer
            isActive={timerIsActive}
            setIsActive={setTimerIsActive}
            seconds={timerSeconds}
            setSeconds={setTimerSeconds}
          />
        </div>
      </div>

      <div className="relative">
        <SudokuTable {...{ getTableData, setTableData, pushCellChange }} />

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
      </div>

      <div className="pt-2">
        <div className="flex flex-row justify-evenly py-3 px-6 bg-white rounded-3xl drop-shadow-xl">
          <IconButton
            areButtonsDisabled={
              areButtonsDisabled || sudokuActionStack.isEmpty()
            }
            handleLoadTable={handleUndo}
            faIcon={faArrowLeftRotate}
            buttonTitle={'Undo'}
          />

          <IconButton
            areButtonsDisabled={areButtonsDisabled}
            handleLoadTable={handleClearTable}
            faIcon={faEraser}
            buttonTitle={'Clear it'}
          />

          <div className="px-1 w-full sm:px-6">
            <IconButton
              areButtonsDisabled={areButtonsDisabled}
              handleLoadTable={handleCheckTable}
              faIcon={faCheck}
              buttonTitle={'Check it'}
              colour="green"
            />
          </div>

          <IconButton
            areButtonsDisabled={areButtonsDisabled}
            handleLoadTable={handleSolveTable}
            faIcon={faLightbulb}
            buttonTitle={'Solve it'}
          />

          <IconButton
            areButtonsDisabled={areButtonsDisabled}
            handleLoadTable={handleLoadTable}
            faIcon={faPlus}
            buttonTitle={'Next Game'}
          />
        </div>
      </div>
    </div>
  );
}

export { Sudoku };
