"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Star } from "lucide-react";
import { motion } from "motion/react";
import { TextRoll } from "@/components/animations/text-roll";
import { BoxReveal } from "@/components/animations/box-reveal";

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
    <section className="py-20 bg-muted/50 p-4">
      <div className="container">
        <div className="text-center mb-12">
          <BoxReveal>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Clients Say</h2>
          </BoxReveal>
          <TextRoll> 
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Don't just take our word for it. Here's what our satisfied customers have to say about our repair services.
            </p>
          </TextRoll>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="border bg-card">
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="mb-6 text-muted-foreground">{testimonial.content}</p>
                </CardContent>
                <CardFooter className="border-t pt-4">
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}