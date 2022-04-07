import React, { useEffect } from 'react';

import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type ITimer = {
  isActive: boolean;
  setIsActive: Function;
  seconds: number;
  setSeconds: Function;
};

const Timer = ({ isActive, setIsActive, seconds, setSeconds }: ITimer) => {
  useEffect(() => {
    let interval: NodeJS.Timer | null = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(seconds + 1);
      }, 1000);
    } else if (!isActive && seconds !== 0 && interval) {
      clearInterval(interval);
    }

    return () => clearInterval(interval!);
  });

  const time = new Date(seconds * 1000).toISOString().slice(11, 19);

  return (
    <div className="flex justify-center items-center flex-rows">
      <div className="pr-4 ">{time}</div>
      <button onClick={() => setIsActive(!isActive)}>
        <FontAwesomeIcon
          icon={isActive ? faPause : faPlay}
          className="w-3 h-3"
        />
      </button>
    </div>
  );
};

export { Timer };
export type { ITimer };
