import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator } from 'react-native';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Plus, Edit, Trash2 } from "lucide-react-native";
import { Teacher } from "@/lib/types";
import { ItemFormDialog } from "./ItemFormDialog";
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { useTeachersStore } from "@/features/teachers/stores/teachers-store";
import { useToast } from "@/hooks/use-toast";

export const TeachersTab: React.FC = () => {
  const { teachers, loading, loadTeachers, addTeacher, updateTeacher, deleteTeacher } = useTeachersStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<{ id: string; name: string } | null>(null);
  const [itemToDelete, setItemToDelete] = useState<Teacher | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadTeachers();
  }, [loadTeachers]);

  const handleSubmit = async (data: { itemName: string }) => {
    try {
      if (editingItem) {
        await updateTeacher({ id: editingItem.id, name: data.itemName });
        toast({ title: "Teacher updated" });
      } else {
        await addTeacher(data.itemName);
        toast({ title: "Teacher added" });
      }
      setIsDialogOpen(false);
      setEditingItem(null);
    } catch (error) {
      toast({ title: "Error", description: "Failed to save teacher.", variant: "destructive" });
    }
  };

  const handleDeleteClick = (item: Teacher) => {
    setItemToDelete(item);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (itemToDelete) {
      try {
        await deleteTeacher(itemToDelete.id);
        toast({ title: "Teacher deleted" });
        setIsDeleteDialogOpen(false);
        setItemToDelete(null);
      } catch (error) {
        toast({ title: "Error", description: "Failed to delete teacher.", variant: "destructive" });
      }
    }
  };

  const columns = [
    { header: "Teacher Name", accessorKey: "name" as const, searchable: true, sortable: true },
    {
      header: "Actions", accessorKey: "id" as const, cell: (row: Teacher) => (
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
            <CardTitle className="text-xl">Teachers</CardTitle>
            <CardDescription>Manage your teachers</CardDescription>
          </View>
          <Button onPress={() => { setEditingItem(null); setIsDialogOpen(true); }} className="gap-2">
            <Plus color="white" size={16} />
            <Text className="text-white">Add Teacher</Text>
          </Button>
        </View>
      </CardHeader>
      <CardContent>
        {loading ? <ActivityIndicator size="large" /> : <DataTable data={teachers} columns={columns} />}
      </CardContent>
      
      <ItemFormDialog 
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSubmit={handleSubmit}
        title={editingItem ? "Edit Teacher" : "Add New Teacher"}
        description={editingItem ? "Update the teacher name." : "Enter a name for the new teacher."}
        placeholder="e.g., Mr. John Doe"
        isEditing={!!editingItem}
        initialValue={editingItem?.name || ""}
      />

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>This action will delete the teacher "{itemToDelete?.name}".</AlertDialogDescription>
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
