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
    <section className="py-16 bg-muted/30 p-4"> 
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What Our Clients Say</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Hear from our satisfied clients about their experience with our custom rug services.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-none shadow-md">
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < testimonial.rating
                          ? "text-yellow-500 fill-yellow-500"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <p className="mb-4">{testimonial.content}</p>
              </CardContent>
              <CardFooter className="border-t pt-4 flex flex-col items-start">
                <p className="font-semibold">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}