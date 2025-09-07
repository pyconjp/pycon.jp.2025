import Link from "next/link";
import CloudflareImage from "@/components/elements/CloudflareImage";
import {Lang} from "@/types/lang";
import {dictionary} from "@/lang";
import ExternalLink from "@/components/elements/ExternalLink";
import {footerMenu, menu} from "@/data/menu";
import Tooltip from "rc-tooltip";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Footer({lang}: { lang: Lang }) {
  const dict = dictionary[lang];

  return (
    <footer className='bg-white'>
      <div className='w-10/12 lg:max-w-[1000px] mx-auto pt-11 flex flex-col lg:flex-row items-stretch max-lg:gap-4'>
        <div className='flex-1'>
          <CloudflareImage category='common' fileName='logo_footer.svg' fallbackSrc='/common/logo_footer.svg' alt='PyCon JP 2025 Logo' width={280} height={80} className='mb-6'/>
          <ExternalLink href='https://x.com/pyconjapan'
                        className='flex flex-row justify-between border-2 border-gray-200 rounded-r-full rounded-l-full py-3 px-8 w-full lg:w-80 mb-5'>
            <span className='font-semibold'>X</span>
            <span className='font-semibold text-gray-500'>@pyconjapan</span>
          </ExternalLink>
          <ExternalLink href='https://www.facebook.com/PyConJP/'
                        className='flex flex-row justify-between border-2 border-gray-200 rounded-r-full rounded-l-full py-3 px-8 w-full lg:w-80'>
            <span className='font-semibold'>Facebook</span>
            <span className='font-semibold text-gray-500'>@PyConJP</span>
          </ExternalLink>
        </div>
        <nav className='flex-1 flex lg:flex-row flex-col max-lg:gap-4 items-stretch pt-6'>
          <ul className='flex-1 flex flex-col justify-between max-lg:gap-4'>
            {menu.map((menuItem, index) => (
              <li key={index}>
                {!menuItem.isComingSoon
                  ? (
                    <Link href={menuItem.href} className='font-bold cursor-pointer'>
                      {dict.menu[menuItem.key]}
                    </Link>
                  )
                  : (
                    <Tooltip overlay={<span>{dict.menu.coming_soon}</span>} trigger={['hover', 'click']}
                             placement='right'>
                      <span className='font-bold cursor-pointer'>
                        {dict.menu[menuItem.key]}
                      </span>
                    </Tooltip>
                  )}
              </li>
            ))}
          </ul>
          <ul className='flex-1 flex flex-col justify-between max-lg:gap-4'>
            {footerMenu.map((menuItem, index) => (
              <li key={index}>
                {!menuItem.isClosed
                  ? (
                    <ExternalLink href={menuItem.href} className='font-bold cursor-pointer'>
                      {dict.menu[menuItem.key]}
                    </ExternalLink>
                  )
                  : (
                    <Tooltip overlay={<span>{dict.menu.ended}</span>} trigger={['hover', 'click']}
                             placement='right'>
                      <span className='font-bold cursor-not-allowed opacity-50'>
                        {dict.menu[menuItem.key]}
                      </span>
                    </Tooltip>
                  )}
              </li>
            ))}
            <span className='max-lg:hidden h-6'/>
            <li>
              <ExternalLink href='https://www.pycon.jp/organizer/index.html' className='font-bold cursor-pointer'>
                {dict.footer.past_events}
              </ExternalLink>
            </li>
          </ul>
        </nav>
      </div>
      <div className='w-10/12 lg:max-w-[1000px] mx-auto py-16 flex flex-col lg:flex-row lg:items-center lg:gap-6 gap-4'>
        <ExternalLink href={'https://pyconjp.atlassian.net/servicedesk/customer/portal/5'} className='w-full border-gray-300 border flex justify-between items-center p-4 lg:p-6 rounded-lg lg:rounded-xl text-sm lg:text-base font-semibold flex-1'>
          <span className='flex flex-col'>
            <span className='font-semibold'>{dict.footer.contact_us}</span>
            <span className='text-gray-500 font-semibold text-sm'>PyCon JP 2025 Inquiries Form</span>
          </span>
          <FontAwesomeIcon icon={faArrowRight}/>
        </ExternalLink>
        <div className='flex-1'>
          {dict.footer.description}
        </div>
      </div>
      <hr className='text-gray-300'/>
      <div className="flex justify-center mb-20">
        <div className="flex flex-col lg:flex-row gap-2 bg-white lg:gap-10 lg:max-w-[653px] items-center p-10">
          <Link href="https://www.pycon.jp/" target="_blank" rel="noopener noreferrer" className="hover:opacity-80">
            <CloudflareImage
              category='common'
              fileName='logo_association.svg'
              fallbackSrc='/common/logo_association.svg'
              alt="Pycon JP Association Logo"
              height={143}
              width={85}
              className="lg:w-64 w-32 p-2"
            />
          </Link>
          <div>
            <div className="text-black text-sm lg:text-nowrap">
              主催: 一般社団法人PyCon JP Association<br/>PyCon JP 2025 is a production of the PyCon JP Association
            </div>
            <Link href='https://www.pycon.jp/policies/privacy-policy.html' target='_blank' rel='noopener noreferrer'
                  className='text-primary-300 underline text-sm hover:opacity-80'>
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}