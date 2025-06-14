import XButton from "./XButton";
import GradationButton from "./GradationButton";

export default function FixedMenu() {
  return (
    <div className="z-10 fixed bottom-0 w-full h-[310px] md:p-4">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_50.52%,black_190.45%)] md:bg-[linear-gradient(160deg,transparent_61.52%,black_190.45%)] blur-md -z-10"></div>
      <div className="absolute max-md:mx-10 right-0 left-0 md:right-4 bottom-6 space-x-2 p-2 px-4 backdrop-blur-md bg-white rounded-full flex justify-center items-center md:space-x-6">
        <XButton/>
        <GradationButton label={"チケット購入"} link={"#"} />
      </div>
    </div>
  )
}