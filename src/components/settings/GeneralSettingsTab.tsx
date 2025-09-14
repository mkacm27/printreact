import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema, GeneralSettingsFormValues } from "./general/schema";
import { ShopInformationSection } from "./general/ShopInformationSection";
import { PriceSettingsSection } from "./general/PriceSettingsSection";
import { AutomationSettingsSection } from "./general/AutomationSettingsSection";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useSettingsStore } from "@/features/settings/stores/settings-store";
import { ActivityIndicator, View, Text } from 'react-native';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Save, Store, DollarSign, Zap, Globe } from "lucide-react-native";

export const GeneralSettingsTab: React.FC = () => {
  const { toast } = useToast();
  const { t, language, setLanguage } = useLanguage();
  const { settings, loading, loadSettings, updateSettings } = useSettingsStore();

  const form = useForm<GeneralSettingsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: settings,
  });

  useEffect(() => {
    loadSettings();
  }, [loadSettings]);

  useEffect(() => {
    if (settings) {
      form.reset(settings);
    }
  }, [settings, form]);

  const onSubmit = async (data: GeneralSettingsFormValues) => {
    try {
      await updateSettings(data);
      toast({
        title: t("settings_saved"),
        description: t("settings_updated"),
      });
    } catch (error) {
      toast({
        title: t("error_saving_settings"),
        description: t("try_again"),
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <Form {...form}>
      <View className="space-y-6">
        <Accordion type="single" collapsible className="space-y-4" defaultValue="contact">
          <AccordionItem value="contact" className="border-b-0">
            <AccordionTrigger><Text className="font-semibold text-foreground">Contact Information</Text></AccordionTrigger>
            <AccordionContent><ShopInformationSection form={form} /></AccordionContent>
          </AccordionItem>

          <AccordionItem value="pricing" className="border-b-0">
            <AccordionTrigger><Text className="font-semibold text-foreground">Price Settings</Text></AccordionTrigger>
            <AccordionContent><PriceSettingsSection form={form} /></AccordionContent>
          </AccordionItem>

          <AccordionItem value="automation" className="border-b-0">
            <AccordionTrigger><Text className="font-semibold text-foreground">Automation & Notifications</Text></AccordionTrigger>
            <AccordionContent><AutomationSettingsSection form={form} /></AccordionContent>
          </AccordionItem>

          <AccordionItem value="language" className="border-b-0">
            <AccordionTrigger><Text className="font-semibold text-foreground">Language</Text></AccordionTrigger>
            <AccordionContent>
                <Label>{t("select_language")}</Label>
                <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger><SelectValue placeholder={t("select_language")} /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="en">{t("english")}</SelectItem>
                        <SelectItem value="ar">{t("arabic")}</SelectItem>
                    </SelectContent>
                </Select>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        
        <View className="flex-row justify-end pt-6">
          <Button onPress={form.handleSubmit(onSubmit)} className="gap-2">
            <Save color="white" size={16} />
            <Text className="text-white">{t("save")}</Text>
          </Button>
        </View>
      </View>
    </Form>
  );
};
