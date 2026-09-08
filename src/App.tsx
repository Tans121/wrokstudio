import { useEffect, useMemo, useState } from "react";
import { categories, filterArtworks } from "./data/artworks";
import { MediaView } from "./MediaView";
import type { Artwork, Category } from "./types/artwork";

/** ページ内ナビゲーション1件の不変データ。 */
type NavigationItem = readonly [sectionId: string, label: string];

/** デスクトップとモバイルで共有するページ内ナビゲーション。 */
const navigationItems: readonly NavigationItem[] = [
  ["work", "Work"],
  ["about", "About"],
  ["contact", "Contact"],
];

/** 動きのある作品ポートフォリオのルート画面。 */
export default function App(): React.JSX.Element {
  /** 現在選択中のカテゴリ。 */
  const [category, setCategory] = useState<Category>("All");

  /** 詳細モーダルに表示する作品。 */
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);

  /** モバイルメニューの開閉状態。 */
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  /** 条件に一致する作品だけを、元配列を変更せずに保持する。 */
  const visibleArtworks = useMemo(() => filterArtworks(category), [category]);

  useEffect(() => {
    /** Escapeキーでモーダルまたはメニューを終了する。 */
    const handleKeyDown = (event: KeyboardEvent): void => {
      // Escape以外には反応せず、通常の文字入力やショートカットを妨げない。
      if (event.key !== "Escape") {
        return;
      }

      setSelectedArtwork(null);
      setIsMenuOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    // モーダル表示中だけ背景スクロールを停止し、閉じた後は必ず復元する。
    document.body.style.overflow = selectedArtwork === null ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedArtwork]);

  /** 指定セクションへ移動し、モバイルメニューを閉じる。 */
  const scrollToSection = (sectionId: string): void => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  return (
    <div id="top" className="site-shell">
      <header className="site-header">
        <button className="logo" onClick={() => scrollToSection("top")}>
          TANS<span>.</span>STUDIO
        </button>

        <nav className="desktop-navigation" aria-label="主要ナビゲーション">
          {navigationItems.map(([id, label]) => (
            <button key={id} onClick={() => scrollToSection(id)}>
              {label}
            </button>
          ))}
        </nav>

        <button
          className="menu-button"
          onClick={() => setIsMenuOpen((current) => !current)}
          aria-label="メニューを切り替え"
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? "×" : "☰"}
        </button>
      </header>

      {isMenuOpen && (
        <nav className="mobile-navigation" aria-label="モバイルナビゲーション">
          {navigationItems.map(([id, label]) => (
            <button key={id} onClick={() => scrollToSection(id)}>
              {label}
            </button>
          ))}
        </nav>
      )}

      <main>
        <section className="hero-section">
          <div className="hero-ring" aria-hidden="true" />
          <div className="hero-square" aria-hidden="true" />
          <p className="eyebrow">just uni-student · Osaka</p>
          <h1>
            Tans'
            <br />
            ART <span>Works.</span>
          </h1>
          <div className="hero-footer">
            <p>
              私がこれまで産み落とした子供達。
            </p>
            <button onClick={() => scrollToSection("work")} aria-label="作品一覧へ移動">
              ↓
            </button>
          </div>
        </section>

        <section id="work" className="work-section">
          <div className="section-heading">
            <div>
              <p className="eyebrow accent">Selected work · 2024–2026</p>
              <h2>Archive</h2>
            </div>
            <div className="filters" aria-label="作品カテゴリ">
              {categories.map((item) => (
                <button
                  key={item}
                  className={category === item ? "active" : ""}
                  onClick={() => setCategory(item)}
                  aria-pressed={category === item}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="artwork-grid">
            {visibleArtworks.map((artwork, index) => (
              <article className={`artwork-card card-layout-${index % 3}`} key={artwork.id}>
                <button
                  className="artwork-button"
                  onClick={() => setSelectedArtwork(artwork)}
                  aria-label={`${artwork.title}の詳細を表示`}
                >
                  <div className="artwork-media">
                    <MediaView media={artwork.media[0]} compact />
                    <span className="open-mark" aria-hidden="true">↗</span>
                  </div>
                  <div className="artwork-meta">
                    <div>
                      <h3>{artwork.title}</h3>
                      <p>{artwork.category}</p>
                    </div>
                    <strong>{artwork.year}</strong>
                  </div>
                </button>
              </article>
            ))}
          </div>
        </section>

        <section id="about" className="about-section">
          <p className="eyebrow">About the practice</p>
          <div>
            <h2>
              グラフィックデザイン×書道
              <p><span>アナログはデジタルと出会い、変容する。</span></p>
            </h2>
            <p className="about-copy">
              ただの大学生。
            </p>
          </div>
        </section>

        <section id="contact" className="contact-section">
          <p className="eyebrow">Have a project in mind?</p>
          <a href="mailto:hello@example.com">Let’s talk ↗</a>
          <footer>
            <span>© 2026 Tans Studio</span>
            <a href="https://www.instagram.com/paleo121_tans?stkn=OWExMXc3ODB2eTYy" target="_blank" rel="noreferrer">
              Instagram
            </a>
          </footer>
        </section>
      </main>

      {selectedArtwork !== null && (
        <div
          className="modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-labelledby="artwork-dialog-title"
          onMouseDown={(event) => {
            // 背景自体を押した場合だけ閉じ、モーダル内部の操作を維持する。
            if (event.target === event.currentTarget) {
              setSelectedArtwork(null);
            }
          }}
        >
          <div className="artwork-modal">
            <button
              className="close-button"
              onClick={() => setSelectedArtwork(null)}
              aria-label="詳細を閉じる"
              autoFocus
            >
              ×
            </button>

            <div className="detail-gallery">
              {selectedArtwork.media.map((media) => (
                <div className="detail-media" key={`${media.type}-${media.src}`}>
                  <MediaView media={media} />
                </div>
              ))}
            </div>

            <div className="modal-copy">
              <p className="eyebrow accent">
                {selectedArtwork.category} · {selectedArtwork.year}
              </p>
              <h2 id="artwork-dialog-title">{selectedArtwork.title}</h2>
              <p>{selectedArtwork.description}</p>
              <div className="service-list">
                {selectedArtwork.services.map((service) => (
                  <span key={service}>{service}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
