import CloudflareImage from "@/components/elements/CloudflareImage";
import clsx from "clsx";

const images = [
  { fileName: 'slide_1.jpg', fallback: '/common/slide/slide_1.jpg' },
  { fileName: 'slide_2.jpg', fallback: '/common/slide/slide_2.jpg' },
  { fileName: 'slide_3.jpg', fallback: '/common/slide/slide_3.jpg' },
  { fileName: 'slide_4.jpg', fallback: '/common/slide/slide_4.jpg' },
  { fileName: 'slide_5.jpg', fallback: '/common/slide/slide_5.jpg' },
  { fileName: 'slide_6.jpg', fallback: '/common/slide/slide_6.jpg' },
  { fileName: 'slide_7.jpg', fallback: '/common/slide/slide_7.jpg' },
  { fileName: 'slide_8.jpg', fallback: '/common/slide/slide_8.jpg' },
];

type Props = React.HTMLAttributes<HTMLElement>;

export default function ImageSlideSection({...props}: Props) {
  return (
    <section {...props} className={clsx('grid grid-cols-4', props.className)} >
      {images.map((image, index) => (
        <CloudflareImage 
          key={index} 
          category='slide'
          fileName={image.fileName}
          fallbackSrc={image.fallback}
          alt={`Slide Image ${index}`} 
          width={600} 
          height={400}
          className={'aspect-[5_/_6] lg:aspect-[5_/_3] object-cover w-full'}/>
      ))}
    </section>
  )
}