import {Lang} from "@/types/lang";
import {Member} from "@/types/member";
import Image from "next/image";
import ImageWithFallback from "@/components/elements/ImageWithFallback";
import clsx from "clsx";
import {dictionary} from "@/lang";
import ExternalLink from "@/components/elements/ExternalLink";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

type Props = {
  lang: Lang,
  member: Member,
} & React.HTMLAttributes<HTMLElement>;

export default function MemberSection({lang, member, ...props}: Props) {
  const dict = dictionary[lang];

  return (
    <section {...props} className={clsx('border-gray-300 border-2 bg-white rounded-lg', props.className)}>
      <div className='relative'>
        <Image src={`/common/member_cover.jpg`} alt='Cover Image' width={400} height={400}
               className='w-full aspect-[8_/_3] object-cover rounded-t-lg'/>
        {
          member.image
            ? (
              <ImageWithFallback src={`/common/members/${member.image}`}
                                 alt={lang === 'ja' ? (member.name_ja || member.name_en) : (member.name_en || member.name_ja)}
                                 width={110} height={110}
                                 className='aspect-square w-24 absolute left-1/2 -translate-x-1/2 -bottom-12 rounded-sm object-cover'/>
            )
            : (
              <Image src='/common/no_image.jpg'
                     alt={lang === 'ja' ? (member.name_ja || member.name_en) : (member.name_en || member.name_ja)}
                     width={110} height={110}
                     className='aspect-square w-24 absolute left-1/2 -translate-x-1/2 -bottom-12 rounded-sm object-cover'/>
            )
        }
        <Link href={`/${lang}/members`}
              className='absolute bg-black rounded-full text-white w-10 h-10 -top-5 -right-5 flex items-center justify-center'>
          <FontAwesomeIcon icon={faTimes}/>
        </Link>
      </div>
      <div className='pt-20 lg:pb-12 pb-6 w-10/12 mx-auto space-y-8'>
        <div>
          <h1 className='text-3xl font-bold font-jost text-center mb-2'>
            {lang === 'ja' ? (member.name_ja || member.name_en) : (member.name_en || member.name_ja)}
          </h1>
          <div className='text-center text-gray-600 text-sm mb-6'>
            {lang === 'ja' ? (member.name_en || member.name_ja) : (member.name_ja || member.name_en)}
          </div>
        </div>
        <div className='text-gray-800 text-sm leading-relaxed mb-6'>
          {lang === 'ja' ? member.profile_ja : member.profile_en}
        </div>
        <div className='grid grid-cols-1 gap-2'>
          {member.team && (
            <div className='flex gap-4 font-semibold border-b-2 border-gray-200 py-4'>
              <h2 className='w-1/4 lg:w-1/5'>
                {dict.members.role}
              </h2>
              <span>
                {dict.members.roles[member.role_id] || dict.members.team[member.team]}
              </span>
            </div>
          )}
          {member.github && (
            <div className='flex gap-4 font-semibold border-b-2 border-gray-200 py-4'>
              <h2 className='w-1/4 lg:w-1/5'>
                GitHub
              </h2>
              <ExternalLink href={`https://github.com/${member.github}`} className='hover:opacity-50'>
                {member.github}
              </ExternalLink>
            </div>
          )}
          {member.twitter && (
            <div className='flex gap-4 font-semibold border-b-2 border-gray-200 py-4'>
              <h2 className='w-1/4 lg:w-1/5'>
                X
              </h2>
              <ExternalLink href={`https://twitter.com/${member.twitter}`} className='hover:opacity-50'>
                @{member.twitter}
              </ExternalLink>
            </div>
          )}
          {member.facebook && (
            <div className='flex gap-4 font-semibold border-b-2 border-gray-200 py-4'>
              <h2 className='w-1/4 lg:w-1/5'>
                Facebook
              </h2>
              <ExternalLink href={`https://www.facebook.com/${member.facebook}`} className='hover:opacity-50'>
                {member.facebook}
              </ExternalLink>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}