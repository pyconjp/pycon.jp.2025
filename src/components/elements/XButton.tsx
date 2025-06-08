import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXTwitter} from "@fortawesome/free-brands-svg-icons";
import ExternalLink from "@/components/elements/ExternalLink";

export default function XButton() {
  return (
    <ExternalLink href="https://x.com/pyconjapan">
      <button
        className="border-[1px] border-black/30 font-bold min-w-[140px] min-h-[50px] py-2 px-4 rounded-full flex items-center justify-center space-x-4 cursor-pointer">
        <FontAwesomeIcon icon={faXTwitter} fixedWidth className="text-black"/>
        <span className="text-black/60">@pyconjapan</span>
      </button>
    </ExternalLink>
  );
}