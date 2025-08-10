import {Lang} from "@/types/lang";
import {Member} from "@/types/member";
import CloudflareImage from "@/components/elements/CloudflareImage";
import {dictionary} from "@/lang";
import Link from "next/link";

type Props = {
  members: Member[];
  lang: Lang;
} & React.HTMLAttributes<HTMLElement>;

export default function MembersSection({members, lang, ...props}: Props) {
  const dict = dictionary[lang];

  return (
    <section {...props} className={props.className}>
      <h1 className='flex items-center gap-10 mb-12 lg:flex-row flex-col'>
        <span className='text-6xl font-bold font-jost'>Organizing Members</span>
        <span className='my-auto text-base'>主催メンバー</span>
      </h1>
      <div className='grid lg:grid-cols-2 grid-rows-1 lg:gap-10 gap-6'>
        {members.sort((a, b) => a.role_id - b.role_id).map((member, index) => (
          <Link key={index} href={`/${lang}/members/${member.path}`}>
            <div className='flex items-row gap-5 p-5 border-gray-200 border-2 rounded-xl'>
              <CloudflareImage
                category="members"
                fileName={member.image}
                fallbackSrc="/common/no_image.jpg"
                alt={lang === 'ja' ? (member.name_ja || member.name_en) : (member.name_en || member.name_ja)}
                width={110}
                height={110}
                className='aspect-square w-24 rounded-sm object-cover'
              />
              <div className='flex flex-col justify-between flex-1'>
                <h3 className='text-lg font-semibold'>
                  {lang === 'ja' ? (member.name_ja || member.name_en) : (member.name_en || member.name_ja)}
                </h3>
                {member.team && <span className='text-gray-700 text-sm'>
                  {dict.members.roles[member.role_id] || dict.members.team[member.team]}
                </span>}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}