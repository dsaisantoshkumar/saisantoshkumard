// ==========================================================================
// Ask Sai — knowledge base
// Every fact below is taken directly from the portfolio content itself
// (About / Skills / Experience / Projects / Certifications / Education /
// Contact sections) or the downloadable resume. Nothing here is invented.
//
// HOW TO ADD A NEW QUESTION
// --------------------------------------------------------------------------
// 1. Copy one of the objects in `portfolioAssistantData` below.
// 2. Give it a unique `id` (kebab-case, no spaces).
// 3. Set `category` to one of: "skills", "experience", "projects", "proof",
//    "education", "professional", "contact", "recruiter".
// 4. List every way someone might phrase the question in `questions`.
// 5. List keywords/aliases someone might type in `keywords` — this is what
//    the matcher actually searches against, so include synonyms and
//    abbreviations (e.g. "sap", "abap", "s4hana").
// 6. Write a short, factual `answer`. Only state things that already exist
//    elsewhere in the portfolio, resume, GitHub, or certificates.
// 7. Add `proof` entries — each is { label, target }. `target` starting
//    with "#" scrolls to that portfolio section; anything else (a URL)
//    opens in a new tab. Only add proof that genuinely exists — no
//    placeholder/"click here" links.
// 8. Add 2–3 `relatedQuestions` (exact question text from another entry,
//    or a new phrase) to guide the visitor to their next question.
//
// To add a brand-new topic entirely, just append a new object — no other
// file needs to change.
// ==========================================================================

