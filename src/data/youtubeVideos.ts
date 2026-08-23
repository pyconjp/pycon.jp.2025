/**
 * セッションコード → YouTube 動画 ID のマッピング。
 *
 * 値は YouTube の動画 ID（`https://www.youtube.com/watch?v=` の後ろの部分）のみを記載する。
 * 例: https://www.youtube.com/watch?v=dQw4w9WgXcQ → 'dQw4w9WgXcQ'
 *
 * 空文字列のものは「動画が未公開 / リンクを表示しない」を意味する。
 * セッション詳細ページでは、値が入っているものだけリンクが表示される。
 *
 * ポスター / コミュニティポスターは配信がないため、この一覧には含めていない。
 */
export const YOUTUBE_VIDEO_IDS: Record<string, string> = {

  // ===== Day 1 (9/26) =====
  // [Special] 10:00 フェニックスホール / Day 1 Opening
  'GCDDKB': '',
  // [Talk] 10:30 ダリア1 / Hello, satellite data! ～Pythonではじめる衛星データ解析～
  'LVRXBM': '',
  // [Talk] 10:30 ダリア2 / Dress Code: How Python Writes the Future of Fashion
  'YXUFYT': '',
  // [Talk] 10:30 フェニックスホール / 【招待講演】PEP 750 の共同著者 青野高大 氏による Python3.14の新機能の紹介
  'TSUPAD': '',
  // [Talk] 10:30 ラン / Pythonで実現する堅牢なシステム設計 - イミュータブルがもたらす恩恵
  'PZPQMP': '',
  // [Talk] 11:15 ダリア1 / FastAPIの魔法をgRPC/Connect RPCへ -- Pydanticモデル駆動RPC開発
  'DTTQBQ': '',
  // [Talk] 11:15 ダリア2 / Pythonic Finance: Analyze Company Fundamentals with SEC EDGAR APIs
  'XH3SWN': '',
  // [Talk] 11:15 フェニックスホール / フロントエンドエンジニアが Python エンジニアになって見えた世界！
  'QQKEHS': '',
  // [Talk] 11:15 ラン / How big can python integers *really* get
  'WYFQFE': '',
  // [Talk] 12:00 ダリア1 / ReactPyを使ってreact likeにUIをPythonで実装する
  '3FCCFN': '',
  // [Talk] 12:00 ダリア2 / What does it take to create a language of your own in Python?
  '33HKWH': '',
  // [Talk] 12:00 フェニックスホール / マイエディタのすすめ
  'UPKVVC': '',
  // [Talk] 12:00 ラン / Pythonスレッドとは結局何なのか？ ~CPython実装から見るNoGIL時代の変化~
  '87DHE7': '',
  // [Talk] 13:30 ダリア1 / 複雑化したリポジトリをなんとかした話、pipenvからuvによるモノレポ構成への移行
  'EXQTNU': '',
  // [Talk] 13:30 ダリア2 / 明日からgraphlib、みんなで使おう
  'HJELML': '',
  // [Talk] 13:30 フェニックスホール / 【招待講演】医療職が始めるPython：1000人が集うコミュニティの創造
  'BRSMDS': '',
  // [Talk] 13:30 ラン / Fast, Universal Data Access with Apache Arrow ADBC
  'Q7YYNZ': '',
  // [Talk] 14:15 ダリア2 / Pythonだからできる、既存ソフトウェアの高効率なデバッグ方法
  'HNYAJY': '',
  // [Talk] 14:15 フェニックスホール / Python in Excelをより便利に使える実践プラクティスの紹介
  'J9QQRW': '',
  // [Talk] 14:15 ラン / Beyond Multiprocessing: A Real-World ML Workload Speedup with Python 3.13+ Free-Threading
  'HADBDX': '',
  // [Talk] 15:00 ダリア1 / Pythonだけでつながるあなたのアイディア、フロントエンドもPythonで
  'S8DUBR': '',
  // [Talk] 15:00 ダリア2 / Python and Friends - embedding Python
  'HH9URU': '',
  // [Talk] 15:00 フェニックスホール / SciPy Conferenceから学ぶ、科学とPythonをつなぐコミュニティの作り方〜オープンサイエンスを支えるスプリント文化とコラボレーションの実践〜
  'NYTXZR': '',
  // [Talk] 15:00 ラン / Django NinjaによるAPI開発の効率化とリプレースの実践
  'ZNSAA9': '',
  // [Special] 15:30 サクラ / Day 1 Poster Session
  '9KUYKK': '',
  // [Talk] 16:15 ダリア1 / OSS≒盆栽 〜個人的趣味として無理なくOSS開発をするときに意識したいこと〜
  'YMNPWD': '',
  // [Talk] 16:15 ダリア2 / Sweetski: A Python-Powered Dessert Adventure Through Japan
  'X93LDU': '',
  // [Talk] 16:15 フェニックスホール / 初心者向け：ゼロから作る自作LLM ― PyTorch実装とRAG連携入門
  'WXJ3ZG': '',
  // [Talk] 16:15 ラン / mypyの10年、pyrightの5年、tyの挑戦 - 型チェッカー進化論
  'SLYBTR': 'B3yjd1Bv0gQ',
  // [Special] 17:00 フェニックスホール / Day 1 Lightning Talks
  'TK7NJK': '',
  // [Special] 17:55 フェニックスホール / 【Day 1 Keynote】 Sebastián Ramírez 氏 Behind the scenes of FastAPI and friends for developers and builders
  'Y8UYKV': 'oKZnP_ECjnQ',
  // [Special] 18:55 フェニックスホール / Day 1 Closing
  'NE9BXD': '',

  // ===== Day 2 (9/27) =====
  // [Special] 09:40 フェニックスホール / Day 2 Opening
  'CY9JZH': 'tVxPWlndtKI',
  // [Special] 09:55 フェニックスホール / 一般社団法人PyCon JP Associationからの報告
  'ZJNKT7': '',
  // [Special] 10:20 コスモス / オープンスペース / Open Space
  'WFF8ZJ': '',
  // [Talk] 10:20 ダリア1 / Python×信号処理入門！スペクトログラムで視る音の世界
  'DRCDCV': 'SC6HDK96uJI',
  // [Talk] 10:20 ダリア2 / NetworkXとGNNで学ぶグラフデータ分析入門：複雑な関係性を解き明かすPythonの力
  '7MGHF9': 'wgOE0TtP_Eg',
  // [Special] 10:20 フェニックスホール / D&I（Diversity & Inclusion）パネルディスカッション (Panel Discussion)
  '9GTUWR': '',
  // [Talk] 10:20 ラン / AST Black Magic: Run synchronous Python code on asynchronous Pyodide
  'ZCX89J': 'kkjknP5tDdA',
  // [Talk] 11:05 ダリア1 / Pythonによるデータ処理のための分散フレームワーク選び
  'LG9EK3': 'aCgJSk0674I',
  // [Talk] 11:05 ダリア2 / 標準ライブラリのlogging、レゴブロックのように組合せてロギングできることを理解しよう！
  'Z8ZYFA': 'tSuSr2jFE0Q',
  // [Talk] 11:05 フェニックスホール / 【招待講演】広島から世界へ ― Pythonで描くデータサイエンスの新しい未来
  'QB78EG': '',
  // [Talk] 11:05 ラン / How I Built a CPU for Fun (and Didn’t Learn Verilog)
  '8EAGDB': 'qQglVxWz1b4',
  // [Talk] 11:50 ダリア1 / Webアプリケーションにおけるパスルーティングアルゴリズムの解剖
  'S9RPVX': '',
  // [Talk] 11:50 ダリア2 / タスクって今どうなってるの？3.14の新機能 asyncio ps と pstree でasyncioのデバッグを
  '9A8NPM': '',
  // [Talk] 11:50 フェニックスホール / ボロノイモザイクアートの作り方
  'AXAAZJ': '',
  // [Talk] 11:50 ラン / Goodbye GIL: Exploring the Free-threaded mode in Python 3.13 and Beyond
  'KLCT8T': 'Qa41zUOzZaU',
  // [Special] 12:20 コスモス / PyCon JP Association 公開 meeting
  '8ESUWG': '',
  // [Special] 13:20 コスモス / オープンスペース / Open Space
  '3XJHRW': '',
  // [Talk] 13:20 ダリア1 / Python製RDBMSで理解する、データベースのピース 〜コードのステップ実行とヘックスビューアーで内部動作を追ってみよう〜
  'D7D9R3': '',
  // [Talk] 13:20 ダリア2 / Weaponizing MCP Servers: Production-Ready AI Agent Infrastructure with Python
  'UX8DM8': 'jO4ypxwL_3I',
  // [Talk] 13:20 フェニックスホール / 【招待講演】＃普通の文系サラリーマンチャレンジ 自分でアプリ開発と電子工作を続けたら人生が変わった
  'NSJ7BU': '',
  // [Talk] 13:20 ラン / ビビってどうする：セキュアなPythonコードを目指して
  '8PAPQE': 'ZUD9P4t2W-4',
  // [Talk] 14:05 ダリア1 / Streamlit は社内ツールだけじゃない！PoCの速さで実現する"商用品質"の分析SaaSアーキテクチャ
  'ZEWVKF': '',
  // [Talk] 14:05 ダリア2 / How Fast Can We Go? Build a NumPy-Like Backend in C++ with Python Bindings
  'CHWSGG': 'vjesL7fwp9w',
  // [Talk] 14:05 フェニックスホール / Pythonによる契約プログラミング入門
  'PKNNAL': '',
  // [Talk] 14:05 ラン / pytest を爆速にする10の方法
  'ZFYREY': 'ffUfbG1G4v8',
  // [Talk] 14:50 ダリア1 / 育てるアーキテクチャ：戦い抜くPythonマイクロサービスの設計と進化戦略
  'CVUNWL': '_5lz4EsLs6w',
  // [Talk] 14:50 ダリア2 / Programming Lessons from Japanese Poetry
  'BFDEE7': 'p4sBA-ed4ck',
  // [Talk] 14:50 フェニックスホール / Python開発環境の整え方ライブデモ
  'SB3RDY': '',
  // [Talk] 14:50 ラン / PythonとLLMで挑む、4コマ漫画の構造化データ化
  'TATGYX': 'rQz_UUBS7u4',
  // [Special] 15:20 サクラ / Day 2 Poster Session
  'YB3CEX': '',
  // [Special] 16:05 フェニックスホール / Day 2 Lightning Talks
  'SZ9VJM': '',
  // [Special] 17:00 フェニックスホール / 【Day 2 Keynote】 プログラミングの未来を駆ける！~2年間の挑戦が見せてくれた、プログラミングのこれから~
  'RBZ9Y8': '',
  // [Special] 18:10 フェニックスホール / Day 2 Closing
  'HXTCWC': '',
};

/**
 * セッションコードに対応する YouTube 動画の URL を返す。
 * 動画 ID が未設定の場合は undefined を返す。
 */
export function getYoutubeVideoUrl(code: string): string | undefined {
  const videoId = YOUTUBE_VIDEO_IDS[code];
  return videoId ? `https://www.youtube.com/watch?v=${videoId}` : undefined;
}
