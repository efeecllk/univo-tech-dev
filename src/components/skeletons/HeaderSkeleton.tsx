import { MessageCircle, Users, Building2, Search as SearchIcon, User } from 'lucide-react';
import Link from 'next/link';
import SkeletonLoader from '../ui/SkeletonLoader';
import Image from 'next/image';

export default function HeaderSkeleton() {
  return (
      <header className="hidden lg:block sticky top-0 z-[9999] bg-white dark:bg-neutral-900 border-b border-black dark:border-white !transition-none transform-none">
        <div className="w-full px-4 md:container md:mx-auto">
          <div className="flex items-center justify-between h-16 max-w-full relative">

            {/* Left: Logo (Static) */}
            <div className="flex items-center gap-0 shrink-0 group">
              <div className="flex items-center gap-0">
                  <div className="relative w-10 h-10 md:w-12 md:h-12 mr-2">
                      <Image
                        src="/logo_black.png"
                        alt="Univo Logo"
                        fill
                        className="object-contain dark:invert mix-blend-multiply dark:mix-blend-screen"
                      />
                  </div>
                  <h1 className="text-2xl font-bold text-foreground dark:text-white font-serif tracking-tight">
                    Univo
                  </h1>
              </div>
            </div>

            {/* Center: Desktop Navigation Skeleton */}
            <div className="hidden lg:flex items-center justify-center absolute left-1/2 -translate-x-1/2 bg-neutral-100 dark:bg-neutral-800 backdrop-blur-sm px-4 py-3 rounded-full border border-neutral-200 dark:border-neutral-700">
                <div className="flex items-center gap-4">
                    <SkeletonLoader width={80} height={16} />
                    <SkeletonLoader width={80} height={16} />
                    <SkeletonLoader width={80} height={16} />
                </div>
            </div>

            {/* Right: Tools Skeleton */}
            <div className="flex items-center gap-1.5 lg:gap-2 shrink-0">
                <div className="hidden lg:flex items-center gap-2">
                    <SkeletonLoader width={40} height={40} className="rounded-full" />
                    <SkeletonLoader width={40} height={40} className="rounded-full" />
                    <SkeletonLoader width={40} height={40} className="rounded-full" />
                    <SkeletonLoader width={100} height={40} className="rounded-full" />
                </div>
            </div>
          </div>
        </div>
      </header>
  );
}
