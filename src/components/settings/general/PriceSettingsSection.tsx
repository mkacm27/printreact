import React from "react";
import { View, Text } from 'react-native';
import { FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export const PriceSettingsSection: React.FC<{ form: any }> = ({ form }) => {
  return (
    <View>
      <Text className="text-lg font-medium mb-4">Price Settings (MAD)</Text>
      <View className="space-y-4">
        <FormField
          control={form.control}
          name="priceRecto"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price per Page (Recto)</FormLabel>
              <FormControl>
                <Input keyboardType="numeric" {...field} onChangeText={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="priceRectoVerso"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price per Page (Recto-verso)</FormLabel>
              <FormControl>
                <Input keyboardType="numeric" {...field} onChangeText={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />
      </View>
    </View>
  );
};
