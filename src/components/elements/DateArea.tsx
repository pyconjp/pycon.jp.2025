import React from 'react';
import clsx from 'clsx';

interface DateAreaProps {
  day: string;
  month: string;
  date: string;
  weekday: string;
  className?: string;
}

const DateArea: React.FC<DateAreaProps> = ({ day, month, date, weekday, className }) => (
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
);

export default DateArea;