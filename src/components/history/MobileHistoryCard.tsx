import React from "react";
import { View, Text, TouchableOpacity } from 'react-native';
import { Badge } from "@/components/ui/badge";
import { PrintJob } from "@/lib/types";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";
import { Receipt, Calendar, User, FileText, Printer, DollarSign } from "lucide-react-native";

interface MobileHistoryCardProps {
  job: PrintJob;
  onClick: (job: PrintJob) => void;
}

export const MobileHistoryCard: React.FC<MobileHistoryCardProps> = ({ job, onClick }) => {
  const { t } = useLanguage();

  return (
    <TouchableOpacity onPress={() => onClick(job)}>
        <Card className="mb-2">
            <CardContent className="p-4">
                <View className="space-y-3">
                    <View className="flex-row items-center justify-between">
                        <View className="flex-row items-center gap-2">
                        <Receipt className="w-4 h-4 text-primary" color="hsl(200 95% 45%)" />
                        <Text className="font-semibold text-foreground">#{job.serialNumber}</Text>
                        </View>
                        <Badge variant={job.paid ? "default" : "secondary"}>
                            {job.paid ? t("paid") : t("unpaid")}
                        </Badge>
                    </View>

                    <View className="flex-row flex-wrap gap-3 text-sm">
                        <View className="flex-row items-center gap-2">
                            <Calendar className="w-4 h-4 text-muted-foreground" color="#6b7280" />
                            <Text className="text-muted-foreground">{new Date(job.timestamp).toLocaleDateString()}</Text>
                        </View>
                        <View className="flex-row items-center gap-2">
                            <DollarSign className="w-4 h-4 text-muted-foreground" color="#6b7280" />
                            <Text className="font-semibold text-foreground">{job.totalPrice.toFixed(2)} {t("currency")}</Text>
                        </View>
                    </View>

                    <View className="space-y-2 text-sm">
                        <View className="flex-row items-center gap-2">
                            <User className="w-4 h-4 text-muted-foreground" color="#6b7280" />
                            <Text className="text-muted-foreground">{t("class")}: </Text>
                            <Text className="text-foreground">{job.className}</Text>
                        </View>
                    </View>
                </View>
            </CardContent>
        </Card>
    </TouchableOpacity>
  );
};
