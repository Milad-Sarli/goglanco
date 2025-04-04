'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "motion/react";
import { StarIcon } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Interior Designer",
    image: "/testimonials/sarah.jpg",
    content: "The restoration work on my client's antique Persian rug was absolutely phenomenal. The attention to detail and craftsmanship exceeded all expectations.",
    rating: 5
  },
  {
    name: "Michael Chen",
    role: "Art Collector",
    image: "/testimonials/michael.jpg",
    content: "I've trusted Goglanco with several valuable rugs from my collection. Their expertise in color restoration is unmatched. Highly recommended!",
    rating: 5
  },
  {
    name: "Emily Rodriguez",
    role: "Homeowner",
    image: "/testimonials/emily.jpg",
    content: "After water damage to our family heirloom rug, I thought all hope was lost. Goglanco's team worked magic and restored it perfectly.",
    rating: 5
  },
  {
    name: "David Thompson",
    role: "Gallery Owner",
    image: "/testimonials/david.jpg",
    content: "The level of expertise and professionalism is outstanding. They've become our go-to specialists for all our gallery's rug restoration needs.",
    rating: 5
  },
  {
    name: "Lisa Anderson",
    role: "Antique Dealer",
    image: "/testimonials/lisa.jpg",
    content: "Their moth damage repair service saved several valuable pieces in my collection. The repairs are virtually invisible - truly remarkable work.",
    rating: 5
  }
];

export function TestimonialsSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-4"
          >
            What Our Clients Say
          </motion.h2>
          <p className="text-gray-600 text-lg">
            Don't just take our word for it - hear from our satisfied customers
          </p>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-5xl mx-auto"
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-1"
                >
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <Avatar>
                          <AvatarImage src={testimonial.image} alt={testimonial.name} />
                          <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-semibold">{testimonial.name}</div>
                          <div className="text-sm text-gray-500">{testimonial.role}</div>
                        </div>
                      </div>
                      <div className="flex gap-0.5 mb-4">
                        {Array.from({ length: testimonial.rating }).map((_, i) => (
                          <StarIcon key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <p className="text-gray-600">{testimonial.content}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
} 