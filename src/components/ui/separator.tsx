import * as React from 'react';
import { View } from 'react-native';
import { styled } from 'nativewind';

import { cn } from '@/lib/utils';

const StyledView = styled(View);

const Separator = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & { orientation?: 'horizontal' | 'vertical' }
>(({ className, orientation = 'horizontal', ...props }, ref) => (
  <StyledView
    ref={ref}
    className={cn(
      'shrink-0 bg-border',
      orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]',
      className
    )}
    {...props}
  />
));
Separator.displayName = 'Separator';

export { Separator };
