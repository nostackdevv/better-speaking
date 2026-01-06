import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Extract params
    const score = searchParams.get("score") || "0";
    const fillers = searchParams.get("fillers") || "0";
    const words = searchParams.get("words") || "0";
    const duration = searchParams.get("duration") || "0:00";
    const topFiller = searchParams.get("topFiller") || "um";
    const grade = searchParams.get("grade") || "C · Good Progress";

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "#0f172b",
            fontFamily: "system-ui, -apple-system, sans-serif",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "24px",
              maxWidth: "520px",
              width: "100%",
            }}
          >
            {/* Logo & Branding */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginBottom: "16px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "8px",
                }}
              >
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "12px",
                    background:
                      "linear-gradient(135deg, #f97316 0%, #f43f5e 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg
                    fill="none"
                    height="20"
                    stroke="white"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="20"
                  >
                    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                    <line x1="12" x2="12" y1="19" y2="22" />
                  </svg>
                </div>
                <div
                  style={{
                    fontSize: "18px",
                    fontWeight: 600,
                    color: "white",
                    display: "flex",
                  }}
                >
                  SpeakClear
                </div>
              </div>
              <div
                style={{
                  fontSize: "14px",
                  color: "#94a3b8",
                  textAlign: "center",
                  display: "flex",
                  marginTop: "4px",
                }}
              >
                I just tracked how much I use filler words
              </div>
            </div>

            {/* Score Display */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <div
                style={{
                  fontSize: "12px",
                  color: "#94a3b8",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  marginBottom: "4px",
                  display: "flex",
                }}
              >
                Clarity Score
              </div>
              <div
                style={{
                  fontSize: "60px",
                  fontWeight: "bold",
                  color: "white",
                  marginBottom: "8px",
                  lineHeight: 1,
                  display: "flex",
                }}
              >
                {score}
              </div>
              <div
                style={{
                  display: "flex",
                  padding: "4px 12px",
                  background:
                    "linear-gradient(90deg, #f97316 0%, #f43f5e 100%)",
                  borderRadius: "999px",
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "white",
                }}
              >
                {grade}
              </div>
            </div>

            {/* Stats */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                width: "100%",
                marginBottom: "20px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "24px",
                  background: "rgba(30, 41, 59, 0.5)",
                  borderRadius: "12px",
                  padding: "16px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      fontSize: "20px",
                      fontWeight: "bold",
                      color: "white",
                      display: "flex",
                    }}
                  >
                    {duration}
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "#94a3b8",
                      display: "flex",
                    }}
                  >
                    Duration
                  </div>
                </div>
                <div
                  style={{
                    width: "1px",
                    background: "#334155",
                    display: "flex",
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      fontSize: "20px",
                      fontWeight: "bold",
                      color: "white",
                      display: "flex",
                    }}
                  >
                    {words}
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "#94a3b8",
                      display: "flex",
                    }}
                  >
                    Words
                  </div>
                </div>
                <div
                  style={{
                    width: "1px",
                    background: "#334155",
                    display: "flex",
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      fontSize: "20px",
                      fontWeight: "bold",
                      color: "#fb923c",
                      display: "flex",
                    }}
                  >
                    {fillers}
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "#94a3b8",
                      display: "flex",
                    }}
                  >
                    Fillers
                  </div>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  background: "rgba(30, 41, 59, 0.5)",
                  borderRadius: "12px",
                  padding: "12px",
                }}
              >
                <div
                  style={{
                    fontSize: "12px",
                    color: "#94a3b8",
                    display: "flex",
                  }}
                >
                  Most used filler
                </div>
                <div
                  style={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    color: "#fb923c",
                    display: "flex",
                  }}
                >
                  &quot;{topFiller}&quot;
                </div>
              </div>
            </div>

            {/* CTA */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                paddingTop: "16px",
                borderTop: "1px solid rgba(51, 65, 85, 0.5)",
                width: "100%",
              }}
            >
              <div
                style={{ fontSize: "12px", color: "#94a3b8", display: "flex" }}
              >
                Beat my score at
              </div>
              <div
                style={{
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "#fb923c",
                  display: "flex",
                }}
              >
                speakclear.app
              </div>
            </div>
          </div>
        </div>
      ),
      {
        width: 600,
        height: 800,
      }
    );
  } catch (error) {
    console.error("Error generating share image:", error);
    return new Response("Failed to generate image", { status: 500 });
  }
}
