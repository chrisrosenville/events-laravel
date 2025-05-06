import React from 'react';
import { cn } from '@/lib/utils';

interface InputErrorProps {
  message?: string;
  className?: string;
}

export const InputError = ({ message, className }: InputErrorProps) => {
  if (!message) return null;
  
  return (
    <div className={cn("text-sm text-red-500 font-medium mt-1", className)}>
      {message}
    </div>
  );
};

export default InputError;