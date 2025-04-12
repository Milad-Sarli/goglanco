"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2 } from "lucide-react";
import { EditPortfolioItemDialog } from "@/components/admin/portfolio/edit-portfolio-item-dialog";
import { DeletePortfolioItemDialog } from "@/components/admin/portfolio/delete-portfolio-item-dialog";
import { portfolioService, type PortfolioItem } from "@/services/portfolioService";
import { toast } from "sonner";

export function PortfolioItemsList() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);
  const [deletingItem, setDeletingItem] = useState<PortfolioItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadPortfolioItems();
  }, []);

  const loadPortfolioItems = async () => {
    try {
      const data = await portfolioService.fetchPortfolioItems();
      if (!Array.isArray(data)) {
        console.error('Received non-array data:', data);
        toast.error("Invalid data format received");
        setItems([]);
        return;
      }
      setItems(data);
    } catch (error) {
      toast.error("Failed to load portfolio items");
      console.error(error);
      setItems([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateItem = async (updatedItem: PortfolioItem) => {
    try {
      const { id, ...data } = updatedItem;
      const updated = await portfolioService.updatePortfolioItem(id, data);
      setItems((prev) =>
        prev.map((item) => (item.id === updated.id ? updated : item))
      );
      toast.success("Portfolio item updated successfully");
    } catch (error) {
      toast.error("Failed to update portfolio item");
      console.error(error);
    } finally {
      setEditingItem(null);
    }
  };

  const handleDeleteItem = async (itemId: number) => {
    try {
      await portfolioService.deletePortfolioItem(itemId);
      setItems((prev) => prev.filter((item) => item.id !== itemId));
      toast.success("Portfolio item deleted successfully");
    } catch (error) {
      toast.error("Failed to delete portfolio item");
      console.error(error);
    } finally {
      setDeletingItem(null);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-4">
      {items.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          No portfolio items found. Click the "Add Portfolio Item" button to create one.
        </div>
      ) : (
        items.map((item) => (
          <Card key={item.id} className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <Badge variant="outline" className="mb-2">
                  {item.category}
                </Badge>
                <p className="text-muted-foreground mb-2">{item.description}</p>
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setEditingItem(item)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => setDeletingItem(item)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <p className="text-sm font-medium mb-2">Before Image</p>
                <img
                  src={item.beforeImage}
                  alt={`Before: ${item.title}`}
                  className="w-full h-48 object-cover rounded-md"
                />
              </div>
              <div>
                <p className="text-sm font-medium mb-2">After Image</p>
                <img
                  src={item.afterImage}
                  alt={`After: ${item.title}`}
                  className="w-full h-48 object-cover rounded-md"
                />
              </div>
            </div>
          </Card>
        ))
      )}

      {editingItem && (
        <EditPortfolioItemDialog
          item={editingItem}
          onClose={() => setEditingItem(null)}
          onSave={handleUpdateItem}
        />
      )}

      {deletingItem && (
        <DeletePortfolioItemDialog
          item={deletingItem}
          onClose={() => setDeletingItem(null)}
          onDelete={handleDeleteItem}
        />
      )}
    </div>
  );
} 