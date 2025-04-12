"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { PortfolioItemForm } from "@/components/admin/portfolio/portfolio-item-form";
import { portfolioService, type CreatePortfolioItemData } from "@/services/portfolioService";
import { toast } from "sonner";

export function CreatePortfolioItemButton({ onSuccess }: { onSuccess?: () => void }) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: CreatePortfolioItemData) => {
    try {
      setIsLoading(true);
      await portfolioService.createPortfolioItem(data);
      toast.success("Portfolio item created successfully");
      setOpen(false);
      onSuccess?.();
    } catch (error) {
      toast.error("Failed to create portfolio item");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <Plus className="w-4 h-4 mr-2" />
        Add Portfolio Item
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Portfolio Item</DialogTitle>
          </DialogHeader>
          <PortfolioItemForm onSubmit={handleSubmit} isLoading={isLoading} />
        </DialogContent>
      </Dialog>
    </>
  );
} 