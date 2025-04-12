"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { PortfolioItemForm } from "./portfolio-item-form";
import { portfolioService, type PortfolioItem } from "@/services/portfolioService";

type EditPortfolioItemDialogProps = {
  item: PortfolioItem;
  onClose: () => void;
  onSave: (item: PortfolioItem) => void;
};

export function EditPortfolioItemDialog({
  item,
  onClose,
  onSave,
}: EditPortfolioItemDialogProps) {
  const handleSubmit = async (data: Omit<PortfolioItem, "id" | "created_at" | "updated_at">) => {
    onSave({
      ...data,
      id: item.id,
      created_at: item.created_at,
      updated_at: item.updated_at,
    });
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Portfolio Item</DialogTitle>
        </DialogHeader>
        <PortfolioItemForm
          initialData={{
            title: item.title,
            category: item.category,
            beforeImage: item.beforeImage,
            afterImage: item.afterImage,
            description: item.description,
            tags: item.tags.join(", "),
          }}
          onSubmit={handleSubmit}
          onCancel={onClose}
        />
      </DialogContent>
    </Dialog>
  );
} 