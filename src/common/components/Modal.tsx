import React, { useEffect, useRef } from 'react';

const useOnClickOutside = (
  ref: React.RefObject<HTMLDivElement>,
  handler: { (): any; (arg0: { target: any }): void }
) => {
  useEffect(() => {
    const listener = (event: { target: any }) => {
      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }

      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
};

type Props = {
  setShowModal: Function;
};

const Modal: React.FC<Props> = ({ setShowModal, children }) => {
  const ref = useRef<HTMLDivElement>(null);
  // ref = useRef<HTMLInputElement>();
  useOnClickOutside(ref, () => setShowModal(false));

  useEffect(() => {
    const closeOnEscape = (e: { keyCode: number }) => {
      if (e.keyCode === 27) {
        setShowModal(false);
      }
    };

    window.addEventListener('keydown', closeOnEscape);
    return () => {
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, []);
  return (
    <div className="flex absolute inset-0 z-50 justify-center items-center bg-white/70">
      <div className="relative my-6 mx-auto w-auto max-w-3xl">
        <div
          ref={ref}
          className="flex relative flex-col w-full bg-white rounded-lg border-3"
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