const portfolioAssistantData = [
  // ---------------------------------------------------------------- skills
  {
    id: "skills-overview",
    category: "skills",
    questions: [
      "What are Sai's main technical skills?",
      "What are Sai's skills?",
      "What technologies does Sai know?",
    ],
    keywords: ["skills", "technical skills", "technologies", "tech stack", "toolkit", "skillset"],
    answer:
      "Sai's core toolkit spans Python, Java and SAP ABAP for backend development; REST and OData API design; SAP S/4HANA (RAP, CDS Views, AMDP); SQL and relational databases; and applied machine learning and statistics (scikit-learn, R, PyCaret).",
    proof: [
      { label: "View skills section", target: "#skills" },
      { label: "Download resume", target: "assets/resume.pdf" },
    ],
    relatedQuestions: [
      "What Java experience does Sai have?",
      "What SAP experience does Sai have?",
      "What AI or Python skills does Sai have?",
    ],
  },
  {
    id: "java-experience",
    category: "skills",
    questions: [
      "What Java experience does Sai have?",
      "Does Sai know Java?",
      "Tell me about Sai's Java background",
    ],
    keywords: ["java", "java experience", "java developer", "spring", "spring boot", "microservices", "cognizant", "jsp", "servlets"],
    answer:
      "Sai's Java experience began at Cognizant Technology Solutions with structured training in Java, JSP, Servlets, SQL and MySQL, and continued at Cloudninetek LLC, where he implemented microservices with Spring Boot and Spring Cloud Netflix components and secured REST endpoints with Spring Security.",
    proof: [
      { label: "View experience section", target: "#experience" },
      { label: "Download resume", target: "assets/resume.pdf" },
    ],
    relatedQuestions: [
      "What backend technologies does Sai know?",
      "What SAP experience does Sai have?",
      "Show Sai's projects",
    ],
  },
  {
    id: "sap-skills-general",
    category: "skills",
    questions: [
      "What SAP experience does Sai have?",
      "Does Sai know SAP ABAP?",
      "What is Sai's SAP background?",
    ],
    keywords: ["sap", "abap", "sap abap", "s4hana", "s/4hana", "sap experience"],
    answer:
      "Sai has hands-on SAP S/4HANA experience across Object Oriented ABAP, the ABAP RESTful Programming Model (RAP), CDS Views, AMDP, BAPIs, BADIs and RFCs, gained at CVS Health and Cloudninetek LLC.",
    proof: [
      { label: "View experience section", target: "#experience" },
      { label: "View SAP performance case study", target: "https://github.com/dsaisantoshkumar/abap-performance-optimization" },
    ],
    relatedQuestions: [
      "Does Sai know CDS Views and AMDP?",
      "What experience does Sai have with RAP?",
      "Is Sai SAP certified?",
    ],
  },
  {
    id: "sap-rap",
    category: "skills",
    questions: [
      "What experience does Sai have with RAP?",
      "Does Sai know the ABAP RESTful Programming Model?",
    ],
    keywords: ["rap", "restful programming model", "abap rap", "bdef", "business objects"],
    answer:
      "Sai built RAP-based applications, CDS data models and OData services (including SAP Gateway CRUD operations validated through Postman) during his SAP ABAP contract at CVS Health, and RAP applications with Business Objects, BDEF, validations and determinations at Cloudninetek LLC.",
    proof: [{ label: "View experience section", target: "#experience" }],
    relatedQuestions: [
      "Does Sai know CDS Views and AMDP?",
      "Does Sai have OData experience?",
      "What SAP experience does Sai have?",
    ],
  },
  {
    id: "sap-cds-amdp",
    category: "skills",
    questions: [
      "Does Sai know CDS Views and AMDP?",
      "What database performance work has Sai done in SAP?",
    ],
    keywords: ["cds", "cds views", "amdp", "hana", "code pushdown", "open sql"],
    answer:
      "Yes. Sai has built parameterized CDS Views with aggregation logic and used AMDP code pushdown to optimize database-intensive ABAP programs, including a case study that cut a month-end report's runtime from 12 minutes to under 2 minutes.",
    proof: [
      { label: "View SAP performance case study", target: "https://github.com/dsaisantoshkumar/abap-performance-optimization" },
      { label: "View experience section", target: "#experience" },
    ],
    relatedQuestions: [
      "Does Sai have performance optimization experience?",
      "What SAP experience does Sai have?",
      "Has Sai worked with large datasets?",
    ],
  },
  {
    id: "sap-odata",
    category: "skills",
    questions: [
      "Does Sai have OData experience?",
      "Has Sai worked with OData services?",
    ],
    keywords: ["odata", "odata v2", "odata v4", "sap gateway", "segw"],
    answer:
      "Yes. Sai has exposed OData V2 and V4 services via RAP and SAP Gateway (SEGW), including SAP Gateway CRUD operations validated through Postman.",
    proof: [{ label: "View experience section", target: "#experience" }],
    relatedQuestions: [
      "What experience does Sai have with RAP?",
      "Does Sai know CDS Views and AMDP?",
      "What SAP experience does Sai have?",
    ],
  },
  {
    id: "frontend-skills",
    category: "skills",
    questions: [
      "What frontend technologies does Sai know?",
      "Does Sai do frontend development?",
    ],
    keywords: ["frontend", "front-end", "angular", "angularjs", "ui", "single page application"],
    answer:
      "Sai's frontend work centers on AngularJS — at Cloudninetek LLC he built a Single Page Application with AngularJS that bound data to views and synchronized with the server to improve interaction speed.",
    proof: [{ label: "View experience section", target: "#experience" }],
    relatedQuestions: [
      "What backend technologies does Sai know?",
      "What SAP experience does Sai have?",
      "What projects has Sai built?",
    ],
  },
  {
    id: "database-skills",
    category: "skills",
    questions: [
      "What database technologies does Sai know?",
      "Does Sai know SQL?",
    ],
    keywords: ["database", "databases", "sql", "mysql", "hana", "relational database"],
    answer:
      "Sai works with SQL and relational databases (MySQL), plus SAP HANA through CDS Views and AMDP for database-intensive, HANA-optimized ABAP programs.",
    proof: [{ label: "View skills section", target: "#skills" }],
    relatedQuestions: [
      "Does Sai know CDS Views and AMDP?",
      "Has Sai worked with large datasets?",
      "What backend technologies does Sai know?",
    ],
  },
  {
    id: "ai-python-skills",
    category: "skills",
    questions: [
      "What AI or Python skills does Sai have?",
      "Does Sai have machine learning experience?",
      "What Python experience does Sai have?",
    ],
    keywords: ["ai", "python", "machine learning", "ml", "artificial intelligence", "generative ai", "llm"],
    answer:
      "Sai builds Python backend services and REST APIs professionally at Tech Pro, and applies machine learning and statistics through scikit-learn, Random Forest, SVM, KNN, PyCaret and LightGBM in academic and personal projects, alongside several completed AI and generative-AI courses.",
    proof: [
      { label: "View skills section", target: "#skills" },
      { label: "View projects section", target: "#projects" },
      { label: "View certifications section", target: "#certifications" },
    ],
    relatedQuestions: [
      "What projects has Sai built?",
      "Does Sai have AI projects?",
      "What certifications does Sai have?",
    ],
  },
  {
    id: "debugging-tools",
    category: "skills",
    questions: [
      "What debugging tools does Sai use?",
      "What testing tools does Sai use?",
    ],
    keywords: ["debugging", "debug", "testing", "postman", "eclipse adt", "st05", "sat", "playwright", "unit testing"],
    answer:
      "Sai debugs and tests with Postman for API validation, Eclipse ADT and SAP tools like ST05/SAT for tracing and performance analysis, plus unit testing, code reviews, UAT support and Playwright for browser automation.",
    proof: [{ label: "View skills section", target: "#skills" }],
    relatedQuestions: [
      "What SAP experience does Sai have?",
      "Does Sai have performance optimization experience?",
      "What projects has Sai built?",
    ],
  },

  // ------------------------------------------------------------ experience
  {
    id: "years-experience",
    category: "experience",
    questions: [
      "How many years of professional experience does Sai have?",
      "How much experience does Sai have?",
    ],
    keywords: ["years of experience", "how many years", "experience level"],
    answer:
      "Sai has 3+ years of professional software development experience across Cognizant, Cloudninetek LLC, CVS Health and his current role at Tech Pro (not counting his full-time graduate study from Aug 2022 to Dec 2023).",
    proof: [
      { label: "View experience section", target: "#experience" },
      { label: "View about section", target: "#about" },
    ],
    relatedQuestions: [
      "Where has Sai worked?",
      "What did Sai do at Cognizant?",
      "What did Sai work on at CVS Health?",
    ],
  },
  {
    id: "work-history",
    category: "experience",
    questions: [
      "Where has Sai worked?",
      "What companies has Sai worked for?",
      "What is Sai's work history?",
    ],
    keywords: ["work history", "companies", "employers", "where has sai worked"],
    answer:
      "Sai has worked at Cognizant Technology Solutions (Programmer Trainee), Cloudninetek LLC (Software Developer), CVS Health (SAP ABAP Developer, contract), and is currently a Python Developer at Tech Pro.",
    proof: [{ label: "View experience section", target: "#experience" }],
    relatedQuestions: [
      "What did Sai do at Cognizant?",
      "What did Sai work on at CVS Health?",
      "How many years of professional experience does Sai have?",
    ],
  },
  {
    id: "cognizant-role",
    category: "experience",
    questions: ["What did Sai do at Cognizant?", "Tell me about Sai's role at Cognizant"],
    keywords: ["cognizant", "programmer trainee"],
    answer:
      "As a Programmer Trainee at Cognizant Technology Solutions (Oct 2021 – Jul 2022), Sai completed structured training in Java, Linux, Unix, SQL and MySQL, developed Java web components with JSP and Servlets, wrote SQL queries for data retrieval and reporting, and supported backend debugging and defect analysis.",
    proof: [{ label: "View experience section", target: "#experience" }],
    relatedQuestions: [
      "What Java experience does Sai have?",
      "Where has Sai worked?",
      "What did Sai work on at CVS Health?",
    ],
  },
  {
    id: "cvs-health-role",
    category: "experience",
    questions: ["What did Sai work on at CVS Health?", "Tell me about Sai's role at CVS Health"],
    keywords: ["cvs health", "cvs"],
    answer:
      "As an SAP ABAP Developer (contract) at CVS Health (Jan 2025 – Jan 2026), Sai built a configurable data retention solution with TVARVC parameters, designed a data-separation strategy for a payment dataset of over one billion records, created parameterized CDS Views for invoice reconciliation, developed RAP-based OData services, and optimized programs with AMDP code pushdown.",
    proof: [{ label: "View experience section", target: "#experience" }],
    relatedQuestions: [
      "Has Sai worked with large datasets?",
      "Does Sai know CDS Views and AMDP?",
      "Does Sai have performance optimization experience?",
    ],
  },
  {
    id: "strongest-achievement",
    category: "experience",
    questions: ["What is Sai's strongest professional achievement?", "What is Sai proudest of?"],
    keywords: ["achievement", "proudest", "biggest accomplishment", "strongest"],
    answer:
      "One standout is Sai's SAP S/4HANA performance optimization work: replacing nested SELECTs with CDS aggregation views and AMDP code pushdown cut a month-end report's runtime from 12 minutes to under 2 minutes and improved posting response by 65%, for an organization processing over 500,000 financial documents monthly.",
    proof: [
      { label: "View SAP performance case study", target: "https://github.com/dsaisantoshkumar/abap-performance-optimization" },
      { label: "View experience section", target: "#experience" },
    ],
    relatedQuestions: [
      "Does Sai have performance optimization experience?",
      "What did Sai work on at CVS Health?",
      "Show Sai's best project",
    ],
  },
  {
    id: "large-datasets",
    category: "experience",
    questions: ["Has Sai worked with large datasets?", "Does Sai have big data experience?"],
    keywords: ["large dataset", "big data", "billion records", "large scale"],
    answer:
      "Yes — at CVS Health, Sai designed a data-separation strategy for a payment processing dataset of over one billion records, isolating reversal and canceled transactions to reduce load on active transaction queries.",
    proof: [{ label: "View experience section", target: "#experience" }],
    relatedQuestions: [
      "What did Sai work on at CVS Health?",
      "Does Sai have performance optimization experience?",
      "Does Sai know CDS Views and AMDP?",
    ],
  },
  {
    id: "performance-optimization",
    category: "experience",
    questions: ["Does Sai have performance optimization experience?", "Has Sai improved system performance before?"],
    keywords: ["performance optimization", "performance tuning", "optimization", "speed up", "runtime"],
    answer:
      "Yes. Sai has repeatedly optimized SAP systems — cutting a month-end report from 12 minutes to under 2 minutes via CDS aggregation and AMDP code pushdown, improving posting response by 65%, and using bulk operations and Open SQL tuning at CVS Health to reduce load on active payment queries.",
    proof: [
      { label: "View SAP performance case study", target: "https://github.com/dsaisantoshkumar/abap-performance-optimization" },
      { label: "View experience section", target: "#experience" },
    ],
    relatedQuestions: [
      "What is Sai's strongest professional achievement?",
      "Has Sai worked with large datasets?",
      "Does Sai know CDS Views and AMDP?",
    ],
  },
  {
    id: "backend-experience",
    category: "experience",
    questions: [
      "Does Sai have backend-development experience?",
      "Is Sai a backend developer?",
      "What backend technologies does Sai know?",
    ],
    keywords: ["backend", "backend developer", "backend development", "backend technologies"],
    answer:
      "Yes — Sai describes himself as a backend developer with 3+ years across Python, Java and SAP ABAP, focused on REST and OData API design, SQL and relational database integration, and service logic built to hold up in production.",
    proof: [
      { label: "View about section", target: "#about" },
      { label: "View experience section", target: "#experience" },
    ],
    relatedQuestions: [
      "What backend technologies does Sai know?",
      "Where has Sai worked?",
      "What SAP experience does Sai have?",
    ],
  },

  // --------------------------------------------------------------- projects
  {
    id: "projects-overview",
    category: "projects",
    questions: ["What projects has Sai built?", "Show Sai's projects"],
    keywords: ["projects", "portfolio projects", "what has sai built", "application", "demo"],
    answer:
      "Sai's portfolio includes 9 projects spanning AI automation (JobBot, AI Email Auto Reply), a live stock analytics dashboard, SAP ABAP performance work, machine learning classifiers for malware and IIoT anomaly detection, a parallel-computing Game of Life simulation, and academic statistics research.",
    proof: [
      { label: "View projects section", target: "#projects" },
      { label: "Open GitHub profile", target: "https://github.com/dsaisantoshkumar" },
    ],
    relatedQuestions: [
      "Show Sai's best project",
      "Where can I see the source code?",
      "Which projects have live demonstrations?",
    ],
  },
  {
    id: "best-project",
    category: "projects",
    questions: ["Show Sai's best project", "What is Sai's best project?"],
    keywords: ["best project", "favorite project", "flagship project"],
    answer:
      "There isn't one official 'best' project, but two that stand out are the SAP S/4HANA Performance Optimization case study (a 12-minute report cut to under 2 minutes) and Stock Monitor Pro, a live stock analytics dashboard with a working demo.",
    proof: [
      { label: "View SAP performance case study", target: "https://github.com/dsaisantoshkumar/abap-performance-optimization" },
      { label: "Open Stock Monitor Pro live demo", target: "https://dsaisantoshkumar.github.io/stock-monitor-pro" },
    ],
    relatedQuestions: [
      "What projects has Sai built?",
      "Which projects have live demonstrations?",
      "Does Sai have SAP projects?",
    ],
  },
  {
    id: "java-projects",
    category: "projects",
    questions: ["Does Sai have Java projects?"],
    keywords: ["java project", "java projects"],
    answer:
      "Sai's Java experience comes from professional training and backend development at Cognizant (JSP, Servlets, SQL) rather than a dedicated portfolio project — it isn't represented as a standalone project on his GitHub yet.",
    proof: [{ label: "View experience section", target: "#experience" }],
    relatedQuestions: [
      "What Java experience does Sai have?",
      "What projects has Sai built?",
      "What backend technologies does Sai know?",
    ],
  },
  {
    id: "sap-projects",
    category: "projects",
    questions: ["Does Sai have SAP projects?"],
    keywords: ["sap project", "sap projects"],
    answer:
      "Yes — the SAP S/4HANA Performance Optimization Case Study documents replacing nested SELECTs with CDS aggregation views and AMDP code pushdown, cutting report runtime from 12 minutes to under 2 minutes and improving posting response by 65%.",
    proof: [{ label: "View SAP performance case study", target: "https://github.com/dsaisantoshkumar/abap-performance-optimization" }],
    relatedQuestions: [
      "What SAP experience does Sai have?",
      "Does Sai have performance optimization experience?",
      "What projects has Sai built?",
    ],
  },
  {
    id: "ai-projects",
    category: "projects",
    questions: ["Does Sai have AI projects?"],
    keywords: ["ai project", "ai projects", "artificial intelligence project"],
    answer:
      "Yes — JobBot automates job applications using a local LLM-based resume match scoring engine, and the AI Email Auto Reply System uses TF-IDF similarity and a locally hosted Llama 3.1 model to draft context-aware replies to recruiter emails.",
    proof: [{ label: "View projects section", target: "#projects" }],
    relatedQuestions: [
      "What AI or Python skills does Sai have?",
      "Where can I see the source code?",
      "What projects has Sai built?",
    ],
  },
  {
    id: "source-code-links",
    category: "projects",
    questions: ["Where can I see the source code?", "Show Sai's GitHub repos"],
    keywords: ["source code", "github repo", "repository", "code", "open source"],
    answer:
      "Public repositories are linked from the Projects section — including Stock Monitor Pro, the SAP performance optimization case study, the malware detection classifier, and the Game of Life MPI simulation. A few projects (JobBot, AI Email Auto Reply, the IIoT anomaly detection study) are private.",
    proof: [
      { label: "Open GitHub profile", target: "https://github.com/dsaisantoshkumar" },
      { label: "View projects section", target: "#projects" },
    ],
    relatedQuestions: [
      "Which projects have live demonstrations?",
      "What projects has Sai built?",
      "Show Sai's GitHub",
    ],
  },
  {
    id: "live-demos",
    category: "projects",
    questions: ["Which projects have live demonstrations?", "Does Sai have a live demo?"],
    keywords: ["live demo", "demo", "live project", "deployed"],
    answer:
      "Stock Monitor Pro has a live demo — a stock analytics and portfolio dashboard tracking the Magnificent Seven stocks with a status indicator that clearly labels data as live, delayed, or unavailable.",
    proof: [
      { label: "Open Stock Monitor Pro live demo", target: "https://dsaisantoshkumar.github.io/stock-monitor-pro" },
      { label: "View source code", target: "https://github.com/dsaisantoshkumar/stock-monitor-pro" },
    ],
    relatedQuestions: [
      "What projects has Sai built?",
      "Where can I see the source code?",
      "Show Sai's best project",
    ],
  },
  {
    id: "project-problems",
    category: "projects",
    questions: ["What problem does each project solve?", "What problems do Sai's projects solve?"],
    keywords: ["problem", "problem solve", "why did sai build"],
    answer:
      "Each project starts from a real bottleneck: JobBot removes manual job-application busywork, the AI Email Auto Reply System replaces manual recruiter-email triage, Stock Monitor Pro replaces constant manual price and news monitoring, and the SAP case study speeds up a slow month-end financial reporting process.",
    proof: [{ label: "View projects section", target: "#projects" }],
    relatedQuestions: [
      "What projects has Sai built?",
      "Does Sai have AI projects?",
      "Show Sai's best project",
    ],
  },

  // ------------------------------------------------------------------ proof
  {
    id: "proof-java",
    category: "proof",
    questions: ["Can you prove Sai's Java experience?"],
    keywords: ["prove java", "proof java"],
    answer:
      "Sai's Java background is documented in the Experience section (Cognizant: JSP, Servlets, SQL and MySQL training and backend development) and on his resume.",
    proof: [
      { label: "View experience section", target: "#experience" },
      { label: "Download resume", target: "assets/resume.pdf" },
    ],
    relatedQuestions: ["What Java experience does Sai have?", "What did Sai do at Cognizant?"],
  },
  {
    id: "proof-sap",
    category: "proof",
    questions: ["Show proof of Sai's SAP experience."],
    keywords: ["prove sap", "proof sap"],
    answer:
      "Sai's SAP work is documented in the Experience section (CVS Health, Cloudninetek), the SAP Performance Optimization case study repository, and his SAP certifications.",
    proof: [
      { label: "View experience section", target: "#experience" },
      { label: "View SAP performance case study", target: "https://github.com/dsaisantoshkumar/abap-performance-optimization" },
      { label: "View certifications section", target: "#certifications" },
    ],
    relatedQuestions: [
      "What SAP experience does Sai have?",
      "Is Sai SAP certified?",
      "Does Sai have SAP projects?",
    ],
  },
  {
    id: "skill-location",
    category: "proof",
    questions: ["Where is this skill used?", "Which project demonstrates this skill?"],
    keywords: ["where is this used", "which project demonstrates", "skill used"],
    answer:
      "Ask about a specific skill (for example, 'Does Sai know CDS Views and AMDP?') and I'll point to the exact role or project — most SAP skills trace to CVS Health and Cloudninetek, and Python/ML skills trace to Tech Pro and the JobBot, AI Email, and IIoT projects.",
    proof: [
      { label: "View experience section", target: "#experience" },
      { label: "View projects section", target: "#projects" },
    ],
    relatedQuestions: [
      "What SAP experience does Sai have?",
      "What AI or Python skills does Sai have?",
      "Show the related work experience",
    ],
  },
  {
    id: "related-work-experience",
    category: "proof",
    questions: ["Show the related work experience"],
    keywords: ["related experience", "related work"],
    answer:
      "The Experience section lists every role in order: Python Developer at Tech Pro (current), SAP ABAP Developer contract at CVS Health, Software Developer at Cloudninetek LLC, and Programmer Trainee at Cognizant.",
    proof: [{ label: "View experience section", target: "#experience" }],
    relatedQuestions: ["Where has Sai worked?", "How many years of professional experience does Sai have?"],
  },
  {
    id: "cert-proof",
    category: "proof",
    questions: ["Show the certificate for this skill.", "Show Sai's certificates."],
    keywords: ["certificate", "certificates", "show certificate"],
    answer:
      "Sai's certifications are grouped by category (SAP and Artificial Intelligence) in the Certifications section, including SAP Professional Fundamentals, the SAP S/4HANA specialization from Board Infinity, and Google AI Essentials.",
    proof: [{ label: "View certifications section", target: "#certifications" }],
    relatedQuestions: ["What certifications does Sai have?", "Is Sai SAP certified?"],
  },

  // -------------------------------------------------------------- education
  {
    id: "education-background",
    category: "education",
    questions: ["What is Sai's educational background?", "What is Sai's education?"],
    keywords: ["education", "educational background", "degree", "school"],
    answer:
      "Sai holds a Master of Science in Computer and Information Science from the University of Southern Mississippi (Dec 2023) and a Bachelor's degree in Computer Science, Statistics and Mathematics from Acharya Nagarjuna University (2021).",
    proof: [{ label: "View education section", target: "#education" }],
    relatedQuestions: [
      "Where did Sai complete his master's degree?",
      "What was Sai's bachelor's degree?",
    ],
  },
  {
    id: "masters",
    category: "education",
    questions: ["Where did Sai complete his master's degree?"],
    keywords: ["master's", "masters", "graduate degree", "ms degree", "university of southern mississippi"],
    answer:
      "Sai completed his Master of Science in Computer and Information Science at the University of Southern Mississippi, finishing in December 2023, as full-time graduate study between his Cognizant and Cloudninetek roles.",
    proof: [
      { label: "View education section", target: "#education" },
      { label: "View experience section", target: "#experience" },
    ],
    relatedQuestions: ["What was Sai's bachelor's degree?", "What is Sai's educational background?"],
  },
  {
    id: "bachelors",
    category: "education",
    questions: ["What was Sai's bachelor's degree?"],
    keywords: ["bachelor's", "bachelors", "undergraduate", "bsc", "acharya nagarjuna"],
    answer:
      "Sai's Bachelor's degree is in Computer Science, Statistics and Mathematics from Acharya Nagarjuna University, completed in 2021.",
    proof: [{ label: "View education section", target: "#education" }],
    relatedQuestions: ["Where did Sai complete his master's degree?", "What is Sai's educational background?"],
  },
  {
    id: "certifications-list",
    category: "education",
    questions: ["What certifications does Sai have?"],
    keywords: ["certifications", "certification", "credentials", "credential"],
    answer:
      "Sai holds 8 certifications across SAP (SAP Professional Fundamentals; the SAP S/4HANA: From ABAP to Cloud-Ready Applications specialization from Board Infinity) and Artificial Intelligence (Google AI Essentials, Generative AI for Beginners, AI Agents for Beginners, Build Website With AI, Introduction to Artificial Intelligence, and an LLM Knowledge Certification).",
    proof: [{ label: "View certifications section", target: "#certifications" }],
    relatedQuestions: [
      "Is Sai SAP certified?",
      "Show Sai's certificates.",
      "What AI or Python skills does Sai have?",
    ],
  },
  {
    id: "sap-certified",
    category: "education",
    questions: ["Is Sai SAP certified?"],
    keywords: ["sap certified", "sap certification"],
    answer:
      "Yes — Sai holds SAP Professional Fundamentals and a SAP S/4HANA: From ABAP to Cloud-Ready Applications specialization from Board Infinity.",
    proof: [{ label: "View certifications section", target: "#certifications" }],
    relatedQuestions: ["What certifications does Sai have?", "What SAP experience does Sai have?"],
  },

  // ---------------------------------------------------------- professional
  {
    id: "interested-roles",
    category: "professional",
    questions: ["What roles is Sai interested in?"],
    keywords: ["interested in", "looking for", "open to", "role interest"],
    answer: "Sai is open to software development, SAP ABAP, automation, data, and research-oriented opportunities.",
    proof: [{ label: "View contact section", target: "#contact" }],
    relatedQuestions: ["What type of developer is Sai?", "How can I contact Sai?"],
  },
  {
    id: "developer-type",
    category: "professional",
    questions: ["What type of developer is Sai?"],
    keywords: ["type of developer", "kind of developer"],
    answer:
      "Sai is a backend-focused software developer working across Python, Java and SAP ABAP, with a data and applied-statistics/ML angle layered on top.",
    proof: [{ label: "View about section", target: "#about" }],
    relatedQuestions: ["What are Sai's main technical skills?", "What roles is Sai interested in?"],
  },
  {
    id: "industries",
    category: "professional",
    questions: ["What industries has Sai worked in?"],
    keywords: ["industries", "industry experience"],
    answer:
      "Sai's professional experience spans IT services and enterprise consulting (Cognizant), software and staffing services (Cloudninetek), and healthcare payment processing (CVS Health).",
    proof: [{ label: "View experience section", target: "#experience" }],
    relatedQuestions: ["Where has Sai worked?", "What did Sai work on at CVS Health?"],
  },
  {
    id: "location",
    category: "professional",
    questions: ["Where is Sai located?"],
    keywords: ["location", "based in", "where does sai live", "city"],
    answer: "Sai is based in Bentonville, AR, USA.",
    proof: [{ label: "View contact section", target: "#contact" }],
    relatedQuestions: ["How can I contact Sai?", "Is Sai available for onsite or remote positions?"],
  },
  {
    id: "availability",
    category: "professional",
    questions: ["Is Sai available for onsite or remote positions?"],
    keywords: ["onsite", "remote", "relocate", "availability", "work arrangement"],
    answer:
      "That specific preference isn't published on the portfolio yet — the fastest way to get a current answer is to reach out directly by email or LinkedIn.",
    proof: [],
    special: "availability",
    relatedQuestions: ["How can I contact Sai?", "Where is Sai located?"],
  },
  {
    id: "resume-download",
    category: "professional",
    questions: ["Download Sai's resume.", "Can I download Sai's resume?"],
    keywords: ["resume", "cv", "download resume"],
    answer: "Yes — Sai's resume is available as a direct download.",
    proof: [{ label: "Download resume", target: "assets/resume.pdf" }],
    relatedQuestions: ["How can I contact Sai?", "What are Sai's main technical skills?"],
  },

  // ---------------------------------------------------------------- contact
  {
    id: "contact-general",
    category: "contact",
    questions: ["How can I contact Sai?"],
    keywords: ["contact", "reach", "get in touch", "reach out"],
    answer: "You can contact Sai through email, phone, or LinkedIn.",
    proof: [],
    special: "contact-all",
    relatedQuestions: ["What is Sai's email?", "What is Sai's phone number?", "Show Sai's LinkedIn."],
  },
  {
    id: "contact-email",
    category: "contact",
    questions: ["What is Sai's email?"],
    keywords: ["email", "email address", "mail"],
    answer: "You can contact Sai by email.",
    proof: [],
    special: "contact-email",
    relatedQuestions: ["What is Sai's phone number?", "How can I contact Sai?"],
  },
  {
    id: "contact-phone",
    category: "contact",
    questions: ["What is Sai's phone number?"],
    keywords: ["phone", "phone number", "call"],
    answer: "You can contact Sai by phone.",
    proof: [],
    special: "contact-phone",
    relatedQuestions: ["What is Sai's email?", "How can I contact Sai?"],
  },
  {
    id: "contact-linkedin",
    category: "contact",
    questions: ["Show Sai's LinkedIn."],
    keywords: ["linkedin"],
    answer: "Here's Sai's LinkedIn profile.",
    proof: [],
    special: "contact-linkedin",
    relatedQuestions: ["Show Sai's GitHub.", "How can I contact Sai?"],
  },
  {
    id: "contact-github",
    category: "contact",
    questions: ["Show Sai's GitHub."],
    keywords: ["github", "github profile"],
    answer: "Here's Sai's GitHub profile.",
    proof: [],
    special: "contact-github",
    relatedQuestions: ["Where can I see the source code?", "Show Sai's LinkedIn."],
  },

  // -------------------------------------------------------------- recruiter
  {
    id: "recruiter-summary",
    category: "recruiter",
    questions: ["Recruiter summary"],
    keywords: ["recruiter", "recruiter summary", "quick summary", "tldr", "tl dr"],
    answer:
      "Sai Santosh Kumar Devarasetty — Software Developer, Data and Intelligent Systems. 3+ years across Python, Java and SAP ABAP (S/4HANA, RAP, CDS Views, AMDP), currently building Python backend services and REST APIs at Tech Pro. Strongest work: an SAP performance case study (12-minute report cut to under 2 minutes) and a data-separation strategy for a billion-record payment dataset at CVS Health.",
    proof: [
      { label: "Download resume", target: "assets/resume.pdf" },
      { label: "View experience section", target: "#experience" },
    ],
    special: "contact-all",
    relatedQuestions: [
      "What are Sai's main technical skills?",
      "Show Sai's best project",
      "How can I contact Sai?",
    ],
  },
];

