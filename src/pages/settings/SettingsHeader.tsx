import React from "react";
import { View, Text } from 'react-native';
import { useIsMobile } from "@/hooks/use-mobile";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import { Settings } from 'lucide-react-native';

export const SettingsHeader = () => {
  const isMobile = useIsMobile();
  const { t } = useLanguage();

  return (
    <View className={cn(
      "bg-card rounded-2xl shadow-lg border border-border/30 p-6 mb-4",
      isMobile ? "text-center" : "flex-row justify-between items-start"
    )}>
      <View className={cn(isMobile && "space-y-2")}>
        <View className="flex-row items-center gap-3 mb-2">
          <View className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
            <Settings color="white" size={24} />
          </View>
          <View>
            <Text className={cn("font-bold text-primary", isMobile ? "text-2xl" : "text-3xl")}>
              {t("settings")}
            </Text>
            <Text className={cn("text-muted-foreground", isMobile ? "text-sm" : "text-base")}>
              Configure your print shop application
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
