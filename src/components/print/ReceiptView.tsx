import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from "@react-navigation/native";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { usePrintJobsStore } from "@/features/print-jobs/stores/print-jobs-store";
import { useSettingsStore } from "@/features/settings/stores/settings-store";
import { PrintJob } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Check, ArrowLeft, FileText, Printer, Send } from "lucide-react-native";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const ReceiptView = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { id } = route.params;

  const { printJobs, updatePrintJob, loading, loadPrintJobs } = usePrintJobsStore();
  const { settings, loadSettings } = useSettingsStore();

  const [printJob, setPrintJob] = useState<PrintJob | null>(null);
  const [isPaidConfirmOpen, setIsPaidConfirmOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadPrintJobs();
    loadSettings();
  }, [loadPrintJobs, loadSettings]);

  useEffect(() => {
    const job = printJobs.find((j) => j.id === id);
    if (job) {
      setPrintJob(job);
    }
  }, [id, printJobs]);

  const handleTogglePaid = async () => {
    if (!printJob) return;
    
    const updatedJob = { ...printJob, paid: !printJob.paid };
    await updatePrintJob(updatedJob);
    
    toast({
      title: `Marked as ${updatedJob.paid ? "Paid" : "Unpaid"}`,
      description: `Receipt ${printJob.serialNumber} has been updated.`,
    });
    setIsPaidConfirmOpen(false);
  };

  if (loading || !printJob) {
    return <ActivityIndicator size="large" className="mt-10" />;
  }

  const receiptDate = new Date(printJob.timestamp).toLocaleString();

  return (
    <ScrollView className="flex-1 p-4">
      <View className="mb-4">
        <Button variant="ghost" onPress={() => navigation.goBack()} className="flex-row items-center gap-2">
          <ArrowLeft className="w-4 h-4" color="#6b7280" />
          <Text>Back</Text>
        </Button>
      </View>
      
      <Card>
        <CardHeader className="border-b border-border">
          <View className="flex-row justify-between items-start">
            <View>
              <CardTitle className="text-2xl">{settings.shopName}</CardTitle>
              <CardDescription>{settings.contactInfo}</CardDescription>
            </View>
            <Badge variant={printJob.paid ? "default" : "secondary"}>
              {printJob.paid ? "PAID" : "UNPAID"}
            </Badge>
          </View>
        </CardHeader>
        
        <CardContent className="pt-6">
          <View className="mb-6">
            <Text className="text-lg font-semibold mb-2">Receipt Information</Text>
            <View className="flex-row justify-between">
                <Text className="text-sm text-gray-500">Receipt Number</Text>
                <Text className="font-medium">{printJob.serialNumber}</Text>
            </View>
             <View className="flex-row justify-between">
                <Text className="text-sm text-gray-500">Date</Text>
                <Text className="font-medium">{receiptDate}</Text>
            </View>
          </View>
          
          <Separator className="my-4" />
          
          <View className="mb-6">
            <Text className="text-lg font-semibold mb-2">Print Job Details</Text>
            <View className="space-y-2">
                <View className="flex-row justify-between"><Text className="text-sm text-gray-500">Class</Text><Text className="font-medium">{printJob.className}</Text></View>
                {printJob.teacherName && <View className="flex-row justify-between"><Text className="text-sm text-gray-500">Teacher</Text><Text className="font-medium">{printJob.teacherName}</Text></View>}
                {printJob.documentType && <View className="flex-row justify-between"><Text className="text-sm text-gray-500">Document Type</Text><Text className="font-medium">{printJob.documentType}</Text></View>}
                <View className="flex-row justify-between"><Text className="text-sm text-gray-500">Print Type</Text><Text className="font-medium">{printJob.printType}</Text></View>
                <View className="flex-row justify-between"><Text className="text-sm text-gray-500">Pages</Text><Text className="font-medium">{printJob.pages}</Text></View>
                <View className="flex-row justify-between"><Text className="text-sm text-gray-500">Copies</Text><Text className="font-medium">{printJob.copies}</Text></View>
            </View>
          </View>
          
          <Separator className="my-4" />
          
          <View className="flex-row justify-between items-center mt-6">
            <Text className="text-lg text-gray-500">Total Amount</Text>
            <Text className="text-2xl font-bold">{printJob.totalPrice.toFixed(2)} MAD</Text>
          </View>
        </CardContent>
        
        <CardFooter className="flex-col space-y-2 pt-6 border-t border-border">
          <Button onPress={() => setIsPaidConfirmOpen(true)} className="w-full flex-row gap-2">
            <Check color="white" size={16} />
            <Text className="text-white">Mark as {printJob.paid ? "Unpaid" : "Paid"}</Text>
          </Button>
          <View className="flex-row gap-2 w-full">
            <Button variant="outline" className="flex-1 flex-row gap-2"><Printer color="#6b7280" size={16} /><Text>Print</Text></Button>
            <Button variant="outline" className="flex-1 flex-row gap-2"><FileText color="#6b7280" size={16} /><Text>Save PDF</Text></Button>
            <Button className="flex-1 flex-row gap-2"><Send color="white" size={16} /><Text className="text-white">WhatsApp</Text></Button>
          </View>
        </CardFooter>
      </Card>

      <Dialog open={isPaidConfirmOpen} onOpenChange={setIsPaidConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Mark as {printJob.paid ? "Unpaid" : "Paid"}?</DialogTitle>
          </DialogHeader>
          <DialogFooter>
            <Button variant="ghost" onPress={() => setIsPaidConfirmOpen(false)}><Text>Cancel</Text></Button>
            <Button onPress={handleTogglePaid}><Text className="text-white">Confirm</Text></Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </ScrollView>
  );
};

export default ReceiptView;
