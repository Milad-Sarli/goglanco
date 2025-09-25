"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Star } from "lucide-react";

export function CleaningTestimonialsSection() {
  const testimonials = [
    {
      name: "David Wilson",
      role: "Homeowner",
      content: "I was amazed at how much brighter and fresher my living room rug looked after Goglanco's deep cleaning. The colors are vibrant again!",
      rating: 5
    },
    {
      name: "Jennifer Lee",
      role: "Business Owner",
      content: "We use Goglanco for all our office rugs. Their cleaning process removes all stains and leaves our space looking professional and fresh.",
      rating: 5
    },
    {
      name: "Robert Taylor",
      role: "Collector",
      content: "As someone with valuable antique rugs, I trust only Goglanco. Their gentle yet effective cleaning process preserves the integrity of my collection.",
      rating: 5
    }
  ];

  return (
    <section className="py-20 bg-muted/50 p-4">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Customer Experiences</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Hear from our satisfied customers about their experience with our deep cleaning services.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border bg-card">
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
          ))}
        </div>
      </div>
    </section>
  );
}