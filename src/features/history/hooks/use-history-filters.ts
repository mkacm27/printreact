import { useState, useEffect, useMemo } from "react";
import { useNavigation, useRoute } from '@react-navigation/native';
import { PrintJob } from "@/lib/types";
import { isAfter, isBefore, subMonths } from "date-fns";
import { usePrintJobsStore } from "@/features/print-jobs/stores/print-jobs-store";

export const useHistoryFilters = () => {
  const navigation = useNavigation();
  const route = useRoute();
  
  const { printJobs, loading, error, loadPrintJobs } = usePrintJobsStore();
  
  const [filterClass, setFilterClass] = useState<string | null>(null);
  const [filterPaymentStatus, setFilterPaymentStatus] = useState<string | null>(null);
  const [filterDocumentType, setFilterDocumentType] = useState<string | null>(null);
  const [dateRangeEnabled, setDateRangeEnabled] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<Date | undefined>(subMonths(new Date(), 1));
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());

  useEffect(() => {
    loadPrintJobs();
  }, [loadPrintJobs]);

  useEffect(() => {
    const params = route.params as { class?: string; filter?: string; } | undefined;
    if (params?.class) setFilterClass(params.class);
    if (params?.filter === 'unpaid') setFilterPaymentStatus('unpaid');
  }, [route.params]);

  const { uniqueClasses, uniqueDocumentTypes } = useMemo(() => {
    const classes = Array.from(new Set(printJobs.map(job => job.className))).filter(Boolean);
    const docTypes = Array.from(new Set(printJobs.map(job => job.documentType))).filter(Boolean) as string[];
    
    return {
      uniqueClasses: classes,
      uniqueDocumentTypes: docTypes,
    };
  }, [printJobs]);

  const filteredJobs = useMemo(() => {
    return printJobs.filter(job => {
      let matches = true;
      if (filterClass) matches = matches && job.className === filterClass;
      if (filterPaymentStatus) {
        if (filterPaymentStatus === 'paid') matches = matches && job.paid === true;
        else if (filterPaymentStatus === 'unpaid') matches = matches && job.paid === false;
      }
      if (filterDocumentType && job.documentType) matches = matches && job.documentType === filterDocumentType;
      if (dateRangeEnabled && startDate && endDate) {
        const jobDate = new Date(job.timestamp);
        matches = matches && isAfter(jobDate, startDate) && isBefore(jobDate, endDate);
      }
      return matches;
    });
  }, [printJobs, filterClass, filterPaymentStatus, filterDocumentType, dateRangeEnabled, startDate, endDate]);

  const resetFilters = () => {
    setFilterClass(null);
    setFilterPaymentStatus(null);
    setFilterDocumentType(null);
    setDateRangeEnabled(false);
    setStartDate(subMonths(new Date(), 1));
    setEndDate(new Date());
    navigation.navigate("History", { screen: 'HistoryScreen', params: {} });
  };

  return {
    filterClass, setFilterClass, filterPaymentStatus, setFilterPaymentStatus, 
    filterDocumentType, setFilterDocumentType, dateRangeEnabled, setDateRangeEnabled, 
    startDate, setStartDate, endDate, setEndDate, filteredJobs, uniqueClasses, 
    uniqueDocumentTypes, resetFilters, loading, error,
  };
};
