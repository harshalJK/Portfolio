    // src/projects.js
    export const PROJECTS = {
    mercury: {
        title: "Latency-First Payments API",
        blurb:
        "Ultra-lean FastAPI service with idempotency keys, circuit breakers, and async Postgres for sub-50ms p99 writes.",
        tech: ["FastAPI", "PostgreSQL", "Redis", "Docker", "K6"],
        link: "https://github.com/yourname/payments-api"
    },
    venus: {
        title: "Visual Search with CLIP",
        blurb:
        "Image → vector search and product recommendations with on-GPU ANN indices.",
        tech: ["PyTorch", "CLIP", "Faiss", "CUDA"],
        link: "https://github.com/yourname/visual-search"
    },
    mars: {
        title: "Infra-as-Code Sandbox",
        blurb:
        "Spin up preview environments per PR with Terraform, GitHub Actions, and ephemeral DB snapshots.",
        tech: ["Terraform", "GH Actions", "AWS", "Vite", "NGINX"],
        link: "https://github.com/yourname/iac-sandbox"
    },
    jupiter: {
        title: "Streaming Chatbot Platform",
        blurb:
        "Server-sent events, tool use, and guardrails for multi-tenant chat workloads.",
        tech: ["Node.js", "WebSockets/SSE", "Postgres", "OpenAI"],
        link: "https://github.com/yourname/chat-platform"
    },
    saturn: {
        title: "3D Portfolio (this site)",
        blurb:
        "React Three Fiber scene with custom shaders (sun/earth/aurora), orbiting social cubes, and clickable planets.",
        tech: ["React Three Fiber", "GLSL", "Vite"],
        link: "https://github.com/yourname/space-portfolio"
    },
    uranus: {
        title: "K8s SLO Reporter",
        blurb:
        "Cron collector + PromQL dashboards to track SLO/SLI error budgets.",
        tech: ["Kubernetes", "Prometheus", "Grafana"],
        link: "https://github.com/yourname/slo-reporter"
    },
    neptune: {
        title: "Data Quality Gatekeeper",
        blurb:
        "Great Expectations + Airflow checks gating model training pipelines.",
        tech: ["Airflow", "Great Expectations", "Python"],
        link: "https://github.com/yourname/data-quality"
    }
    };
