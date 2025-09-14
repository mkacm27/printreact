import React, { useState, useEffect, useCallback } from "react";
import { View, Text, ActivityIndicator } from 'react-native';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Plus, Edit, Trash2 } from "lucide-react-native";
import { Class } from "@/lib/types";
import { ClassFormDialog } from "./ClassFormDialog";
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { useClassesStore } from "@/features/classes/stores/classes-store";
import { useToast } from "@/hooks/use-toast";

export const ClassesTab: React.FC = () => {
  const { classes, loading, loadClasses, addClass, updateClass, deleteClass } = useClassesStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingClass, setEditingClass] = useState<Class | null>(null);
  const [classToDelete, setClassToDelete] = useState<Class | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadClasses();
  }, [loadClasses]);

  const handleSubmit = async (data: { name: string }) => {
    try {
      if (editingClass) {
        await updateClass({ ...editingClass, name: data.name });
        toast({ title: "Class updated" });
      } else {
        await addClass(data.name);
        toast({ title: "Class added" });
      }
      setIsDialogOpen(false);
      setEditingClass(null);
    } catch (error) {
      toast({ title: "Error", description: "Failed to save class.", variant: "destructive" });
    }
  };

  const handleDeleteClick = (classItem: Class) => {
    setClassToDelete(classItem);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (classToDelete) {
      try {
        await deleteClass(classToDelete.id);
        toast({ title: "Class deleted" });
        setIsDeleteDialogOpen(false);
        setClassToDelete(null);
      } catch (error) {
        toast({ title: "Error", description: "Failed to delete class.", variant: "destructive" });
      }
    }
  };

  const columns = [
    { header: "Class Name", accessorKey: "name" as const, searchable: true, sortable: true },
    { header: "Unpaid Balance", accessorKey: "totalUnpaid" as const, cell: (row: Class) => <Text>{`${row.totalUnpaid.toFixed(2)} MAD`}</Text>, sortable: true },
    {
      header: "Actions", accessorKey: "id" as const, cell: (row: Class) => (
        <View className="flex-row gap-2">
          <Button variant="ghost" size="icon" onPress={() => { setEditingClass(row); setIsDialogOpen(true); }}>
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
            <CardTitle className="text-xl">Classes</CardTitle>
            <CardDescription>Manage your classes and unpaid balances</CardDescription>
          </View>
          <Button onPress={() => { setEditingClass(null); setIsDialogOpen(true); }} className="gap-2">
            <Plus color="white" size={16} />
            <Text className="text-white">Add Class</Text>
          </Button>
        </View>
      </CardHeader>
      <CardContent>
        {loading ? <ActivityIndicator size="large" /> : <DataTable data={classes} columns={columns} />}
      </CardContent>
      
      <ClassFormDialog 
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSubmit={handleSubmit}
        title={editingClass ? "Edit Class" : "Add New Class"}
        description={editingClass ? "Update the class details." : "Enter details for the new class."}
        isEditing={!!editingClass}
        initialValues={{ name: editingClass?.name || "" }}
      />
      
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>This action will delete the class "{classToDelete?.name}".</AlertDialogDescription>
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
