import React from 'react';
import { View } from 'react-native';
import { Button } from "@/components/ui/button";
import { FileText, FileSpreadsheet, Plus } from "lucide-react-native";
import { useNavigation } from '@react-navigation/native';
import { Text } from 'react-native';

interface ExportButtonsProps {
  onExportPDF: () => void;
  onExportCSV: () => void;
}

export const ExportButtons: React.FC<ExportButtonsProps> = ({ onExportPDF, onExportCSV }) => {
  const navigation = useNavigation<any>();
  
  return (
    <View className="flex-row flex-wrap gap-2">
      <Button
        variant="outline"
        onPress={onExportCSV}
      >
        <FileSpreadsheet className="w-4 h-4" color="#6b7280" />
        <Text className="ml-2">Export CSV</Text>
      </Button>
      <Button
        variant="outline"
        onPress={onExportPDF}
      >
        <FileText className="w-4 h-4" color="#6b7280" />
        <Text className="ml-2">Export PDF</Text>
      </Button>
      <Button
        variant="outline"
        onPress={() => navigation.navigate('UnpaidReports')}
      >
        <FileText className="w-4 h-4" color="#6b7280" />
        <Text className="ml-2">Unpaid Reports</Text>
      </Button>
      <Button 
        onPress={() => navigation.navigate('PrintJob')}
      >
        <Plus className="w-4 h-4" color="white" />
        <Text className="ml-2 text-white">New Print Job</Text>
      </Button>
    </View>
  );
};
