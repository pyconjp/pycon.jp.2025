import Image from "next/image";
import {Lang} from "@/types/lang";
import dynamic from "next/dynamic";

type Props = { lang: Lang } & React.HTMLAttributes<HTMLElement>;

export default function KeynotesSection({lang, ...props}: Props) {
  const KeynoteContent1 = dynamic(() => import(`@/components/markdown/${lang}/keynote_1.mdx`), {ssr: true});
  const KeynoteContent2 = dynamic(() => import(`@/components/markdown/${lang}/keynote_2.mdx`), {ssr: true});
  return (
    <section {...props}>
      <h1 className='text-6xl font-bold'>
        Keynotes<br/>2025
      </h1>
      <div className='flex flex-col lg:flex-row gap-24'>
        <div className='flex-1'>
          <Image src='/common/keynote/keynote_1.png' alt='Keynote 2025 1' width={800} height={800} className='w-full max-w-96 mx-auto'/>
          <div className='flex flex-row justify-between items-start'>
            <div className='flex-1'>
              <div className='text-3xl font-semibold'>大塚 あみ</div>
              <div className='font-normal mt-3'>Otsuka Ami</div>
              <div className='text-xl font-semibold mt-5'>100日チャレンジ</div>
              <div className='font-semibold mt-0.5'>著者</div>
            </div>
            <Image src='/common/keynote/keynote_1_1.jpg' alt='Keynote 2025 1 Book' width={283} height={360} className='h-auto lg:w-24 w-18
             border-gray-200 border-2'/>
          </div>
          <div className='mt-11'>
            <KeynoteContent1 />
          </div>
        </div>
        <div className='flex-1'>
          <Image src='/common/keynote/keynote_2.png' alt='Keynote 2025 2' width={800} height={800} className='w-full max-w-96 mx-auto'/>
          <div>
            <div className='text-3xl font-semibold'>Sebastián Ramírez</div>
            <div className='font-normal mt-3'>セバスティアン・ラミレス</div>
            <div className='text-xl font-semibold mt-5'>FastAPI</div>
            <div className='font-semibold mt-0.5'>作者</div>
          </div>
          <div className='mt-11'>
            <KeynoteContent2 />
          </div>
        </div>
      </div>
    </section>
  );
}