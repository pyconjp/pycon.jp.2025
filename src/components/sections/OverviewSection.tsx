import {Lang} from "@/types/lang";
import dynamic from "next/dynamic";
import Image from "next/image";
import clsx from "clsx";
import LinkButton from "@/components/elements/LinkButton";

type Props = { lang: Lang } & React.HTMLAttributes<HTMLElement>;

export default function OverviewSection({lang, ...props}: Props) {
  const Overview = dynamic(() => import(`@/components/markdown/${lang}/overview.mdx`), {ssr: true});

  return (
    <section {...props} className={clsx('flex lg:flex-row flex-col gap-14', props.className)}>
      <div className='flex-[3_3_0] relative lg:aspect-auto aspect-[2_/_3]'>
        <Image src='/common/overview/overview_main.jpg' alt='Overview Image Main' width={564} height={812}
               className='h-full w-full object-cover rounded-2xl'/>
        <div className='absolute bottom-[5%] left-[10%] text-white'>
          <div className='text-6xl'>Overview</div>
          <div className='text-xl mt-5'>About PyCon JP</div>
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