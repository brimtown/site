import { ImageResponse } from "@vercel/og";

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") || "Blog Post";
  const subtitle = searchParams.get("subtitle") || "";
  const date = searchParams.get("date") || "";
  const leftColumn = searchParams.get("leftColumn") || "";
  const rightColumn = searchParams.get("rightColumn") || "";

  // Format date (for backward compatibility with blog posts)
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

  // Determine what to show in bottom columns
  // leftColumn takes precedence, otherwise default to "by @_brimtown"
  const displayLeftColumn = leftColumn || "by @_brimtown";
  // rightColumn takes precedence, otherwise use formatted date if available
  const displayRightColumn = rightColumn || formattedDate;

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
    : "public, max-age=600, s-maxage=600"; // 10 minutes - bump later when styling is stable

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
            lineHeight: 1.2,
            letterSpacing: "-0.02em",
            margin: "0 0 24px 0",
          }}
        >
          {title}
        </h1>

        {/* Subtitle */}
        {subtitle && (
          <p
            style={{
              fontSize: 40,
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

        {/* Bottom columns (flexible: byline/date or custom content) */}
        {(displayLeftColumn || displayRightColumn) && (
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
            {displayLeftColumn && (
              <div
                style={{
                  fontSize: 30,
                  fontWeight: 500,
                  fontFamily: "Inter",
                  color: "#0c0c0c",
                }}
              >
                {displayLeftColumn}
              </div>
            )}
            {displayRightColumn && (
              <div
                style={{
                  fontSize: 30,
                  fontWeight: 500,
                  fontFamily: "Inter",
                  color: "rgba(12, 12, 12, 0.6)",
                  letterSpacing: "0.02em",
                }}
              >
                {displayRightColumn}
              </div>
            )}
          </div>
        )}
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
