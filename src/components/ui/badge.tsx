import * as React from 'react';
import { Text, View } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';
import { styled } from 'nativewind';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'flex-row items-center self-start rounded-full border px-2.5 py-0.5',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary',
        secondary: 'border-transparent bg-secondary',
        destructive: 'border-transparent bg-destructive',
        outline: 'border-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const badgeTextVariants = cva(
    'text-xs font-semibold',
    {
        variants: {
            variant: {
                default: 'text-primary-foreground',
                secondary: 'text-secondary-foreground',
                destructive: 'text-destructive-foreground',
                outline: 'text-foreground',
            }
        },
        defaultVariants: {
            variant: 'default',
        }
    }
)

const StyledView = styled(View);
const StyledText = styled(Text);

export interface BadgeProps
  extends React.ComponentPropsWithoutRef<typeof View>,
    VariantProps<typeof badgeVariants> {
        children: React.ReactNode;
        textClassName?: string;
    }

function Badge({ className, variant, children, textClassName, ...props }: BadgeProps) {
  return (
    <StyledView className={cn(badgeVariants({ variant }), className)} {...props}>
        <StyledText className={cn(badgeTextVariants({ variant }), textClassName)}>
            {children}
        </StyledText>
    </StyledView>
  );
}

export { Badge, badgeVariants };
