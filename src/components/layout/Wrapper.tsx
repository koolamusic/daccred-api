import React from 'react';

interface WrapperOpts {
  children: React.ReactNode;
  variant?: 'compact' | 'default' | 'none' | 'large' | string;
}

export const Wrapper: React.FC<WrapperOpts> = ({ children, variant }) => {
  /* --- Use the max width wrapper when define ---- */
  if (variant == 'compact') {
    return <div className='mx-auto mt-8 lg:max-w-7xl sm:px-8'>{children}</div>;
  }
  /* --- Use the max width wrapper when define ---- */

  if (variant == 'default') {
    return <div className='mx-auto mt-8 lg:ml-32 lg:max-w-9xl sm:px-8'>{children}</div>;
  }

  return <React.Fragment>{children}</React.Fragment>;
};
