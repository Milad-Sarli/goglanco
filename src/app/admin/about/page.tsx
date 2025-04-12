'use client';

import { useEffect, useState } from "react";
import { Sidebar } from "@/components/admin/sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Loader2, Plus, Save, Trash, Upload } from "lucide-react";
import Image from "next/image";
import { Toaster, toast } from "sonner";
import { motion } from "motion/react";
import { aboutService, type AboutPageData } from "@/services/aboutService";

export default function AboutAdmin() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [data, setData] = useState<AboutPageData | null>(null);

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const aboutData = await aboutService.getAboutData();
        setData(aboutData);
      } catch (error) {
        toast.error("Failed to load about page data");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSave = async () => {
    if (!data) return;

    setSaving(true);
    try {
      await aboutService.updateAboutData(data);
      toast.success("Changes saved successfully");
    } catch (error) {
      toast.error("Failed to save changes");
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = async (file: File, section: 'hero' | 'team', teamIndex?: number) => {
    try {
      const result = await aboutService.uploadImage(file, section);
      
      if (!data) return;

      if (section === 'hero') {
        setData({
          ...data,
          hero: {
            ...data.hero,
            image: result.url
          }
        });
      } else if (section === 'team' && typeof teamIndex === 'number') {
        const newTeam = [...data.team];
        newTeam[teamIndex] = {
          ...newTeam[teamIndex],
          image: result.url
        };
        setData({
          ...data,
          team: newTeam
        });
      }

      toast.success("Image uploaded successfully");
    } catch (error) {
      toast.error("Failed to upload image");
      console.error(error);
    }
  };

  if (loading || !data) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Toaster />
      <Sidebar />
      <div className="md:pl-[280px]">
        <main className="container mx-auto p-4 md:p-6 lg:p-8 pt-20 md:pt-8">
          <div className="mb-6 flex justify-between items-center">
            <div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
                About Page Management
              </h1>
              <p className="text-gray-500 dark:text-gray-400">
                Manage your about page content and sections
              </p>
            </div>
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
          </div>

          <Tabs defaultValue="hero">
            <TabsList className="mb-4">
              <TabsTrigger value="hero">Hero</TabsTrigger>
              <TabsTrigger value="story">Story</TabsTrigger>
              <TabsTrigger value="values">Values</TabsTrigger>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
              <TabsTrigger value="team">Team</TabsTrigger>
            </TabsList>

            {/* Hero Section */}
            <TabsContent value="hero">
              <Card>
                <CardHeader>
                  <CardTitle>Hero Section</CardTitle>
                  <CardDescription>Edit your about page hero section content</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="hero-title">Title</Label>
                    <Input
                      id="hero-title"
                      value={data.hero.title}
                      onChange={(e) => setData({
                        ...data,
                        hero: { ...data.hero, title: e.target.value }
                      })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hero-subtitle">Subtitle</Label>
                    <Textarea
                      id="hero-subtitle"
                      value={data.hero.subtitle}
                      onChange={(e) => setData({
                        ...data,
                        hero: { ...data.hero, subtitle: e.target.value }
                      })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Background Image</Label>
                    <div className="flex flex-col gap-4">
                      {data.hero.image && (
                        <div className="relative w-full aspect-video rounded-lg overflow-hidden">
                          <Image
                            src={data.hero.image}
                            alt="Hero background"
                            fill
                            unoptimized
                            className="object-cover"
                          />
                        </div>
                      )}
                      <div className="flex items-center gap-4">
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              handleImageUpload(file, 'hero');
                            }
                          }}
                          className="hidden"
                          id="hero-image-upload"
                        />
                        <Button
                          asChild
                          variant="secondary"
                        >
                          <label htmlFor="hero-image-upload" className="cursor-pointer">
                            <Upload className="h-4 w-4 mr-2" />
                            Upload Image
                          </label>
                        </Button>
                        <Input
                          placeholder="Or enter image URL"
                          value={data.hero.image}
                          onChange={(e) => setData({
                            ...data,
                            hero: { ...data.hero, image: e.target.value }
                          })}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Story Section */}
            <TabsContent value="story">
              <Card>
                <CardHeader>
                  <CardTitle>Story Section</CardTitle>
                  <CardDescription>Edit your company story timeline</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {data.story.items.map((item, index) => (
                      <div key={index} className="p-4 border rounded-lg space-y-4">
                        <div className="flex justify-between items-center">
                          <h3 className="font-semibold">Story Item {index + 1}</h3>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => {
                              const newItems = [...data.story.items];
                              newItems.splice(index, 1);
                              setData({
                                ...data,
                                story: { ...data.story, items: newItems }
                              });
                            }}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Title</Label>
                            <Input
                              value={item.title}
                              onChange={(e) => {
                                const newItems = [...data.story.items];
                                newItems[index] = { ...item, title: e.target.value };
                                setData({
                                  ...data,
                                  story: { ...data.story, items: newItems }
                                });
                              }}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Year</Label>
                            <Input
                              value={item.year}
                              onChange={(e) => {
                                const newItems = [...data.story.items];
                                newItems[index] = { ...item, year: e.target.value };
                                setData({
                                  ...data,
                                  story: { ...data.story, items: newItems }
                                });
                              }}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label>Content</Label>
                          <Textarea
                            value={item.content}
                            onChange={(e) => {
                              const newItems = [...data.story.items];
                              newItems[index] = { ...item, content: e.target.value };
                              setData({
                                ...data,
                                story: { ...data.story, items: newItems }
                              });
                            }}
                          />
                        </div>
                      </div>
                    ))}
                    <Button
                      onClick={() => {
                        setData({
                          ...data,
                          story: {
                            ...data.story,
                            items: [
                              ...data.story.items,
                              { title: "", year: "", content: "" }
                            ]
                          }
                        });
                      }}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Story Item
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Values Section */}
            <TabsContent value="values">
              <Card>
                <CardHeader>
                  <CardTitle>Values Section</CardTitle>
                  <CardDescription>Edit your company values</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {data.values.map((value, index) => (
                      <div key={index} className="p-4 border rounded-lg space-y-4">
                        <div className="flex justify-between items-center">
                          <h3 className="font-semibold">Value {index + 1}</h3>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => {
                              const newValues = [...data.values];
                              newValues.splice(index, 1);
                              setData({ ...data, values: newValues });
                            }}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Title</Label>
                            <Input
                              value={value.title}
                              onChange={(e) => {
                                const newValues = [...data.values];
                                newValues[index] = { ...value, title: e.target.value };
                                setData({ ...data, values: newValues });
                              }}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Icon</Label>
                            <Input
                              value={value.icon}
                              onChange={(e) => {
                                const newValues = [...data.values];
                                newValues[index] = { ...value, icon: e.target.value };
                                setData({ ...data, values: newValues });
                              }}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label>Description</Label>
                          <Textarea
                            value={value.description}
                            onChange={(e) => {
                              const newValues = [...data.values];
                              newValues[index] = { ...value, description: e.target.value };
                              setData({ ...data, values: newValues });
                            }}
                          />
                        </div>
                      </div>
                    ))}
                    <Button
                      onClick={() => {
                        setData({
                          ...data,
                          values: [
                            ...data.values,
                            { title: "", description: "", icon: "" }
                          ]
                        });
                      }}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Value
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Timeline Section */}
            <TabsContent value="timeline">
              <Card>
                <CardHeader>
                  <CardTitle>Timeline Section</CardTitle>
                  <CardDescription>Edit your company timeline</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {data.timeline.map((item, index) => (
                      <div key={index} className="p-4 border rounded-lg space-y-4">
                        <div className="flex justify-between items-center">
                          <h3 className="font-semibold">Timeline Event {index + 1}</h3>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => {
                              const newTimeline = [...data.timeline];
                              newTimeline.splice(index, 1);
                              setData({ ...data, timeline: newTimeline });
                            }}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Year</Label>
                            <Input
                              value={item.year}
                              onChange={(e) => {
                                const newTimeline = [...data.timeline];
                                newTimeline[index] = { ...item, year: e.target.value };
                                setData({ ...data, timeline: newTimeline });
                              }}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Title</Label>
                            <Input
                              value={item.title}
                              onChange={(e) => {
                                const newTimeline = [...data.timeline];
                                newTimeline[index] = { ...item, title: e.target.value };
                                setData({ ...data, timeline: newTimeline });
                              }}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label>Description</Label>
                          <Textarea
                            value={item.description}
                            onChange={(e) => {
                              const newTimeline = [...data.timeline];
                              newTimeline[index] = { ...item, description: e.target.value };
                              setData({ ...data, timeline: newTimeline });
                            }}
                          />
                        </div>
                      </div>
                    ))}
                    <Button
                      onClick={() => {
                        setData({
                          ...data,
                          timeline: [
                            ...data.timeline,
                            { year: "", title: "", description: "" }
                          ]
                        });
                      }}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Timeline Event
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Team Section */}
            <TabsContent value="team">
              <Card>
                <CardHeader>
                  <CardTitle>Team Section</CardTitle>
                  <CardDescription>Edit your team members</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {data.team.map((member, index) => (
                      <div key={index} className="p-4 border rounded-lg space-y-4">
                        <div className="flex justify-between items-center">
                          <h3 className="font-semibold">Team Member {index + 1}</h3>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => {
                              const newTeam = [...data.team];
                              newTeam.splice(index, 1);
                              setData({ ...data, team: newTeam });
                            }}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Name</Label>
                            <Input
                              value={member.name}
                              onChange={(e) => {
                                const newTeam = [...data.team];
                                newTeam[index] = { ...member, name: e.target.value };
                                setData({ ...data, team: newTeam });
                              }}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Role</Label>
                            <Input
                              value={member.role}
                              onChange={(e) => {
                                const newTeam = [...data.team];
                                newTeam[index] = { ...member, role: e.target.value };
                                setData({ ...data, team: newTeam });
                              }}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label>Bio</Label>
                          <Textarea
                            value={member.bio}
                            onChange={(e) => {
                              const newTeam = [...data.team];
                              newTeam[index] = { ...member, bio: e.target.value };
                              setData({ ...data, team: newTeam });
                            }}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Profile Image</Label>
                          <div className="flex flex-col gap-4">
                            {member.image && (
                              <div className="relative w-32 h-32 rounded-lg overflow-hidden">
                                <Image
                                  src={member.image}
                                  alt={member.name}
                                  fill
                                  unoptimized
                                  className="object-cover"
                                />
                              </div>
                            )}
                            <div className="flex items-center gap-4">
                              <Input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    handleImageUpload(file, 'team', index);
                                  }
                                }}
                                className="hidden"
                                id={`team-image-upload-${index}`}
                              />
                              <Button
                                asChild
                                variant="secondary"
                              >
                                <label htmlFor={`team-image-upload-${index}`} className="cursor-pointer">
                                  <Upload className="h-4 w-4 mr-2" />
                                  Upload Image
                                </label>
                              </Button>
                              <Input
                                placeholder="Or enter image URL"
                                value={member.image}
                                onChange={(e) => {
                                  const newTeam = [...data.team];
                                  newTeam[index] = { ...member, image: e.target.value };
                                  setData({ ...data, team: newTeam });
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    <Button
                      onClick={() => {
                        setData({
                          ...data,
                          team: [
                            ...data.team,
                            { name: "", role: "", bio: "", image: "" }
                          ]
                        });
                      }}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Team Member
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
} 