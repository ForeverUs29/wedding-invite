
import { useEffect, useRef, useState } from "react";

function ScratchReveal({ onContinue }) {
  const canvasRef = useRef(null);
  const isScratching = useRef(false);
  const scratchCount = useRef(0);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (revealed) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const drawCanvas = () => {
      const rect = canvas.getBoundingClientRect();

      if (!rect.width || !rect.height) return;

      const dpr = window.devicePixelRatio || 1;

      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const width = rect.width;
      const height = rect.height;

      const gradient = ctx.createLinearGradient(
        0,
        0,
        width,
        height
      );

      gradient.addColorStop(0, "#f9edcf");
      gradient.addColorStop(0.35, "#d6b46a");
      gradient.addColorStop(0.65, "#f8e8bf");
      gradient.addColorStop(1, "#c39a4b");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      ctx.strokeStyle = "rgba(255,255,255,0.65)";
      ctx.lineWidth = 1;
      ctx.strokeRect(
        9,
        9,
        width - 18,
        height - 18
      );

      ctx.fillStyle = "#765526";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      ctx.font = `bold ${Math.min(
        20,
        Math.max(13, width / 19)
      )}px Georgia, serif`;

      ctx.fillText(
        "✧ SCRATCH TO REVEAL ✧",
        width / 2,
        height / 2 - 12
      );

      ctx.font = "13px Georgia, serif";

      ctx.fillText(
        "A little surprise awaits you",
        width / 2,
        height / 2 + 20
      );
    };

    drawCanvas();

    const observer = new ResizeObserver(drawCanvas);
    observer.observe(canvas);

    return () => observer.disconnect();
  }, [revealed]);

  const scratch = (event) => {
    const canvas = canvasRef.current;

    if (!canvas || revealed) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();

    const dpr = window.devicePixelRatio || 1;

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    ctx.globalCompositeOperation = "destination-out";

    ctx.beginPath();
    ctx.arc(x, y, 25, 0, Math.PI * 2);
    ctx.fill();

    scratchCount.current += 1;

    if (scratchCount.current % 8 === 0) {
      const pixels = ctx.getImageData(
        0,
        0,
        canvas.width,
        canvas.height
      ).data;

      let transparent = 0;
      let total = 0;

      for (let i = 3; i < pixels.length; i += 32) {
        total++;

        if (pixels[i] < 50) {
          transparent++;
        }
      }

      if (
        total > 0 &&
        transparent / total > 0.38
      ) {
        setRevealed(true);
      }
    }
  };

  const startScratch = (event) => {
    isScratching.current = true;

    event.currentTarget.setPointerCapture?.(
      event.pointerId
    );

    scratch(event);
  };

  const moveScratch = (event) => {
    if (isScratching.current) {
      scratch(event);
    }
  };

  const stopScratch = () => {
    isScratching.current = false;
  };

  return (
    <section
      className="scratch-reveal-page"
      style={styles.page}
    >
      <div style={styles.card}>

        {/* SMALL BAPPA IMAGE */}

        <div style={styles.ganeshSection}>
          <img
            src="/bappa.png"
            alt="Shree Ganesh"
            style={styles.bappaImage}
          />

          <p style={styles.ganeshText}>
            ॥ श्री गणेशाय नमः ॥
          </p>
        </div>

        {/* HEADING */}

        <h2 style={styles.heading}>
          A beautiful new chapter
          <br />
          is about to begin...
        </h2>

        {/* SCRATCH AREA */}

        <div style={styles.scratchArea}>

          <div style={styles.hiddenMessage}>
            <h3 style={styles.names}>
              Riya &amp; Hardik
            </h3>

            <div style={styles.divider}>
              ✧ ✧
            </div>

            <p style={styles.weddingText}>
              ARE GETTING MARRIED!
            </p>
          </div>

          {!revealed && (
            <canvas
              ref={canvasRef}
              style={styles.canvas}
              onPointerDown={startScratch}
              onPointerMove={moveScratch}
              onPointerUp={stopScratch}
              onPointerCancel={stopScratch}
              onLostPointerCapture={stopScratch}
            />
          )}
        </div>

        {/* REVEAL BUTTON OR HINT */}

        {revealed ? (
          <div style={styles.revealActions}>
            <p style={styles.congratulations}>
              A new journey, a lifetime of love. ❤️
            </p>

            <button
              type="button"
              style={styles.button}
              onClick={onContinue}
            >
              Open Your Invitation →
            </button>
          </div>
        ) : (
          <p style={styles.hint}>
            Use your finger or mouse to scratch ✨
          </p>
        )}

      </div>
    </section>
  );
}

