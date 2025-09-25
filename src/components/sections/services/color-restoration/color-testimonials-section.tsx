"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Star } from "lucide-react";
import { motion } from "motion/react";
import { TextRoll } from "@/components/animations/text-roll";
import { BoxReveal } from "@/components/animations/box-reveal";

export function ColorTestimonialsSection() {
  const testimonials = [
    {
      content: "The color restoration service brought my antique rug back to life. The colors are vibrant again without losing the rug's character.",
      author: "David Wilson",
      role: "Homeowner",
      rating: 5,
    },
    {
      content: "I was amazed at how they matched the original colors of my faded Persian rug. Excellent service and attention to detail.",
      author: "Lisa Thompson",
      role: "Interior Designer",
      rating: 5,
    },
    {
      content: "My family heirloom rug looks beautiful again. The colors are rich and vibrant just like when it was new.",
      author: "Robert Garcia",
      role: "Collector",
      rating: 5,
    },
  ];

  return (
    <section className="py-16 bg-muted/30 p-4">
      <div className="container">
        <div className="text-center mb-12">
          <BoxReveal>
            <h2 className="text-3xl font-bold mb-4">
              <TextRoll>What Our Clients Say</TextRoll>
            </h2>
          </BoxReveal>
          <TextRoll delay={0.3}>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Hear from our satisfied clients about their experience with our color restoration services.
            </p>
          </TextRoll>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <Card className="border-none shadow-md">
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
            </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  }