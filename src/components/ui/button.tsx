import * as React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { styled } from 'nativewind';

const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledText = styled(Text);

const buttonVariants = cva(
  'flex-row items-center justify-center rounded-md',
  {
    variants: {
      variant: {
        default: 'bg-primary',
        destructive: 'bg-destructive',
        outline: 'border border-input bg-background',
        secondary: 'bg-secondary',
        ghost: 'bg-transparent',
        link: 'bg-transparent',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

const buttonTextVariants = cva(
  'text-sm font-medium',
  {
    variants: {
      variant: {
        default: 'text-primary-foreground',
        destructive: 'text-destructive-foreground',
        outline: 'text-accent-foreground',
        secondary: 'text-secondary-foreground',
        ghost: 'text-accent-foreground',
        link: 'text-primary underline',
      },
      size: {
        default: '',
        sm: '',
        lg: '',
        icon: '',
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ComponentPropsWithoutRef<typeof TouchableOpacity>,
    VariantProps<typeof buttonVariants> {
  children?: React.ReactNode;
  textClassName?: string;
}

const Button = React.forwardRef<
  React.ElementRef<typeof TouchableOpacity>,
  ButtonProps
>(({ className, variant, size, children, textClassName, ...props }, ref) => {
  
  const isStringChild = typeof children === 'string';

  return (
    <StyledTouchableOpacity
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    >
      {isStringChild ? (
        <StyledText className={cn(buttonTextVariants({ variant, size }), textClassName)}>
          {children}
        </StyledText>
      ) : (
        children
      )}
    </StyledTouchableOpacity>
  );
});

Button.displayName = 'Button';

export { Button, buttonVariants };
