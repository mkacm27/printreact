import React from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FiltersBar } from "@/components/history/FiltersBar";
import { ExportButtons } from "@/components/history/ExportButtons";
import { HistoryTable } from "@/components/history/HistoryTable";
import { exportToPDF, exportToCSV } from "@/utils/export-utils";
import { useHistoryFilters } from "@/features/history/hooks/use-history-filters";

const HistoryScreen = () => {
  const navigation = useNavigation<any>();
  const {
    filteredJobs,
    ...filterProps
  } = useHistoryFilters();

  const handleExportPDF = () => exportToPDF();
  const handleExportCSV = () => exportToCSV();

  return (
    <View className="flex-1 p-4 space-y-6">
      <View className="flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <View>
          <Text className="text-3xl font-bold mb-1">Print History</Text>
          <Text className="text-gray-500">View and manage all print jobs</Text>
        </View>
        <ExportButtons 
          onExportCSV={handleExportCSV}
          onExportPDF={handleExportPDF}
        />
      </View>
      
      <Card className="flex-1">
        <CardHeader className="pb-3">
            <FiltersBar {...filterProps} />
        </CardHeader>
        <CardContent>
          <HistoryTable 
            data={filteredJobs}
            onRowClick={(job) => navigation.navigate('Receipt', { id: job.id })}
          />
        </CardContent>
      </Card>
    </View>
  );
};

export default HistoryScreen;