    // src/SectionsPanel.jsx
    import React, { useEffect } from "react";
    import { PROJECTS } from "./projects";

    function PanelFrame({ title, onClose, children }) {
    // close on ESC
    useEffect(() => {
        const onKey = (e) => e.key === "Escape" && onClose?.();
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [onClose]);

    return (
        <div
        style={{
            position: "fixed",
            inset: 0,
            zIndex: 40,
            pointerEvents: "none",
        }}
        >
        {/* dim background */}
        <div
            onClick={onClose}
            style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.35)",
            backdropFilter: "blur(2px)",
            pointerEvents: "auto",
            }}
        />

        {/* right drawer */}
        <aside
            style={{
            position: "absolute",
            right: 16,
            top: 80,
            bottom: 16,
            width: "min(92vw, 420px)",
            background:
                "linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.05))",
            border: "1px solid rgba(255,255,255,0.14)",
            borderRadius: 16,
            padding: 16,
            color: "#fff",
            overflow: "auto",
            pointerEvents: "auto",
            boxShadow: "0 12px 40px rgba(0,0,0,0.35)",
            }}
        >
            <div
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 12,
                marginBottom: 8,
            }}
            >
            <h3 style={{ margin: 0, fontSize: 20, fontWeight: 700 }}>{title}</h3>
            <button className="btn-ghost" onClick={onClose}>
                Close
            </button>
            </div>
            {children}
        </aside>
        </div>
    );
    }

    export default function SectionsPanel({ panel, onClose, onOpenProject }) {
    if (!panel) return null;

    if (panel === "about") {
        return (
        <PanelFrame title="About" onClose={onClose}>
            <p style={{ opacity: 0.9, lineHeight: 1.5 }}>
            Hi, I’m <b>Harshal Jorwekar</b>, a Software Engineer who loves building
            fast, reliable systems and playful 3D interfaces. Recent work includes
            a Sanskrit RAG system, a voice AI assistant, and this WebGL portfolio.
            </p>
            <p style={{ opacity: 0.9, lineHeight: 1.5 }}>
            I enjoy performance tuning, clean DX, and shipping production-ready
            features end-to-end.
            </p>
        </PanelFrame>
        );
    }

    if (panel === "skills") {
        const buckets = {
        "Languages": ["Python", "JavaScript/TypeScript", "Java", "C++"],
        "Frameworks": ["React", "FastAPI", "Node.js", "Flask"],
        "Data/ML": ["PyTorch", "Faiss", "Whisper", "OpenAI APIs"],
        "Infra": ["Docker", "Kubernetes", "AWS", "GitHub Actions"],
        "DB & Search": ["PostgreSQL", "Redis", "Vector DB (FAISS/HNSW)"],
        "WebGL": ["React Three Fiber", "GLSL shaders"],
        };

        return (
        <PanelFrame title="Skills" onClose={onClose}>
            <div style={{ display: "grid", gap: 10 }}>
            {Object.entries(buckets).map(([k, v]) => (
                <div key={k}>
                <div style={{ fontWeight: 700, marginBottom: 6 }}>{k}</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {v.map((t) => (
                    <span key={t} className="pill">{t}</span>
                    ))}
                </div>
                </div>
            ))}
            </div>
        </PanelFrame>
        );
    }

    if (panel === "projects") {
        const list = Object.entries(PROJECTS);
        return (
        <PanelFrame title="Projects" onClose={onClose}>
            <div style={{ display: "grid", gap: 10 }}>
            {list.map(([key, p]) => (
                <div
                key={key}
                style={{
                    padding: 12,
                    borderRadius: 12,
                    border: "1px solid rgba(255,255,255,0.14)",
                    background: "rgba(255,255,255,0.05)",
                    display: "grid",
                    gap: 6,
                }}
                >
                <div style={{ fontWeight: 700 }}>{p.title}</div>
                <div style={{ opacity: 0.85, fontSize: 14, lineHeight: 1.4 }}>
                    {p.blurb}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {p.tech.slice(0, 4).map((t) => (
                    <span key={t} className="pill">{t}</span>
                    ))}
                </div>
                <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
                    <button
                    className="btn-ghost"
                    onClick={() => onOpenProject?.(key)}
                    title="Open detail modal"
                    >
                    Details
                    </button>
                    <a
                    href={p.link}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-ghost"
                    style={{ textDecoration: "none" }}
                    >
                    GitHub
                    </a>
                </div>
                </div>
            ))}
            </div>
        </PanelFrame>
        );
    }

    if (panel === "contact") {
        return (
        <PanelFrame title="Contact" onClose={onClose}>
            <div style={{ display: "grid", gap: 10 }}>
            <a className="btn-ghost" href="mailto:you@email.com">Email</a>
            <a className="btn-ghost" href="https://www.linkedin.com/in/yourhandle" target="_blank" rel="noreferrer">
                LinkedIn
            </a>
            <a className="btn-ghost" href="https://github.com/yourname" target="_blank" rel="noreferrer">
                GitHub
            </a>
            <a className="btn-ghost" href="/Harshal_Jorwekar_Resume.pdf" target="_blank" rel="noreferrer">
                View Résumé (PDF)
            </a>
            </div>
        </PanelFrame>
        );
    }

    return null;
    }
