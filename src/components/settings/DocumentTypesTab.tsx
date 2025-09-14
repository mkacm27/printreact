import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator } from 'react-native';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Plus, Edit, Trash2 } from "lucide-react-native";
import { DocumentType } from "@/lib/types";
import { ItemFormDialog } from "./ItemFormDialog";
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { useDocumentTypesStore } from "@/features/document-types/stores/document-types-store";
import { useToast } from "@/hooks/use-toast";

export const DocumentTypesTab: React.FC = () => {
  const { documentTypes, loading, loadDocumentTypes, addDocumentType, updateDocumentType, deleteDocumentType } = useDocumentTypesStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<{ id: string; name: string } | null>(null);
  const [itemToDelete, setItemToDelete] = useState<DocumentType | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadDocumentTypes();
  }, [loadDocumentTypes]);

  const handleSubmit = async (data: { itemName: string }) => {
    try {
      if (editingItem) {
        await updateDocumentType({ id: editingItem.id, name: data.itemName });
        toast({ title: "Document type updated" });
      } else {
        await addDocumentType(data.itemName);
        toast({ title: "Document type added" });
      }
      setIsDialogOpen(false);
      setEditingItem(null);
    } catch (error) {
      toast({ title: "Error", description: "Failed to save document type.", variant: "destructive" });
    }
  };

  const handleDeleteClick = (item: DocumentType) => {
    setItemToDelete(item);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (itemToDelete) {
      try {
        await deleteDocumentType(itemToDelete.id);
        toast({ title: "Document type deleted" });
        setIsDeleteDialogOpen(false);
        setItemToDelete(null);
      } catch (error) {
        toast({ title: "Error", description: "Failed to delete document type.", variant: "destructive" });
      }
    }
  };

  const columns = [
    { header: "Document Type", accessorKey: "name" as const, searchable: true, sortable: true },
    {
      header: "Actions", accessorKey: "id" as const, cell: (row: DocumentType) => (
        <View className="flex-row gap-2">
          <Button variant="ghost" size="icon" onPress={() => { setEditingItem(row); setIsDialogOpen(true); }}>
            <Edit className="w-4 h-4" color="#6b7280" />
          </Button>
          <Button variant="ghost" size="icon" onPress={() => handleDeleteClick(row)}>
            <Trash2 className="w-4 h-4" color="red" />
          </Button>
        </View>
      ),
    },
  ];

  return (
    <Card>
      <CardHeader>
        <View className="flex-row items-center justify-between">
          <View>
            <CardTitle className="text-xl">Document Types</CardTitle>
            <CardDescription>Manage document categories</CardDescription>
          </View>
          <Button onPress={() => { setEditingItem(null); setIsDialogOpen(true); }} className="gap-2">
            <Plus color="white" size={16} />
            <Text className="text-white">Add Document Type</Text>
          </Button>
        </View>
      </CardHeader>
      <CardContent>
        {loading ? <ActivityIndicator size="large" /> : <DataTable data={documentTypes} columns={columns} />}
      </CardContent>
      
      <ItemFormDialog 
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSubmit={handleSubmit}
        title={editingItem ? "Edit Document Type" : "Add New Document Type"}
        description={editingItem ? "Update the document type." : "Enter a name for the new document type."}
        placeholder="e.g., Exam, Homework, etc."
        isEditing={!!editingItem}
        initialValue={editingItem?.name || ""}
      />

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>This action will delete the document type "{itemToDelete?.name}".</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button variant="ghost" onPress={() => setIsDeleteDialogOpen(false)}><Text>Cancel</Text></Button>
            <Button className="bg-destructive" onPress={confirmDelete}><Text className="text-white">Delete</Text></Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
};
