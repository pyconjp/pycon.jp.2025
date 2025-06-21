import {Swiper, SwiperSlide} from 'swiper/react';
import {Autoplay, EffectFade} from 'swiper/modules';
import 'swiper/css'
import 'swiper/css/effect-fade'
import Image from "next/image";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";
import LinkButton from "@/components/elements/LinkButton";
import {Lang} from "@/types/lang";
import dynamic from "next/dynamic";

const images = [
  '/common/hero/hero_1.jpg',
  '/common/hero/hero_2.jpg',
]

export default function HeroSection({lang}: {lang: Lang}) {
  const Abstract = dynamic(() => import(`@/components/markdown/${lang}/abstract.mdx`), {ssr: true});

  const DateArea = ({day, month, date, weekday, className}: {
    day: string,
    month: string,
    date: string,
    weekday: string,
    className: string
  }) => (
    <div className={clsx('flex-1 rounded-lg py-4 lg:py-6 text-center', className)}>
      <div className='w-full text-xl'>
        {day}
      </div>
      <div className='relative lg:mt-8 mt-2 w-20 lg:h-24 h-16 mx-auto'>
        <div className='absolute top-0 left-0 text-xl'>
          {month}
        </div>
        <hr className='absolute top-6 w-10/12 [transform:rotate(-25deg)]'/>
        <div className='absolute bottom-0 right-0 left-0 lg:text-6xl text-4xl text-right lg:text-center'>
          {date}
        </div>
      </div>
      <div className='w-full lg:mt-4 mt-2 text-sm'>
        {weekday}
      </div>
    </div>
  )

  return (
    <section className='lg:-mt-96'>
      <div className='relative w-full overflow-hidden -z-10'>
        <Swiper
          modules={[Autoplay, EffectFade]}
          speed={2000}
          effect="fade"
          fadeEffect={{crossFade: true}} // クロスフェード有効
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          loop={true}
          className="w-full h-[50vh] lg:h-[85vh] overflow-hidden !-z-20"
        >
          {images.map((src, index) => (
            <SwiperSlide key={index}>
              <Image src={src} alt={`Hero Section ${index}`} width={1024} height={683}
                     className='w-full h-full object-cover' loading='lazy'/>
            </SwiperSlide>
          ))}
        </Swiper>
        <div
          className='absolute bg-white w-[120%] aspect-[16_/_3] rounded-t-[100%] lg:top-[85dvh] left-1/2 -translate-x-1/2 -translate-y-1/2 z-0'/>
      </div>
      <div className='lg:w-5/8 w-10/12 mx-auto mt-[-15dvh] lg:mt-[-30dvh] z-10'>
        <div className='flex flex-col w-80 font-semibold ml-auto mx-auto lg:mr-0'>
          <div className='flex flex-row lg:h-60 h-40'>
            <DateArea day='DAY 1' month='09' date='26' weekday='FRI' className='bg-secondary text-black'/>
            <DateArea day='DAY 2' month='09' date='27' weekday='SAT' className='bg-primary text-white'/>
          </div>
          <div
            className='bg-gray-50 rounded-lg h-12 lg:h-16 border-gray-300 border-2 flex justify-between items-center px-6'>
            <div className='flex flex-1 gap-4 text-x'>
              <span><FontAwesomeIcon icon={faPlus}/></span>
              <span>9/28</span>
              <span>SUN</span>
            </div>
            <div>
              開発スプリント
            </div>
          </div>
        </div>
      </div>

      <div
        className='relative lg:w-5/8 w-10/12 h-auto mx-auto flex flex-col lg:flex-row gap-12 bg-transparent lg:-mt-24 lg:items-end'>
        <div className='flex-1'>
          <div className='relative after:bg-white after:absolute after:w-full after:h-full after:-z-10 after:top-0 after:left-0 after:rounded-2xl w-4/6 max-w-72 mx-auto'>
            <Image src='/common/hero/theme.png' alt='あつまれPythonのピース' width={1120} height={1120} className='z-10'/>
          </div>
          <div className='text-sm lg:text-base mb-4'>
            <Abstract/>
          </div>
          <LinkButton href='https://example.com'>
            チケットを購入する
          </LinkButton>
        </div>
        <div className='flex-1 w-10/12 lg:w-auto mx-auto'>
          <div className='relative aspect-[4/3] ml-auto max-h-[400px]'>
            <div className="absolute bottom-[40%] left-0 h-[60%] aspect-[4/3]">
              <Image
                src='/common/hero/abstract_1.jpg'
                alt='Abstract Image 1'
                fill
                className='object-cover rounded-lg'
              />
            </div>
            <div className="absolute bottom-0 right-0 h-[60%] aspect-[4/3]">
              <Image
                src='/common/hero/abstract_2.jpg'
                alt='Abstract Image 2'
                fill
                className='object-cover rounded-lg'
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}