// Configuration - Application Settings & Constants

// === APPLICATION CONFIG === //

const CONFIG = {
  // Personal Information
  personal: {
    name: "Kevin Souza",
    profession: "Backend Developer & Data Engineer",
    location: "João Pessoa, PB",
    email: "kevin.lucas284sz@gmail.com",
    phone: "+55 (83) 9 9938-0246",
    birthDate: "2004-08-20", // Format: YYYY-MM-DD - Nascimento: 20 de agosto
    graduationYear: 2025,
    graduationMonth: 12, // December

    // Social Links
    social: {
      github: "https://github.com/KevinL284",
      linkedin: "https://www.linkedin.com/in/kevin-souza-471791236/",
      whatsapp: "https://wa.me/5583999380246",
      email: "mailto:kevin.lucas284sz@gmail.com"
    },

    // GitHub Profile for dynamic photo
    githubUsername: "KevinL284"
  },

  // Theme Settings
  theme: {
    default: "light", // or "dark"
    storageKey: "portfolio-theme",
    autoDetect: true // Detect system preference
  },

  // Animation Settings
  animations: {
    enabled: true,
    duration: {
      fast: 150,
      normal: 250,
      slow: 350,
      slower: 500
    },
    delays: {
      stagger: 100,
      section: 200
    }
  },

  // Scroll Settings
  scroll: {
    offset: 80, // Header height offset for smooth scroll
    behavior: "smooth"
  },

  // Modal Settings
  modal: {
    closeOnOverlay: true,
    closeOnEscape: true,
    lockBody: true
  },

  // Loading Settings
  loading: {
    minDuration: 1000, // Minimum loading time in ms
    fadeOutDuration: 500
  }
};

// === PROJECTS DATA === //

