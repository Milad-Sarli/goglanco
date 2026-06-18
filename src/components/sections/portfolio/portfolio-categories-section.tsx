"use client";

import { useState, useRef, useEffect, useLayoutEffect } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
// Imports for gallery items
import { ImageComparison, ImageComparisonImage, ImageComparisonSlider } from "@/components/motion-primitives/image-comparison";
import { Badge } from "@/components/ui/badge";
import axios from "@/lib/axios";

gsap.registerPlugin(ScrollTrigger);

// Define an interface for the raw API gallery item data (used when parsing API response)
interface RawPortfolioGalleryItem {
  id: number | string;
  title: string;
  before_image: string;
  after_image: string;
  // category_id or category might still be present on raw items, but not strictly needed for PortfolioGalleryItem
  category_id?: number | string;
  category?: string;
}

// Define an interface for the raw API category data items, now including gallery_items
interface RawApiCategory {
  id: number;
  name: string;
  description?: string;
  gallery_items: RawPortfolioGalleryItem[]; // Nested gallery items
}

// Define an interface for the overall API response structure for categories
interface ApiCategoryResponse {
  data: RawApiCategory[];
  status?: number;
}

// Define an interface for Processed Category data (after transformation)
interface Category {
  id: string;
  label: string;
  // Store processed gallery items directly with the category
  galleryItems: PortfolioGalleryItem[]; 
}

// Define an interface for Processed Gallery Item data (after transformation)
interface PortfolioGalleryItem {
  id: number | string;
  title: string;
  category: string; // This will be the parent category's ID
  before_image: string;
  after_image: string;
}

// Default categories as a fallback
const defaultCategories: Category[] = [
  { id: "3", label: "Full restoration", galleryItems: [] },
  { id: "1", label: "Re Weaving Holes", galleryItems: [] },
  { id: "2", label: "Patching", galleryItems: [] },
  { id: "4", label: "Dye Work", galleryItems: [] },
  { id: "5", label: "Binding And Adding Tassels", galleryItems: [] },
  { id: "6", label: "Sewing A Pocket For Hanging", galleryItems: [] },
];

// Define props for the section, including onCategoryChange callback
interface PortfolioCategoriesSectionProps {
  onCategoryChange: (categoryId: string) => void;
}

