import React, { MouseEventHandler } from 'react';

import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';

type IIconButton = {
  areButtonsDisabled: boolean;
  handleLoadTable: MouseEventHandler<HTMLButtonElement>;
  faIcon: IconDefinition;
  buttonTitle: string;
  colour?: string;
};

const IconButton = ({
  areButtonsDisabled,
  handleLoadTable,
  faIcon,
  buttonTitle,
  colour = 'none',
}: IIconButton) => {
  const iconColour = areButtonsDisabled ? 'grey' : colour;

  const iconStyles = clsx(
    'w-10 h-10',
    'flex justify-center items-center',
    'rounded-lg border-2',
    iconColour === 'green' && 'text-white bg-lime-500 border-lime-500',
    iconColour === 'grey' && 'text-gray-400 border-gray-400'
  );

  const textStyles = clsx(
    'pt-1',
    'font-serif text-[0.6rem] font-semibold sm:text-base',
    iconColour === 'green' && 'text-lime-500',
    iconColour === 'grey' && 'text-gray-400'
  );

  return (
    <button
      type="button"
      disabled={areButtonsDisabled}
      onClick={handleLoadTable}
      className="flex flex-col justify-center items-center pt-1 w-full"
    >
      <div className={iconStyles}>
        <FontAwesomeIcon icon={faIcon} className="w-5 h-5" />
      </div>
      <div className={textStyles}>{buttonTitle}</div>
    </button>
  );
};

export { IconButton };
