import * as React from 'react';
import { TextInput } from 'react-native';
import { styled } from 'nativewind';

import { cn } from '@/lib/utils';

const StyledTextInput = styled(TextInput);

const Input = React.forwardRef<
  React.ElementRef<typeof TextInput>,
  React.ComponentPropsWithoutRef<typeof TextInput>
>(({ className, ...props }, ref) => {
  return (
    <StyledTextInput
      className={cn(
        'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base text-foreground disabled:opacity-50',
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = 'Input';

export { Input };
