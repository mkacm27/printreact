import React, { useState, createContext, useContext, useMemo } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, Pressable } from 'react-native';
import { styled } from 'nativewind';
import { Check, ChevronDown } from 'lucide-react-native';
import { cn } from '@/lib/utils';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledPressable = styled(Pressable);

interface SelectContextProps {
  onValueChange: (value: string) => void;
  value?: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedLabel: string;
  setSelectedLabel: (label: string) => void;
}

const SelectContext = createContext<SelectContextProps | null>(null);

const Select = ({ children, onValueChange, value }: { children: React.ReactNode; onValueChange: (value: string) => void; value?: string }) => {
  const [open, setOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState('');

  const contextValue = useMemo(() => ({ 
    onValueChange, 
    value, 
    open, 
    setOpen, 
    selectedLabel, 
    setSelectedLabel 
  }), [onValueChange, value, open, selectedLabel]);

  return (
    <SelectContext.Provider value={contextValue}>
      {children}
    </SelectContext.Provider>
  );
};

const SelectTrigger = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const context = useContext(SelectContext);
  if (!context) {
    throw new Error('SelectTrigger must be used within a Select');
  }
  const { setOpen } = context;

  return (
    <StyledTouchableOpacity
      className={cn(
        "flex-row h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2",
        className
      )}
      onPress={() => setOpen(true)}
    >
      {children}
      <ChevronDown className="h-4 w-4 opacity-50" color="#6b7280" />
    </StyledTouchableOpacity>
  );
};

const SelectValue = ({ placeholder }: { placeholder?: string }) => {
    const context = useContext(SelectContext);
    if (!context) {
      throw new Error('SelectValue must be used within a Select');
    }
    const { selectedLabel } = context;
    return <StyledText className="text-foreground">{selectedLabel || placeholder}</StyledText>;
};

const SelectContent = ({ children }: { children: React.ReactNode }) => {
  const context = useContext(SelectContext);
  if (!context) {
    throw new Error('SelectContent must be used within a Select');
  }
  const { open, setOpen } = context;

  const items = React.Children.toArray(children).filter(
    (child: any) => child.type === SelectItem || child.type === SelectGroup
  );

  return (
    <Modal
      transparent
      visible={open}
      onRequestClose={() => setOpen(false)}
      animationType="fade"
    >
      <StyledPressable
        className="flex-1 justify-end bg-black/50"
        onPress={() => setOpen(false)}
      >
        <StyledPressable className="bg-popover rounded-t-lg border-t border-border">
          <FlatList
            data={items}
            keyExtractor={(item: any, index) => item.props.value || index.toString()}
            renderItem={({ item }) => item}
            className="p-2"
          />
        </StyledPressable>
      </StyledPressable>
    </Modal>
  );
};

const SelectItem = ({ children, value, className }: { children: React.ReactNode; value: string; className?: string }) => {
  const context = useContext(SelectContext);
  if (!context) {
    throw new Error('SelectItem must be used within a Select');
  }
  const { onValueChange, value: selectedValue, setOpen, setSelectedLabel } = context;
  const isSelected = selectedValue === value;

  React.useEffect(() => {
    if (isSelected && typeof children === 'string') {
      setSelectedLabel(children);
    }
  }, [isSelected, children, setSelectedLabel]);

  return (
    <StyledTouchableOpacity
      className={cn(
        "relative flex-row w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 h-10",
        className
      )}
      onPress={() => {
        onValueChange(value);
        if (typeof children === 'string') {
            setSelectedLabel(children);
        }
        setOpen(false);
      }}
    >
      {isSelected && (
        <StyledView className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
          <Check className="h-4 w-4" color="#6b7280" />
        </StyledView>
      )}
      <StyledText>{children}</StyledText>
    </StyledTouchableOpacity>
  );
};

const SelectGroup = ({ children, ...props }: React.ComponentProps<typeof View>) => <StyledView {...props}>{children}</StyledView>;
const SelectLabel = ({ children, className, ...props }: React.ComponentProps<typeof Text>) => <StyledText className={cn("py-1.5 pl-8 pr-2 text-sm font-semibold text-muted-foreground", className)} {...props}>{children}</StyledText>;
const SelectSeparator = ({ className, ...props }: React.ComponentProps<typeof View>) => <StyledView className={cn("-mx-1 my-1 h-px bg-muted", className)} {...props} />;


export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
};