const PROJECTS_DATA = [
  {
    id: "basedehits-analysis",
    title: "BaseDeHits - Análise Preditiva Musical",
    description: "Projeto de análise preditiva e segmentação de dados musicais utilizando modelos supervisionados e não supervisionados para identificar hits musicais com base em características sonoras.",
    category: "data",
    tags: ["Python", "Machine Learning", "Pandas", "Scikit-learn", "Data Analysis"],
    featured: true,
    images: [
      "src/assets/images/projects/BHresults8.png"
    ],
    features: [
      "Análise preditiva de hits musicais baseada em características sonoras",
      "Implementação de 5 modelos supervisionados (KNN, SVM, Decision Tree, Random Forest, Logistic Regression)",
      "Clustering com K-Means e GMM para segmentação musical",
      "Avaliação de performance com múltiplas métricas (Accuracy, R², MSE, MAE, AUC-ROC)",
      "Análise de características musicais como danceability, energy, valence e acousticness",
      "Visualização de dados e clusters para insights musicais"
    ],
    techStack: [
      { name: "Python", icon: "fab fa-python" },
      { name: "Pandas", icon: "fas fa-table" },
      { name: "Scikit-learn", icon: "fas fa-brain" },
      { name: "Jupyter Notebook", icon: "fas fa-book" },
      { name: "Data Visualization", icon: "fas fa-chart-bar" },
      { name: "Machine Learning", icon: "fas fa-robot" }
    ],
    links: {
      demo: "https://www.kaggle.com/code/kevinsouza284/basedehits",
      github: "https://github.com/KevinL284/BaseDeHitsDF",
      case: null
    },
    year: "2024"
  },

  {
    id: "costpilot-calculator",
    title: "CostPilot - Calculadora de Preços Inteligente",
    description: "Sistema web para cálculo de preços com margem de lucro, simulações polinomiais e lineares, e dashboard interativo. Projeto colaborativo desenvolvido pela equipe CodeBox com foco em gestão financeira para pequenos negócios.",
    category: "backend",
    tags: ["PHP", "MySQL", "JavaScript", "CSS", "Dashboard", "Figma"],
    featured: true,
    images: [
      "src/assets/images/projects/CostPilotLogo.png"
    ],
    features: [
      "Calculadora de preços com margem de lucro personalizada",
      "Simulações matemáticas polinomiais e lineares para projeções",
      "Dashboard interativo para visualização de dados financeiros",
      "Sistema de autenticação e perfis de usuário",
      "Interface responsiva otimizada para desktop",
      "Gestão de simulações salvas e histórico de cálculos",
      "Prototipagem completa desenvolvida no Figma"
    ],
    techStack: [
      { name: "PHP", icon: "fab fa-php" },
      { name: "MySQL", icon: "fas fa-database" },
      { name: "JavaScript", icon: "fab fa-js-square" },
      { name: "CSS3", icon: "fab fa-css3-alt" },
      { name: "Figma", icon: "fab fa-figma" },
      { name: "Dashboard", icon: "fas fa-chart-pie" }
    ],
    links: {
      demo: null,
      github: "https://github.com/codebox-solutions/CostPilot",
      case: "https://www.figma.com/design/1HrsVCVOnde7vaULXJ6NBn/Prototipo-CostPilot?node-id=0-1&p=f"
    },
    year: "2025"
  },
  {
    id: "isbatman-classifier",
    title: "IsBatman - Classificador de Imagens Batman",
    description: "Projeto de visão computacional usando transfer learning com TensorFlow para classificação de imagens Batman vs não-Batman. Implementa web scraping para coleta de dados, limpeza manual e treinamento com 50 épocas.",
    longDescription: "Projeto completo de machine learning focado em visão computacional. Utiliza transfer learning com modelos pré-treinados do TensorFlow para classificar imagens entre Batman e não-Batman. O projeto incluiu web scraping automatizado para coleta de dados, processo manual de limpeza e filtragem das imagens, e treinamento intensivo com 50 épocas. Desenvolvido inteiramente em Jupyter Notebook, demonstra conhecimentos avançados em deep learning e processamento de imagens.",
    images: [
      "src/assets/images/projects/isbatman.jpg"
    ],
    tags: ["Python", "TensorFlow", "Computer Vision", "Transfer Learning", "Jupyter Notebook", "Web Scraping", "Machine Learning"],
    category: "data",
    status: "Concluído",
    featured: true,
    techStack: [
      { name: "TensorFlow", icon: "fas fa-brain" },
      { name: "Python", icon: "fab fa-python" },
      { name: "Jupyter Notebook", icon: "fas fa-book" },
      { name: "Computer Vision", icon: "fas fa-eye" },
      { name: "Transfer Learning", icon: "fas fa-share-alt" },
      { name: "Web Scraping", icon: "fas fa-spider" }
    ],
    features: [
      "Web scraping automatizado para coleta de dados",
      "Limpeza e filtragem manual de imagens",
      "Implementação de transfer learning com modelos pré-treinados",
      "Treinamento com 50 épocas para otimização",
      "Classificação binária Batman vs não-Batman",
      "Documentação completa em Jupyter Notebook"
    ],
    challenges: [
      "Coleta e preparação de dataset balanceado",
      "Otimização de hiperparâmetros para transfer learning",
      "Tratamento de overfitting com pequenos datasets"
    ],
    learnings: [
      "Aplicação prática de transfer learning",
      "Técnicas de data augmentation",
      "Processamento e análise de imagens com deep learning"
    ],
    links: {
      demo: null,
      github: "https://github.com/KevinL284/isbatman",
      case: null
    },
    year: "2025"
  }
];

// === SKILLS DATA === //

const SKILLS_DATA = {
  backend: [
    { name: "Python", icon: "fab fa-python", level: 90 },
    { name: "C#", icon: "fab fa-microsoft", level: 75 },
    { name: "FastAPI", icon: "fas fa-rocket", level: 85 },
    { name: "SQL", icon: "fas fa-database", level: 80 }
  ],
  data: [
    { name: "Pandas", icon: "fas fa-table", level: 85 },
    { name: "NumPy", icon: "fas fa-calculator", level: 80 },
    { name: "Data Visualization", icon: "fas fa-chart-bar", level: 85 },
    { name: "ETL Processes", icon: "fas fa-exchange-alt", level: 75 }
  ],
  tools: [
    { name: "Git", icon: "fab fa-git-alt", level: 90 },
    { name: "VS Code", icon: "fas fa-code", level: 95 },
    { name: "GitHub", icon: "fab fa-github", level: 85 },
    { name: "Linux", icon: "fab fa-linux", level: 70 }
  ]
};

