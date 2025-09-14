import React, { useState } from "react";
import { View, Text, TextInput, FlatList } from 'react-native';
import { Button } from "@/components/ui/button";
import { Search, ArrowUp, ArrowDown, X } from "lucide-react-native";

interface DataTableProps<T> {
  data: T[];
  columns: {
    header: string;
    accessorKey: keyof T;
    cell?: (item: T) => React.ReactNode;
    searchable?: boolean;
    sortable?: boolean;
  }[];
  onRowClick?: (item: T) => void;
}

export function DataTable<T extends { id?: string | number }>({ data, columns, onRowClick }: DataTableProps<T>) {
  const [sortColumn, setSortColumn] = useState<keyof T | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = React.useMemo(() => {
    if (!searchQuery) return data;
    return data.filter((item) =>
      columns.some((column) => {
        if (!column.searchable) return false;
        const value = item[column.accessorKey];
        return String(value).toLowerCase().includes(searchQuery.toLowerCase());
      })
    );
  }, [data, searchQuery, columns]);

  const sortedData = React.useMemo(() => {
    if (!sortColumn) return filteredData;
    return [...filteredData].sort((a, b) => {
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];
      if (aValue === bValue) return 0;
      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
      }
      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
      }
      return sortDirection === "asc" ? String(aValue).localeCompare(String(bValue)) : String(bValue).localeCompare(String(aValue));
    });
  }, [filteredData, sortColumn, sortDirection]);

  const handleSort = (column: keyof T) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const renderHeader = () => (
    <View className="flex-row bg-muted/50 p-4 border-b border-border">
      {columns.map((column) => (
        <TouchableOpacity key={String(column.accessorKey)} className="flex-1 px-2" onPress={() => column.sortable && handleSort(column.accessorKey)}>
          <View className="flex-row items-center gap-1">
            <Text className="font-medium text-muted-foreground">{column.header}</Text>
            {column.sortable && sortColumn === column.accessorKey && (
              sortDirection === "asc" ? <ArrowUp className="h-3 w-3" color="#6b7280" /> : <ArrowDown className="h-3 w-3" color="#6b7280" />
            )}
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderRow = ({ item }) => (
    <TouchableOpacity onPress={() => onRowClick && onRowClick(item)} className="flex-row p-4 border-b border-border">
      {columns.map((column) => (
        <View key={String(column.accessorKey)} className="flex-1 px-2">
          {column.cell ? column.cell(item) : <Text>{String(item[column.accessorKey] || "")}</Text>}
        </View>
      ))}
    </TouchableOpacity>
  );

  return (
    <View className="space-y-4">
        <View className="flex-row items-center">
            <View className="relative flex-1">
                <View className="absolute left-2.5 top-2.5 z-10">
                    <Search className="h-4 w-4 text-gray-500" color="#6b7280" />
                </View>
                <TextInput
                    placeholder="Search..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    className="pl-8 w-full h-10 rounded-md border border-input bg-background py-2 text-base text-foreground"
                />
                {searchQuery ? (
                    <TouchableOpacity
                    className="absolute right-0 top-0 h-full justify-center px-2"
                    onPress={() => setSearchQuery("")}
                    >
                        <X className="h-4 w-4" color="#6b7280" />
                    </TouchableOpacity>
                ) : null}
            </View>
        </View>

      <View className="border rounded-md">
        <FlatList
          data={sortedData}
          ListHeaderComponent={renderHeader}
          renderItem={renderRow}
          keyExtractor={(item) => String(item.id)}
          ListEmptyComponent={() => (
            <View className="items-center justify-center h-24">
              <Text className="text-muted-foreground">No results found</Text>
            </View>
          )}
        />
      </View>

      <Text className="text-sm text-gray-500">
        Showing {sortedData.length} of {data.length} entries
      </Text>
    </View>
  );
}
