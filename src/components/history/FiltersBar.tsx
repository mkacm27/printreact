import React from 'react';
import { View, Text, Switch } from 'react-native';
import { Button } from "@/components/ui/button";
import { Filter, Calendar as CalendarIcon } from "lucide-react-native";
import { format } from "date-fns";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

interface FiltersBarProps {
  uniqueClasses: string[];
  uniqueDocumentTypes: string[];
  filterClass: string | null;
  setFilterClass: (value: string | null) => void;
  filterPaymentStatus: string | null;
  setFilterPaymentStatus: (value: string | null) => void;
  filterDocumentType: string | null;
  setFilterDocumentType: (value: string | null) => void;
  dateRangeEnabled: boolean;
  setDateRangeEnabled: (value: boolean) => void;
  startDate: Date | undefined;
  setStartDate: (value: Date | undefined) => void;
  endDate: Date | undefined;
  setEndDate: (value: Date | undefined) => void;
  resetFilters: () => void;
}

export const FiltersBar: React.FC<FiltersBarProps> = ({ ...props }) => {
  const { 
    uniqueClasses, uniqueDocumentTypes, filterClass, setFilterClass, 
    filterPaymentStatus, setFilterPaymentStatus, filterDocumentType, setFilterDocumentType, 
    dateRangeEnabled, setDateRangeEnabled, startDate, setStartDate, endDate, setEndDate, 
    resetFilters 
  } = props;

  const showClearButton = filterClass || filterPaymentStatus || filterDocumentType || dateRangeEnabled;

  return (
    <View className="space-y-2">
      <View className="flex-row items-center gap-2">
        <Filter className="w-5 h-5" color="#6b7280" />
        <Text>Filters</Text>
      </View>
      <View className="flex-row flex-wrap gap-2">
        <Select
          value={filterClass || ""}
          onValueChange={(value) => setFilterClass(value === "all" ? null : value)}
        >
          <SelectTrigger className="w-40"><SelectValue placeholder="Class" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Classes</SelectItem>
            {uniqueClasses.map((className) => (
              <SelectItem key={className} value={className}>{className}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Select
          value={filterPaymentStatus || ""}
          onValueChange={(value) => setFilterPaymentStatus(value === "all" ? null : value)}
        >
          <SelectTrigger className="w-40"><SelectValue placeholder="Payment Status" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="paid">Paid</SelectItem>
            <SelectItem value="unpaid">Unpaid</SelectItem>
          </SelectContent>
        </Select>

        <View className="flex-row items-center gap-2">
          <Switch value={dateRangeEnabled} onValueChange={setDateRangeEnabled} />
          <Text className="text-sm font-medium whitespace-nowrap">Date Range</Text>
        </View>
        
        {dateRangeEnabled && (
            <View className="flex-row gap-2 items-center">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-36 justify-start font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" color="#6b7280" />
                    <Text>{startDate ? format(startDate, "MMM d, yyyy") : "Start date"}</Text>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    onDayPress={(day) => {
                        setStartDate(new Date(day.timestamp));
                    }}
                    markedDates={{ [format(startDate || new Date(), 'yyyy-MM-dd')]: { selected: true } }}
                  />
                </PopoverContent>
              </Popover>
              <Text>to</Text>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-36 justify-start font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" color="#6b7280" />
                    <Text>{endDate ? format(endDate, "MMM d, yyyy") : "End date"}</Text>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                   <Calendar
                    onDayPress={(day) => {
                        setEndDate(new Date(day.timestamp));
                    }}
                    markedDates={{ [format(endDate || new Date(), 'yyyy-MM-dd')]: { selected: true } }}
                  />
                </PopoverContent>
              </Popover>
            </View>
          )}
        
        {showClearButton && (
          <Button variant="ghost" size="sm" onPress={resetFilters}>
            <Text>Clear Filters</Text>
          </Button>
        )}
      </View>
    </View>
  );
};
