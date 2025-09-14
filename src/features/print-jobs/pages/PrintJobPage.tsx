import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Printer } from "lucide-react-native";
import { PrintJobForm } from "../components/PrintJobForm";

const PrintJobPage = () => {
  return (
    <ScrollView className="flex-1">
        <View className="space-y-6 p-4">
            <View className="flex-row items-center gap-4 mb-4">
                <View className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-lg">
                    <Printer className="w-6 h-6" color="white" />
                </View>
                <View>
                    <Text className="text-3xl font-bold text-foreground">New Print Job</Text>
                    <Text className="text-muted-foreground">Create a new print job and generate a receipt</Text>
                </View>
            </View>

            <PrintJobForm />
        </View>
    </ScrollView>
  );
};

export default PrintJobPage;
