export const ModalTest = () => {
  const colorScheme = {
    "orange-400": "#ff8904",
    white: "#ffffff",
  };
  const scale = 1;

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0f172b",
        color: "#90a1b9",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: `${40 * scale}px ${24 * scale}px`,
          maxWidth: `${520 * scale}px`,
          width: "100%",
          gap: 16 * scale,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8 * scale,
            color: "#fff",
            fontSize: 20 * scale,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 40 * scale,
              height: 40 * scale,
              borderRadius: 12 * scale,
              background: "linear-gradient(to bottom right, #f97316, #f43f5e)",
            }}
          >
            <svg
              fill="none"
              height="20" // Keep these static
              stroke="#ffffff"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2} // Keep static
              viewBox="0 0 24 24" // Keep static
              width="20" // Keep static
              xmlns="http://www.w3.org/2000/svg"
              style={{
                width: 20 * scale, // Scale via style instead
                height: 20 * scale,
              }}
            >
              <path d="M12 19v3"></path>
              <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
              <rect height="13" rx="3" width="6" x="9" y="2"></rect>
            </svg>
          </div>
          <div style={{ fontWeight: 600 }}>Speecha</div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            fontSize: 14 * scale,
            color: "#90a1b9",
            marginBottom: 14 * scale,
          }}
        >
          <div>I just tracked how much filler words</div>
          <div>I use while speaking</div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: 20 * scale,
          }}
        >
          <div
            style={{
              fontSize: 12 * scale,
              color: "#94a3b8",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            Clarity Score
          </div>
          <div
            style={{
              fontSize: 60 * scale,
              fontWeight: 700,
              color: "#ffffff",
              marginBottom: 8 * scale,
            }}
          >
            22
          </div>
          <div
            style={{
              display: "flex",
              paddingLeft: 12 * scale,
              paddingRight: 12 * scale,
              paddingTop: 4 * scale,
              paddingBottom: 4 * scale,
              background: "linear-gradient(to right, #f97316, #f43f5e)",
              color: "#ffffff",
              fontSize: 12 * scale,
              fontWeight: 600,
              borderRadius: 9999,
            }}
          >
            F · Keep Practicing
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8 * scale,
            marginBottom: 20 * scale,
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 24 * scale,
              backgroundColor: "rgba(30, 41, 59, 0.5)",
              borderRadius: 12 * scale,
              padding: 16 * scale,
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
                  fontSize: 20 * scale,
                  fontWeight: 700,
                  color: "#ffffff",
                }}
              >
                0:34
              </div>
              <div style={{ fontSize: 12 * scale, color: "#94a3b8" }}>
                Duration
              </div>
            </div>
            <div style={{ width: 1 * scale, backgroundColor: "#334155" }}></div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  fontSize: 20 * scale,
                  fontWeight: 700,
                  color: "#ffffff",
                }}
              >
                96
              </div>
              <div style={{ fontSize: 12 * scale, color: "#94a3b8" }}>
                Words
              </div>
            </div>
            <div style={{ width: 1 * scale, backgroundColor: "#334155" }}></div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  fontSize: 20 * scale,
                  fontWeight: 700,
                  color: "#ff8904",
                }}
              >
                9
              </div>
              <div style={{ fontSize: 12 * scale, color: "#94a3b8" }}>
                Fillers
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: "rgba(30, 41, 59, 0.5)",
              borderRadius: 12 * scale,
              padding: 12 * scale,
            }}
          >
            <div style={{ fontSize: 12 * scale, color: "#94a3b8" }}>
              Most used filler
            </div>
            <div
              style={{
                fontSize: 18 * scale,
                fontWeight: 700,
                color: "#ff8904",
              }}
            >
              &quot;like&quot;
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 10 * scale,
            paddingTop: 24 * scale,
            borderTop: `${1 * scale}px solid #314158`,
          }}
        >
          <div style={{ fontSize: 14 * scale }}>Beat my score at</div>
          <div
            style={{
              fontSize: 16 * scale,
              fontWeight: 600,
              color: "#ff8904",
            }}
          >
            speecha.app
          </div>
        </div>
      </div>
    </div>
  );
};
