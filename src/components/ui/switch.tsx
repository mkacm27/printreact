import * as React from 'react';
import { Switch as RNSwitch } from 'react-native';
import { styled } from 'nativewind';

const StyledSwitch = styled(RNSwitch);

const Switch = React.forwardRef<
  React.ElementRef<typeof RNSwitch>,
  React.ComponentPropsWithoutRef<typeof RNSwitch>
>((props, ref) => {
  return (
    <StyledSwitch
      ref={ref}
      trackColor={{ false: 'hsl(210 15% 88%)', true: 'hsl(200 95% 45%)' }}
      thumbColor={'hsl(0 0% 100%)'}
      ios_backgroundColor="hsl(210 15% 88%)"
      {...props}
    />
  );
});
Switch.displayName = 'Switch';

export { Switch };
