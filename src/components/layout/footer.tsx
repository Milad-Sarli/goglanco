'use client';

import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "motion/react";
import { Facebook, Instagram, Twitter, Youtube, MapPin, Phone, Mail, Clock } from 'lucide-react';
import { useEffect, useState } from 'react';
import axiosInstance from '../../lib/axios';

// ContactInfo interface (reuse from contact-section)
interface ContactInfo {
  address: string;
  phone: string;
  email: string;
  business_hours_monday_saturday: string;
  business_hours_sunday: string;
}

export function Footer() {
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
  const [isLoadingContactInfo, setIsLoadingContactInfo] = useState(true);
  const [contactInfoError, setContactInfoError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchContactInfo() {
      setIsLoadingContactInfo(true);
      setContactInfoError(null);
      try {
        const response = await axiosInstance.get<ContactInfo>('/api/contact-information');
        setContactInfo(response.data);
      } catch {
        setContactInfoError('Could not load contact information.');
      } finally {
        setIsLoadingContactInfo(false);
      }
    }
    fetchContactInfo();
  }, []);

  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-slate-300 dark:text-slate-400 w-full overflow-x-hidden">
      <div className="container mx-auto px-4 max-w-full">
        {/* Newsletter Section */}
        <div className="py-12 border-b border-slate-800 dark:border-slate-800">
          <div className="max-w-xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-semibold text-white dark:text-white mb-4">
                Subscribe to Our Newsletter
              </h3>
              <p className="mb-6">
                Stay updated with our latest services and rug care tips
              </p>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-slate-800 dark:bg-slate-800 border-slate-700 dark:border-slate-700"
                />
                <Button>Subscribe</Button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h4 className="text-lg font-semibold text-white dark:text-white mb-4">Goglanco</h4>
            <p className="mb-4">
            Weaving Trust, Restoring Elegance
            Expert Rug Restoration Rooted in Craft, Care, and Cultural Heritage Since 1996
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-slate-300 dark:text-slate-400 hover:text-white dark:hover:text-white transition-colors">
                <Facebook size={20} />
              </Link>
              <Link href="#" className="text-slate-300 dark:text-slate-400 hover:text-white dark:hover:text-white transition-colors">
                <Instagram size={20} />
              </Link>
              <Link href="#" className="text-slate-300 dark:text-slate-400 hover:text-white dark:hover:text-white transition-colors">
                <Twitter size={20} />
              </Link>
              <Link href="#" className="text-slate-300 dark:text-slate-400 hover:text-white dark:hover:text-white transition-colors">
                <Youtube size={20} />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white dark:text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {/* <li>
                <Link href="/services" className="hover:text-white dark:hover:text-white transition-colors">
                  Our Services
                </Link>
              </li> */}
              <li>
                <Link href="/portfolio" className="hover:text-white dark:hover:text-white transition-colors">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white dark:hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white dark:hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              {/* <li>
                <Link href="/blog" className="hover:text-white dark:hover:text-white transition-colors">
                  Blog
                </Link>
              </li> */}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold text-white dark:text-white mb-4">Our Services</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/services/repair" className="hover:text-white dark:hover:text-white transition-colors">
                  Rug Repair
                </Link>
              </li>
              <li>
                <Link href="/services/cleaning" className="hover:text-white dark:hover:text-white transition-colors">
                  Deep Cleaning
                </Link>
              </li>
              <li>
                <Link href="/services/restoration" className="hover:text-white dark:hover:text-white transition-colors">
                  Restoration
                </Link>
              </li>
              <li>
                <Link href="/services/color-restoration" className="hover:text-white dark:hover:text-white transition-colors">
                  Color Restoration
                </Link>
              </li>
              <li>
                <Link href="/services/custom" className="hover:text-white dark:hover:text-white transition-colors">
                  Custom Rugs
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-white dark:text-white mb-4">Contact Info</h4>
            <ul className="space-y-4">
              {isLoadingContactInfo && <li>Loading contact information...</li>}
              {contactInfoError && <li className="text-red-400">Error: {contactInfoError}</li>}
              {contactInfo && !isLoadingContactInfo && !contactInfoError && (
                <>
                  <li className="flex gap-3 items-start">
                    <MapPin className="w-5 h-5 text-white mt-1" />
                    <div>
                      <div className="font-semibold text-white dark:text-white">Address</div>
                      <div>{contactInfo.address}</div>
                    </div>
                  </li>
                  <li className="flex gap-3 items-start">
                    <Phone className="w-5 h-5 text-white mt-1" />
                    <div>
                      <div className="font-semibold text-white dark:text-white">Phone</div>
                      <div>{contactInfo.phone}</div>
                    </div>
                  </li>
                  <li className="flex gap-3 items-start">
                    <Mail className="w-5 h-5 text-white mt-1" />
                    <div>
                      <div className="font-semibold text-white dark:text-white">Email</div>
                      <div>{contactInfo.email}</div>
                    </div>
                  </li>
                  <li className="flex gap-3 items-start">
                    <Clock className="w-5 h-5 text-white mt-1" />
                    <div>
                      <div className="font-semibold text-white dark:text-white">Business Hours</div>
                      <div>
                        {contactInfo.business_hours_monday_saturday}<br />
                        {contactInfo.business_hours_sunday}
                      </div>
                    </div>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-slate-800 dark:border-slate-800 text-sm">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              © {new Date().getFullYear()} Goglanco. All rights reserved.
            </div>
            <div className="flex gap-6">
              <Link href="/privacy" className="hover:text-white dark:hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-white dark:hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/sitemap" className="hover:text-white dark:hover:text-white transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}