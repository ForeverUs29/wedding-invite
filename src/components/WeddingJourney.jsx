
import { useRef, useState } from "react";
import "./WeddingJourney.css";
import WeddingCountdown from "./WeddingCountdown";

// Bappa image used at the top of each invitation page
function BappaBlessing({ image = "/bappa.png" }) {
  return (
    <div className="royal-bappa-blessing">
      <img
        src={image}
        alt="Shree Ganesh"
        className="royal-bappa-image"
      />
    </div>
  );
}

const events = [
  {
    id: "haldi",
    title: "Haldi Night",
    date: "28 November 2026",
    time: "6:00 PM onwards",
    venue: "Yadav Mansion",
    map: "https://maps.app.goo.gl/sGizhnmYBobHotPp7",
    icon: "🌼",
    tagline: "A little sunshine, haldi and lots of love!",
    invitation:
      "Join us for an evening of golden hues, laughter, love and beautiful beginnings.",
  },
  {
    id: "mehendi",
    title: "Mehendi & Sangeet",
    date: "29 November 2026",
    time: "3:00 PM onwards",
    venue: "Yadav Mansion",
    map: "https://maps.app.goo.gl/sGizhnmYBobHotPp7",
    icon: "🌿",
    tagline: "A celebration of colours, music and memories!",
    invitation:
      "Let the mehendi bloom and the music play as we dance our hearts away.",
  },
  {
    id: "wedding",
    title: "The Wedding",
    date: "30 November 2026",
    time: "1:00 PM onwards",
    venue: "Virasat The Hotel by Triveni Grand",
    map: "https://maps.app.goo.gl/1GBvyL4mpqSXFykc6",
    icon: "💍",
    tagline: "Two hearts. One promise. A lifetime together.",
    invitation:
      "With the blessings of our families, join us as Riya and Hardik begin their forever.",
  },
  {
    id: "reception",
    title: "Wedding Reception",
    date: "30 November 2026",
    time: "8:00 PM onwards",
    venue: "Virasat The Hotel by Triveni Grand",
    map: "https://maps.app.goo.gl/1GBvyL4mpqSXFykc6",
    icon: "✨",
    tagline: "An evening of elegance and celebration.",
    invitation:
      "Celebrate the newlyweds with an evening of joy, togetherness and unforgettable memories.",
  },
];

