import React from 'react';

import { useUser } from '@auth0/nextjs-auth0';
import Link from 'next/link';

const LoginButton = () => {
  const { user, error, isLoading } = useUser();
  if (isLoading) return <div>...Loading</div>;
  if (error) return <div>{error.message}</div>;
  if (user) {
    return (
      <>
        <h1>Hello {user.given_name}</h1>
        <Link href="/api/auth/logout">
          <a>Logout</a>
        </Link>
      </>
    );
  }

  return (
    <Link href="/api/auth/login">
      <a>Login</a>
    </Link>
  );
};

const SignUpButton = () => {
  const { user, error, isLoading } = useUser();
  if (isLoading) return <div>...Loading</div>;
  if (error) return <div>{error.message}</div>;

  if (!user) {
    return (
      <div className="p-4 my-5 bg-white rounded-lg">
        <div className="pb-7 text-grey-blue">
          Sign-up to save your progress and highscores!
        </div>
        <Link href="/api/auth/login">
          <a>
            <button className="p-1 py-2 w-full tracking-wide text-center text-white uppercase bg-grey-blue rounded-full">
              Free Sign up
            </button>
          </a>
        </Link>
      </div>
    );
  }

  return <></>;
};
export { LoginButton, SignUpButton };
