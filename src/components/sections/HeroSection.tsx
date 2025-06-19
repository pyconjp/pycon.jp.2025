import {Swiper, SwiperSlide} from 'swiper/react'
import {Autoplay, EffectFade} from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-fade'
import Image from "next/image";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";

const images = [
  '/common/hero/hero_1.jpg',
  '/common/hero/hero_2.jpg',
]

export default function HeroSection() {
  const DateArea = ({day, month, date, weekday, className}: {
    day: string,
    month: string,
    date: string,
    weekday: string,
    className: string
  }) => (
    <div className={clsx('flex-1 rounded-lg py-6 text-center', className)}>
      <div className='w-full text-xl'>
        {day}
      </div>
      <div className='relative mt-8 w-20 h-24 mx-auto'>
        <div className='absolute top-0 left-0 text-xl'>
          {month}
        </div>
        <hr className='absolute top-6 w-11/12 [transform:rotate(-25deg)]'/>
        <div className='absolute bottom-0 right-0 left-0 text-6xl'>
          {date}
        </div>
      </div>
      <div className='w-full mt-4 text-sm'>
        {weekday}
      </div>
    </div>
  )

  return (
    <div className='relative w-full overflow-hidden'>
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
        className="w-full h-[50vh] lg:h-[85vh] overflow-hidden !-z-10"
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <Image src={src} alt={`Hero Section ${index}`} width={4096} height={2731}
                   className='w-full h-full object-cover'/>
          </SwiperSlide>
        ))}
      </Swiper>
      <div
        className='absolute bg-white w-[120%] aspect-[16_/_3] rounded-t-[100%] top-full left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 object-cover'/>
      <div className='absolute lg:left-7/12 top-4/6 flex flex-col z-10 w-80 font-semibold'>
        <div className='flex flex-row h-60'>
          <DateArea day='DAY 1' month='09' date='26' weekday='FRI' className='bg-secondary text-black'/>
          <DateArea day='DAY 2' month='09' date='27' weekday='SAT' className='bg-primary text-white'/>
        </div>
        <div className='bg-gray-50 rounded-lg h-16 border-gray-300 border-2 flex justify-between items-center px-6'>
          <div className='flex flex-1 gap-4 text-sm'>
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
  )
}