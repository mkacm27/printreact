import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styled } from 'nativewind';
import { Card, CardContent } from "@/components/ui/card";
import StatsCard from "@/components/dashboard/StatsCard";
import { 
  Printer, 
  Receipt, 
  AlertCircle, 
  Pencil,
  FileText,
  Check
} from "lucide-react-native";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { useDashboardStats } from "@/features/dashboard/hooks/use-dashboard-stats";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

const DashboardScreen = () => {
  const navigation = useNavigation<any>();
  const { t } = useLanguage();
  const {
    todayJobs,
    totalPages,
    totalUnpaid,
    totalJobs,
    recentJobs,
    classesWithHighBalance,
    loading,
    error
  } = useDashboardStats();

  if (loading) {
    return <StyledView className="flex-1 items-center justify-center"><ActivityIndicator size="large" /></StyledView>;
  }

  if (error) {
    return <StyledView className="flex-1 items-center justify-center"><StyledText className="text-red-500">Error: {error}</StyledText></StyledView>;
  }

  const renderRecentJob = ({ item }) => {
    const date = new Date(item.timestamp);
    return (
      <StyledTouchableOpacity 
        className="flex-row items-center justify-between p-3 border border-border rounded-md bg-background mb-2"
        onPress={() => navigation.navigate('Receipt', { id: item.id })}
      >
        <StyledView className="flex-row items-center gap-3 flex-1">
          <StyledView className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
            <Receipt color={'hsl(200 95% 45%)'} size={20} />
          </StyledView>
          <StyledView className="flex-1">
            <StyledText className="font-medium text-foreground">{item.className}</StyledText>
            <StyledText className="text-sm text-muted-foreground">{item.serialNumber}</StyledText>
          </StyledView>
        </StyledView>
        <StyledView className="items-end">
          <StyledText className="font-medium text-foreground">{item.totalPrice.toFixed(2)} {t("currency")}</StyledText>
          <StyledText className="text-xs text-muted-foreground">
            {date.toLocaleDateString()} {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </StyledText>
        </StyledView>
      </StyledTouchableOpacity>
    );
  };

  const renderUnpaidClass = ({ item }) => (
    <StyledTouchableOpacity 
      className="flex-row items-center justify-between p-3 border border-border rounded-md bg-background mb-2"
      onPress={() => navigation.navigate('History', { screen: 'HistoryScreen', params: { class: item.name, filter: 'unpaid' } })}
    >
      <StyledView className="flex-row items-center gap-3">
        <StyledView className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
          <Pencil color={'hsl(200 95% 45%)'} size={20} />
        </StyledView>
        <StyledView>
          <StyledText className="font-medium text-foreground">{item.name}</StyledText>
          <Badge variant={item.totalUnpaid > 50 ? "destructive" : "secondary"}>
            {t("unpaid")}
          </Badge>
        </StyledView>
      </StyledView>
      <StyledText className="font-bold text-foreground">{item.totalUnpaid.toFixed(2)} {t("currency")}</StyledText>
    </StyledTouchableOpacity>
  );

  return (
    <ScrollView className="flex-1 bg-surface-alt">
      <StyledView className="p-4 space-y-6">
        <StyledView>
          <StyledText className="text-3xl font-bold text-foreground mb-1">{t("dashboard")}</StyledText>
          <StyledText className="text-muted-foreground">{t("view_and_manage")}</StyledText>
        </StyledView>
        
        <StyledView className="flex-row flex-wrap -mx-2">
            <StyledView className="w-1/2 px-2 mb-4"><StatsCard title={t("todays_print_jobs")} value={todayJobs} icon={<Printer size={16} color="hsl(200 95% 45%)" />} onPress={() => navigation.navigate('History')} /></StyledView>
            <StyledView className="w-1/2 px-2 mb-4"><StatsCard title={t("total_pages_printed")} value={totalPages.toLocaleString()} icon={<FileText size={16} color="hsl(200 95% 45%)" />} onPress={() => navigation.navigate('Statistics')} /></StyledView>
            <StyledView className="w-1/2 px-2 mb-4"><StatsCard title={t("unpaid_balance")} value={`${totalUnpaid.toFixed(2)} ${t("currency")}`} icon={<AlertCircle size={16} color="hsl(200 95% 45%)" />} onPress={() => navigation.navigate('History', { params: { filter: 'unpaid' }})} /></StyledView>
            <StyledView className="w-1/2 px-2 mb-4"><StatsCard title={t("total_print_jobs")} value={totalJobs} icon={<Receipt size={16} color="hsl(200 95% 45%)" />} onPress={() => navigation.navigate('History')} /></StyledView>
        </StyledView>
        
        <Card>
          <CardContent className="p-6">
            <StyledText className="text-xl font-semibold mb-4 text-foreground">{t("recent_print_jobs")}</StyledText>
            <FlatList
              data={recentJobs}
              renderItem={renderRecentJob}
              keyExtractor={item => item.id}
              ListEmptyComponent={() => (
                <StyledView className="items-center py-8">
                    <Receipt size={48} className="text-gray-300 mb-2" />
                    <StyledText className="text-muted-foreground">{t("no_print_jobs_yet")}</StyledText>
                    <StyledTouchableOpacity onPress={() => navigation.navigate('PrintJob')}>
                        <StyledText className="text-primary mt-2">{t("create_first_print_job")}</StyledText>
                    </StyledTouchableOpacity>
                </StyledView>
              )}
              ListFooterComponent={recentJobs.length > 0 ? (
                <StyledView className="items-center pt-2">
                    <StyledTouchableOpacity onPress={() => navigation.navigate('History')}>
                        <StyledText className="text-primary text-sm">{t("view_all_print_jobs")}</StyledText>
                    </StyledTouchableOpacity>
                </StyledView>
              ) : null}
            />
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <StyledText className="text-xl font-semibold mb-4 text-foreground">{t("unpaid_balances_by_class")}</StyledText>
            <FlatList
              data={classesWithHighBalance}
              renderItem={renderUnpaidClass}
              keyExtractor={item => item.id}
              ListEmptyComponent={() => (
                <StyledView className="items-center py-8">
                    <Check size={48} className="text-gray-300 mb-2" />
                    <StyledText className="text-muted-foreground">{t("all_classes_paid")}</StyledText>
                     <StyledTouchableOpacity onPress={() => navigation.navigate('History')}>
                        <StyledText className="text-primary mt-2">{t("view_all_print_jobs")}</StyledText>
                    </StyledTouchableOpacity>
                </StyledView>
              )}
              ListFooterComponent={classesWithHighBalance.length > 0 ? (
                <StyledView className="items-center pt-2">
                    <StyledTouchableOpacity onPress={() => navigation.navigate('History', { params: { filter: 'unpaid' }})}>
                        <StyledText className="text-primary text-sm">{t("view_all_unpaid_jobs")}</StyledText>
                    </StyledTouchableOpacity>
                </StyledView>
              ) : null}
            />
          </CardContent>
        </Card>
      </StyledView>
    </ScrollView>
  );
};

export default DashboardScreen;