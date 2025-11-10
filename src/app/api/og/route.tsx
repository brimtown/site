import { ImageResponse } from "@vercel/og";

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") || "Blog Post";
  const subtitle = searchParams.get("subtitle") || "";
  const date = searchParams.get("date") || "";
  const leftColumn = searchParams.get("leftColumn") || "";
  const rightColumn = searchParams.get("rightColumn") || "";

  // Format date
  let formattedDate = "";
  if (date) {
    const [year, month, day] = date.split("-").map(Number);
    const dateObj = new Date(year, month - 1, day);
    formattedDate = dateObj.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  // Fetch Inter fonts from jsdelivr (both weights we use)
  const [fontData400, fontData500] = await Promise.all([
    fetch(
      "https://cdn.jsdelivr.net/fontsource/fonts/inter@latest/latin-400-normal.woff"
    ).then((res) => res.arrayBuffer()),
    fetch(
      "https://cdn.jsdelivr.net/fontsource/fonts/inter@latest/latin-500-normal.woff"
    ).then((res) => res.arrayBuffer()),
  ]);

  // Use aggressive caching in production, no-cache in development
  const isDevelopment = process.env.NODE_ENV === "development";
  const cacheControl = isDevelopment
    ? "no-cache, no-store, must-revalidate"
    : "public, immutable, max-age=31536000, s-maxage=31536000";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#fcd34d",
          padding: "80px",
        }}
      >
        {/* Title */}
        <h1
          style={{
            fontSize: 72,
            fontWeight: 500,
            fontFamily: "Inter",
            color: "#0c0c0c",
            marginBottom: 36,
            lineHeight: 1.2,
            letterSpacing: "-0.02em",
            margin: 0,
          }}
        >
          {title}
        </h1>

        {/* Subtitle */}
        {subtitle && (
          <p
            style={{
              fontSize: 36,
              fontFamily: "Inter",
              width: "68%",
              color: "rgba(12, 12, 12, 0.7)",
              margin: "0 0 60px 0",
              lineHeight: 1.4,
            }}
          >
            {subtitle}
          </p>
        )}

        {/* Byline and date */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            paddingBottom: "40px",
            borderBottom: "12px solid rgba(0, 0, 0, 0.05)",
          }}
        >
          <div
            style={{
              fontSize: 24,
              fontWeight: 500,
              fontFamily: "Inter",
              color: "#0c0c0c",
            }}
          >
            by @_brimtown
          </div>
          {formattedDate && (
            <div
              style={{
                fontSize: 20,
                fontWeight: 500,
                fontFamily: "Inter",
                color: "rgba(12, 12, 12, 0.6)",
                letterSpacing: "0.02em",
              }}
            >
              {formattedDate}
            </div>
          )}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Inter",
          data: fontData400,
          style: "normal",
          weight: 400,
        },
        {
          name: "Inter",
          data: fontData500,
          style: "normal",
          weight: 500,
        },
      ],
      headers: {
        "Cache-Control": cacheControl,
      },
    }
  );
}