export default function WeddingJourney() {
  const [screen, setScreen] = useState("welcome");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const journeyRef = useRef(null);

  const goTo = (nextScreen) => {
    setSelectedEvent(null);
    setScreen(nextScreen);

    if (journeyRef.current) {
      journeyRef.current.scrollTop = 0;
    }
  };

  const openEvent = (event) => {
    setSelectedEvent(event);
  };

  const closeEvent = () => {
    setSelectedEvent(null);
  };

  return (
    <main
      ref={journeyRef}
      className={`royal-journey royal-${screen}`}
    >
      {/* Decorative border */}
      <div className="royal-border" aria-hidden="true" />

      {/* WELCOME SCREEN */}
      {screen === "welcome" && (
        <section className="royal-screen royal-welcome">
          <img
            src="/wedding-logo.png"
            alt="Riya and Hardik wedding logo — #dilHARIYA"
            className="royal-logo"
          />

          <button
            className="royal-button"
            onClick={() => goTo("families")}
          >
            Meet the Families →
          </button>
        </section>
      )}

      {/* MEET THE FAMILIES */}
      {screen === "families" && (
        <section className="royal-screen royal-families">
          <BappaBlessing image="/bappa_cream.png" />

          <p className="royal-eyebrow">
            WITH THE BLESSINGS &amp; LOVE OF OUR FAMILIES
          </p>

          <div className="royal-family-details">
            <h2 className="royal-person-name">Riya</h2>

            <p className="royal-relation">
              Granddaughter of
            </p>

            <p className="royal-family-name">
              Late Smt. Parvati Devi &amp; Late Shri B.L. Yadav
            </p>

            <p className="royal-relation">
              Daughter of
            </p>

            <p className="royal-family-name">
              Mrs. Meena Yadav & Mr. Sanjay Yadav
            </p>

            <div className="royal-family-divider">
              ✧ ∞ ✧
            </div>

            <p className="royal-union-text">
              is all set to tie the knot with
            </p>

            <h2 className="royal-person-name">
              Hardik
            </h2>

            <p className="royal-relation">
              Grandson of
            </p>

            <p className="royal-family-name">
             Late Smt. Sushila Shah & Late Shri Laxmichand Khimji Shah
            </p>

            <p className="royal-relation">
              Son of
            </p>

            <p className="royal-family-name">
              Mrs. Sandhya Shah & Mr. Dilip Shah 

            </p>
          </div>

          <p className="royal-description">
            We joyfully invite you
            to celebrate this beautiful beginning.
          </p>

          <button
            className="royal-button"
            onClick={() => goTo("celebrations")}
          >
            Explore the Wedding Events →
          </button>

          <button
            className="royal-text-button"
            onClick={() => goTo("welcome")}
          >
            ← Back
          </button>
        </section>
      )}

      {/* ALL FOUR CELEBRATIONS */}
      {screen === "celebrations" && (
        <section className="royal-screen royal-celebrations">
          <BappaBlessing />

          <p className="royal-eyebrow">
            #dilHARIYA
          </p>

          <h1 className="royal-heading">
            The Wedding Celebrations
          </h1>

          <p className="royal-event-instruction">
            Tap any celebration to open its invitation
          </p>

          <div className="royal-events-grid">
            {events.map((event) => (
              <button
                key={event.id}
                className={`royal-event-tile tile-${event.id}`}
                onClick={() => openEvent(event)}
              >
                <span className="royal-tile-icon">
                  {event.icon}
                </span>

                <span className="royal-tile-title">
                  {event.title}
                </span>

              

                <span className="royal-tile-action">
                  View Invitation →
                </span>
              </button>
            ))}
          </div>

          <button
            className="royal-button"
            onClick={() => goTo("wishes")}
          >
            Final Wishes →
          </button>

          <button
            className="royal-text-button"
            onClick={() => goTo("families")}
          >
            ← Back to Families
          </button>
        </section>
      )}

      {/* FINAL WISHES */}
      {screen === "wishes" && (
        <section className="royal-screen royal-wishes">
          <div className="final-invitation-content">
            <BappaBlessing />

            <h1 className="final-blessing-heading">
              Your presence, love and blessings will make
              our celebrations even more special.
            </h1>

            <div className="final-gold-divider">
              ✦ ❀ ✦
            </div>

            <h2 className="final-save-title">
              SAVE THE DATE
            </h2>

            <div className="final-save-date">
              30 November 2026
            </div>

            <p className="final-countdown-heading">
              The Countdown to Forever Begins!
            </p>

            <WeddingCountdown />

            <div className="final-gold-divider">
              ✦ ❀ ✦
            </div>

           
<div className="final-rsvp">
  <span className="final-rsvp-title">
    INVITATION BY
  </span>

  <strong>
    Sanjay Yadav &amp; Meena Yadav
  </strong>

  <a href="tel:9450408936">
    9450408936
  </a>
</div>




            <p className="final-ending-symbol">
              ❀
            </p>
          </div>

          <button
            className="royal-button"
            onClick={() => goTo("celebrations")}
          >
            Revisit the Celebrations ↺
          </button>
        </section>
      )}

      {/* INDIVIDUAL EVENT INVITATIONS */}
      {selectedEvent && (
        <div
          className={`royal-event-overlay theme-${selectedEvent.id}`}
          role="dialog"
          aria-modal="true"
          aria-label={`${selectedEvent.title} invitation`}
        >
          <div className="royal-event-detail">
            <button
              className="royal-event-close"
              onClick={closeEvent}
              aria-label="Close event invitation"
            >
              ✕
            </button>

            <BappaBlessing />

            <p className="royal-eyebrow">
              YOU ARE CORDIALLY INVITED
            </p>

            <div className="royal-event-symbol">
              {selectedEvent.icon}
            </div>

            <h2 className="royal-event-heading">
              {selectedEvent.title}
            </h2>

            {selectedEvent.id !== "haldi" && (
              <>
                <p className="royal-event-tagline">
                  {selectedEvent.tagline}
                </p>

                <p className="royal-event-message">
                  {selectedEvent.invitation}
                </p>
              </>
            )}

            <div className="royal-detail-divider">
              ✦
            </div>

           
<div className="royal-event-information">
  <p>📅 {selectedEvent.date}</p>
  <p>🕰️ {selectedEvent.time}</p>
  <p>📍 {selectedEvent.venue}</p>
</div>


            <a
              className="royal-map-button"
              href={selectedEvent.map}
              target="_blank"
              rel="noopener noreferrer"
            >
              📍 View Location
            </a>

            <button
              type="button"
              className="all-wedding-events-btn"
              onClick={closeEvent}
            >
              <span
                className="all-events-arrow"
                aria-hidden="true"
              >
                ←
              </span>

              <span>
                All Wedding Events
              </span>
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
