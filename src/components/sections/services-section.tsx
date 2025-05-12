'use client';

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Spotlight } from "@/components/motion-primitives/spotlight";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import servicesService, { ServiceItem } from "@/services/servicesService";
import { Skeleton } from "@/components/ui/skeleton";

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
  const [loading, setLoading] = useState(true);
  const [services, setServices] = useState<ServiceItem[]>([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await servicesService.getServices();
        setServices(data);
      } catch (error) {
        console.error('Failed to load services:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-gray-50 overflow-hidden">
        <div className="container mx-auto px-4 relative">
          <Spotlight className="z-0" />
          <div className="relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <Skeleton className="h-10 w-64 mx-auto mb-4" />
              <Skeleton className="h-6 w-96 mx-auto" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[...Array(9)].map((_, index) => (
                <Card key={index} className="w-full">
                  <Skeleton className="h-48 w-full" />
                  <CardHeader className="flex flex-row items-center gap-2 pt-6">
                    <Skeleton className="h-8 w-8" />
                    <Skeleton className="h-6 w-32" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-3/4" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

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
              Expert Rug Care Services
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-gray-600 text-lg"
            >
              We specialize in professional rug cleaning, restoration, and maintenance services, ensuring your valuable rugs receive the highest quality care and attention they deserve.
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
                      src={`${service.image}`}
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