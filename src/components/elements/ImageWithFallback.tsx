import Image from "next/image";
import {ComponentProps, useState} from "react";

export default function ImageWithFallback({fallback = '/common/no_image.jpg', ...props}: ComponentProps<typeof Image> & {fallback ?: string}) {
  const [src, setSrc] = useState(props.src);

  return (
    <Image
      {...props}
      alt={props.alt}
      onError={() => setSrc(fallback)}
      src={src}
      unoptimized
    />
  )
}