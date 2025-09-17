import uuid from 'react-native-uuid';
import { Settings, Class, Teacher, DocumentType } from "./types";
import AsyncStorage from '@react-native-async-storage/async-storage';

// Default settings
export const defaultSettings: Settings = {
  shopName: "Print Enterprise",
  contactInfo: "+212 600000000 • example@print.com",
  priceRecto: 0.10,
  priceRectoVerso: 0.15,
  priceBoth: 0.25,
  maxUnpaidThreshold: 100,
  whatsappTemplate: "Thank you for using our printing service!",
  defaultSavePath: "C:/PrintReceipts",
  enableAutoPdfSave: true,
  enableWhatsappNotification: true,
  enableAutoPaidNotification: false,
};

// Sample data for classes
export const defaultClasses: Class[] = [
  { id: uuid.v4() as string, name: "Class 1-A", totalUnpaid: 0 },
  { id: uuid.v4() as string, name: "Class 2-B", totalUnpaid: 0 },
  { id: uuid.v4() as string, name: "Class 3-C", totalUnpaid: 0 },
];

// Sample data for teachers
export const defaultTeachers: Teacher[] = [
  { id: uuid.v4() as string, name: "Sarah Johnson" },
  { id: uuid.v4() as string, name: "Michael Smith" },
  { id: uuid.v4() as string, name: "Emma Davis" },
];

// Sample data for document types
export const defaultDocumentTypes: DocumentType[] = [
  { id: uuid.v4() as string, name: "Exam" },
  { id: uuid.v4() as string, name: "Worksheet" },
  { id: uuid.v4() as string, name: "Handout" },
];

// Initialize local storage with default values if they don't exist
export const initializeData = async (): Promise<void> => {
  const settings = await AsyncStorage.getItem("settings");
  if (settings === null) {
    await AsyncStorage.setItem("settings", JSON.stringify(defaultSettings));
  }

  const classes = await AsyncStorage.getItem("classes");
  if (classes === null) {
    await AsyncStorage.setItem("classes", JSON.stringify(defaultClasses));
  }

  const teachers = await AsyncStorage.getItem("teachers");
  if (teachers === null) {
    await AsyncStorage.setItem("teachers", JSON.stringify(defaultTeachers));
  }

  const documentTypes = await AsyncStorage.getItem("documenttypes");
  if (documentTypes === null) {
    await AsyncStorage.setItem("documenttypes", JSON.stringify(defaultDocumentTypes));
  }

  const printJobs = await AsyncStorage.getItem("printjobs");
  if (printJobs === null) {
    await AsyncStorage.setItem("printjobs", JSON.stringify([]));
  }
};