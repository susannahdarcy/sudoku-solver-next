import { Meta } from '@/common/layout/Meta';
import { Main } from '@/common/templates/Main';
import Sudoku from '@/modules/sudoku/Sudoku';

const Index = () => {
  return (
    <Main
      meta={
        <Meta
          title="Sudoku|Solver"
          description="Sudoku Puzzle Website, with in-built solver"
        />
      }
    >
      <Sudoku />
    </Main>
  );
};

export default Index;