const styles = {
  page: {
    boxSizing: "border-box",
    width: "100%",
    minHeight: "100dvh",
    padding: "10px 12px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflowY: "auto",
    background:
      "linear-gradient(145deg, #fffaf0, #f3e4c7, #fff8ec)",
    fontFamily:
      "'Cormorant Garamond', Georgia, serif",
    color: "#60482c",
  },

  card: {
    boxSizing: "border-box",
    width: "100%",
    maxWidth: "560px",
    padding: "clamp(12px, 2.5dvh, 24px) 16px",
    textAlign: "center",
    background: "rgba(255,255,255,0.72)",
    border: "1px solid #d5b777",
    outline: "1px solid rgba(181,143,70,0.28)",
    outlineOffset: "-8px",
    boxShadow:
      "0 16px 45px rgba(104,75,35,0.12)",
  },

  ganeshSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "3px",
    marginBottom: "clamp(6px, 1.5dvh, 12px)",
  },

  bappaImage: {
    display: "block",
    width: "clamp(38px, 6dvh, 55px)",
    height: "clamp(38px, 6dvh, 55px)",
    objectFit: "contain",
    margin: "0 auto",
    flexShrink: 0,
  },

  ganeshText: {
    fontFamily:
      "'Great Vibes', 'Brush Script MT', cursive",
    fontSize: "clamp(19px, 4.5vw, 28px)",
    fontWeight: 400,
    color: "#9C641F",
    textAlign: "center",
    margin: 0,
    lineHeight: 1.3,
  },

  heading: {
    fontWeight: 400,
    fontSize: "clamp(24px, 5vw, 36px)",
    lineHeight: 1.2,
    margin: "0 0 10px",
  },

  scratchArea: {
    position: "relative",
    width: "100%",
    maxWidth: "430px",
    height: "clamp(130px, 25dvh, 220px)",
    margin: "0 auto",
    border: "2px solid #a8323e",
    background: "#fffaf0",
    overflow: "hidden",
  },

  hiddenMessage: {
    position: "absolute",
    inset: 0,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "12px",
    boxSizing: "border-box",
  },

  names: {
    fontFamily:
      "'Great Vibes', 'Brush Script MT', cursive",
    fontSize: "clamp(32px, 7vw, 49px)",
    fontWeight: 400,
    margin: "5px 0",
    color: "#a8323e",
  },

  divider: {
    color: "#b18a48",
    fontSize: "17px",
    margin: "2px 0 5px",
  },

  weddingText: {
    fontSize: "12px",
    letterSpacing: "1.5px",
    margin: "5px 0",
  },

  canvas: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    cursor: "crosshair",
    touchAction: "none",
  },

  hint: {
    fontSize: "14px",
    fontStyle: "italic",
    margin: "10px 0 0",
  },

  revealActions: {
    marginTop: "10px",
  },

  congratulations: {
    fontSize: "15px",
    fontStyle: "italic",
    margin: "0 0 10px",
  },

  button: {
    display: "inline-block",
    padding: "11px 20px",
    border: "1px solid #b28a45",
    borderRadius: "4px",
    background:
      "linear-gradient(135deg, #c6a15b, #a77a35)",
    color: "#fffdf7",
    fontFamily: "inherit",
    fontSize: "15px",
    fontWeight: 700,
    letterSpacing: "0.5px",
    cursor: "pointer",
    boxShadow:
      "0 5px 15px rgba(120,83,29,0.16)",
  },
};

export default ScratchReveal;
