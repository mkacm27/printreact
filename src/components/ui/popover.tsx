import React, { useState, createContext, useContext } from 'react';
import { Modal, View, Pressable } from 'react-native';
import { styled } from 'nativewind';
import { cn } from '@/lib/utils';

const StyledView = styled(View);

const PopoverContext = React.createContext({
  open: false,
  setOpen: (open: boolean) => {},
});

const Popover = ({ children, open, onOpenChange }: { children: React.ReactNode, open?: boolean, onOpenChange?: (open: boolean) => void }) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = open !== undefined ? open : internalOpen;
  const setIsOpen = onOpenChange !== undefined ? onOpenChange : setInternalOpen;

  return (
    <PopoverContext.Provider value={{ open: isOpen, setOpen: setIsOpen }}>
      {children}
    </PopoverContext.Provider>
  );
};

const PopoverTrigger = ({ children }: { children: React.ReactNode }) => {
  const { setOpen } = useContext(PopoverContext);
  return React.cloneElement(children as React.ReactElement, { onPress: () => setOpen(true) });
};

const PopoverContent = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  const { open, setOpen } = useContext(PopoverContext);
  return (
    <Modal
      transparent
      visible={open}
      onRequestClose={() => setOpen(false)}
      animationType="fade"
    >
      <Pressable style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)'}} onPress={() => setOpen(false)}>
        <Pressable className={cn("bg-popover p-4 rounded-lg shadow-lg", className)}>
            {children}
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export { Popover, PopoverTrigger, PopoverContent };
