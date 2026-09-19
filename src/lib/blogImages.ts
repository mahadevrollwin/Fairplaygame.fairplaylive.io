const BLOG_IMAGES = [
  {
    match: /explore.?an.?exciting|exciting.?online.?casino.?experience/i,
    src: "/images/blog-explore-exciting-experience.jpg",
  },
  {
    match: /ultimate.?online.?cricket.?betting.?id.?provider/i,
    src: "/images/blog-online-cricket-betting.jpg",
  },
  {
    match: /best.?cricket.?betting.?exchange/i,
    src: "/images/blog-cricket-betting-exchange.jpg",
  },
  {
    match: /top.?casino.?game.?betting.?sites/i,
    src: "/images/blog-casino-game-betting.jpg",
  },
] as const;

export function blogImage(post: {title?: string; slug?: string}): string {
  const haystack = `${post.title || ""} ${post.slug || ""}`;
  const match = BLOG_IMAGES.find((item) => item.match.test(haystack));
  return match?.src || "/images/logo.png";
}
