import {Lang} from "@/types/lang";
import {useRouter} from "next/router";
import React from "react";

export default function LangButton({lang}: { lang: Lang }) {
  const path = useRouter().pathname;

  const onClick = () => {
    const newLang = lang === 'ja' ? 'en' : 'ja';
    document.cookie = `lang=${newLang}; path=/; max-age=31536000`; // 1 year
    location.href = path.replace('/[lang]', `/${newLang}`);
  }

  const InActive = ({children}: { children: React.ReactNode }) => (
    <span className='cursor-pointer text-gray-400 font-bold' onClick={onClick}>
      {children}
    </span>
  );
  const Active = ({children}: { children: React.ReactNode }) => (
    <span className='font-bold border-b-1'>
      {children}
    </span>
  );

  return (
    <div className={'w-24 flex flex-row items-center justify-between bg-gray-200 rounded-lg py-2 px-3'}>
      {lang === 'ja'
        ? <><Active>JA</Active><span>/</span><InActive>EN</InActive></>
        : <><InActive>JA</InActive><span>/</span><Active>EN</Active></>
      }
    </div>
  );
}