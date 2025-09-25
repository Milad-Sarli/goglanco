"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Star } from "lucide-react";
import { motion } from "framer-motion";

export function RepairTestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Antique Rug Owner",
      content: "The repair work on my family heirloom Persian rug is absolutely flawless. I can't even tell where the damage was. Truly exceptional craftsmanship!",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Interior Designer",
      content: "I recommend Goglanco to all my clients with valuable rugs. Their repair work is meticulous and they treat each piece with the care it deserves.",
      rating: 5
    }, 
    {
      name: "Emily Rodriguez",
      role: "Homeowner",
      content: "After my dog damaged our living room rug, I thought it was ruined. Goglanco restored it perfectly - you can't even see where the tears were!",
      rating: 5
    }
  ];

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="py-16 bg-muted/30 p-4"
    > 
      <div className="container">
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.h2 
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-4"
          >
            What Our Clients Say
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            Hear from our satisfied clients about their experience with our custom rug services.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              viewport={{ once: true }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <Card className="border-none shadow-md h-full">
                <CardContent className="pt-6">
                  <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.2 + (0.1 * index) }}
                    viewport={{ once: true }}
                    className="flex mb-4"
                  >
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.3 + (0.05 * i) }}
                        viewport={{ once: true }}
                      >
                        <Star
                          className={`h-5 w-5 ${
                            i < testimonial.rating
                              ? "text-yellow-500 fill-yellow-500"
                              : "text-gray-300"
                          }`}
                        />
                      </motion.div>
                    ))}
                  </motion.div>
                  <motion.p 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 + (0.1 * index) }}
                    viewport={{ once: true }}
                    className="mb-4"
                  >
                    {testimonial.content}
                  </motion.p>
                </CardContent>
                <CardFooter className="border-t pt-4 flex flex-col items-start">
                  <motion.p 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.5 + (0.1 * index) }}
                    viewport={{ once: true }}
                    className="font-semibold"
                  >
                    {testimonial.name}
                  </motion.p>
                  <motion.p 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.6 + (0.1 * index) }}
                    viewport={{ once: true }}
                    className="text-sm text-muted-foreground"
                  >
                    {testimonial.role}
                  </motion.p>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}