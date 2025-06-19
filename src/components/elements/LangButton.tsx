import {Lang} from "@/types/lang";
import {useRouter} from "next/router";
import React from "react";
import clsx from "clsx";

export default function LangButton({lang, isTop}: { lang: Lang, isTop?: boolean }) {
  const path = useRouter().pathname;

  const onClick = () => {
    const newLang = lang === 'ja' ? 'en' : 'ja';
    document.cookie = `lang=${newLang}; path=/; max-age=31536000`; // 1 year
    location.href = path.replace('/[lang]', `/${newLang}`);
  }

  const InActive = ({children}: { children: React.ReactNode }) => (
    <span className={clsx('cursor-pointer font-bold', {
      'text-gray-400': !isTop,
      'text-blur opacity-50': isTop,
    })} onClick={onClick}>
      {children}
    </span>
  );
  const Active = ({children}: { children: React.ReactNode }) => (
    <span className={clsx('font-bold border-b-1', {
      'text-blur': isTop,
    })}>
      {children}
    </span>
  );

  return (
    <div className={clsx('w-16 lg:w-24 flex flex-row items-center justify-between rounded-md py-2 px-3', {
      'bg-gray-200': !isTop,
      'bg-white': isTop
    })}>
      {lang === 'ja'
        ? <><Active>JP</Active><span
          className={clsx('hidden', {'lg:inline': !isTop})}>/</span><InActive>EN</InActive></>
        : <><InActive>JP</InActive><span
          className={clsx('hidden', {'lg:inline': !isTop})}>/</span><Active>EN</Active></>
      }
    </div>
  );
}