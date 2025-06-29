import {Lang} from "@/types/lang";
import dynamic from "next/dynamic";
import clsx from "clsx";
import LinkButton from "@/components/elements/LinkButton";
import {dictionary} from "@/lang";

type Props = { lang: Lang } & React.HTMLAttributes<HTMLElement>;

export default function RecruitmentSection({lang, ...props}: Props) {
  const dict = dictionary[lang];

  const RecruitmentProposal = dynamic(() => import(`@/components/markdown/${lang}/recruitment_proposal.mdx`), {ssr: true});
  const RecruitmentSponsor = dynamic(() => import(`@/components/markdown/${lang}/recruitment_sponsor.mdx`), {ssr: true});

  return (
    <section {...props}
             className={clsx('flex lg:flex-row flex-col items-stretch p-6 lg:p-16 gap-10 bg-gray-100 border-2 border-gray-300 rounded-xl mb-15', props.className)}>
      <div className='flex-1 flex flex-col justify-between gap-6'>
        <div>
          <h2 className='text-4xl font-semibold'>{dict.top.speaker_recruitment}</h2>
          <div className='text-sm lg:mt-8 mt-6'>
            <RecruitmentProposal/>
          </div>
        </div>
        <div className='mt-auto'>
          <LinkButton href='https://pretalx.com/pycon-jp-2025/cfp'>
            {dict.top.speaker_registration}
          </LinkButton>
        </div>
      </div>
      <div className='flex-1 flex flex-col justify-between gap-6'>
        <div>
          <h2 className='text-4xl font-semibold'>{dict.top.sponsor_recruitment}</h2>
          <div className='text-sm lg:mt-8 mt-6'>
            <RecruitmentSponsor/>
          </div>
        </div>
        <div className='mt-auto'>
          <LinkButton
            href='https://docs.google.com/forms/d/e/1FAIpQLSfCVLHY3zMR1z7YGy8aRyJiSa64pnVpById6UjNDiwD5K0VmQ/viewform'>
            {dict.top.sponsor_registration}
          </LinkButton>
        </div>
      </div>
    </section>
  )
}