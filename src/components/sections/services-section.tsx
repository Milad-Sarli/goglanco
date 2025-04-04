'use client';

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Spotlight } from "@/components/motion-primitives/spotlight";
import { motion } from "framer-motion";
import Image from "next/image";

const services = [
  {
    title: "Rug Repair",
    description: "Professional repair services for tears, holes, and worn areas in all types of rugs.",
    icon: "🛠️",
    image: "https://images.unsplash.com/photo-1600166898405-da9535204843?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Deep Cleaning",
    description: "Thorough cleaning that removes dirt, stains, and preserves your rug's natural colors.",
    icon: "🧹",
    image: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Restoration",
    description: "Complete restoration services to bring your antique and valuable rugs back to life.",
    icon: "✨",
    image: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Fringe Repair",
    description: "Expert repair and replacement of damaged or worn rug fringes.",
    icon: "🧶",
    image: "https://images.unsplash.com/photo-1600166898405-da9535204843?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Color Restoration",
    description: "Professional color correction and restoration for faded or discolored rugs.",
    icon: "🎨",
    image: "https://images.unsplash.com/photo-1600166898405-da9535204843?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Maintenance",
    description: "Regular maintenance programs to extend the life of your valuable rugs.",
    icon: "⚡",
    image: "https://images.unsplash.com/photo-1614849963640-9cc74b2a826f?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Moth Damage Repair",
    description: "Specialized repair services for rugs damaged by moths and insects.",
    icon: "🦋",
    image: "https://images.unsplash.com/photo-1600166898405-da9535204843?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Water Damage Recovery",
    description: "Emergency services for rugs affected by water damage and flooding.",
    icon: "💧",
    image: "https://images.unsplash.com/photo-1600166898405-da9535204843?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Custom Rugs",
    description: "Custom rug creation and modification services to match your specific needs.",
    icon: "✂️",
    image: "https://images.unsplash.com/photo-1600166898405-da9535204843?q=80&w=800&auto=format&fit=crop"
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export function ServicesSection() {
  return (
    <section className="py-20 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4 relative">
        <Spotlight className="z-0" />
        <div className="relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-bold mb-4"
            >
              Our Comprehensive Services
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-gray-600 text-lg"
            >
              From minor repairs to complete restoration, we offer a full range of professional rug care services
            </motion.p>
          </div>

          <motion.div 
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={item}
                className="w-full"
              >
                <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      unoptimized
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <CardHeader className="flex flex-row items-center gap-2 pt-6">
                    <span className="text-2xl">{service.icon}</span>
                    <h3 className="text-xl font-semibold">{service.title}</h3>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{service.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
} 