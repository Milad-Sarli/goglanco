'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FaBolt, FaWater, FaTools, FaPalette, FaPencilRuler } from 'react-icons/fa';
import { Card, CardContent } from '@/components/ui/card';
import { Spotlight } from '@/components/motion-primitives/spotlight';

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

const services = [
  {
    title: 'Repair and Restoration',
    icon: <FaBolt className="text-amber-500" />,
    description: 'We specialize in expert rug repair, dye work, stretching, and full redesign — restoring both beauty and structure with care and tradition.',
    image: '/public/photo_rug_reweaving.jpg',
    link: '/services/repair'
  },
  {
    title: 'Cleaning',
    icon: <FaWater className="text-blue-500" />,
    description: 'Our deep cleaning process includes gentle hand washing, mothproofing, and optional Scotchgard protection to preserve and refresh your rugs.',
    image: '/public/rug-repair-cost.jpg',
    link: '/services/cleaning'
  },
  {
    title: 'Restoration',
    icon: <FaPalette className="text-yellow-500" />,
    description: 'Our expert restoration services revive damaged and worn rugs, carefully repairing tears, fraying, and structural issues while preserving the original craftsmanship and design integrity.',
    image: '/public/portfolio.jpg',
    link: '/services/restoration' 
  },
  {
    title: 'Color Restoration',
    icon: <FaPalette className="text-purple-500" />,
    description: 'Our color restoration services bring faded rugs back to life, carefully matching original colors and patterns with expert precision.',
    image: '/public/features/e1510230-60ed-47d2-9c8a-f420e6261080.jpg',
    link: '/services/color-restoration'
  },
  {
    title: 'Custom Rugs',
    icon: <FaPencilRuler className="text-green-500" />,
    description: 'Design your perfect rug with our custom rug creation service. From concept to completion, we bring your vision to life.',
    image: '/public/features/476f1896-9593-4a4a-8b68-7b5e6b55e8fb.jpg',
    link: '/services/custom'
  }
];

export function ServicesPageView() {
  return (
    <main className="min-h-screen">
      <section className="py-20 bg-background dark:bg-slate-900">
        <div className="container mx-auto px-4 relative">
          <Spotlight className="z-0" />
          <div className="relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl font-bold mb-4 text-foreground dark:text-white"
              >
                Expert Rug Care Services
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-muted-foreground dark:text-slate-300 text-lg"
              >
                We specialize in professional rug cleaning, restoration, and maintenance services,
                ensuring your valuable rugs receive the highest quality care and attention they deserve.
              </motion.p>
            </div>

            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  variants={item}
                  whileHover={{ y: -10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link href={service.link} className="block h-full">
                    <Card className="group h-full hover:shadow-xl transition-all duration-300 overflow-hidden bg-card dark:bg-slate-800 border border-border dark:border-slate-700">
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={service.image.replace('/public', '')}
                          alt={service.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                      <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-2xl">{service.icon}</span>
                          <h3 className="text-xl font-semibold text-foreground dark:text-white">{service.title}</h3>
                        </div>
                        <p className="text-muted-foreground dark:text-slate-300">{service.description}</p>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}