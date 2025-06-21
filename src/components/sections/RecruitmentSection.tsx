import {Lang} from "@/types/lang";
import dynamic from "next/dynamic";
import clsx from "clsx";
import LinkButton from "@/components/elements/LinkButton";

type Props = { lang: Lang } & React.HTMLAttributes<HTMLElement>;

export default function RecruitmentSection({lang, ...props}: Props) {
  const RecruitmentProposal = dynamic(() => import(`@/components/markdown/${lang}/recruitment_proposal.mdx`), {ssr: true});
  const RecruitmentSponsor = dynamic(() => import(`@/components/markdown/${lang}/recruitment_sponsor.mdx`), {ssr: true});

  return (
    <section {...props}
             className={clsx('flex lg:flex-row flex-col p-6 lg:p-16 gap-10 bg-gray-100 border-2 border-gray-300 rounded-xl', props.className)}>
      <div className='flex-1 lg:space-y-12 space-y-6'>
        <h2 className='text-4xl font-semibold'>スピーカー募集</h2>
        <RecruitmentProposal/>
        <LinkButton href='https://pretalx.com/pycon-jp-2025/cfp'>
          スピーカー受付
        </LinkButton>
      </div>
      <div className='flex-1 space-y-12'>
        <h2 className='text-4xl font-semibold'>スポンサー募集</h2>
        <RecruitmentSponsor/>
        <LinkButton
          href='https://docs.google.com/forms/d/e/1FAIpQLSfCVLHY3zMR1z7YGy8aRyJiSa64pnVpById6UjNDiwD5K0VmQ/viewform'>
          スポンサー受付
        </LinkButton>
      </div>
    </section>
  )
}