// === EXPERIENCE DATA === //

const EXPERIENCE_DATA = [
  {
    period: "2024 - Atual",
    title: "Freelancer - Desenvolvedor Backend",
    company: "Autônomo",
    description: "Desenvolvimento de APIs e sistemas backend para diversos clientes, com foco em Python e arquiteturas escaláveis.",
    technologies: ["Python", "FastAPI", "PostgreSQL", "Docker", "AWS"],
    achievements: [
      "Desenvolveu mais de 10 APIs para diferentes clientes",
      "Implementou soluções de cache que melhoraram performance em 60%",
      "Criou documentação técnica completa para todos os projetos"
    ]
  },
  {
    period: "2025 - Atual",
    title: "Enetrix - UFPB",
    company: "Universidade Federal da Paraíba",
    description: "Desenvolvimento de projetos de análise de dados e como parte de colaboração voluntária.",
    technologies: ["Python", "Data Analysis", "SQL", "Machine Learning"],
    achievements: ["participante e colaborador em projetos de pesquisa", "desenvolvimento de notebooks para coleta de dados fracamente estruturados"]
  }
];

// === CONTACT METHODS === //

const CONTACT_METHODS = [
  {
    type: "email",
    label: "Email",
    value: "kevin.lucas284sz@gmail.com",
    href: "mailto:kevin.lucas284sz@gmail.com",
    icon: "fas fa-envelope"
  },
  {
    type: "whatsapp",
    label: "WhatsApp",
    value: "+55 (83) 9 9938-0246",
    href: "https://wa.me/5583999380246",
    icon: "fab fa-whatsapp"
  },
  {
    type: "linkedin",
    label: "LinkedIn",
    value: "LinkedIn",
    href: "https://www.linkedin.com/in/kevin-souza-471791236/",
    icon: "fab fa-linkedin"
  },
  {
    type: "github",
    label: "GitHub",
    value: "GitHub",
    href: "https://github.com/KevinL284",
    icon: "fab fa-github"
  }
];

// === API ENDPOINTS === //

const API_ENDPOINTS = {
  github: {
    profile: `https://api.github.com/users/${CONFIG.personal.githubUsername}`,
    repos: `https://api.github.com/users/${CONFIG.personal.githubUsername}/repos`,
    avatar: `https://avatars.githubusercontent.com/u/${CONFIG.personal.githubUsername}?v=4`
  }
};

// === VALIDATION RULES === //

const VALIDATION = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^[\+]?[1-9][\d]{0,15}$/,
  url: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/
};

// === ERROR MESSAGES === //

const ERROR_MESSAGES = {
  network: "Erro de conexão. Verifique sua internet.",
  timeout: "Operação expirou. Tente novamente.",
  generic: "Algo deu errado. Tente novamente mais tarde.",
  validation: "Por favor, verifique os dados inseridos."
};

// === SUCCESS MESSAGES === //

const SUCCESS_MESSAGES = {
  theme: "Tema alterado com sucesso!",
  copy: "Copiado para a área de transferência!",
  email: "Email enviado com sucesso!"
};

// === EXPORT === //

// Make config available globally
window.CONFIG = CONFIG;
window.PROJECTS_DATA = PROJECTS_DATA;
window.SKILLS_DATA = SKILLS_DATA;
window.EXPERIENCE_DATA = EXPERIENCE_DATA;
window.CONTACT_METHODS = CONTACT_METHODS;
window.API_ENDPOINTS = API_ENDPOINTS;
window.VALIDATION = VALIDATION;
window.ERROR_MESSAGES = ERROR_MESSAGES;
window.SUCCESS_MESSAGES = SUCCESS_MESSAGES;

console.log("✅ Configuration loaded successfully");
