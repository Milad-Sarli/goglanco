"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { portfolioService, type PortfolioItem } from "@/services/portfolioService";

type DeletePortfolioItemDialogProps = {
  item: PortfolioItem;
  onClose: () => void;
  onDelete: (id: number) => void;
};

export function DeletePortfolioItemDialog({
  item,
  onClose,
  onDelete,
}: DeletePortfolioItemDialogProps) {
  return (
    <AlertDialog open onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Portfolio Item</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete &quot;{item.title}&quot;? This action
            cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => onDelete(item.id)}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
} 