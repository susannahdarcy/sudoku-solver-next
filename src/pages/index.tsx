import { Meta } from '@/common/layout/Meta';
import { Main } from '@/common/templates/Main';
import { Sudoku } from '@/modules/sudoku/Sudoku';
import { LoginButton } from '@/modules/userAuth/LoginButton';

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
      <LoginButton />
      <Sudoku />
    </Main>
  );
};

export default Index;
