import Image from 'next/image';
import {getCloudflareImageUrl} from '@/libs/cloudflare-images';
import {useState} from 'react';

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
    const baseUrl = getCloudflareImageUrl(category, fileName);
    if (!baseUrl) return fallbackSrc;
    
    // Cloudflare Imagesの Flexible Variants を使用
    // w=幅, h=高さ, fit=scale-down で画像をリサイズ
    return baseUrl.replace('/public', `/w=${width},h=${height},fit=scale-down`);
  });

  // Cloudflare Images URLの場合はNext.jsの画像最適化をバイパス
  const isCloudflareUrl = imgSrc.includes('imagedelivery.net');

  if (isCloudflareUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={imgSrc}
        alt={alt}
        width={width}
        height={height}
        className={className}
        onError={() => setImgSrc(fallbackSrc)}
      />
    );
  }

  // フォールバック画像の場合はNext.js Imageコンポーネントを使用
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