import React from "react";
import { View, Text, Alert } from 'react-native';
import { Button } from "@/components/ui/button";
import { Download, Upload } from "lucide-react-native";
import DocumentPicker from 'react-native-document-picker';

export const BackupRestoreSection = () => {

  const handleExport = () => {
    Alert.alert("Not Implemented", "Exporting data is not yet supported on mobile.");
  };

  const handleImport = async () => {
    try {
      const res = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.json],
      });
      Alert.alert("Import not implemented", `File selected: ${res.name}. Import functionality is not yet implemented.`);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker
      } else {
        Alert.alert("Error", "An unknown error occurred while picking the file.");
      }
    }
  };

  return (
    <View className="space-y-4">
        <Text className="text-lg font-medium">Backup & Restore</Text>
        <Text className="text-sm text-muted-foreground">Export your application data as a JSON file, or import a previously exported backup.</Text>
        <View className="flex-col sm:flex-row gap-2 mt-4">
            <Button variant="outline" className="gap-2" onPress={handleExport}>
                <Download className="w-4 h-4" color="#6b7280" />
                <Text>Export Data</Text>
            </Button>
            <Button variant="outline" className="gap-2" onPress={handleImport}>
                <Upload className="w-4 h-4" color="#6b7280" />
                <Text>Import Data</Text>
            </Button>
        </View>
    </View>
  );
};
