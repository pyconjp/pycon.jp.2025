import { Lang } from "@/types/lang";
import dynamic from "next/dynamic";
import Image from "next/image";
import clsx from "clsx";
import { dictionary } from "@/lang";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

type Props = { lang: Lang } & React.HTMLAttributes<HTMLElement>;

export default function VenueSection({ lang, ...props }: Props) {
  const dict = dictionary[lang];
  const Description = dynamic(() => import(`@/components/markdown/${lang}/venue.mdx`), { ssr: true });

  return (
    <>
      <section {...props} className={clsx('flex lg:flex-row flex-col gap-14 items-center justify-center', props.className)}>
        <div className="relative flex gap-4 lg:flex-row flex-col lg:max-h-[730px] lg:gap-[58px]">
          <div
            className={clsx(
              "relative flex flex-col gap-4 lg:w-[378px]",
              lang === "ja" ? "lg:gap-18" : "lg:gap-10"
            )}
          >
            <h3 className={clsx(
              "font-extrabold max-lg:text-4xl",
              lang === "ja" ? "text-xl" : "text-2xl"
            )}>
              {dict.venue.this_year_place}
            </h3>
            <div className="text-justify h-full">
              <Description />
            </div>
            <div className={clsx("flex flex-col gap-4", lang === "ja" && "mt-4")}>
              <Link href="#access" className="flex justify-between items-center border-b border-gray-300 py-3 pr-2 no-underline">
                <span className="font-bold">{dict.venue.access_map_title}</span>
                <span><FontAwesomeIcon icon={faArrowDown} /></span>
              </Link>
            </div>
          </div>
          <div>
            <Image
              src="/common/venue_hero.png"
              alt="Venue Image Main"
              width={740}
              height={564}
              className="max-lg:mt-12 w-full h-[265px] lg:w-[564px] lg:h-full max-lg:object-cover rounded-2xl"
            />
          </div>
        </div>
      </section>
    </>
  )
}