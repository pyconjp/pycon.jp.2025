import {ActiveHeader} from "@/types/header";

export default function Header({active}: {active?: ActiveHeader}) {
  return (
    <header className="sticky top-0 bg-white">
      ここはヘッダーです {active} がアクティブです
    </header>
  );
}