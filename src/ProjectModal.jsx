    // src/ProjectModal.jsx
    import React, { useEffect } from "react";

    export default function ProjectModal({ project, onClose }) {
    // Close on ESC
    useEffect(() => {
        const onKey = (e) => e.key === "Escape" && onClose?.();
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [onClose]);

    if (!project) return null;

    return (
        <div
        style={{
            position: "fixed",
            inset: 0,
            zIndex: 50,
            display: "grid",
            placeItems: "center",
            background: "rgba(0,0,0,0.45)",
            backdropFilter: "blur(4px)",
        }}
        onClick={onClose}
        >
        <div
            onClick={(e) => e.stopPropagation()}
            style={{
            width: "min(92vw, 520px)",
            color: "white",
            background:
                "linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.05))",
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: 16,
            padding: 20,
            boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
            }}
        >
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
            <h3 style={{ margin: 0, fontSize: 22, fontWeight: 700 }}>
                {project.title}
            </h3>
            <button className="btn-ghost" onClick={onClose}>
                Close
            </button>
            </div>

            {/* Show writeup if present; otherwise fall back to blurb.
                Preserve newlines and allow scrolling for long content. */}
            <div
            style={{
                opacity: 0.9,
                marginTop: 10,
                fontSize: 14,
                lineHeight: 1.5,
                whiteSpace: "pre-line",
                maxHeight: "45vh",
                overflow: "auto",
            }}
            >
            {project.writeup ?? project.blurb}
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 8 }}>
            {project.tech?.map((t) => (
                <span
                key={t}
                style={{
                    fontSize: 12,
                    padding: "6px 10px",
                    borderRadius: 999,
                    border: "1px solid rgba(255,255,255,0.18)",
                    background: "rgba(255,255,255,0.06)",
                }}
                >
                {t}
                </span>
            ))}
            </div>

            {project.link && (
            <div style={{ marginTop: 16 }}>
                <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="btn-ghost"
                style={{ textDecoration: "none", display: "inline-block" }}
                >
                View on GitHub
                </a>
            </div>
            )}
        </div>
        </div>
    );
    }
