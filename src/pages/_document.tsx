import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  // TODO langを取得してlang属性を設定する
  return (
    <Html lang="ja">
      <Head />
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
