'use client';

import { useState, useEffect } from "react";
import { Sidebar } from "@/components/admin/sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Loader2, Plus, Save, Trash } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { images } from "@/config/images";
import { motion } from "motion/react";

// API endpoints to be replaced with your Laravel backend URLs
const API_ENDPOINTS = {
  HERO_DATA: '/api/hero',
  UPDATE_HERO: '/api/hero/update',
};

interface HeroData {
  title: string;
  subtitle: string;
  mainImage: string;
  backgroundImages: string[];
  stats: {
    rugsRestored: number;
    yearsExperience: number;
    satisfactionRate: number;
  };
}

// Sample initial data based on the current Hero section
const initialHeroData: HeroData = {
  title: "Revive Your Precious Rugs",
  subtitle: "Expert restoration services for all types of rugs and carpets",
  mainImage: images.hero.main,
  backgroundImages: images.hero.alternatives || [],
  stats: {
    rugsRestored: 500,
    yearsExperience: 15,
    satisfactionRate: 100,
  }
};

export default function HeroAdmin() {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [heroData, setHeroData] = useState<HeroData>(initialHeroData);
  const [newImageUrl, setNewImageUrl] = useState("");

  // In a real app, fetch data from your Laravel API
  useEffect(() => {
    // Simulating API fetch with initial data
    setHeroData(initialHeroData);
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      // Simulating API call to your Laravel backend
      // In a real app, you would make a fetch or axios call to your API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // API call success handling
      toast.success("Changes saved", {
        description: "Hero section has been updated successfully."
      });
    } catch (error) {
      toast.error("Error", {
        description: "Failed to save changes. Please try again."
      });
    } finally {
      setSaving(false);
    }
  };

  const handleAddImage = () => {
    if (newImageUrl.trim() && !heroData.backgroundImages.includes(newImageUrl)) {
      setHeroData({
        ...heroData,
        backgroundImages: [...heroData.backgroundImages, newImageUrl],
      });
      setNewImageUrl("");
    }
  };

  const handleRemoveImage = (index: number) => {
    const newImages = [...heroData.backgroundImages];
    newImages.splice(index, 1);
    setHeroData({
      ...heroData,
      backgroundImages: newImages,
    });
  };

  const handleMainImageChange = (url: string) => {
    setHeroData({
      ...heroData,
      mainImage: url,
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="flex h-screen overflow-hidden"
    >
      <Sidebar />
      <motion.div 
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden ml-64"
      >
        <main className="flex-1 p-6">
          <motion.div 
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-6 flex justify-between items-center"
          >
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Hero Section Management</h1>
              <p className="text-gray-500 dark:text-gray-400">Manage your website's hero section content and visuals</p>
            </div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button onClick={handleSave} disabled={saving}>
                {saving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </motion.div>
          </motion.div>

          <Tabs defaultValue="content">
            <TabsList className="mb-4">
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="images">Images</TabsTrigger>
              <TabsTrigger value="stats">Statistics</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>

            <TabsContent value="content" className="space-y-4">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Hero Text Content</CardTitle>
                    <CardDescription>
                      Edit the main heading and subheading of your hero section
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <motion.div 
                      initial={{ x: -10, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.1, duration: 0.4 }}
                      className="space-y-2"
                    >
                      <Label htmlFor="title">Main Heading</Label>
                      <Input
                        id="title"
                        value={heroData.title}
                        onChange={(e) => setHeroData({ ...heroData, title: e.target.value })}
                        placeholder="Enter main heading"
                      />
                    </motion.div>
                    <motion.div 
                      initial={{ x: -10, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.4 }}
                      className="space-y-2"
                    >
                      <Label htmlFor="subtitle">Subheading</Label>
                      <Textarea
                        id="subtitle"
                        value={heroData.subtitle}
                        onChange={(e) => setHeroData({ ...heroData, subtitle: e.target.value })}
                        placeholder="Enter subheading text"
                        rows={3}
                      />
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="images" className="space-y-4">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Main Background Image</CardTitle>
                    <CardDescription>
                      Set the primary background image for your hero section
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <Label htmlFor="main-image">Image URL</Label>
                      <Input
                        id="main-image"
                        value={heroData.mainImage}
                        onChange={(e) => handleMainImageChange(e.target.value)}
                        placeholder="Enter image URL"
                        className="mb-2"
                      />
                      <motion.div 
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.4 }}
                        className="relative w-full h-48 overflow-hidden rounded-md border border-gray-200 dark:border-gray-700"
                      >
                        {heroData.mainImage ? (
                          <Image
                            src={heroData.mainImage}
                            alt="Main background"
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full bg-gray-100 dark:bg-gray-800">
                            <p className="text-gray-500 dark:text-gray-400">No image set</p>
                          </div>
                        )}
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.5 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Alternative Background Images</CardTitle>
                    <CardDescription>
                      Manage alternative background images that can be used in your hero section
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <motion.div
                        whileHover={{ scale: 1.01 }}
                        className="flex gap-2"
                      >
                        <Input
                          value={newImageUrl}
                          onChange={(e) => setNewImageUrl(e.target.value)}
                          placeholder="Enter image URL"
                        />
                        <motion.div whileTap={{ scale: 0.95 }}>
                          <Button onClick={handleAddImage}>
                            <Plus className="h-4 w-4 mr-1" />
                            Add
                          </Button>
                        </motion.div>
                      </motion.div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        {heroData.backgroundImages.map((imgUrl, index) => (
                          <motion.div 
                            key={index} 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.3 }}
                            className="relative border rounded-md overflow-hidden group"
                          >
                            <div className="relative h-40 w-full">
                              <Image
                                src={imgUrl}
                                alt={`Alternative background ${index + 1}`}
                                fill
                                className="object-cover"
                                unoptimized
                              />
                            </div>
                            <motion.div 
                              initial={{ opacity: 0 }}
                              whileHover={{ opacity: 1 }}
                              className="absolute inset-0 bg-black/60 flex items-center justify-center gap-2"
                            >
                              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Button 
                                  variant="outline"
                                  size="sm" 
                                  onClick={() => handleMainImageChange(imgUrl)}
                                >
                                  Set as Main
                                </Button>
                              </motion.div>
                              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Button 
                                  variant="ghost"
                                  size="sm" 
                                  className="text-red-500 hover:text-red-700 hover:bg-red-100/20"
                                  onClick={() => handleRemoveImage(index)}
                                >
                                  <Trash className="h-4 w-4" />
                                </Button>
                              </motion.div>
                            </motion.div>
                          </motion.div>
                        ))}
                        
                        {heroData.backgroundImages.length === 0 && (
                          <motion.p 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.4 }}
                            className="text-gray-500 dark:text-gray-400 col-span-2 text-center py-4"
                          >
                            No alternative images added yet
                          </motion.p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="stats" className="space-y-4">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Statistics</CardTitle>
                    <CardDescription>
                      Edit the numeric statistics shown in the hero section
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <motion.div 
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1, duration: 0.4 }}
                        className="space-y-2"
                      >
                        <Label htmlFor="rugs-restored">Rugs Restored</Label>
                        <Input
                          id="rugs-restored"
                          type="number"
                          value={heroData.stats.rugsRestored}
                          onChange={(e) => setHeroData({
                            ...heroData,
                            stats: {
                              ...heroData.stats,
                              rugsRestored: parseInt(e.target.value) || 0
                            }
                          })}
                        />
                      </motion.div>
                      <motion.div 
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.4 }}
                        className="space-y-2"
                      >
                        <Label htmlFor="years-experience">Years Experience</Label>
                        <Input
                          id="years-experience"
                          type="number"
                          value={heroData.stats.yearsExperience}
                          onChange={(e) => setHeroData({
                            ...heroData,
                            stats: {
                              ...heroData.stats,
                              yearsExperience: parseInt(e.target.value) || 0
                            }
                          })}
                        />
                      </motion.div>
                      <motion.div 
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.4 }}
                        className="space-y-2"
                      >
                        <Label htmlFor="satisfaction-rate">Satisfaction Rate (%)</Label>
                        <Input
                          id="satisfaction-rate"
                          type="number"
                          min="0"
                          max="100"
                          value={heroData.stats.satisfactionRate}
                          onChange={(e) => setHeroData({
                            ...heroData,
                            stats: {
                              ...heroData.stats,
                              satisfactionRate: parseInt(e.target.value) || 0
                            }
                          })}
                        />
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="preview" className="space-y-4">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Preview</CardTitle>
                    <CardDescription>
                      Preview how your hero section will look
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <motion.div 
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.6 }}
                      className="relative overflow-hidden rounded-md h-96 bg-gray-900"
                    >
                      {heroData.mainImage && (
                        <>
                          <Image
                            src={heroData.mainImage}
                            alt="Hero Preview"
                            fill
                            className="object-cover"
                            unoptimized
                          />
                          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80" />
                        </>
                      )}
                      
                      <motion.div 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.7 }}
                        className="absolute inset-0 flex flex-col items-center justify-center text-center p-6"
                      >
                        <motion.h1 
                          initial={{ y: -10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.4, duration: 0.5 }}
                          className="text-4xl font-bold text-white mb-4"
                        >
                          {heroData.title}
                        </motion.h1>
                        <motion.p 
                          initial={{ y: -10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.5, duration: 0.5 }}
                          className="text-xl text-gray-100 mb-8"
                        >
                          {heroData.subtitle}
                        </motion.p>
                        
                        <motion.div 
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.6, duration: 0.5 }}
                          className="grid grid-cols-3 gap-8 mt-8"
                        >
                          <motion.div 
                            whileHover={{ scale: 1.05 }}
                            className="text-center"
                          >
                            <div className="text-3xl font-bold text-white">{heroData.stats.rugsRestored}+</div>
                            <div className="text-gray-200 text-sm">Rugs Restored</div>
                          </motion.div>
                          <motion.div 
                            whileHover={{ scale: 1.05 }}
                            className="text-center"
                          >
                            <div className="text-3xl font-bold text-white">{heroData.stats.yearsExperience}+</div>
                            <div className="text-gray-200 text-sm">Years Experience</div>
                          </motion.div>
                          <motion.div 
                            whileHover={{ scale: 1.05 }}
                            className="text-center"
                          >
                            <div className="text-3xl font-bold text-white">{heroData.stats.satisfactionRate}%</div>
                            <div className="text-gray-200 text-sm">Satisfaction Rate</div>
                          </motion.div>
                        </motion.div>
                      </motion.div>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          </Tabs>
        </main>
      </motion.div>
    </motion.div>
  );
} 