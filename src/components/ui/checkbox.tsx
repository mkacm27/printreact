import React from 'react';
import Checkbox from '@react-native-community/checkbox';

const CheckboxComponent = React.forwardRef<
  React.ElementRef<typeof Checkbox>,
  React.ComponentPropsWithoutRef<typeof Checkbox>
>(({ ...props }, ref) => {
  return (
    <Checkbox
      ref={ref}
      tintColors={{ true: 'hsl(200 95% 45%)', false: 'hsl(210 15% 88%)' }}
      {...props}
    />
  );
});

CheckboxComponent.displayName = 'Checkbox';

export { CheckboxComponent as Checkbox };
