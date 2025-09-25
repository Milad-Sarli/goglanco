"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Star } from "lucide-react";

export function RestorationTestimonialsSection() {
  const testimonials = [
    {
      content: "They restored my damaged family heirloom rug beautifully. The repair work is virtually invisible and the rug looks amazing.",
      author: "James Anderson",
      role: "Homeowner",
      rating: 5,
    },
    {
      content: "The restoration team saved my antique rug that had significant damage. Their craftsmanship is exceptional.",
      author: "Maria Lopez",
      role: "Collector",
      rating: 5,
    },
    {
      content: "I was impressed with how they handled the restoration of my client's valuable rug. The results exceeded our expectations.",
      author: "Thomas Wright",
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
            Hear from our satisfied clients about their experience with our restoration services.
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