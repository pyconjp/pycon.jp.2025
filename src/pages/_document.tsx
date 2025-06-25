import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  // TODO langを取得してlang属性を設定する
  return (
    <Html lang="ja">
      <Head>
        <link rel="icon" href="/common/favicon.ico" />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
