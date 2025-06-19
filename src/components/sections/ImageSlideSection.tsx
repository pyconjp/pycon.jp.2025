import Image from "next/image";
import clsx from "clsx";

const images = [
  '/common/slide/slide_1.jpg',
  '/common/slide/slide_2.jpg',
  '/common/slide/slide_3.jpg',
  '/common/slide/slide_4.jpg',
  '/common/slide/slide_5.jpg',
  '/common/slide/slide_6.jpg',
  '/common/slide/slide_7.jpg',
  '/common/slide/slide_8.jpg',
];

type Props = React.HTMLAttributes<HTMLElement>;

export default function ImageSlideSection({...props}: Props) {
  return (
    <section {...props} className={clsx('grid grid-cols-4', props.className)} >
      {images.map((image, index) => (
        <Image key={index} src={image} alt={`Slide Image ${index}`} width={600} height={400}
               className={'aspect-[5_/_3] object-cover w-full'}/>
      ))}
    </section>
  )
}