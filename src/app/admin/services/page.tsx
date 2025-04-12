'use client';

import { useState, useEffect } from "react";
import { Sidebar } from "@/components/admin/sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2, Plus, Save, Trash, GripVertical } from "lucide-react";
import Image from "next/image";
import { Toaster, toast } from "sonner";
import { motion } from "motion/react";
import servicesService, { ServiceItem } from "@/services/servicesService";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

// Configure toast defaults
const toastConfig = {
  style: { background: "#fee2e2", borderColor: "#ef4444" },
  position: "top-center" as const
};

// Sample initial service data
const initialService: ServiceItem = {
  title: "",
  description: "",
  icon: "",
  image: ""
};

export default function ServicesAdmin() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [editingService, setEditingService] = useState<ServiceItem>(initialService);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const data = await servicesService.getServices();
      setServices(data);
    } catch (error: any) {
      toast.error("Failed to load services", {
        description: error?.message || "An unexpected error occurred",
        ...toastConfig
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!editingService.title || !editingService.description) {
      toast.error("Missing required fields", {
        description: "Please fill in all required fields",
        ...toastConfig
      });
      return;
    }

    setSaving(true);
    try {
      const newService = await servicesService.createService(editingService);
      setServices([...services, newService]);
      setEditingService(initialService);
      toast.success("Service added", {
        description: "New service has been added successfully."
      });
    } catch (error: any) {
      toast.error("Failed to save service", {
        description: error?.message || "An unexpected error occurred",
        ...toastConfig
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (index: number) => {
    try {
      await servicesService.deleteService(index);
      const newServices = [...services];
      newServices.splice(index, 1);
      setServices(newServices);
      toast.success("Service deleted", {
        description: "Service has been deleted successfully."
      });
    } catch (error: any) {
      toast.error("Failed to delete service", {
        description: error?.message || "An unexpected error occurred",
        ...toastConfig
      });
    }
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      toast.error("Invalid file type", {
        description: "Please upload a JPEG, PNG, or WebP image.",
        ...toastConfig
      });
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File too large", {
        description: "Image size should be less than 5MB.",
        ...toastConfig
      });
      return;
    }

    setUploading(true);
    try {
      const result = await servicesService.uploadImage(file);
      setEditingService({
        ...editingService,
        image: result.url
      });
      toast.success("Image uploaded", {
        description: "Image has been uploaded successfully."
      });
    } catch (error: any) {
      toast.error("Failed to upload image", {
        description: error?.message || "An unexpected error occurred",
        ...toastConfig
      });
    } finally {
      setUploading(false);
      // Clear the input
      event.target.value = '';
    }
  };

  const handleDragEnd = async (result: any) => {
    if (!result.destination) return;

    const items = Array.from(services);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setServices(items);

    try {
      const serviceIds = items.map(item => item.id).filter((id): id is number => id !== undefined);
      await servicesService.reorderServices(serviceIds);
      toast.success("Order updated", {
        description: "Services order has been updated successfully."
      });
    } catch (error: any) {
      toast.error("Failed to update order", {
        description: error?.message || "An unexpected error occurred",
        ...toastConfig
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Toaster position="top-center" />
      <Sidebar />
      <div className="md:pl-[280px]">
        <main className="container mx-auto p-4 md:p-6 lg:p-8 pt-20 md:pt-8">
          <div className="mb-6 space-y-2">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
              Services Management
            </h1>
            <p className="text-sm md:text-base text-gray-500 dark:text-gray-400">
              Manage your website's services section
            </p>
          </div>

          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Add New Service</CardTitle>
                <CardDescription>Create a new service to display on your website</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={editingService.title}
                    onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                    placeholder="Enter service title"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={editingService.description}
                    onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                    placeholder="Enter service description"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="icon">Icon (emoji)</Label>
                  <Input
                    id="icon"
                    value={editingService.icon}
                    onChange={(e) => setEditingService({ ...editingService, icon: e.target.value })}
                    placeholder="Enter emoji icon (e.g., 🛠️)"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image-upload">Service Image</Label>
                  <div className="flex gap-2">
                    <Input
                      id="image-upload"
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={handleImageUpload}
                      disabled={uploading}
                      className="flex-1"
                    />
                    {uploading && <Loader2 className="h-4 w-4 animate-spin" />}
                  </div>
                  {editingService.image && (
                    <div className="relative h-40 mt-2 rounded-md overflow-hidden">
                      <Image
                        src={editingService.image}
                        alt="Service preview"
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  )}
                </div>

                <Button 
                  onClick={handleSave} 
                  disabled={saving || !editingService.title || !editingService.description}
                  className="w-full"
                >
                  {saving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving
                    </>
                  ) : (
                    <>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Service
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Existing Services</CardTitle>
                <CardDescription>Manage and reorder your services</CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="space-y-4">
                    {[...Array(3)].map((_, index) => (
                      <Card key={index}>
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gray-200 rounded-md animate-pulse" />
                            <div className="flex-1 space-y-2">
                              <div className="h-4 bg-gray-200 rounded animate-pulse" />
                              <div className="h-3 bg-gray-200 rounded w-3/4 animate-pulse" />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <DragDropContext onDragEnd={handleDragEnd}>
                    <Droppable droppableId="services">
                      {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
                          {services.map((service, index) => (
                            <Draggable key={index} draggableId={`service-${index}`} index={index}>
                              {(provided) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                >
                                  <Card>
                                    <CardContent className="p-4">
                                      <div className="flex items-start space-x-4">
                                        <div {...provided.dragHandleProps} className="cursor-move">
                                          <GripVertical className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <div className="relative w-12 h-12 rounded-md overflow-hidden flex-shrink-0">
                                          <Image
                                            src={service.image}
                                            alt={service.title}
                                            fill
                                            className="object-cover"
                                            unoptimized
                                          />
                                        </div>
                                        <div className="flex-1">
                                          <h4 className="font-semibold">
                                            <span className="mr-2">{service.icon}</span>
                                            {service.title}
                                          </h4>
                                          <p className="text-sm text-gray-500">{service.description}</p>
                                        </div>
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          className="text-red-500 hover:text-red-700 hover:bg-red-100/20"
                                          onClick={() => handleDelete(index)}
                                        >
                                          <Trash className="h-4 w-4" />
                                        </Button>
                                      </div>
                                    </CardContent>
                                  </Card>
                                </div>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </DragDropContext>
                )}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
} 