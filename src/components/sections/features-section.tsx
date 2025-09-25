'use client';

import { motion } from "motion/react";
import { Tilt } from "@/components/motion-primitives/tilt";
import Image from "next/image";

const features = [
  {
    icon: "✓",
    title: "Expert Craftsmen",
    description: "Our team consists of highly skilled artisans with decades of experience in rug repair and restoration.",
    image: "/features/young-man-holding-camera-while-standing-against-wall_1048944-16315124.jpg"
  },
  {
    icon: "★",
    title: "Premium Quality",
    description: "We use only the finest materials and traditional techniques combined with modern technology for lasting results.",
    image: "/features/premium-quality-golden-stamp-seal-vector-template_917138-5121.jpg"
  },
  {
    icon: "⚡",
    title: "Quick Turnaround",
    description: "Fast and efficient service without compromising on quality. Most repairs completed within 7-10 days.",
    image: "/features/happy-male-carrying-carpet-new-home_329181-12615.jpg"
  },
  {
    icon: "💯",
    title: "Satisfaction Guaranteed",
    description: "We're not happy until you're completely satisfied with our work. 100% satisfaction guarantee on all services.",
    image: "/features/standard-quality-control-collage_23-2149631009.jpg"
  },
  {
    icon: "🧵",
    title: "Custom Stitching & Color Matching",
    description: "We expertly match original colors and patterns, ensuring seamless repairs that preserve your rug's unique character.",
    image: "/features/476f1896-9593-4a4a-8b68-7b5e6b55e8fb.jpg"
  },
  {
    icon: "🌿",
    title: "Eco-Friendly Methods",  
    description: "We use environmentally friendly cleaning products and sustainable restoration methods.",
    image: "/features/e1510230-60ed-47d2-9c8a-f420e6261080.jpg"
  }
];

export function FeaturesSection() {
  return (
    <section className="py-20 bg-background dark:bg-slate-900 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-4 text-foreground dark:text-white"
          >
            Why Choose Goglanco
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-muted-foreground dark:text-slate-300 text-lg"
          >
Experience world-class rug care with a perfect blend of traditional artistry, global sourcing, and modern restoration techniques.          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Tilt key={index}>
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50, y: 20 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  scale: 1.03,
                  transition: { duration: 0.2 }
                }}
                className="bg-card dark:bg-slate-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-48 group">
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
                  <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: index * 0.2 }}
                    className="absolute bottom-4 left-4 right-4 text-white"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <motion.span 
                        animate={{ 
                          rotate: [0, 10, -10, 0],
                          scale: [1, 1.2, 1]
                        }}
                        transition={{
                          duration: 1,
                          delay: index * 0.1,
                          repeat: Infinity,
                          repeatDelay: 5
                        }}
                        className="text-2xl"
                      >
                        {feature.icon}
                      </motion.span>
                      <h3 className="text-xl font-semibold">{feature.title}</h3>
                    </div>
                  </motion.div>
                </div>
                <motion.div 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="p-6"
                >
                  <p className="text-muted-foreground dark:text-slate-300">{feature.description}</p>
                </motion.div>
              </motion.div>
            </Tilt>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, type: "spring" }}
          className="mt-16 text-center"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "5000+", label: "Rugs Restored" },
              { value: "30+", label: "Years Experience" },
              { value: "100%", label: "Satisfaction Rate" },
              { value: "5+", label: "Expert Artisans" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0.5, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ 
                  duration: 0.5,
                  delay: index * 0.1,
                  type: "spring",
                  bounce: 0.4
                }}
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
                className="p-6 rounded-lg bg-card/50 dark:bg-slate-800/50 hover:bg-card hover:dark:bg-slate-800 transition-colors duration-300"
              >
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="text-4xl font-bold text-foreground dark:text-white mb-2"
                >
                  {stat.value}
                </motion.div>
                <div className="text-foreground dark:text-white">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}