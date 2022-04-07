import React, { ChangeEventHandler } from 'react';

type IToggle = {
  toggleTitle: string;
  toggleDescription: string;
  handleChange: ChangeEventHandler<HTMLInputElement>;
  settingOption: string;
};

const Toggle: React.FC<IToggle> = ({
  toggleTitle,
  toggleDescription,
  handleChange,
  settingOption,
}) => {
  return (
    <div className="flex justify-between items-center w-full">
      <div className="flex flex-col">
        <div className="font-medium text-gray-700">{toggleTitle}</div>
        <div>{toggleDescription}</div>
      </div>
      <label
        htmlFor={toggleTitle}
        className="flex row-span-2 justify-self-end items-center px-5 cursor-pointer"
      >
        <div className="relative">
          <input
            type="checkbox"
            id={toggleTitle}
            className="sr-only"
            onChange={handleChange}
            name={settingOption}
          />
          <div className="block w-14 h-8 bg-gray-600 rounded-full"></div>
          <div className="absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition dot"></div>
        </div>
      </label>
    </div>
  );
};

export { Toggle };
