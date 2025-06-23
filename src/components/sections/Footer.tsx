import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFacebook, faXTwitter} from "@fortawesome/free-brands-svg-icons";
import Image from "next/image";
import {Lang} from "@/types/lang";
import {dictionary} from "@/lang";
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";
import ExternalLink from "@/components/elements/ExternalLink";

type Menu = {
  title: string;
  children: {
    title: string;
    url: string;
    isComingSoon: boolean;
    isExternal?: boolean;
  }[]
}

export const menu: Menu[] = [
  {
    title: "about",
    children: [
      {title: "coc", url: "/coc", isComingSoon: false},
      {title: "sponsors", url: "/sponsors", isComingSoon: false},
      {title: "members", url: "/members", isComingSoon: false},
    ],
  },
];

export default function Footer({lang}: { lang: Lang }) {
  const dict = dictionary[lang];

  return (
    <footer>
      <div className='bg-gray-900 w-full'>
        <div className='w-11/12 lg:w-10/12 flex mx-auto py-12 flex-col'>
          <Image src='/common/logo_pc.png' alt='logo' width={317} height={68} className='bg-white p-4 rounded-xl'/>
          <div className='grid mt-11 grid-cols-none grid-rows-1 gap-10 lg:grid-cols-4 lg:grid-rows-none lg:gap-0'>
            {menu.map((item, index) =>
              <div key={index} className='flex flex-col gap-4'>
                <h4 className='text-white font-bold text-lg'>
                  {dict.menu[item.title as keyof typeof dict.menu]}
                </h4>
                <ul className='flex flex-col gap-2'>
                  {item.children.map((child, childIndex) => (
                    <li key={childIndex}>
                      {
                        child.isComingSoon ?
                          <div className='text-gray-300'>
                            <div>{dict.menu[child.title as keyof typeof dict.menu]}
                              <span className='text-sm'>{' ' + dict.menu.coming_soon}</span>
                            </div>
                          </div> :
                          <Link href={child.isExternal ? child.url : `/${lang}${child.url}`}
                                className='text-white hover:opacity-80'>
                            {dict.menu[child.title as keyof typeof dict.menu]}
                          </Link>
                      }
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <hr className='border-white lg:mt-20 mt-10'/>
          <div className='flex flex-col gap-3 mt-4'>
            <div className='grid grid-cols-2 w-64 gap-4'>
              <div className='text-white'>
                Follow Us!
              </div>
              <Link href='https://twitter.com/pyconjapan' target='_blank' rel="noopener noreferrer"
                    className='text-white inline-flex items-center justify-between hover:opacity-80'>
                @pyconjapan
                <FontAwesomeIcon icon={faXTwitter} fixedWidth className='w-6 h-6 text-white'/>
              </Link>
              <div>
              </div>
              <Link href='https://www.facebook.com/PyConJP/' target='_blank' rel="noopener noreferrer"
                    className='text-white inline-flex items-center justify-between hover:opacity-80'>
                @PyConJP
                <FontAwesomeIcon icon={faFacebook} fixedWidth className='w-6 h-6 text-white'/>
              </Link>
            </div>
            <div className='text-white'>
              {dict.footer.contact_us} : <ExternalLink
              href='https://pyconjp.atlassian.net/servicedesk/customer/portal/5'
              className='text-white hover:opacity-80 underline'>PyCon JP 2025 Inquiries Form
            </ExternalLink>
            </div>
          </div>
          <div className='text-white mt-3 whitespace-pre-line break-words'>
            {dict.footer.description}
          </div>
          <div className='inline-flex justify-end mt-8 lg:mt-0 underline'>
            <Link href='https://www.pycon.jp/organizer/index.html' rel='noopener noreferrer' target='_blank'
                  className='text-secondary-300 hover:opacity-80 text-white'>
              {dict.footer.past_events}
            </Link>
            <FontAwesomeIcon icon={faArrowRight} className='h-6 text-secondary-300'/>
          </div>
        </div>
      </div>
      <div className="flex justify-center mb-20">
        <div className="flex flex-col lg:flex-row gap-2 bg-white lg:gap-10 lg:max-w-[653px] items-center p-10">
          <Link href="https://www.pycon.jp/" target="_blank" rel="noopener noreferrer" className="hover:opacity-80">
            <Image
              src='/common/logo_association.svg'
              alt="Pycon JP Association Logo"
              height={143}
              width={85}
              className="lg:w-64 w-32 p-2"
            />
          </Link>
          <div>
            <div className="text-black">
              主催: 一般社団法人PyCon JP Association PyCon JP 2025 is a production
              of the PyCon JP Association
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