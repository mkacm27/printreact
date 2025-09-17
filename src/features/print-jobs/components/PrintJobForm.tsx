import React from "react";
import { View, Text } from 'react-native';
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Printer, Check, Plus, Minus } from "lucide-react-native";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { usePrintJobForm } from "../hooks/use-print-job-form";

export const PrintJobForm: React.FC = () => {
  const {
    form,
    calculatedPrice,
    isLoading,
    isDuplicateAlertOpen,
    setIsDuplicateAlertOpen,
    onSubmit,
    confirmDuplicateSubmit,
    cancelDuplicateSubmit,
    adjustPages,
    classes,
    teachers,
    documentTypes,
    settings,
  } = usePrintJobForm();

  const { watch } = form;
  const printType = watch("printType");
  const rectoPages = watch("rectoPages") || 0;
  const rectoVersoPages = watch("rectoVersoPages") || 0;

  return (
    <>
      <View className="p-6 bg-card rounded-2xl border border-border/50">
        <Form {...form}>
          <View className="space-y-6">
            <View className="space-y-6">
              <Text className="text-lg font-semibold text-foreground border-b border-border pb-2">Job Information</Text>
              
              <FormField
                control={form.control}
                name="className"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Class Name<Text className="text-destructive">*</Text></FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a class" />
                      </SelectTrigger>
                      <SelectContent>
                        {classes.map((c) => (
                          <SelectItem key={c.id} value={c.name}>
                            {c.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

            </View>

            <View className="space-y-6">
              <Text className="text-lg font-semibold text-foreground border-b border-border pb-2">Print Configuration</Text>
              
              <FormField
                control={form.control}
                name="printType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Print Type*</FormLabel>
                    <Select onValueChange={(value) => {
                      field.onChange(value);
                      if (value === "Both") {
                        form.setValue("rectoPages", 0);
                        form.setValue("rectoVersoPages", 0);
                      }
                    }} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a print type"/>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Recto">Recto (Single-sided)</SelectItem>
                        <SelectItem value="Recto-verso">Recto-verso (Double-sided)</SelectItem>
                        <SelectItem value="Both">Both (Mixed)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      {printType === "Recto" && `Price per page: ${settings.priceRecto.toFixed(2)} MAD`}
                      {printType === "Recto-verso" && `Price per page: ${settings.priceRectoVerso.toFixed(2)} MAD`}
                      {printType === "Both" && "Mixed pricing for Recto and Recto-verso pages"}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </View>

            {printType === "Both" ? (
              <View className="flex-col space-y-4">
                <FormField
                  control={form.control}
                  name="rectoPages"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Recto Pages<Text className="text-destructive">*</Text></FormLabel>
                      <View className="flex-row items-center">
                        <Button 
                          variant="outline"
                          onPress={() => adjustPages('recto', false)}
                          disabled={rectoPages <= 0}
                        >
                          <Minus size={16} color="#6b7280" />
                        </Button>
                        <FormControl>
                          <Input 
                            className="text-center mx-2 flex-1"
                            keyboardType="numeric"
                            {...field}
                            onChangeText={field.onChange}
                            value={field.value?.toString()}
                          />
                        </FormControl>
                        <Button 
                          variant="outline"
                          onPress={() => adjustPages('recto', true)}
                        >
                          <Plus size={16} color="#6b7280" />
                        </Button>
                      </View>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </View>
            ) : (
              <FormField
                control={form.control}
                name="pages"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Pages<Text className="text-destructive">*</Text></FormLabel>
                    <FormControl>
                      <Input keyboardType="numeric" {...field} onChangeText={field.onChange} value={field.value?.toString()} min={1} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="paid"
              render={({ field }) => (
                <FormItem className="flex-row items-center space-x-3 space-y-0 mt-4 p-4 border border-border rounded-md">
                  <FormControl>
                    <Checkbox
                      value={field.value}
                      onValueChange={field.onChange}
                    />
                  </FormControl>
                  <View className="space-y-1 leading-none">
                    <FormLabel>Mark as Paid</FormLabel>
                    <FormDescription>
                      If left unchecked, this will be added to the class's unpaid balance
                    </FormDescription>
                  </View>
                </FormItem>
              )}
            />

            <View className="bg-primary/10 border border-primary/20 p-6 rounded-2xl flex-col sm:flex-row justify-between items-center mt-8">
              <View>
                <Text className="text-sm text-muted-foreground">Total Price</Text>
                <Text className="text-3xl font-bold text-primary">{calculatedPrice.toFixed(2)} MAD</Text>
              </View>
              <View className="flex-col sm:flex-row gap-3 mt-4 sm:mt-0 w-full">
                <Button onPress={form.handleSubmit(onSubmit)} className="gap-2" disabled={isLoading}>
                  <Printer className="w-5 h-5" color="white" />
                  <Text className="text-white">{isLoading ? "Creating..." : "Create Print Job"}</Text>
                </Button>
               </View>
             </View>
           </View>
         </Form>
       </View>

      <Dialog open={isDuplicateAlertOpen} onOpenChange={setIsDuplicateAlertOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Potential Duplicate Detected</DialogTitle>
            <DialogDescription>
              A similar print job was created in the last 5 minutes. 
              Are you sure you want to create another print job with the same details?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="ghost" onPress={cancelDuplicateSubmit}><Text>Cancel</Text></Button>
            <Button onPress={confirmDuplicateSubmit}><Text className="text-white">Create Anyway</Text></Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
