import type { FeatureItem } from "@/lib/types";

const FEATURE_IMAGES = [
  "/images/live-&-pre-match-betting.jpg",
  "/images/secure-transactions.jpg",
  "/images/competitive-odds.jpg",
  "/images/24-7-live-coverage.jpg",
] as const;

export function WhyUs({
  title,
  subtitle,
  features,
}: {
  title?: string;
  subtitle?: string;
  features?: FeatureItem[];
}) {
  if (!features?.length) return null;

  return (
    <section id="why-us" style={{ background: "rgba(0,0,0,0.2)" }}>
      <div className="container">
        <div className="title-wrapper" data-aos="fade-up">
          <h2 className="section-title">{title || "Why Consider Fairplay?"}</h2>
          {subtitle ? <p className="section-subtitle">{subtitle}</p> : null}
        </div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <div
              className="glass-card feature-card"
              data-aos="fade-up"
              data-aos-delay={String((index + 1) * 100)}
              key={feature.title || index}
            >
              <div className="feature-img-wrapper">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={FEATURE_IMAGES[index] || "/images/competitive-odds.jpg"}
                  alt={feature.title || "Feature"}
                />
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-desc">
                {(feature.description || "").split("\n").map((line, i, arr) => (
                  <span key={i}>
                    {line}
                    {i < arr.length - 1 ? <br /> : null}
                  </span>
                ))}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
