import {Swiper, SwiperSlide} from 'swiper/react';
import {Autoplay, EffectFade} from 'swiper/modules';
import 'swiper/css'
import 'swiper/css/effect-fade'
import Image from "next/image";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import LinkButton from "@/components/elements/LinkButton";
import {Lang} from "@/types/lang";
import dynamic from "next/dynamic";
import {dictionary} from "@/lang";
import DisplayDate from '../elements/DisplayDate';

const images = [
  '/common/hero/hero_1.jpg',
  '/common/hero/hero_2.jpg',
]

export default function HeroSection({lang}: {lang: Lang}) {
  const dict = dictionary[lang];
  const Abstract = dynamic(() => import(`@/components/markdown/${lang}/abstract.mdx`), {ssr: true});

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
              <Image src={src} alt={`Hero Section ${index}`} width={512} height={340} priority
                     className='w-full h-full object-cover'/>
            </SwiperSlide>
          ))}
        </Swiper>
        <div
          className='absolute bg-white w-[120%] aspect-[16_/_3] rounded-t-[100%] lg:top-[85dvh] left-1/2 -translate-x-1/2 -translate-y-1/2 z-0'/>
      </div>
      <div className="lg:w-5/8 w-10/12 mx-auto mt-[-15dvh] lg:-mt-72 z-10">
        <DisplayDate lang={lang}/>
      </div>
      <div
        className='relative lg:w-5/8 w-10/12 h-auto mx-auto flex flex-col lg:flex-row gap-12 bg-transparent lg:-mt-24 lg:items-end'>
        <div className='flex-1'>
          <div className='relative w-4/6 max-w-72 mx-auto'>
            <Image src='/common/hero/theme.png' alt='あつまれPythonのピース' width={1120} height={1120} className='z-10'/>
          </div>
          <div className='text-sm lg:text-base mb-4'>
            <Abstract/>
          </div>
          <LinkButton href='https://pyconjp.connpass.com/event/359523/'>
            {dict.button.buy_ticket}
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