// Category → alias keywords, used when no single entry scores highly enough
// but the visitor's question is clearly "about" a category (e.g. they typed
// "spring" or "s/4hana" without a full question). Powers the fallback
// suggestion buttons.
const portfolioAssistantCategories = {
  skills: ["java", "spring", "backend", "sap", "abap", "s4hana", "s/4hana", "rap", "odata", "cds", "amdp", "python", "ai", "ml", "machine learning", "frontend", "database", "sql"],
  experience: ["experience", "years", "worked", "work history", "cognizant", "cvs", "cloudninetek", "tech pro"],
  projects: ["project", "github", "portfolio", "application", "demo", "source code"],
  education: ["education", "degree", "university", "college", "master's", "masters", "bachelor's", "bachelors", "certification", "certificate", "certified", "credential"],
  contact: ["contact", "email", "mail", "phone", "call", "reach", "linkedin"],
};

const portfolioAssistantCategorySuggestions = {
  skills: ["skills-overview", "java-experience", "sap-skills-general"],
  experience: ["years-experience", "work-history", "strongest-achievement"],
  projects: ["projects-overview", "best-project", "live-demos"],
  education: ["education-background", "certifications-list", "sap-certified"],
  contact: ["contact-general", "contact-email", "contact-linkedin"],
};

const portfolioAssistantDefaultSuggestions = ["skills-overview", "projects-overview", "contact-general"];
