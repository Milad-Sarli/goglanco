import axios from "@/lib/axios";
import { useState } from "react";
import { motion } from "framer-motion";

interface HeroData {
  title: string;
  subtitle: string;
  description: string;
}

interface PortfolioAdminHeroProps {
  data: HeroData;
}

const formVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 }
};

export function PortfolioAdminHero({ data }: PortfolioAdminHeroProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const updatedData = {
      title: formData.get("title"),
      subtitle: formData.get("subtitle"),
      description: formData.get("description"),
    };

    try {
      await axios.put("/api/portfolio/hero", updatedData);
      // Handle success (e.g., show toast notification)
    } catch (err) {
      console.error("Error updating hero section:", err);
      setError("Failed to update hero section. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow"
    >
      <motion.h2 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-2xl font-bold mb-4"
      >
        Hero Section
      </motion.h2>
      
      {error && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-4 p-3 bg-red-100 text-red-700 rounded"
        >
          {error}
        </motion.div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <motion.div
          variants={formVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <label htmlFor="title" className="block text-sm font-medium mb-1">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            defaultValue={data.title}
            className="w-full p-2 border rounded"
          />
        </motion.div>
        
        <motion.div
          variants={formVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <label htmlFor="subtitle" className="block text-sm font-medium mb-1">
            Subtitle
          </label>
          <input
            type="text"
            id="subtitle"
            name="subtitle"
            defaultValue={data.subtitle}
            className="w-full p-2 border rounded"
          />
        </motion.div>
        
        <motion.div
          variants={formVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.3, delay: 0.5 }}
        >
          <label htmlFor="description" className="block text-sm font-medium mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            defaultValue={data.description}
            rows={3}
            className="w-full p-2 border rounded"
          />
        </motion.div>
        
        <motion.button
          type="submit"
          disabled={isSubmitting}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.3, delay: 0.6 }}
          className={`bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isSubmitting ? "Saving..." : "Save Changes"}
        </motion.button>
      </form>
    </motion.section>
  );
} 