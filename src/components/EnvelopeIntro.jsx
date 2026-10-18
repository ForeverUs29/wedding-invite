import { useEffect, useRef, useState } from "react";
function getTimeLeft() {
  const weddingDate = new Date("2026-11-30T20:00:00+05:30");
  const now = new Date();

  const difference = weddingDate - now;

  if (difference <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor(
      (difference / (1000 * 60 * 60)) % 24
    ),
    minutes: Math.floor(
      (difference / (1000 * 60)) % 60
    ),
    seconds: Math.floor(
      (difference / 1000) % 60
    ),
  };
}

function EnvelopeIntro() {
  const [opened, setOpened] = useState(false);
const [timeLeft, setTimeLeft] = useState(getTimeLeft());
const [musicPlaying, setMusicPlaying] = useState(false);
const audioRef = useRef(null);

useEffect(() => {
  const timer = setInterval(() => {
    setTimeLeft(getTimeLeft());
  }, 1000);

  return () => clearInterval(timer);
}, []);

const toggleMusic = () => {
  if (!audioRef.current) return;

  if (musicPlaying) {
    audioRef.current.pause();
    setMusicPlaying(false);
  } else {
    audioRef.current
      .play()
      .then(() => setMusicPlaying(true))
      .catch(() => setMusicPlaying(false));
  }
};
  return (
    <div className={`luxury-envelope-page ${opened ? "is-open" : ""}`}>
<div className="gold-particles">
  <span>✦</span>
  <span>✧</span>
  <span>✦</span>
  <span>✧</span>
  <span>✦</span>
  <span>✧</span>
</div>
      {/* Envelope */}
      <div className="envelope">

        {/* Invitation card inside */}
        <div className="invitation-card">
          <div className="card-monogram">H + R</div>

          <p className="card-small">
            THE WEDDING INVITATION
          </p>

          <h1>Riya & Hardik</h1>

          <div className="card-line"></div>

          <p>30 NOVEMBER 2026</p>
          <p>PRAYAGRAJ</p>
        </div>

        {/* Envelope body */}
        <div className="envelope-body">

          <div className="envelope-monogram">
            H + R
          </div>

          <p className="envelope-names">
            Riya & Hardik
          </p>

          <p className="envelope-date">
            30 • 11 • 2026
          </p>

        </div>

        {/* Envelope flap */}
        <div className="envelope-flap"></div>

        {/* Wax seal */}
        <button
          className="wax-seal"
          onClick={() => setOpened(true)}
          aria-label="Open wedding invitation"
        >
          <span>H</span>
          <span>+</span>
          <span>R</span>
        </button>

      </div>

      {/* Instruction */}
      {!opened && (
        <p className="open-instruction">
          Tap the seal to open
        </p>
      )}
     

      {/* Wedding page after opening */}
      {opened && (
  <div className="after-opening">
 <button
  className="top-button"
  onClick={() => {
    document.querySelector(".after-opening")?.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }}
  aria-label="Back to top"
>
  ↑
</button>
<audio
  ref={audioRef}
  src="/wedding-song.mp3"
  loop
/>

<button
  className={`music-button ${musicPlaying ? "playing" : ""}`}
  onClick={toggleMusic}
  aria-label={musicPlaying ? "Pause wedding music" : "Play wedding music"}
>
  {musicPlaying ? "❚❚" : "♪"}
</button>

    <p className="after-small">
      TOGETHER WITH THEIR FAMILIES
    </p>

    <h2>
      Riya <span>&</span> Hardik
    </h2>

    <img
      src="/couple.jpg"
      alt="Riya and Hardik"
      className="couple-photo"
    />
    <div className="photo-divider">
  <span></span>
  <b>❦</b>
  <span></span>
</div>

    <div className="save-date">
  <p className="save-date-small">
    SAVE THE DATE
  </p>

  <p className="save-date-main">
    30 · 11 · 2026
  </p>

  <div className="save-date-line">
    <span></span>
    <b>❦</b>
    <span></span>
  </div>

  <p className="save-date-place">
    PRAYAGRAJ
  </p>
</div>

   
<div className="countdown">
  <div className="countdown-item">
    <strong>{timeLeft.days}</strong>
    <span>DAYS</span>
  </div>

  <div className="countdown-item">
    <strong>{String(timeLeft.hours).padStart(2, "0")}</strong>
    <span>HOURS</span>
  </div>

  <div className="countdown-item">
    <strong>{String(timeLeft.minutes).padStart(2, "0")}</strong>
    <span>MINUTES</span>
  </div>

  <div className="countdown-item">
    <strong>{String(timeLeft.seconds).padStart(2, "0")}</strong>
    <span>SECONDS</span>
  </div>
</div>

<div className="section-divider">
  <span></span>
  <b>❦</b>
  <span></span>
</div>

<div className="events-section">

  <p className="events-heading">
    THE CELEBRATIONS
  </p>

  <h3 className="events-title">
    Wedding Events
  </h3>

  <div className="event-card">
    <div className="event-icon">❋</div>
    <p className="event-name">Haldi Night</p>
    <p className="event-date">28 NOVEMBER 2026</p>
    <p className="event-time">6:00 PM</p>
    <p className="event-venue">Yadav Mansion</p>
<a
  className="location-button"
  href="https://maps.app.goo.gl/sGizhnmYBobHotPp7"
  target="_blank"
  rel="noopener noreferrer"
>
  📍 VIEW LOCATION
</a>

  </div>

  <div className="event-card">
    <div className="event-icon">♫</div>
    <p className="event-name">Mehendi & Sangeet</p>
    <p className="event-date">29 NOVEMBER 2026</p>
    <p className="event-time">3:00 PM ONWARDS</p>
    <p className="event-venue">Yadav Mansion</p>
    <a
  className="location-button"
  href="https://maps.app.goo.gl/sGizhnmYBobHotPp7"
  target="_blank"
  rel="noopener noreferrer"
>
  📍 VIEW LOCATION
</a>
  </div>

<div className="event-card">
  <div className="event-icon">♕</div>
  <p className="event-name">Wedding</p>
  <p className="event-date">30 NOVEMBER 2026</p>
  <p className="event-time">1:00 PM ONWARDS</p>
  <p className="event-venue">
    Virasat The Hotel by Triveni Grand
  </p>
  <a
  className="location-button"
  href="https://maps.app.goo.gl/1GBvyL4mpqSXFykc6"
  target="_blank"
  rel="noopener noreferrer"
>
  📍 VIEW LOCATION
</a>
</div>

  <div className="event-card">
    <div className="event-icon">✦</div>
    <p className="event-name">Reception</p>
    <p className="event-date">30 NOVEMBER 2026</p>
    <p className="event-time">6:00 PM ONWARDS</p>
    <p className="event-venue">
      Virasat The Hotel by Triveni Grand
    </p>
      <a
  className="location-button"
  href="https://maps.app.goo.gl/1GBvyL4mpqSXFykc6"
  target="_blank"
  rel="noopener noreferrer"
>
  📍 VIEW LOCATION
</a>
  </div>

  <div className="closing-section">
  <div className="closing-ornament">❦</div>

  <p className="closing-small">
    WITH LOVE
  </p>

  <p className="closing-message">
    We can't wait to celebrate<br />
    these beautiful moments with you.
  </p>

  <p className="closing-names">
    Riya & Hardik
  </p>

  <div className="closing-date">
    30 · 11 · 2026
  </div>
  
<button
  className="top-button"
  onClick={() => {
    document.querySelector(".after-opening")?.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }}
  aria-label="Back to top"
>
  ↑
</button>

</div>

</div>

    <p className="after-place">
      PRAYAGRAJ
    </p>

    <div className="after-ornament">
      ❦
    </div>

    <p className="after-message">
      Two hearts, one beautiful journey
    </p>

  </div>
)}

    </div>
  );
}

export default EnvelopeIntro;