import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Text } from 'react-native';

const itemNameSchema = z.object({
  itemName: z.string().min(1, { message: "Name cannot be empty" }),
});

type ItemFormValues = z.infer<typeof itemNameSchema>;

interface ItemFormDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: ItemFormValues) => void;
  title: string;
  description: string;
  placeholder: string;
  isEditing: boolean;
  initialValue?: string;
}

export const ItemFormDialog: React.FC<ItemFormDialogProps> = ({ ...props }) => {
  const { isOpen, onOpenChange, onSubmit, title, description, placeholder, isEditing, initialValue = "" } = props;
  const form = useForm<ItemFormValues>({
    resolver: zodResolver(itemNameSchema),
    defaultValues: {
      itemName: initialValue,
    },
  });

  React.useEffect(() => {
    form.reset({ itemName: initialValue });
  }, [initialValue, form]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <View className="py-4">
            <FormField
              control={form.control}
              name="itemName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder={placeholder} onChangeText={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </View>
          <DialogFooter>
            <Button variant="outline" onPress={() => onOpenChange(false)}><Text>Cancel</Text></Button>
            <Button onPress={form.handleSubmit(onSubmit)}><Text className="text-white">{isEditing ? "Update" : "Add"}</Text></Button>
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
