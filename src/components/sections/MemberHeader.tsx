import Image from "next/image";
import clsx from "clsx";

type Props = React.HTMLAttributes<HTMLElement>;

export default function MemberHeader({...props}: Props) {

  return (
    <section {...props} className={clsx('relative grid grid-cols-2', props.className)}>
      <Image src='/common/member_header_1.jpg' alt='Member Header 1' width={1920} height={1080}
             className='w-full h-auto object-cover grayscale min-h-48'/>
      <Image src='/common/member_header_2.jpg' alt='Member Header 2' width={1920} height={1080}
             className='w-full h-auto object-cover grayscale min-h-48'/>
      <div className='absolute bottom-12 left-1/2 -translate-x-1/2 text-center font-jost font-semibold'>
        <h1 className={
          clsx(
            "relative text-gray-500 after:text-white after:absolute after:-left-1 after:-top-1 text-6xl",
            `after:content-['Members']`,
          )
        }>
          Members
        </h1>
      </div>
      <div className='absolute bottom-4 left-1/2 -translate-x-1/2 text-center font-semibold'>
        <div className={
          clsx(
            "relative text-gray-500 after:text-white after:absolute after:-left-0.5 after:-top-0.5 text-xl",
            `after:content-['メンバー']`,
          )
        }>
          メンバー
        </div>
      </div>
    </section>
  );
}