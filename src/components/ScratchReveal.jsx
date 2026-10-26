
import { useEffect, useRef, useState } from "react";

function ScratchReveal({ onContinue }) {
  const canvasRef = useRef(null);
  const isScratching = useRef(false);
  const scratchCount = useRef(0);
  const [revealed, setRevealed] = useState(false);

  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const gradient = ctx.createLinearGradient(
      0, 0, canvas.width, canvas.height
    );
    gradient.addColorStop(0, "#f9edcf");
    gradient.addColorStop(0.35, "#d6b46a");
    gradient.addColorStop(0.65, "#f8e8bf");
    gradient.addColorStop(1, "#c39a4b");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "rgba(255,255,255,0.65)";
    ctx.lineWidth = 1;
    ctx.strokeRect(9, 9, canvas.width - 18, canvas.height - 18);

    ctx.fillStyle = "#765526";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "24px Georgia, serif";
    ctx.fillText("✧  SCRATCH TO REVEAL  ✧", canvas.width / 2, canvas.height / 2 - 10);

    ctx.font = "13px Georgia, serif";
    ctx.fillText("A little surprise awaits you", canvas.width / 2, canvas.height / 2 + 23);
  }, []);

  const scratch = (event) => {
    const canvas = canvasRef.current;
    if (!canvas || revealed) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 24, 0, Math.PI * 2);
    ctx.fill();

    scratchCount.current += 1;

    if (scratchCount.current % 8 === 0) {
      const pixels = ctx.getImageData(
        0, 0, canvas.width, canvas.height
      ).data;

      let transparent = 0;
      let total = 0;

      for (let i = 3; i < pixels.length; i += 32) {
        total++;
        if (pixels[i] < 50) transparent++;
      }

      if (total > 0 && transparent / total > 0.38) {
        setRevealed(true);
      }
    }
  };

  const startScratch = (event) => {
    isScratching.current = true;
    event.currentTarget.setPointerCapture?.(event.pointerId);
    scratch(event);
  };

  const moveScratch = (event) => {
    if (isScratching.current) scratch(event);
  };

  const stopScratch = () => {
    isScratching.current = false;
  };

  return (
    <section className="scratch-reveal-page" style={styles.page}>
       
     <div style={styles.card}>
<p
  style={{
    fontFamily: "'Great Vibes', 'Brush Script MT', cursive",
    fontSize: "clamp(22px, 5vw, 32px)",
    fontWeight: "400",
    color: "#9C641F",
    letterSpacing: "0px",
    textAlign: "center",
    margin: "0 auto 20px",
    lineHeight: "1.5",
    width: "100%",
    maxWidth: "100%",
    boxSizing: "border-box",
    overflowWrap: "break-word",
    padding: "0 8px",
  }}
>
  Shri Ganeshay Namah
</p>

  <div style={styles.ornament}>❦</div>

                <h2 style={styles.heading}>
          A beautiful new chapter
          <br />
          is about to begin...
        </h2>

       

        <div style={styles.scratchArea}>
          <div style={styles.hiddenMessage}>
  <h3 style={styles.names}>Riya &amp; Hardik</h3>
  <div style={styles.divider}>✧ ❦ ✧</div>
  <p style={styles.weddingText}>ARE GETTING MARRIED!</p>
</div>

          {!revealed && (
            <canvas
              ref={canvasRef}
              style={styles.canvas}
              onPointerDown={startScratch}
              onPointerMove={moveScratch}
              onPointerUp={stopScratch}
              onPointerCancel={stopScratch}
            />
          )}
        </div>

        {revealed ? (
          <div style={styles.revealActions}>
            <p style={styles.congratulations}>
              A new journey, a lifetime of love. ❤️
            </p>

            <button style={styles.button} onClick={onContinue}>
              Open Your Invitation &nbsp; →
            </button>
          </div>
        ) : (
          <p style={styles.hint}>Use your finger or mouse to scratch ✨</p>
        )}

        <div style={styles.footerOrnament}>✦</div>
      </div>
    </section>
  );
}

const styles = {
  page: {
    boxSizing: "border-box",
    width: "100%",
    minHeight: "100vh",
    padding: "48px 18px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(145deg, #fffaf0, #f3e4c7, #fff8ec)",
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    color: "#60482c",
  },
  card: {
    boxSizing: "border-box",
    width: "100%",
    maxWidth: "560px",
    padding: "34px 22px",
    textAlign: "center",
    background: "rgba(255,255,255,0.72)",
    border: "1px solid #d5b777",
    outline: "1px solid rgba(181,143,70,0.28)",
    outlineOffset: "-8px",
    boxShadow: "0 16px 45px rgba(104,75,35,0.12)",
  },
  ornament: {
    fontSize: "38px",
    color: "#b28a45",
    marginBottom: "12px",
  },
  eyebrow: {
    fontSize: "11px",
    letterSpacing: "3px",
    margin: "0 0 18px",
  },
  heading: {
    fontWeight: 400,
    fontSize: "clamp(27px, 6vw, 38px)",
    lineHeight: 1.25,
    margin: "0 0 16px",
  },
  description: {
    fontSize: "16px",
    lineHeight: 1.7,
    margin: "0 auto 25px",
  },
  scratchArea: {
    position: "relative",
    width: "100%",
    maxWidth: "430px",
    height: "245px",
    margin: "0 auto",
    border: "1px solid #c8a765",
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
  smallLabel: {
    fontSize: "10px",
    letterSpacing: "2px",
  },
  names: {
    fontFamily: "'Great Vibes', 'Brush Script MT', cursive",
    fontSize: "clamp(35px, 8vw, 49px)",
    fontWeight: 400,
    margin: "10px 0",
    color: "#9a7138",
  },
  divider: {
    color: "#b18a48",
    fontSize: "19px",
    margin: "2px 0 7px",
  },
  weddingText: {
    fontSize: "13px",
    letterSpacing: "2px",
    margin: "5px 0",
  },
  date: {
    fontSize: "17px",
    letterSpacing: "2px",
    margin: "10px 0 4px",
  },
  place: {
    fontSize: "12px",
    letterSpacing: "3px",
    margin: "3px 0",
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
    margin: "22px 0 8px",
  },
  revealActions: {
    marginTop: "22px",
  },
  congratulations: {
    fontSize: "17px",
    fontStyle: "italic",
    marginBottom: "20px",
  },
  button: {
    display: "inline-block",
    padding: "14px 22px",
    border: "1px solid #b28a45",
    background: "linear-gradient(135deg, #c6a15b, #a77a35)",
    color: "#fffdf7",
    fontFamily: "inherit",
    fontSize: "16px",
    letterSpacing: "0.5px",
    cursor: "pointer",
    boxShadow: "0 5px 15px rgba(120,83,29,0.16)",
  },
  footerOrnament: {
    marginTop: "24px",
    fontSize: "17px",
    color: "#b28a45",
  },
};

export default ScratchReveal;
