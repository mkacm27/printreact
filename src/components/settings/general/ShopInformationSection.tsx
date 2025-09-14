import React from "react";
import { View, Text } from 'react-native';
import { FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export const ShopInformationSection: React.FC<{ form: any }> = ({ form }) => {
  return (
    <View>
      <Text className="text-lg font-medium mb-4">Shop Information</Text>
      <View className="space-y-4">
        <FormField
          control={form.control}
          name="shopName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Shop Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter shop name" {...field} onChangeText={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="contactInfo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contact Information</FormLabel>
              <FormControl>
                <Textarea placeholder="Address, phone, email, etc." {...field} onChangeText={field.onChange} />
              </FormControl>
              <FormDescription>
                This information will appear on receipts
              </FormDescription>
            </FormItem>
          )}
        />
      </View>
    </View>
  );
};
