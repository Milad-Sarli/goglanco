"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Star } from "lucide-react";

export function CustomTestimonialsSection() {
  const testimonials = [
    {
      content: "The custom rug they created for our living room is absolutely perfect. The team understood exactly what we wanted and delivered beyond our expectations.",
      author: "Sarah Johnson",
      role: "Homeowner",
      rating: 5,
    },
    {
      content: "I needed a unique rug for my office with specific dimensions and colors. Their custom service was exceptional from start to finish.",
      author: "Michael Chen",
      role: "Business Owner",
      rating: 5,
    },
    {
      content: "The attention to detail in our custom rug is remarkable. The design team worked closely with us to create something truly special.",
      author: "Emily Rodriguez",
      role: "Interior Designer",
      rating: 5,
    },
  ];

  return (
    <section className="py-16 bg-muted/30">
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
                <p className="font-semibold">{testimonial.author}</p>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}