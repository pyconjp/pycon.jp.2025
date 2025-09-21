import XButton from "./XButton";
import GradationButton from "./GradationButton";
import {Lang} from "@/types/lang";
import {dictionary} from "@/lang";

export default function FixedMenu({lang}: {lang: Lang}) {
  const dict = dictionary[lang];

  return (
    <>
      <div className="z-30 fixed bottom-0 w-full h-[310px] p-4 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_61.52%,black_190.45%)] lg:bg-[linear-gradient(160deg,transparent_61.52%,black_190.45%)] blur-md -z-10"></div>
      </div>
      <div className="z-40 fixed max-lg:right-0 max-lg:left-0 max-lg:mx-2 lg:right-4 bottom-2 lg:bottom-6 flex space-x-6 lg:space-x-4 p-2 lg:px-4 backdrop-blur-md bg-white rounded-full items-center justify-center">
        <XButton/>
        <GradationButton label={dict.button.buy_ticket} link="https://pyconjp.connpass.com/event/359523/" />
      </div>
    </>
  )
}