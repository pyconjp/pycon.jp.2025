# PyCon JP 2025 公式ウェブサイト

[PyCon JP 2025](https://2025.pycon.jp) の公式ウェブサイトのソースコードです。

## 概要

このプロジェクトは、PyCon JP 2025の公式サイトで、日本語と英語の2言語対応の静的サイトです。Next.js 15を使用し、Google SheetsとBlogger APIから動的にコンテンツを取得します。

## 技術スタック

- **フレームワーク**: Next.js 15.3.2 (SSG - Static Site Generation)
- **言語**: TypeScript 5, React 19
- **スタイリング**: Tailwind CSS 4
- **コンテンツ管理**: MDX
- **デプロイ**: Cloudflare Pages
- **外部API**: Google Sheets API, Blogger API

## はじめに

### 必要な環境

- Node.js 18以上
- npm または yarn

### セットアップ

1. リポジトリをクローン
   ```bash
   git clone https://github.com/pyconjp/pycon.jp.2025.git
   cd pycon.jp.2025
   ```

2. 依存関係をインストール
   ```bash
   npm install
   ```

3. 環境変数を設定
   ```bash
   cp .env.local.example .env.local
   ```
   `.env.local`ファイルに必要な環境変数を設定してください：
   - Google API認証情報（Sheets APIとBlogger API用）

4. 開発サーバーを起動
   ```bash
   npm run dev
   ```

[http://localhost:3000](http://localhost:3000) にアクセスして確認してください。

## 開発

### 主要なコマンド

```bash
npm run dev        # 開発サーバーの起動（Turbopack使用）
npm run build      # プロダクションビルド（サイトマップ生成含む）
npm start          # プロダクションサーバーの起動
npm run lint       # ESLintチェック

# ビルド前処理
npm run pre-build      # ビルド前にGoogle Drive画像同期とPretalxデータ取得を実行
npm run pre-build:dev  # 開発環境用（.envファイル使用）
```

### ビルド前処理（pre-build）について

`pre-build`スクリプトは、Next.jsのビルド前に以下の処理を自動実行します：

1. **Google Drive画像同期**
   - 設定されたGoogle Driveフォルダから画像をダウンロード
   - Cloudflare Imagesへ自動アップロード
   - メンバーやスポンサーの画像を最新化

2. **Pretalxデータ取得**
   - カンファレンスのスケジュールデータをフェッチ
   - スピーカー情報の同期

`npm run build`実行時に自動的に`pre-build`が呼ばれるため、通常は個別に実行する必要はありません。

### ディレクトリ構造

```
src/
├── components/
│   ├── elements/      # 基本UIコンポーネント
│   ├── sections/      # ページセクション（Header, Footer, Hero等）
│   ├── layout/        # レイアウトコンポーネント
│   └── markdown/      # MDXコンテンツ（言語別）
├── pages/
│   └── [locale]/      # 言語別のページ（ja/en）
├── libs/              # APIクライアント等のライブラリ
├── lang/              # 言語辞書ファイル
└── types/             # TypeScript型定義
```

### 多言語対応（i18n）

- URLパス: `/ja/...` または `/en/...`
- 言語辞書: `/src/lang/ja.ts` と `/src/lang/en.ts`
- MDXコンテンツ: `/src/components/markdown/[ja|en]/`
- Cookieベースの言語設定保持

### データ連携

#### Google Sheets API
- スポンサー情報
- スタッフ・メンバー情報

#### Blogger API
- ニュース・ブログ記事

### コンテンツの更新

#### 静的コンテンツ
MDXファイルを直接編集：
- `/src/components/markdown/ja/` - 日本語コンテンツ
- `/src/components/markdown/en/` - 英語コンテンツ

#### 動的コンテンツ
- スポンサー情報：Google Sheetsを更新後、再ビルド
- ニュース：Blogger管理画面から投稿

## デプロイ

mainブランチへのpush時に自動的にCloudflare Pagesへデプロイされます。
