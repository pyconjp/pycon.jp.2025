import {Lang} from "@/types/lang";
import {useRouter} from "next/router";
import React from "react";

export default function LangButton({lang}: { lang: Lang }) {
  const path = useRouter().route;
  const query = useRouter().query;

  const onClick = () => {
    const newLang = lang === 'ja' ? 'en' : 'ja';
    document.cookie = `lang=${newLang}; path=/; max-age=31536000`; // 1 year
    location.href = Object.keys(query)
      .reduce(
        (acc, key) => {
          if (key !== 'lang') {
            return acc.replace(`[${key}]`, query[key] as string);
          }
          return acc;
        },
        path.replace('[lang]', newLang)
      );
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
    <div className={'w-16 lg:w-24 flex flex-row items-center justify-between bg-gray-200 rounded-md py-2 px-3'}>
      {lang === 'ja'
        ? <><Active>JP</Active><span className='lg:inline hidden'>/</span><InActive>EN</InActive></>
        : <><InActive>JP</InActive><span className='lg:inline hidden'>/</span><Active>EN</Active></>
      }
    </div>
  );
}