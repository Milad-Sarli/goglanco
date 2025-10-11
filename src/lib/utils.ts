import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Constructs proper avatar URL based on the avatar display guide
 * @param avatar - Avatar path from API (can be relative or absolute)
 * @returns Complete avatar URL or default avatar path
 */
export const getAvatarUrl = (avatar?: string | null): string => {
  // If no avatar provided, return default
  if (!avatar) {
    return '/default-avatar.svg';
  }

  // If avatar is already a complete URL (starts with http), return as is
  if (avatar.startsWith('http')) {
    return avatar;
  }

  // If avatar is a relative path, construct complete URL
  const baseURL = process.env.NEXT_PUBLIC_API_URL || "https://admin.goglanco.com/";
  const cleanBaseUrl = baseURL.replace(/\/$/, ''); // Remove trailing slash
  const cleanAvatar = avatar.startsWith('/') ? avatar.slice(1) : avatar; // Remove leading slash if present

  return `${cleanBaseUrl}/${cleanAvatar}`;
};

/**
 * Generates avatar with user initials as fallback
 * @param name - User's name
 * @returns URL for generated avatar with initials
 */
export const generateInitialAvatar = (name: string): string => {
  const initials = name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return `https://ui-avatars.com/api/?name=${initials}&background=3b82f6&color=ffffff&size=200`;
};
