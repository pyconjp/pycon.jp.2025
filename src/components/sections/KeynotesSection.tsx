import CloudflareImage from "@/components/elements/CloudflareImage";
import {Lang} from "@/types/lang";
import dynamic from "next/dynamic";
import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";

type Props = { lang: Lang } & React.HTMLAttributes<HTMLElement>;

export default function KeynotesSection({lang, ...props}: Props) {
  const KeynoteContent1 = dynamic(() => import(`@/components/markdown/${lang}/keynote_1.mdx`), {ssr: true});
  const KeynoteContent2 = dynamic(() => import(`@/components/markdown/${lang}/keynote_2.mdx`), {ssr: true});
  return (
    <section {...props}>
      <h1 className='text-6xl font-bold font-jost'>
        Keynotes<br/>2025
      </h1>
      <div className='flex flex-col lg:flex-row gap-24'>
        <div className='flex-1'>
          <CloudflareImage category='keynotes' fileName='keynote_2' fallbackSrc='/common/keynote/keynote_2.png' alt='Keynote 2025 2' width={800} height={800} className='w-full max-w-96 mx-auto'/>
          <div>
            <div className='text-3xl font-semibold'>Sebastián Ramírez</div>
            <div className='font-normal mt-3'>セバスティアン・ラミレス</div>
            <div className='text-xl font-semibold mt-5'>FastAPI</div>
            <div className='font-semibold mt-0.5'>作者</div>
          </div>
          <div className='mt-6'>
            <Link href={`/${lang}/timetable/talk/Y8UYKV`}
                  className='flex justify-between items-center bg-white border-gray-300 border-2 p-4 rounded-xl text-base font-semibold font-jost hover:bg-gray-50 transition-colors'>
              <div className='flex gap-3'>
                <span>9/26</span>
                <span className='text-gray-500'>FRI</span>
                <span>17:55 - 18:55</span>
              </div>
              <FontAwesomeIcon icon={faArrowRight} className='text-gray-600'/>
            </Link>
          </div>
          <div className='mt-11'>
            <KeynoteContent2 />
          </div>
        </div>
        <div className='flex-1'>
          <CloudflareImage category='keynotes' fileName='keynote_1' fallbackSrc='/common/keynote/keynote_1.png' alt='Keynote 2025 1' width={800} height={800} className='w-full max-w-96 mx-auto'/>
          <div className='flex flex-row justify-between items-start'>
            <div className='flex-1'>
              <div className='text-3xl font-semibold'>大塚 あみ</div>
              <div className='font-normal mt-3'>Otsuka Ami</div>
              <div className='text-xl font-semibold mt-5'>#100日チャレンジ</div>
              <div className='font-semibold mt-0.5'>著者</div>
            </div>
            <CloudflareImage category='keynotes' fileName='book' fallbackSrc='/common/keynote/book.jpg' alt='Keynote 2025 1 Book' width={283} height={360} className='h-auto lg:w-24 w-18
             border-gray-200 border-2'/>
          </div>
          <div className='mt-6'>
            <Link href={`/${lang}/timetable/talk/RBZ9Y8`}
                  className='flex justify-between items-center bg-white border-gray-300 border-2 p-4 rounded-xl text-base font-semibold font-jost hover:bg-gray-50 transition-colors'>
              <div className='flex gap-3'>
                <span>9/27</span>
                <span className='text-gray-500'>SAT</span>
                <span>17:00 - 18:00</span>
              </div>
              <FontAwesomeIcon icon={faArrowRight} className='text-gray-600'/>
            </Link>
          </div>
          <div className='mt-11'>
            <KeynoteContent1 />
          </div>
        </div>
      </div>
    </section>
  );
}