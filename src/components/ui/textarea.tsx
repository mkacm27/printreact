import * as React from 'react';
import { TextInput } from 'react-native';
import { styled } from 'nativewind';

import { cn } from '@/lib/utils';

const StyledTextInput = styled(TextInput);

export interface TextareaProps
  extends React.ComponentPropsWithoutRef<typeof TextInput> {}

const Textarea = React.forwardRef<
  React.ElementRef<typeof TextInput>,
  TextareaProps
>(({ className, ...props }, ref) => {
  return (
    <StyledTextInput
      ref={ref}
      multiline
      className={cn(
        'flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground disabled:opacity-50',
        'text-base leading-6', 
        className
      )}
      textAlignVertical="top"
      {...props}
    />
  );
});
Textarea.displayName = 'Textarea';

export { Textarea };
