'use client';

import Image from 'next/image';

export function TestImage() {
  return (
    <div className="relative w-full h-[500px]">
      <Image
        src="https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&w=1920&h=1080"
        alt="Test Image"
        fill
        className="object-cover"
      />
    </div>
  );
} 