export function PortfolioCategoriesSection({ 
  onCategoryChange
}: PortfolioCategoriesSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null); // null means 'all'
  // categories state now holds Category[] which includes processed galleryItems
  const [categories, setCategories] = useState<Category[]>(defaultCategories);
  const [error, setError] = useState<string | null>(null); // For category fetch error

  // filteredItems will be derived from the active category's galleryItems
  const [filteredItems, setFilteredItems] = useState<PortfolioGalleryItem[]>([]);
  const [scrollPositionToRestore, setScrollPositionToRestore] = useState<{x: number, y: number} | null>(null); // State for scroll restoration

  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  // Function to handle category change and store scroll position
  const handleCategorySwitch = (newCategoryId: string) => {
    setScrollPositionToRestore({ x: window.scrollX, y: window.scrollY });
    setActiveCategory(newCategoryId);
  };

  useEffect(() => {
    async function fetchCategoriesAndItems() {
      try {
        const response = await axios.get('/api/portfolio/categories');
        const responseJson: ApiCategoryResponse = response.data;
        const rawDataArray: RawApiCategory[] = responseJson.data;

        const transformedCategories: Category[] = rawDataArray.map(rawCat => {
          // Transform raw gallery items for this category
          const processedGalleryItems: PortfolioGalleryItem[] = rawCat.gallery_items.map(rawItem => ({
            id: rawItem.id,
            title: rawItem.title,
            before_image: rawItem.before_image,
            after_image: rawItem.after_image,
            category: String(rawCat.id), // Assign parent category ID
          }));
          
          return {
            id: String(rawCat.id),
            label: rawCat.name,
            galleryItems: processedGalleryItems,
          };
        });

        setCategories(transformedCategories);
        setError(null); // Clear previous errors
      } catch (e: unknown) {
        console.error("Failed to fetch categories and items:", e);
        if (e instanceof Error) {
            setError(e.message);
        } else {
            setError("An unknown error occurred while fetching data.");
        }
        setCategories(defaultCategories); // Fallback to default
      }
    }

    fetchCategoriesAndItems();
  }, []);

  // Effect to update filteredItems when activeCategory or categories change
  useEffect(() => {
    if (activeCategory === null) {
      // Show all items from all categories
      const allItems = categories.flatMap(cat => cat.galleryItems);
      setFilteredItems(allItems);
    } else {
      const currentCategory = categories.find(cat => cat.id === activeCategory);
      if (currentCategory) {
        setFilteredItems(currentCategory.galleryItems);
      } else {
        setFilteredItems([]); // No category found or category has no items
      }
    }
  }, [activeCategory, categories]);

  // UseLayoutEffect to restore scroll position after DOM updates
  useLayoutEffect(() => {
    if (scrollPositionToRestore) {
      window.scrollTo(scrollPositionToRestore.x, scrollPositionToRestore.y);
      setScrollPositionToRestore(null); // Reset after restoring
    }
    // Depends on filteredItems to ensure it runs after gallery content might have changed layout
  }, [scrollPositionToRestore, filteredItems]);

  // Call onCategoryChange when activeCategory changes
  useEffect(() => {
    if (activeCategory !== null) {
      onCategoryChange(activeCategory);
    }
  }, [activeCategory, onCategoryChange]);

  // GSAP Animations for heading and tabs (existing logic)
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, scrollTrigger: {
            trigger: headingRef.current, start: "top 80%", end: "top 50%", toggleActions: "play none none reverse",
        }}
      );
      gsap.fromTo(
        tabsRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: 0.2, scrollTrigger: {
            trigger: tabsRef.current, start: "top 80%", end: "top 50%", toggleActions: "play none none reverse",
        }}
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);
  
  // GSAP animation for gallery items
  useEffect(() => {
    if (!galleryRef.current) return; // Guard clause

    const ctx = gsap.context(() => {
      const galleryElements = galleryRef.current?.querySelectorAll(".gallery-item-motion");
      if (galleryElements && galleryElements.length > 0) {
        gsap.fromTo(
          galleryElements,
          { y: 100, opacity: 0, scale: 0.9 },
          {
            y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.2, ease: "power3.out",
            scrollTrigger: {
              trigger: galleryRef.current, start: "top 80%", end: "bottom 60%", toggleActions: "play none none reverse",
            },
          }
        );
      } else {
        // If no items, ensure any previous animations are cleared (though GSAP's revert should handle this on unmount)
        // Alternatively, clear specific tweens if needed: gsap.killTweensOf(galleryElements);
      }
    }, sectionRef); 

    return () => ctx.revert();
  }, [filteredItems]); // Rerun animation when filteredItems change (and thus new elements might be rendered)

  return (
    <section 
      ref={sectionRef} 
      className="py-20 bg-background"
    >
      <div className="container mx-auto px-4">
        <h2 
          ref={headingRef}
          className="text-3xl md:text-4xl font-bold text-center mb-6"
        >
          Explore Our <span className="text-primary">Portfolio</span>
        </h2>
        
        <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto mb-12">
          Browse our collection of restoration projects by category. Each project represents our commitment to excellence in rug restoration.
        </p>
        {error && <p className="text-red-500 text-center mb-4">Error loading data: {error}. Displaying default categories.</p>}
        <div 
          ref={tabsRef}
          className="max-w-4xl mx-auto"
        >
          <Tabs 
            value={activeCategory ?? undefined} // undefined means no tab is selected
            className="w-full"
            onValueChange={handleCategorySwitch}
          >
            <TabsList className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 mb-8">
              {categories.map((category) => (
                <TabsTrigger 
                  key={category.id} 
                  value={category.id}
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground h-auto min-h-[2.5rem] whitespace-normal py-2"
                >
                  {category.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Gallery Section - error message for gallery items is now part of the general 'error' state */}
        <div 
          ref={galleryRef}
          className="mt-24 sm:mt-12 grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto"
        >
          {filteredItems.length === 0 && !error && ( // Show 'no projects' only if no general error
            <p className="col-span-full text-center text-lg text-muted-foreground py-8">
              No projects found for this category.
            </p>
          )}
          {filteredItems.map((item) => (
              <motion.div
                key={item.id} // Ensure unique key, item.id should be unique
                className="gallery-item-motion bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }} 
                transition={{ 
                  duration: 0.5, 
                  // delay: index * 0.1, // GSAP handles stagger, this could conflict or be redundant
                  type: "spring",
                  stiffness: 100
                }}
              >
                <div className="relative h-[300px] md:h-[400px]">
                  {/* Overlay labels for Before and After */}
                  <span className="absolute top-3 right-3 z-10 bg-black/60 text-white text-xs px-2 py-1 rounded pointer-events-none select-none">Before</span>
                  <span className="absolute top-3 left-3 z-10 bg-primary text-primary-foreground text-xs px-2 py-1 rounded pointer-events-none select-none">After</span>
                  <ImageComparison className="h-full" enableHover>
                    <ImageComparisonImage 
                      src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${item.before_image}`} 
                      alt={`Before: ${item.title}`} 
                      position="left" 
                    />
                    <ImageComparisonImage 
                      src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${item.after_image}`} 
                      alt={`After: ${item.title}`} 
                      position="right" 
                    />
                    <ImageComparisonSlider className="bg-white">
                      <div className="absolute inset-y-0 -left-3 -right-3 flex items-center justify-center">
                        <div className="w-6 h-6 rounded-full bg-white shadow-md flex items-center justify-center">
                          <div className="w-3 h-3 rounded-full bg-primary"></div>
                        </div>
                      </div>
                    </ImageComparisonSlider>
                  </ImageComparison>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-semibold">{item.title}</h3>
                    <Badge variant="outline" className="text-xs">
                      {/* Find category label from main categories state using item.category (which is parent cat ID) */}
                      {categories.find(cat => cat.id === item.category)?.label || item.category}
                    </Badge> 
                  </div>
                </div>
              </motion.div>
          ))}
        </div>
      </div> 
    </section>
  );
}