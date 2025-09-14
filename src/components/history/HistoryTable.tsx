import React from "react";
import { View, Text } from 'react-native';
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/ui/data-table";
import { PrintJob } from "@/lib/types";
import { useLanguage } from "@/contexts/LanguageContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { MobileHistoryCard } from "./MobileHistoryCard";
import { FlatList } from "react-native";

interface HistoryTableProps {
  data: PrintJob[];
  onRowClick: (job: PrintJob) => void;
}

export const HistoryTable: React.FC<HistoryTableProps> = ({ data, onRowClick }) => {
  const { t, language } = useLanguage();
  const isMobile = useIsMobile();
  
  if (isMobile) {
    return (
        <FlatList 
            data={data}
            renderItem={({ item }) => <MobileHistoryCard job={item} onClick={onRowClick} />}
            keyExtractor={item => item.id}
            ListEmptyComponent={() => (
                <View className="text-center py-8">
                    <Text className="text-muted-foreground">{t("no_data_found")}</Text>
                </View>
            )}
        />
    );
  }
  
  const columns = [
    {
      header: t("receipt"),
      accessorKey: "serialNumber" as keyof PrintJob,
      searchable: true,
      sortable: true,
    },
    {
      header: t("date"),
      accessorKey: "timestamp" as keyof PrintJob,
      cell: (job: PrintJob) => <Text>{new Date(job.timestamp).toLocaleDateString()}</Text>,
      searchable: true,
      sortable: true,
    },
    {
      header: t("class"),
      accessorKey: "className" as keyof PrintJob,
      searchable: true,
      sortable: true,
    },
    {
      header: t("status"),
      accessorKey: "paid" as keyof PrintJob,
      cell: (job: PrintJob) => (
        <Badge variant={job.paid ? "default" : "secondary"}>
          {job.paid ? t("paid") : t("unpaid")}
        </Badge>
      ),
      sortable: true,
    },
  ];

  return (
    <View>
      <DataTable
        data={data}
        columns={columns}
        onRowClick={onRowClick}
      />
    </View>
  );
};
