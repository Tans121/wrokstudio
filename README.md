# Motion Art Portfolio v4

PNGを含む画像、動画、複数メディアに対応したReact + TypeScript + Vite製ポートフォリオです。

## 対象環境

- Node.js 22.12以上、23未満
- npm 10.x
- UTF-8
- Windows、macOS、Linuxの現代的なブラウザー

## セットアップ

```bash
cd motion-art-portfolio_v4
npm install
npm run typecheck
npm run build
npm run dev
```

開発URLは `http://localhost:5173` です。

## worksフォルダーの場所

ZIPを展開すると、作品素材フォルダーは次の場所にあります。

```text
motion-art-portfolio_v4/
└─ public/
   └─ works/
      ├─ README.md
      ├─ sample-png.png
      ├─ sample-poster.svg
      ├─ sample-motion-poster.svg
      └─ sample-identity.svg
```

`src/works`ではなく、プロジェクト直下の`public/works`です。Windowsでは、エクスプローラーで`public`フォルダーを開き、その中の`works`を確認してください。

## 対応画像形式

ブラウザーで表示できる次の形式を作品画像として登録できます。

- PNG: `.png`
- WebP: `.webp`
- JPEG: `.jpg`、`.jpeg`
- GIF: `.gif`
- SVG: `.svg`

透過PNGにも対応します。コードではファイル形式に関係なく`type: "image"`を指定します。

## 画像の追加

1. 画像を `public/works/` に配置します。
2. `src/data/artworks.ts` の `artworks` 配列へ作品を追加します。

```ts
{
  id: 4,
  title: "NEW POSTER",
  category: "Graphic",
  year: "2026",
  description: "新しいポスター作品の説明。",
  services: ["Graphic Design"],
  media: [
    {
      type: "image",
      src: "/works/new-poster.png",
      alt: "PNG形式の新しいポスターの内容を説明する代替テキスト",
    },
  ],
}
```

## 動画の追加

動画とポスター画像を `public/works/` に配置し、次の形式で登録します。

```ts
{
  id: 5,
  title: "NEW MOTION",
  category: "Motion",
  year: "2026",
  description: "新しいモーション作品の説明。",
  services: ["Motion Design"],
  media: [
    {
      type: "video",
      src: "/works/new-motion.mp4",
      poster: "/works/new-motion-poster.webp",
      alt: "新しいモーション作品。抽象図形が連続的に変形する",
      autoplay: false,
      loop: true,
    },
  ],
}
```

一覧の先頭メディアが動画の場合、一覧では操作ボタンなしでメタデータのみを読み込みます。詳細モーダルでは動画コントロールを表示します。

## 複数メディアの追加

`media`配列へ画像や動画を複数登録します。詳細モーダルでは登録順に表示します。

```ts
media: [
  {
    type: "image",
    src: "/works/project-cover.webp",
    alt: "プロジェクトの表紙",
  },
  {
    type: "video",
    src: "/works/project-motion.mp4",
    poster: "/works/project-motion-poster.webp",
    alt: "プロジェクトのモーション展開",
    autoplay: false,
    loop: true,
  },
  {
    type: "image",
    src: "/works/project-detail.webp",
    alt: "プロジェクトの詳細デザイン",
  },
]
```

## 重要な規則

- `id`は重複しない正の整数にします。
- `media`には1件以上を登録します。
- 一覧の代表画像には`media`の先頭要素を使用します。
- 動画の自動再生を有効にすると自動的に無音になります。
- ファイル名には半角英数字、ハイフン、拡張子を使用してください。
- 実運用では素材の著作権と公開権限を確認してください。

## 主なファイル

- `src/data/artworks.ts`: 作品データ
- `src/types/artwork.ts`: 作品とメディアの型定義
- `src/MediaView.tsx`: 画像・動画表示
- `src/App.tsx`: 一覧、フィルター、詳細モーダル
- `src/style.css`: 改行・区分整理済みCSS
- `public/works/`: 作品素材
- `VALIDATION_v3.md`: 検証記録

## 仮情報

作品名、説明、年、`AO.STUDIO`、メールアドレス、Instagram URL、同梱SVGは差し替え用の合成情報です。

## PNG登録例

`public/works/my-artwork.png`を配置した場合は、`src/data/artworks.ts`へ次のように登録します。

```ts
{
  id: 10,
  title: "MY PNG ARTWORK",
  category: "Graphic",
  year: "2026",
  description: "PNG形式で制作した作品。",
  services: ["Graphic Design"],
  media: [
    {
      type: "image",
      src: "/works/my-artwork.png",
      alt: "作品の内容を具体的に説明する文章",
    },
  ],
}
```

パスの先頭は`/works/`です。`/public/works/`とは記述しません。
