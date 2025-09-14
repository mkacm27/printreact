import React, { useState, createContext, useContext } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { cn } from '@/lib/utils';

const TabsContext = createContext<{ activeTab: string, setActiveTab: (value: string) => void }>({ activeTab: '', setActiveTab: () => {} });

const Tabs = ({ children, defaultValue }) => {
    const [activeTab, setActiveTab] = useState(defaultValue);
    return <TabsContext.Provider value={{ activeTab, setActiveTab }}>{children}</TabsContext.Provider>;
};

const TabsList = ({ children, className }) => (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} className={cn("flex-row p-1 bg-muted rounded-md", className)}>{children}</ScrollView>
);

const TabsTrigger = ({ children, value, className }) => {
    const { activeTab, setActiveTab } = useContext(TabsContext);
    const isActive = activeTab === value;
    return (
        <TouchableOpacity 
            onPress={() => setActiveTab(value)} 
            className={cn("items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium", isActive && "bg-background shadow-sm", className)}
        >
            <Text className={cn("text-muted-foreground", isActive && "text-foreground")}>{children}</Text>
        </TouchableOpacity>
    );
};

const TabsContent = ({ children, value }) => {
    const { activeTab } = useContext(TabsContext);
    return activeTab === value ? <View className="mt-2">{children}</View> : null;
};

export { Tabs, TabsList, TabsTrigger, TabsContent };
