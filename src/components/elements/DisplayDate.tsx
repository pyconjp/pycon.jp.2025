import { dictionary } from "@/lang";
import { Lang } from "@/types/lang";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import Link from "next/link";

export default function DisplayDate({ lang }: { lang: Lang }) {
  const dict = dictionary[lang];
  const DateArea = ({ day, month, date, weekday, className, href }: {
    day: string,
    month: string,
    date: string,
    weekday: string,
    className: string,
    href?: string
  }) => {
    const content = (
      <div className={clsx('flex-1 rounded-lg py-4 lg:py-6 text-center transition-all', className, href && 'cursor-pointer hover:brightness-90')}>
        <div className='w-full text-xl'>
          {day}
        </div>
        <div className='relative lg:mt-8 mt-2 w-20 lg:h-24 h-16 mx-auto'>
          <div className='absolute top-0 left-0 text-xl'>
            {month}
          </div>
          <hr className='absolute top-6 w-10/12 [transform:rotate(-25deg)]' />
          <div className='absolute bottom-0 right-0 left-0 lg:text-6xl text-4xl text-right lg:text-center'>
            {date}
          </div>
        </div>
        <div className='w-full lg:mt-4 mt-2 text-sm'>
          {weekday}
        </div>
      </div>
    );

    return href ? <Link href={href} className='flex-1'>{content}</Link> : content;
  }
  return (
    <div className='font-jost'>
      <div className='flex flex-col w-80 font-semibold ml-auto mx-auto lg:mr-0'>
        <div className='flex flex-row lg:h-60 h-40'>
          <DateArea day='DAY 1' month='09' date='26' weekday='FRI' className='bg-secondary text-black' href={`/${lang}/timetable/day1`} />
          <DateArea day='DAY 2' month='09' date='27' weekday='SAT' className='bg-primary text-white' href={`/${lang}/timetable/day2`} />
        </div>
        <a
          href='https://pyconjp.connpass.com/event/361701/'
          target='_blank'
          rel='noopener noreferrer'
          className='bg-gray-50 rounded-lg h-12 lg:h-16 border-gray-300 border-2 flex justify-between items-center px-6 hover:bg-gray-100 transition-colors cursor-pointer'>
          <div className='flex flex-1 gap-4 text-x'>
            <span><FontAwesomeIcon icon={faPlus} /></span>
            <span>9/28</span>
            <span>SUN</span>
          </div>
          <div>
            {dict.top.sprint_day}
          </div>
        </a>
      </div>
    </div>
  )
}