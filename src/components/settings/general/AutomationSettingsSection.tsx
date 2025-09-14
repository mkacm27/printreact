import React from 'react';
import { View } from 'react-native';
import { FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

export const AutomationSettingsSection = ({ form }) => {
  return (
    <View className="space-y-4">
      <FormField
        control={form.control}
        name="enableAutoPdfSave"
        render={({ field }) => (
          <FormItem className="flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
            <View className="space-y-0.5">
              <FormLabel>Automatically Save PDF Receipts</FormLabel>
              <FormDescription>
                When enabled, PDF receipts will be saved automatically.
              </FormDescription>
            </View>
            <FormControl>
              <Switch value={field.value} onValueChange={field.onChange} />
            </FormControl>
          </FormItem>
        )}
      />

        <FormField
            control={form.control}
            name="defaultSavePath"
            render={({ field }) => (
            <FormItem>
                <FormLabel>Default PDF Save Path</FormLabel>
                <FormControl>
                <Input placeholder="/storage/emulated/0/Documents" {...field} onChangeText={field.onChange} />
                </FormControl>
                <FormDescription>
                The default folder path where PDF receipts will be saved.
                </FormDescription>
            </FormItem>
            )}
        />
    </View>
  );
};
