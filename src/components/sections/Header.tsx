import {ActiveHeader} from "@/types/header";

export default function Header({active}: {active?: ActiveHeader}) {
  return (
    <header className="sticky top-0 bg-white h-16 border-b-1">
      ここはヘッダーです {active} がアクティブです
    </header>
  );
}