import {Swiper, SwiperSlide} from 'swiper/react'
import {Autoplay, EffectFade} from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-fade'
import Image from "next/image";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight, faPlus} from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";
import ExternalLink from "@/components/elements/ExternalLink";

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
    <div>
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
          className='absolute bg-white w-[120%] aspect-[16_/_3] rounded-t-[100%] lg:top-[85dvh] left-1/2 -translate-x-1/2 -translate-y-1/2 z-0'/>
      </div>
      <div className='lg:w-5/8 w-10/12 mx-auto mt-[-15dvh] lg:mt-[-30dvh] z-10'>
        <div className='flex flex-col w-80 font-semibold ml-auto mx-auto lg:mr-0'>
          <div className='flex flex-row lg:h-60 h-40'>
            <DateArea day='DAY 1' month='09' date='26' weekday='FRI' className='bg-secondary text-black'/>
            <DateArea day='DAY 2' month='09' date='27' weekday='SAT' className='bg-primary text-white'/>
          </div>
          <div className='bg-gray-50 rounded-lg h-12 lg:h-16 border-gray-300 border-2 flex justify-between items-center px-6'>
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
          <Image src='/common/hero/theme.png' alt='あつまれPythonのピース' width={1120} height={1120}
                 className='w-4/6 max-w-72 mx-auto'/>
          <div className='text-sm lg:text-base'>
            2025年、Pythonカンファレンス「PyCon
            JP」は、「あつまれPythonのピース」をテーマに、広島で開催されます。初の地方開催となる今回は、会場が平和記念公園内の国際会議場。平和を願い、発信し続けてきたこの地で、Pythonが大切にしてきた「多様性」や「オープンさ」を、あらためて感じられるイベントになるでしょう。
            関東や遠方の方も、少し足を伸ばして、凛とした空気の平和公園で技術トークを楽しむ時間には、きっと特別な価値があります。
            全国から集まる仲間たちと、コードの話も、これからの社会の話もちょっぴりしてみませんか？お好み焼きも、牡蠣も待っています。9月、広島でお会いしましょう！
          </div>
          <ExternalLink href='https://example.com'>
            <span className='w-full bg-gray-50 border-gray-300 border-2 flex justify-between items-center p-5 lg:p-6 rounded-2xl text-sm lg:text-xl font-semibold'>
              <span>チケットを購入する</span>
              <FontAwesomeIcon icon={faArrowRight}/>
            </span>
          </ExternalLink>
        </div>
        <div className='flex-1 w-10/12 lg:w-auto mx-auto'>
          <div className='relative aspect-[4/3] ml-auto'>
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
    </div>
  )
}