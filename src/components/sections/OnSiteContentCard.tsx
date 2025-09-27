import dayjs from "dayjs"
import LinkButton from "../elements/LinkButton"
import Image from "next/image"
import { Noto_Sans_JP } from "next/font/google";

const NotoSansJP = Noto_Sans_JP({
  weight: ["400", "600"],
  subsets: ["latin"],
});

interface OnSiteContentCardProps {
  title: string
  location: string
  datetime: {
    start: string
    end: string
  }
  details: string
  thumbnail?: string
  link?: string
  linkText?: string
}

const formatDateTime = (start: string, end: string) => {
  const startDate = dayjs(start).tz('Asia/Tokyo');
  const endDate = dayjs(end).tz('Asia/Tokyo');
  const startTime = startDate.format('HH:mm');
  const endTime = endDate.format('HH:mm');

  // 同じ日付の場合
  if (startDate.format('YYYY-MM-DD') === endDate.format('YYYY-MM-DD')) {
    return (
      <div className="font-bold flex gap-4">
        {`${startDate.format('M/D')} `}
        <span style={{ color: '#808080' }}>{startDate.format('ddd').toUpperCase()}</span>
        {` ${startTime} - ${endTime}`}
      </div>
    );
  }

  // 別日の場合
  return (
    <div className="font-bold flex gap-4">
      {`${startDate.format('M/D')} `}
      <span style={{ color: '#808080' }}>{startDate.format('ddd').toUpperCase()}</span>
      {` ${startTime} - `}
      {`${endDate.format('M/D')} `}
      <span style={{ color: '#808080' }}>{endDate.format('ddd').toUpperCase()}</span>
      {` ${endTime}`}
    </div>
  );
};

export default function OnSiteContentCard({
  title,
  location,
  datetime,
  details,
  thumbnail,
  link,
  linkText = "詳細を見る",
}: OnSiteContentCardProps) {
  return (
    <div className="flex max-lg:flex-col lg:flex-row lg:gap-[58px] w-full">
      <div className="flex flex-col space-y-[25px] flex-1">
        <h2 className="font-jost font-semibold text-[28px]">{title}</h2>
        <div className="flex flex-col space-y-[15px]">
          <p className="rounded-full bg-[#D9D9D9] font-bold px-[9px] py-[3px] flex items-center w-fit text-[12px]">{location}</p>
          <div className="text-gray-700 font-semibold">
            {formatDateTime(datetime.start, datetime.end)}
          </div>
        </div>
        <p className={`${NotoSansJP.className}`}>{details || 'Coming Soon'}</p>
        {link && <LinkButton href={link}>{linkText}</LinkButton>}
      </div>
      {thumbnail && <Image src={thumbnail} alt={title} width={564} height={496} className="lg:w-[564px] lg:h-[496px] flex-shrink-0 mt-[25px] lg:mt-0"/>}
    </div>
  )
}