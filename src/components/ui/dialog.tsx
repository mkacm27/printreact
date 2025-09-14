import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, Pressable } from 'react-native';
import { styled } from 'nativewind';
import { X } from 'lucide-react-native';

import { cn } from '@/lib/utils';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledPressable = styled(Pressable);

const DialogContext = React.createContext({
  open: false,
  setOpen: (open: boolean) => {},
});

const Dialog = ({ children, open, onOpenChange }: { children: React.ReactNode, open?: boolean, onOpenChange?: (open: boolean) => void }) => {
  const [internalOpen, setInternalOpen] = useState(false);

  const isOpen = open !== undefined ? open : internalOpen;
  const setIsOpen = onOpenChange !== undefined ? onOpenChange : setInternalOpen;

  return (
    <DialogContext.Provider value={{ open: isOpen, setOpen: setIsOpen }}>
      {children}
    </DialogContext.Provider>
  );
};

const DialogTrigger = ({ children }: { children: React.ReactNode }) => {
  const { setOpen } = React.useContext(DialogContext);
  // The child must be a pressable component like Button or TouchableOpacity
  return React.cloneElement(children as React.ReactElement, {
    onPress: () => setOpen(true),
  });
};

const DialogContent = ({ className, children }: { className?: string, children: React.ReactNode }) => {
  const { open, setOpen } = React.useContext(DialogContext);

  if (!open) {
    return null;
  }

  return (
    <Modal
      transparent
      visible={open}
      onRequestClose={() => setOpen(false)}
      animationType="fade"
    >
      <StyledPressable
        className="absolute inset-0 bg-black/80"
        onPress={() => setOpen(false)}
      />
      <StyledView className="flex-1 items-center justify-center p-4">
        <StyledView className={cn("w-full max-w-lg gap-4 border border-border bg-background p-6 shadow-lg rounded-lg", className)}>
          {children}
          <StyledTouchableOpacity
            className="absolute right-4 top-4 rounded-sm opacity-70"
            onPress={() => setOpen(false)}
          >
            <X color="#6b7280" size={16} />
          </StyledTouchableOpacity>
        </StyledView>
      </StyledView>
    </Modal>
  );
};

const DialogHeader = ({ ...props }) => (
  <StyledView
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
    )}
    {...props}
  />
);
DialogHeader.displayName = "DialogHeader";

const DialogFooter = ({ ...props }) => (
  <StyledView
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
    )}
    {...props}
  />
);
DialogFooter.displayName = "DialogFooter";

const DialogTitle = React.forwardRef<
  Text,
  React.ComponentProps<typeof Text>
>(({ className, ...props }, ref) => (
  <StyledText
    ref={ref}
    className={cn("text-lg font-semibold text-foreground", className)}
    {...props}
  />
));
DialogTitle.displayName = "DialogTitle";

const DialogDescription = React.forwardRef<
  Text,
  React.ComponentProps<typeof Text>
>(({ className, ...props }, ref) => (
  <StyledText
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
DialogDescription.displayName = "DialogDescription";

const DialogClose = ({ children }: { children: React.ReactNode }) => {
    const { setOpen } = React.useContext(DialogContext);
    // The child must be a pressable component like Button or TouchableOpacity
    return React.cloneElement(children as React.ReactElement, {
      onPress: () => setOpen(false),
    });
};


export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
};
