import Image from "next/image";
import {ComponentProps, useState} from "react";

export default function ImageWithFallback({fallback = '/common/no_image.jpg', ...props}: ComponentProps<typeof Image> & {fallback ?: string}) {
  const [isError, setIsError] = useState(false)

  return (
    <Image
      {...props}
      alt={props.alt}
      onError={() => setIsError(true)}
      src={isError ? fallback : props.src}
    />
  )
}