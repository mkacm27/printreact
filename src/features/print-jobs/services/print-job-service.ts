import { PrintJob } from '@/lib/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Linking } from 'react-native';

// Generate a serial number for a print job
export const generateSerialNumber = async (): Promise<string> => {
  const date = new Date();
  const year = date.getFullYear().toString().slice(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  
  const data = await AsyncStorage.getItem('printjobs');
  const jobs: PrintJob[] = data ? JSON.parse(data) : [];
  
  const todayJobs = jobs.filter(job => {
    const jobDate = new Date(job.timestamp);
    return (
      jobDate.getFullYear() === date.getFullYear() &&
      jobDate.getMonth() === date.getMonth() &&
      jobDate.getDate() === date.getDate()
    );
  });
  
  const count = (todayJobs.length + 1).toString().padStart(3, '0');
  return `PE-${year}${month}${day}-${count}`;
};

// Format a date for display
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleString();
};

// Generate detailed receipt message for WhatsApp
const generateDetailedReceiptMessage = (printJob: PrintJob, settings: any): string => {
  const formattedDate = formatDate(printJob.timestamp);
  
  // Build the message with complete receipt details
  let message = `*${settings.shopName} - Receipt*\n\n`;
  message += `*Receipt Number:* ${printJob.serialNumber}\n`;
  message += `*Date:* ${formattedDate}\n\n`;
  message += `*Class:* ${printJob.className}\n`;
  
  if (printJob.teacherName && printJob.teacherName !== 'none') {
    message += `*Teacher:* ${printJob.teacherName}\n`;
  }
  
  if (printJob.documentType && printJob.documentType !== 'none') {
    message += `*Document Type:* ${printJob.documentType}\n`;
  }
  
  message += `*Print Type:* ${printJob.printType}\n`;
  message += `*Pages:* ${printJob.pages}\n`;
  message += `*Copies:* ${printJob.copies}\n`;
  message += `*Total Price:* ${printJob.totalPrice.toFixed(2)} MAD\n\n`;
  
  if (printJob.notes) {
    message += `*Notes:* ${printJob.notes}\n\n`;
  }
  
  message += `*Payment Status:* ${printJob.paid ? "PAID" : "UNPAID"}\n`;
  
  // Add payment confirmation message for paid receipts
  if (printJob.paid) {
    message += `\n*CONFIRMATION:* Payment received. Thank you!`;
  } else {
    // Add payment reminder for unpaid receipts
    message += `\n*REMINDER:* Please arrange payment as soon as possible. Thank you!`;
  }
  
  return message;
};

// Send WhatsApp notification
export const sendWhatsAppNotification = async (printJob: PrintJob): Promise<void> => {
  try {
    const settingsData = await AsyncStorage.getItem('settings');
    const settings = settingsData ? JSON.parse(settingsData) : {};
    
    if (!settings.enableWhatsappNotification) return;
    
    const message = generateDetailedReceiptMessage(printJob, settings);
    const encodedMessage = encodeURIComponent(message);
    
    const url = `https://wa.me/?text=${encodedMessage}`;
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      console.error(`Don't know how to open this URL: ${url}`);
    }
    
  } catch (error) {
    console.error("Failed to send WhatsApp notification:", error);
  }
};
