/** 一覧フィルターで使用する作品カテゴリ。 */
export type Category = "All" | "Graphic" | "Motion" | "Identity";

/** 作品に登録できるメディア種別。 */
export type MediaType = "image" | "video";

/** 画像または動画1件の不変データ。 */
export interface ArtworkMedia {
  /** メディアの種類。 */
  readonly type: MediaType;

  /** publicディレクトリを基準にした公開パス。 */
  readonly src: string;

  /** 画像または動画の内容を示す説明。 */
  readonly alt: string;

  /** 動画読込前に表示するポスター画像。 */
  readonly poster?: string;

  /** 動画を無音で自動再生するか。 */
  readonly autoplay?: boolean;

  /** 動画を繰り返し再生するか。 */
  readonly loop?: boolean;
}

/** 一覧および詳細画面で使用する作品データ。 */
export interface Artwork {
  /** 作品ごとに一意な正の整数。 */
  readonly id: number;

  /** 画面に表示する作品名。 */
  readonly title: string;

  /** Allを除く作品カテゴリ。 */
  readonly category: Exclude<Category, "All">;

  /** 4桁の制作年。 */
  readonly year: string;

  /** 作品の概要。 */
  readonly description: string;

  /** 制作領域または担当領域。 */
  readonly services: readonly string[];

  /** 1件以上の画像または動画。先頭要素を一覧の代表メディアに使う。 */
  readonly media: readonly [ArtworkMedia, ...ArtworkMedia[]];
}
