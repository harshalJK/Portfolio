    // src/Overlay.jsx
    import React from "react";

    export default function Overlay({ onOpen, onPlanet, onReset }) {
    const planets = [
        "Mercury",
        "Venus",
        "Earth",
        "Mars",
        "Jupiter",
        "Saturn",
        "Uranus",
        "Neptune",
    ];

    return (
        <div
        style={{
            position: "fixed",
            inset: 0,
            pointerEvents: "none",
            fontFamily: "Inter, system-ui",
        }}
        >
        {/* Top Nav (brand left, RESET center, actions right) */}
        <div
            style={{
            position: "absolute",
            top: 16,
            left: 24,
            right: 24,
            height: 56,
            display: "grid",                         // changed from "flex"
            gridTemplateColumns: "1fr auto 1fr",     // left • center • right
            alignItems: "center",
            pointerEvents: "auto",
            }}
        >
            {/* Left: brand (unchanged) */}
            <div style={{ color: "white", fontWeight: 700, letterSpacing: 0.5 }}>
            Harshal Jorwekar • <span style={{ opacity: 0.75 }}>Software Engineer</span>
            </div>

            {/* Center: Reset (moved here) */}
            <div style={{ justifySelf: "center" }}>
            <button className="btn-ghost" onClick={() => onReset?.()}>
                Reset
            </button>
            </div>

            {/* Right: actions (About/Skills/Projects/Contact) — unchanged */}
            <div style={{ justifySelf: "end", display: "flex", gap: 12 }}>
            <button className="btn-ghost" onClick={() => onOpen?.("about")}>
                About
            </button>
            <button className="btn-ghost" onClick={() => onOpen?.("skills")}>
                Skills
            </button>
            <button className="btn-ghost" onClick={() => onOpen?.("projects")}>
                Projects
            </button>
            <button className="btn-ghost" onClick={() => onOpen?.("contact")}>
                Contact
            </button>
            </div>
        </div>

        {/* Bottom Planet Buttons (centered, horizontal) */}
        <div
            style={{
            position: "absolute",
            left: "50%",
            bottom: 16,
            transform: "translateX(-50%)",
            display: "flex",
            gap: 10,
            pointerEvents: "auto",
            }}
        >
            {planets.map((p) => (
            <button
                key={p}
                className="btn-ghost"
                onClick={() => onPlanet?.(p.toLowerCase())}
                style={{ padding: "8px 12px", fontSize: 13, lineHeight: 1, whiteSpace: "nowrap" }}
                title={p}
            >
                {p}
            </button>
            ))}
        </div>
        </div>
    );
    }
