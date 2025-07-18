import Image from "next/image";
import { Lang } from "@/types/lang";
import ExternalLink from "../elements/ExternalLink";
import RecruitmentSection from "./RecruitmentSection";
import { dictionary } from "@/lang";

type Props = { lang: Lang } & React.HTMLAttributes<HTMLElement>;

export default function VenueDetailSection({ lang, ...props }: Props) {
  const dict = dictionary[lang];
  return (
    <>
      <section {...props}>
        <div className="flex lg:items-center my-16 max-lg:flex-col">
          <h2 className='text-4xl lg:text-6xl font-bold font-jost'>
            Conference Overview
          </h2>
          <p className="lg:mx-24 text-[#808080]">概要</p>
        </div>
        <div className="max-w-5xl mx-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            <div className="border-b-2 border-gray-300 space-y-2">
              <p className="font-bold">{dict.venue.conference_name}</p>
              <p className="pb-2">PyCon JP 2025</p>
            </div>
            <div className="border-b-2 border-gray-300 space-y-2">
              <p className="font-bold">{dict.venue.holding_date_title}</p>
              <p className="pb-2">{dict.venue.holding_date}</p>
            </div>
            <div className="border-b-2 border-gray-300 space-y-2">
              <p className="font-bold">{dict.venue.place}</p>
              <p className="pb-2">{dict.venue.place_name}</p>
            </div>
            <div className="border-b-2 border-gray-300 space-y-2">
              <p className="font-bold">{dict.venue.address}</p>
              <p className="pb-2">{dict.venue.hall_address}</p>
            </div>
            <div className="border-b-2 border-gray-300 space-y-2">
              <p className="font-bold">{dict.venue.committee}</p>
              <p className="pb-2">{dict.venue.commitee_name}</p>
            </div>
            <div className="border-b-2 border-gray-300 space-y-2">
              <p className="font-bold">{dict.venue.head}</p>
              <p className="pb-2">{dict.venue.head_name}</p>
            </div>
            <div className="border-b-2 border-gray-300 space-y-2">
              <p className="font-bold">{dict.venue.expected_attendees}</p>
              <p className="pb-2">{dict.venue.expected_attendees_number}</p>
            </div>
          </div>
        </div>
      </section>
      <section id="access" {...props}>
        <div className="flex lg:items-center my-16 max-lg:flex-col">
          <h2 className='text-4xl lg:text-6xl font-bold font-jost'>
            Access Map
          </h2>
          <p className="lg:mx-24 text-[#808080]">アクセスマップ</p>
        </div>
        <div className="w-full h-[520px] bg-[#FAFAFA] rounded-2xl border border-[#808080]">
          <Image
            src="/common/access_map.png"
            alt="Access Map"
            width={1000}
            height={516}
            className="w-full h-full object-cover object-[25%_75%] md:object-center rounded-2xl" />
        </div>
        <ExternalLink href="https://maps.app.goo.gl/ndM9jNDJ2zoQKKr68">
          <p className="my-2 underline p-1">{dict.venue.see_on_google_map}</p>
        </ExternalLink>
        <RecruitmentSection lang={lang} className="my-32" />
      </section></>
  );
}