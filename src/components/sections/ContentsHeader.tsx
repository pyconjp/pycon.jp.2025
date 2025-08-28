import Image from "next/image";
import clsx from "clsx";
import CloudflareImage from "@/components/elements/CloudflareImage";

type Props = {
  title: string;
  subtitle: string;
  grayscale?: boolean;
  images?: [string, string];
  cloudflareImages?: {
    category: string;
    fileNames: [string | undefined, string | undefined];
    fallbackSrcs: [string, string];
  };
} & React.HTMLAttributes<HTMLElement>;

export default function ContentsHeader({title, subtitle, grayscale, images, cloudflareImages, ...props}: Props) {
  const useCloudflare = !!cloudflareImages;
  
  return (
    <section {...props} className={clsx('relative grid lg:grid-cols-2', props.className)}>
      {useCloudflare ? (
        <>
          <CloudflareImage 
            category={cloudflareImages.category}
            fileName={cloudflareImages.fileNames[0]}
            fallbackSrc={cloudflareImages.fallbackSrcs[0]}
            alt={title + ' Header Image 1'}
            width={1920}
            height={1080}
            className={clsx('w-full h-auto object-cover max-lg:max-h-56', {grayscale})}
          />
          <CloudflareImage 
            category={cloudflareImages.category}
            fileName={cloudflareImages.fileNames[1]}
            fallbackSrc={cloudflareImages.fallbackSrcs[1]}
            alt={title + ' Header Image 2'}
            width={1920}
            height={1080}
            className={clsx('w-full h-auto object-cover max-lg:max-h-56', {grayscale})}
          />
        </>
      ) : (
        <>
          <Image src={images![0]} alt={title + ' Header Image 1'} width={1920} height={1080}
                 className={clsx('w-full h-auto object-cover max-lg:max-h-56', {grayscale})}/>
          <Image src={images![1]} alt={title + ' Header Image 2'} width={1920} height={1080}
                 className={clsx('w-full h-auto object-cover max-lg:max-h-56', {grayscale})}/>
        </>
      )}
      <div className='absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/40 to-transparent'/>
      <div className='absolute bottom-12 left-1/2 -translate-x-1/2 text-center font-jost font-semibold'>
        <h1 className="relative text-white text-6xl">
          {title}
        </h1>
      </div>
      <div className='absolute bottom-4 left-1/2 -translate-x-1/2 text-center font-semibold'>
        <div className="relative text-white text-xl">
          {subtitle}
        </div>
      </div>
    </section>
  );
}