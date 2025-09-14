import * as React from 'react';
import { View, Text } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';
import { styled } from 'nativewind';

import { cn } from '@/lib/utils';

const StyledView = styled(View);
const StyledText = styled(Text);

const alertVariants = cva('relative w-full rounded-lg border p-4', {
  variants: {
    variant: {
      default: 'bg-background border-border',
      destructive: 'border-destructive/50 bg-destructive/10',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const alertTitleVariants = cva('mb-1 font-medium leading-none tracking-tight', {
    variants: {
        variant: {
            default: 'text-foreground',
            destructive: 'text-destructive',
        }
    },
    defaultVariants: {
        variant: 'default',
    }
});

const alertDescriptionVariants = cva('text-sm', {
    variants: {
        variant: {
            default: 'text-muted-foreground',
            destructive: 'text-destructive',
        }
    },
    defaultVariants: {
        variant: 'default',
    }
});


const Alert = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & VariantProps<typeof alertVariants>
>(({ className, variant, children, ...props }, ref) => {
    const childrenArray = React.Children.toArray(children);
    const icon = childrenArray.find((child: any) => child.props.lucide); 

    const content = childrenArray.filter((child: any) => !child.props.lucide);

    return (
        <StyledView
            ref={ref}
            role="alert"
            className={cn(alertVariants({ variant }), className)}
            {...props}
        >
            <StyledView className="flex-row items-start">
                {icon && <StyledView className="pr-3 pt-0.5">{icon}</StyledView>}
                <StyledView className="flex-1">{content}</StyledView>
            </StyledView>
        </StyledView>
    )
});
Alert.displayName = 'Alert';

const AlertTitle = React.forwardRef<
  React.ElementRef<typeof Text>,
  React.ComponentPropsWithoutRef<typeof Text> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <StyledText
    ref={ref}
    className={cn(alertTitleVariants({ variant }), className)}
    {...props}
  />
));
AlertTitle.displayName = 'AlertTitle';

const AlertDescription = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <StyledView
    ref={ref}
    className={cn(alertDescriptionVariants({ variant }), className)}
    {...props}
  />
));
AlertDescription.displayName = 'AlertDescription';

export { Alert, AlertTitle, AlertDescription };
