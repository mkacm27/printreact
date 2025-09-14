import React, { useState, createContext, useContext } from 'react';
import { View, Text, TouchableOpacity, LayoutAnimation, UIManager, Platform } from 'react-native';
import { ChevronDown } from 'lucide-react-native';
import { cn } from '@/lib/utils';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const AccordionContext = createContext<{ activeItem: string | null, setActiveItem: (value: string | null) => void }>({ activeItem: null, setActiveItem: () => {} });

const Accordion = ({ children, ...props }) => {
    const [activeItem, setActiveItem] = useState<string | null>(null);
    return <AccordionContext.Provider value={{ activeItem, setActiveItem }}>{children}</AccordionContext.Provider>;
};

const AccordionItem = ({ children, value, className, ...props }) => {
    const { activeItem } = useContext(AccordionContext);
    const isOpen = activeItem === value;
    return <View className={cn("border-b", className)}>{React.Children.map(children, child => React.cloneElement(child, { value, isOpen }))}</View>;
};

const AccordionTrigger = ({ children, value, isOpen, className, ...props }) => {
    const { activeItem, setActiveItem } = useContext(AccordionContext);
    return (
        <TouchableOpacity 
            onPress={() => {
                LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                setActiveItem(activeItem === value ? null : value)
            }}
            className={cn("flex-row flex-1 items-center justify-between py-4 font-medium", className)}
        >
            <Text>{children}</Text>
            <ChevronDown className={cn("h-4 w-4 shrink-0 transition-transform duration-200", isOpen && "rotate-180")} color="#6b7280" />
        </TouchableOpacity>
    );
};

const AccordionContent = ({ children, isOpen, className, ...props }) => {
    return isOpen ? <View className={cn("overflow-hidden text-sm pb-4 pt-0", className)}>{children}</View> : null;
};

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
