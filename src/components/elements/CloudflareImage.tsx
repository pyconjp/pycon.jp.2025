import Image from 'next/image';
/*import {getCloudflareImageUrl} from '@/libs/cloudflare-images';*/
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
  /*category,*/
  fileName,
  fallbackSrc,
  alt,
  width,
  height,
  className
}: CloudflareImageProps) {
  const [imgSrc, setImgSrc] = useState(() => {
    if (!fileName || fileName.trim() === '') return fallbackSrc;
    /*const url = getCloudflareImageUrl(category, fileName);*/
    /*return url || fallbackSrc;*/

    // ファイル名をURLエンコードしてfallbackSrcを生成
    const pathParts = fallbackSrc.split('/');
    const encodedFileName = encodeURIComponent(pathParts[pathParts.length - 1]);
    const encodedSrc = pathParts.slice(0, -1).join('/') + '/' + encodedFileName;

    return encodedSrc; // CFIの無効化
  });

  // Cloudflare Images URLの場合はNext.jsの画像最適化をバイパス
  /*const isCloudflareUrl = imgSrc && imgSrc.includes('imagedelivery.net');*/

  /*if (isCloudflareUrl) {
    return (
      <img
        src={imgSrc}
        alt={alt}
        width={width}
        height={height}
        className={className}
        onError={() => setImgSrc(fallbackSrc)}
      />
    );
  }*/

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