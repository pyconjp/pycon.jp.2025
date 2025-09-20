# Cloudflare Pages ビルド設定

## 重要: ビルドコマンドの設定

Cloudflare Pages のダッシュボードで、以下のようにビルドコマンドを設定してください：

### 現在の設定（問題あり）
```bash
npx next build && npx next-on-pages
```

### 推奨設定（修正版）

#### オプション1: 現在の動作を維持（ビルド2回実行）
```bash
npm run build && npx next-on-pages
```
**注意**: これは現在の設定で、ビルドが2回実行されます。

#### オプション2: ビルドの重複を避ける（推奨）
```bash
npm run build && npx next-on-pages --skip-build
```
この設定では：
- `npm run build`でpre-build、Next.jsビルド、sitemapを実行
- `--skip-build`オプションでnext-on-pagesのビルドをスキップ

#### オプション3: next-on-pagesのみ使用
```bash
npx next-on-pages
```
**注意**: この場合、pre-buildスクリプトとsitemap生成は実行されません。

## なぜこの変更が必要か

1. **`npm run build`** は `package.json` で定義された以下のコマンドを実行します：
   ```bash
   npm run pre-build && echo NEXT_PUBLIC_BASE_URL=$CF_PAGES_URL > .env.production && next build && next-sitemap
   ```

2. **`pre-build`** スクリプトは以下を実行します：
   - Pretalx API からセッションデータを取得してキャッシュファイルを生成
   - Google Drive から画像を取得して Cloudflare Images にアップロード

3. 直接 `npx next build` を実行すると、pre-build スクリプトがスキップされ、キャッシュファイルが生成されません。

## キャッシュシステムについて

### 自動キャッシュ生成機能
`src/libs/pretalxCache.ts` に自動キャッシュ生成機能を実装しました。これにより：

- キャッシュファイルが存在しない場合、ビルド時に自動的に生成されます
- 一度生成されたキャッシュは `/data/pretalx-sessions.json` に保存されます
- 以降のビルドではキャッシュファイルが使用され、API 呼び出しが削減されます

### API 呼び出しの削減効果
- **Before**: ビルド時に約 180+ 回の Pretalx API 呼び出し
- **After**: 初回ビルドで 4 回、2 回目以降は 0 回

## 環境変数の設定

Cloudflare Pages の環境変数に以下を設定してください：

### 必須
- `PRETALX_API_KEY`: Pretalx API のアクセストークン

### オプション（画像同期用）
- `GOOGLE_SERVICE_ACCOUNT_EMAIL`: Google サービスアカウントのメール
- `GOOGLE_PRIVATE_KEY`: Google サービスアカウントの秘密鍵
- `GOOGLE_DRIVE_FOLDERS`: 同期するフォルダの設定（例: `members:folder_id1,sponsors:folder_id2`）
- `CLOUDFLARE_ACCOUNT_ID`: Cloudflare アカウント ID
- `CLOUDFLARE_API_TOKEN`: Cloudflare API トークン
- `CLOUDFLARE_ACCOUNT_HASH`: Cloudflare アカウントハッシュ（オプション）

## トラブルシューティング

### キャッシュファイルが生成されない場合
1. `PRETALX_API_KEY` 環境変数が設定されているか確認
2. ビルドログで `🔍 Looking for cache at:` メッセージを確認
3. `🔨 Generating Pretalx session cache...` メッセージが表示されるか確認

### API エラーが発生する場合
1. `PRETALX_API_KEY` が正しいか確認
2. ネットワーク接続を確認
3. Pretalx API のステータスを確認