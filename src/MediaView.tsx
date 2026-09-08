import type { ArtworkMedia } from "./types/artwork";

interface MediaViewProps {
  /** 表示する画像または動画。 */
  readonly media: ArtworkMedia;

  /** 一覧用の控えめな再生設定を使うか。 */
  readonly compact?: boolean;
}

/** 画像と動画を同一レイアウトで安全に表示する。 */
export function MediaView({ media, compact = false }: MediaViewProps): React.JSX.Element {
  // 動画だけにvideo要素を使用し、画像へ動画属性が混入することを防ぐ。
  if (media.type === "video") {
    return (
      <video
        className="media-view"
        src={media.src}
        poster={media.poster}
        controls={!compact}
        autoPlay={media.autoplay ?? false}
        muted={media.autoplay ?? false}
        loop={media.loop ?? false}
        playsInline
        preload={compact ? "metadata" : "auto"}
        aria-label={media.alt}
      >
        お使いのブラウザーは動画再生に対応していません。
      </video>
    );
  }

  return (
    <img
      className="media-view"
      src={media.src}
      alt={media.alt}
      loading={compact ? "lazy" : "eager"}
      decoding="async"
    />
  );
}
