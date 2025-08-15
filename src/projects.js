    // src/projects.js
    export const PROJECTS = {
    mercury: {
        title: "SANSKRITA — Retrieval-Augmented LLM (Capstone)",
        blurb:
        "Modular RAG for IAST Sanskrit: custom GPT-2 tokenizer + SentenceTransformers/FAISS retrieval to cite primary texts (e.g., Gita). ROUGE and cosine-similarity evaluation to reduce hallucinations in a low-resource, free-word-order language.",
        tech: ["PyTorch", "Hugging Face Transformers", "SentenceTransformers", "FAISS", "Python"],
        link: "https://github.com/harshalJK",
        writeup:
        "SANSKRITA is a retrieval-augmented question-answering system designed specifically for IAST-transliterated Sanskrit, where free-word-order and low-resource constraints make standard LLMs brittle. I created a custom tokenizer and fine-tuned GPT-2 on a curated corpus spanning classical texts and philosophical dialogues (including the Bhagavad Gita). To improve factual grounding, I paired generation with a FAISS vector index built from SentenceTransformers embeddings, so every answer cites relevant passages retrieved at query time.\n\nMy data work included cleaning and normalizing a large IAST corpus (225k+ lines) and preparing supervised Q&A examples in JSONL for instruction-style fine-tuning. I evaluated output quality using ROUGE and embedding-based cosine similarity to measure faithfulness and fluency. The result is a system that answers domain questions while pointing back to sources, significantly reducing hallucinations typical in low-resource settings.\n\nHighlights: domain-specific tokenizer; retrieval + generation pipeline; measurable improvements on ROUGE/cosine fidelity; transparent citations.\nTech: PyTorch, Hugging Face Transformers, SentenceTransformers, FAISS, Python.\nRole: End-to-end: data prep, modeling, retrieval, evaluation, and integration."
    },

    venus: {
        title: "Multi-Modal Dynamic Hand Gesture Recognition (Real-Time)",
        blurb:
        "Real-time gesture recognition with RGB, simulated depth, and EMG. Multi-stream network + 34 one-vs-rest classifiers with priority-based fusion. 97.25% accuracy with <40 ms latency for AR/VR and prosthetics.",
        tech: ["PyTorch", "Python", "NumPy", "OpenCV", "CUDA"],
        link: "https://github.com/harshalJK",
        writeup:
        "I engineered a real-time gesture recognition system that fuses RGB video, simulated depth, and EMG to robustly classify dynamic hand motions. The model architecture uses multiple modality-specific streams with residual blocks, batch normalization, and dropout, trained with mixed precision for speed. On top, I implemented an ensemble of 34 one-vs-rest binary classifiers and a priority-based decision-fusion layer that resolves conflicts and stabilizes predictions across modalities.\n\nPipeline components include synchronized data ingestion, temporal windowing for dynamic sequences, and lightweight post-processing for jitter suppression. The system consistently reaches 97.25% accuracy with sub-40 ms end-to-end latency, enabling responsive experiences in AR/VR interfaces and assistive control scenarios (e.g., prosthetics).\n\nHighlights: multi-modal fusion; ensemble decisioning; real-time performance; resilient to single-sensor noise.\nTech: Deep learning framework (GPU-accelerated), Python, NumPy, OpenCV; mixed-precision training.\nRole: Designed architecture, implemented training/inference, built the ensemble fusion, and optimized for latency."
    },

    mars: {
        title: "Medical Records Management with Blockchain",
        blurb:
        "Permissioned health-records on Hyperledger Fabric + IPFS. On-chain metadata, off-chain encrypted files, role-based access, and tamper-proof audits. Smart-contract enforcement of consent and revocation.",
        tech: ["Hyperledger Fabric", "IPFS", "Docker", "Kubernetes", "Node.js", "Python", "SHA-256", "ECDSA"],
        link: "https://github.com/harshalJK",
        writeup:
        "I built a secure medical-records system on a permissioned blockchain to give providers and patients verifiable control over health data. The design stores only integrity-critical metadata and content hashes on Hyperledger Fabric, while encrypted medical files are kept off-chain in IPFS for scalability and privacy. Access control is enforced through smart contracts (chaincode) that validate identities, roles, and patient consent; every access or update produces an immutable audit event.\n\nCryptographic guarantees include ECDSA for identities/signatures and SHA-256 for content addressing. The architecture separates data and control planes: chaincode governs authorization and audit, while IPFS handles content distribution. This yields a tamper-evident, HIPAA-aligned foundation without pushing PHI directly onto the ledger. I also optimized transaction paths and read-patterns to keep user operations responsive.\n\nHighlights: consent-driven access; immutable audits; scalable off-chain storage; defense-in-depth cryptography.\nTech: Hyperledger Fabric, IPFS, Docker, Kubernetes (dev deployment), Node/Python for services, SHA-256, ECDSA.\nRole: Led architecture, implemented chaincode logic, integrated IPFS storage, and set up CI/CD for the network/services."
    },

    // UPDATED: Jupiter now documents this portfolio project in depth
    jupiter: {
        title: "Space Portfolio — Interactive 3D Solar System",
        blurb:
        "Interactive 3D solar-system portfolio in React Three Fiber: shader-driven sun/earth, orbiting skill cubes, planet click→modal, camera follow/teleport, overlay UI, and Vercel deployment with custom domain.",
        tech: [
        "React",
        "React Three Fiber",
        "@react-three/drei",
        "three.js",
        "GLSL shaders",
        "Vite",
        "Vercel"
        ],
        link: "https://github.com/harshalJK",
        writeup:
        "A portfolio you can fly through: a real-time solar system built with React Three Fiber and three.js. The scene centers on a custom-shaded sun and an Earth with day/night blending, moving cloud layers, and GPU aurora cones.\n\n" +
        "• Shaders & Materials — Procedural Sun shader (time-driven noise), Earth material that blends diffuse/day and night emissive maps based on a computed light vector, cloud sphere with transparent depth behavior, and aurora cones via a bespoke fragment shader.\n" +
        "• Planet Architecture — Each planet is a self-contained component exposing orbit radius, speed, tilt, and rotation. A generic <Planet /> orchestrates orbital motion and rings (e.g., Saturn). Skills are shown as textured <SkillsCube /> objects that orbit in multiple rings; the component supports tilt, per-ring radius, phase offsets, speed, and slight elevation to avoid collisions.\n" +
        "• Camera & Controls — A <PlanetTracker /> traverses each group to read world positions every frame. <CameraFollower /> lerps both camera position and OrbitControls target to keep a planet framed at a target distance; follow mode auto-cancels on user input (<UserInputCancel />). Bottom buttons ‘teleport’ by setting the follow target; a Reset button restores the initial camera and target precisely.\n" +
        "• UX Layer — A thin DOM overlay includes brand, section buttons (About/Skills/Projects/Contact), a centered Reset, and a row of planet shortcuts. The panels are simple drawers: About tells the story, Skills explains that ‘moons’ are badges, Projects and Contact direct users back into the 3D world.\n" +
        "• Deployment — Vite build pushed to GitHub; Vercel auto-deployments on every commit; production URL remains stable. Added a custom domain and static assets under /public.\n\n" +
        "Highlights: smooth camera choreography; resilient event handling (no accidental click-through); multi-ring skill orbits; shader touches that make the scene feel alive.\n" +
        "Role: Everything end-to-end — scene design, shaders, components, camera/follow logic, UI overlay, and deployment."
    },

    // UPDATED: Saturn → SpotRec
    saturn: {
        title: "SpotRec — Mood-Aware Spotify Song Recommender",
        blurb:
        "Personalized Spotify playlists that adapt to your mood. NLP maps prompts to valence–arousal; a hybrid model blends audio-feature similarity with your taste profile to rank tracks. One-click playlist export.",
        tech: [
        "Python",
        "Spotipy",
        "TensorFlow/Keras",
        "scikit-learn",
        "pandas/NumPy",
        "Flask/Streamlit",
        "OAuth2"
        ],
        link: "https://github.com/harshalJK",
        writeup: `SpotRec turns a short prompt like “need calm focus music” or “hype gym tracks” into a curated playlist. It first infers mood from text, fetches candidate songs via the Spotify API, then ranks them using a hybrid recommender that combines (1) audio-feature similarity (danceability, energy, valence, tempo, etc.) and (2) a personal taste profile learned from the user’s Top Artists/Tracks. A lightweight UI lets you preview and export the playlist to your account.

    Architecture

    Mood detection (NLP): Preprocess → tokenize/normalize → predict a valence–arousal vector using a small Keras model (model.h5) backed by a curated emotion lexicon (emotion_dict.pkl). Fallback to VADER for edge cases.

    Candidate generation: Query Spotify (seeded by user top artists/genres + prompt keywords) and fetch audio features for each track.

    Hybrid ranking:
    • Content score: cosine similarity between mood vector and track audio-feature vector.
    • Taste score: k-NN distance to the user’s historical centroid (cached in finalized_model_1.pkl).
    • Diversity: Maximal Marginal Relevance (MMR) to reduce near-duplicates and same-artist clustering.

    Playlist builder: OAuth2 → create private playlist → push Top-N ranked tracks with rationale snippets (e.g., “high energy + high valence, similar to your top artist X”).

    Ops: Rate-limit-aware caching of features and user profile; deterministic seeds for reproducible lists.

    Features
    • Natural-language prompts (plus presets: Focus, Chill, Workout)
    • Mood sliders to fine-tune valence/arousal after the first result
    • One-click playlist export; optional “refresh with more exploration”
    • Guardrails for explicit content and duplicate filtering

    Highlights
    • Intent captured from text → emotion space, not only seed tracks
    • Hybrid (content + taste) ranking handles cold prompts and returning users
    • Diversity via MMR; fast, cached Spotify calls

    Tech
    Python, Spotipy (Spotify Web API), TensorFlow/Keras, scikit-learn, pandas/NumPy, Flask or Streamlit (UI), OAuth2.

    Example results
    A small pilot (n≈10) preferred SpotRec’s Top-10 over a popularity baseline ~70% of the time for Study/Chill and Workout prompts; users cited noticeably better “mood fit.” (Illustrative—replace with your actual numbers.)

    Role
    End-to-end: prompt/mood modeling, ranking design, Spotify integration, UI, and evaluation.

    What I learned
    • Mapping language to valence–arousal makes recommendations controllable.
    • Hybrid scoring beats pure popularity or pure content for subjective moods.
    • Caching + MMR matter a lot for perceived quality and speed.`
    },

    // UPDATED: Uranus → GuildDB
    uranus: {
        title: "GuildDB — Discord Knowledge Bot with an RDBMS Backend",
        blurb:
        "A Discord bot that turns server Q&A into a persistent knowledge base. Normalized SQL schema, fuzzy search, teach/edit workflows, role-based permissions, and analytics.",
        tech: [
        "Python",
        "discord.py",
        "PostgreSQL/MySQL",
        "SQLAlchemy",
        "Alembic",
        "Redis",
        "Docker",
        "GitHub Actions"
        ],
        link: "https://github.com/harshalJK",
        writeup: `GuildDB keeps a Discord server’s hard-won answers from getting buried in chat. Members can teach the bot Q/A pairs, tag them, and retrieve answers with natural phrases. Everything is stored in a relational database with proper constraints, indexes, permissions, and audit logs—so knowledge persists across channels and time.

    Architecture
    • Bot layer: discord.py with async handlers for messages and slash commands (/ask, /teach, /edit, /link, /kb stats).
    • Service layer: command router + lightweight intent parsing (regex/keywords) → repository methods.
    • Data layer (RDBMS): PostgreSQL (or MySQL) with migrations and indexes for speed and safety.

    Core schema (simplified)
    guilds(guild_id, name, created_at)
    users(user_id, guild_id, username, role)
    faqs(id, guild_id, question, answer, author_id, tags, created_at, updated_at)
    messages(id, guild_id, channel_id, user_id, content, created_at)  — optional logging for analytics

    Indexes: (guild_id, question gin_trgm_ops) for trigram fuzzy search; (guild_id, tags) for filtering.

    Features
    • Teach & Ask: /teach “How do I deploy?” “Use the /deploy pipeline in #ci”. /ask “deploy” → ranked answers with similarity scores, author, last-updated, and quick-edit buttons (admins).
    • Permissions & audit: per-guild isolation, admin-only edit/delete, soft deletes, and full change history.
    • Search: trigram similarity + optional synonyms for custom jargon (e.g., “pipelines” ≈ “workflows”).
    • Utilities: canonical link store (/link add|get <name>), tags, and stale-FAQ warnings.
    • Analytics: /kb stats surfaces most-asked topics and FAQs overdue for review; weekly chart to a staff channel.

    Highlights
    • Treats Discord like a knowledge base, not just ephemeral chat
    • Clean separation of bot/service/data layers; SQL first with constraints and migrations
    • Fast fuzzy search with quality guardrails (similarity threshold + tie-breakers)

    Tech
    Python, discord.py, PostgreSQL/MySQL, SQLAlchemy, Alembic, Redis (optional cache), Docker, GitHub Actions (CI).

    Example results
    On a mid-size dev/student server (~300 members), repetitive setup questions dropped noticeably; time-to-answer went from minutes to seconds via /ask. (Illustrative—replace with real stats if you have them.)

    Role
    Designed the schema and permissions, implemented the bot commands, built fuzzy search, added analytics, and set up CI/CD and Dockerized deployment.

    What I learned
    • Good schema design (constraints, indexes) pays off in day-2 operations.
    • Fuzzy search + synonyms gets you most of the way before you need embeddings.
    • Clear moderation/audit flows make user-generated knowledge maintainable.`
    },

    neptune: {
        title: "Coming Soon",
        blurb:
        "Stay Tuned...",
        tech: ["N/A"],
        link: "https://github.com/harshalJK"
    }
    };
