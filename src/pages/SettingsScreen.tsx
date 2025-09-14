import React from "react";
import { ScrollView, View } from 'react-native';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GeneralSettingsTab } from "@/components/settings/GeneralSettingsTab";
import { ClassesTab } from "@/components/settings/ClassesTab";
import { TeachersTab } from "@/components/settings/TeachersTab";
import { DocumentTypesTab } from "@/components/settings/DocumentTypesTab";
import { SettingsHeader } from "./settings/SettingsHeader";
import { BackupRestoreSection } from "./settings/BackupRestoreSection";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

const SettingsScreen = () => {
  const isMobile = useIsMobile();

  return (
    <ScrollView className={cn("flex-1", isMobile && "pb-6")}>
        <View className="p-4">
            <SettingsHeader />

            <Tabs defaultValue="general" className="w-full">
                <TabsList>
                    <TabsTrigger value="general">General</TabsTrigger>
                    <TabsTrigger value="classes">Classes</TabsTrigger>
                    <TabsTrigger value="teachers">Teachers</TabsTrigger>
                    <TabsTrigger value="documents">Docs</TabsTrigger>
                    <TabsTrigger value="backup">Backup</TabsTrigger>
                </TabsList>
                
                <View className="mt-4">
                    <TabsContent value="general"><GeneralSettingsTab /></TabsContent>
                    <TabsContent value="classes"><ClassesTab /></TabsContent>
                    <TabsContent value="teachers"><TeachersTab /></TabsContent>
                    <TabsContent value="documents"><DocumentTypesTab /></TabsContent>
                    <TabsContent value="backup"><BackupRestoreSection /></TabsContent>
                </View>
            </Tabs>
        </View>
    </ScrollView>
  );
};

export default SettingsScreen;