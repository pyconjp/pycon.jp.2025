import Image from 'next/image';
import { getCloudflareImageUrl } from '@/libs/cloudflare-images';
import { useState } from 'react';

interface CloudflareImageProps {
  category: string;
  fileName?: string;
  fallbackSrc: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}

export default function CloudflareImage({
  category,
  fileName,
  fallbackSrc,
  alt,
  width,
  height,
  className
}: CloudflareImageProps) {
  const [imgSrc, setImgSrc] = useState(() => {
    if (!fileName) return fallbackSrc;
    const cloudflareUrl = getCloudflareImageUrl(category, fileName);
    return cloudflareUrl || fallbackSrc;
  });

  return (
    <Image
      src={imgSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      onError={() => setImgSrc(fallbackSrc)}
    />
  );
}