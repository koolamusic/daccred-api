/* eslint-disable @typescript-eslint/no-explicit-any */
/* Error Message Component */
import React from 'react';

interface ErrorMessageProps {
  error: any;
}

export default function ErrorMessage({ error }: ErrorMessageProps) {
  return <span className='flex w-full text-sm text-red-600'>{error || ''}</span>;
}
