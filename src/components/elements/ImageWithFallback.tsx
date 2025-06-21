import Image from "next/image";
import {ComponentProps, useState} from "react";

export default function ImageWithFallback({
                                            fallback = '/common/no_image.jpg',
                                            ...props
                                          }: ComponentProps<typeof Image> & { fallback?: string }) {
  const [isError, setIsError] = useState(false)

  return (
    <>
      {
        isError ? (
          <Image
            {...props}
            alt={props.alt}
            src={fallback}
            unoptimized
          />
        ) : (
          <Image
            {...props}
            alt={props.alt}
            onError={() => setIsError(true)}
            src={props.src}
            unoptimized
          />
        )
      }
    </>
  )
}