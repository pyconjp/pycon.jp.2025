import {Lang} from "@/types/lang";
import dynamic from "next/dynamic";
import Image from "next/image";
import clsx from "clsx";
import LinkButton from "@/components/elements/LinkButton";

type Props = { lang: Lang } & React.HTMLAttributes<HTMLElement>;

export default function OverviewSection({lang, ...props}: Props) {
  const Overview = dynamic(() => import(`@/components/markdown/${lang}/overview.mdx`), {ssr: true});
  const ShadowText = ({text, ...props}: { text: string } & React.HTMLAttributes<HTMLDivElement>) => (
    <div {...props}
         className={
           clsx(
             "relative text-gray-500 before:absolute before:-left-0.5 before:-top-0.5 before:text-white before:block",
             `before:content-['${text.replaceAll(' ', '_')}']`,
             props.className,
           )
         }>
      {text}
    </div>
  );

  return (
    <section {...props} className={clsx('flex lg:flex-row flex-col gap-14', props.className)}>
      <div className='flex-[3_3_0] relative lg:aspect-auto aspect-[2_/_3]'>
        <Image src='/common/overview/overview_main.jpg' alt='Overview Image Main' width={564} height={812}
               className='h-full w-full object-cover rounded-2xl'/>
        <div className='absolute bottom-[5%] left-[10%] text-white'>
          <ShadowText text='Overview' className='text-6xl mb-5'/>
          <ShadowText text='About PyCon JP' className='text-xl'/>
        </div>
      </div>
      <div className='flex-[2_2_0]'>
        <Image src='/common/overview/overview_sub.jpg' alt='Overview Image Sub' width={376} height={213}
               className='w-full mb-12 rounded-2xl'/>
        <Overview/>
        <div className='mt-4'/>
        <LinkButton href='https://exampe.com' className='mt-12'>
          カンファレンスについて
        </LinkButton>
      </div>
    </section>
  )
}