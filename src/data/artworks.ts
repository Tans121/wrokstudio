import type { Artwork, Category } from "../types/artwork";

/**
 * ポートフォリオに表示する作品。
 * 現在の内容は差し替え用の合成データであり、実在する制作実績ではない。
 */
export const artworks: readonly Artwork[] = [
  {
    id: 6,
    title: "LIMITLESS",
    category: "Graphic",
    year: "2026",
    description: "街の拍動が、私を彼方へと誘う。",
    services: ["Graphic Design", "Digital Art"],
    media: [
      {
        type: "image",
        src: "/works/limitless.png",
        alt: "透明を表現したグラフィック作品。",
      },
    ],
  },
  {
    id: 5,
    title: "扉 \n-Prologue-",
    category: "Graphic",
    year: "2026",
    description: "これらはドリップコーヒーである。これらはプレパラートである。これらは虚像である。\n私というフィルタによって抽出され、私という対物レンズによって観察され、私という鏡によって反映された世界の形である。",
    services: ["Graphic Design", "Digital Art"],
    media: [
      {
        type: "image",
        src: "/works/Prologue.png",
        alt: "紫とピンクのグラデーションに黄色の円を配置したPNGサンプル",
      },
    ],
  },
  {
    id: 4,
    title: "夜 \n-NIGHT-",
    category: "Graphic",
    year: "2026",
    description: "泥よけが壊れたチャリであてもなく漕ぎ出した夜は雨上がりで。",
    services: ["Graphic Design", "Digital Art"],
    media: [
      {
        type: "image",
        src: "/works/Night.png",
        alt: "オレンジと青の波形を描いたモーション作品のポスター画像",
      },
    ],
  },
  {
    id: 3,
    title: "透明  \n-TRANSPARENT-",
    category: "Graphic",
    year: "2026",
    description: "たしかにある、不可視。",
    services: ["Graphic Design", "Digital Art"],
    media: [
      {
        type: "image",
        src: "/works/Transparent.png",
        alt: "透明を表現したグラフィック作品。",
      },
    ],
  },
  {
    id: 2,
    title: "飛雨 -HIU-",
    category: "Graphic",
    year: "2025",
    description: "風に煽られ、雨は私を横切ってゆく。",
    services: ["Graphic Design", "Digital Art"],
    media: [
      {
        type: "image",
        src: "/works/Hiu.png",
        alt: "黒、白、赤の幾何学図形を用いたサンプルデザイン",
      },
    ],
  },
  {
    id: 1,
    title: "私たちがみている世界",
    category: "Graphic",
    year: "2026",
    description: "私たちの見ている世界は膨張、縮小を繰り返し、ついには枠組みをも越えてゆく。",
    services: ["Graphic Design", "Digital Art"],
    media: [
      {
        type: "image",
        src: "/works/World.png",
        alt: "黒、白、赤の幾何学図形を用いたサンプルデザイン",
      },
    ],
  },
];

/** 画面に表示する固定カテゴリ。 */
export const categories: readonly Category[] = [
  "All",
  "Graphic",
  "Motion",
  "Identity",
];

/** 指定カテゴリに一致する作品を返す。元配列は変更しない。 */
export function filterArtworks(category: Category): readonly Artwork[] {
  // Allの場合は分類を限定せず、登録順を維持して全作品を返す。
  if (category === "All") {
    return artworks;
  }

  return artworks.filter((artwork) => artwork.category === category);
}
