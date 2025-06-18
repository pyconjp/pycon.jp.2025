import XButton from "./XButton";
import GradationButton from "./GradationButton";

export default function FixedMenu() {
  return (
    <>
      <div className="z-10 fixed bottom-0 w-full h-[310px] p-4 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(160deg,transparent_61.52%,black_190.45%)] blur-md -z-10"></div>
      </div>
      <div className="z-20 fixed right-4 bottom-6 flex space-x-4 p-2 px-4 backdrop-blur-md bg-white rounded-full">
        <XButton/>
        <GradationButton label={"チケット購入"} link={"#"} />
      </div>
    </>
  )
}