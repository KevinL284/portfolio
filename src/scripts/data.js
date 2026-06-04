export const personal = {
  profileImage: "https://github.com/KevinL284.png",
};

export const projects = [
  {
    id: 1,
    title: "Steam Data Pipeline API",
    category: ["backend", "data"],
    image: "src/assets/images/projects/steampipeline.jpg",
    description:
      "Pipeline ETL e API REST em Python para consumo, transformação e exposição de dados públicos da Steam.",
    longDescription:
      "Projeto pessoal que combina Backend Python, Engenharia de Dados e APIs REST. A aplicação consome dados públicos da Steam, transforma os dados com Pandas, persiste as informações em banco relacional e expõe endpoints com FastAPI. O projeto também utiliza arquitetura em camadas, Repository Pattern, Service Layer, Docker, testes automatizados, logging e CI/CD com GitHub Actions.",
    year: "2026",
    tags: [
      "Python",
      "FastAPI",
      "Pandas",
      "PostgreSQL",
      "SQLAlchemy",
      "Docker",
      "Pytest",
      "GitHub Actions",
    ],
    features: [
      "Extração de dados públicos da Steam",
      "Pipeline ETL com camadas separadas",
      "API REST com FastAPI",
      "Repository Pattern e Service Layer",
      "Persistência em PostgreSQL",
      "Execução com Docker e Docker Compose",
      "Testes automatizados com Pytest",
      "Workflow de CI/CD com GitHub Actions",
    ],
    github: "https://github.com/KevinL284/steam_data_pipeline",
    demo: null,
  },
  {
    id: 2,
    title: "CostPilot - Calculadora de Preços Inteligente",
    category: ["backend"],
    image: "src/assets/images/projects/CostPilotLogo.png",
    description:
      "Sistema web para cálculo de preços com margem de lucro, simulações polinomiais e dashboard interativo.",
    longDescription:
      "Aplicação web voltada para apoio à precificação, permitindo simulações de preço, margem de lucro e análise de cenários para tomada de decisão.",
    year: "2025",
    tags: ["PHP", "MySQL", "JavaScript", "HTML", "CSS"],
    features: [
      "Cálculo de preços com margem de lucro",
      "Simulações de cenários",
      "Dashboard interativo",
      "Persistência em banco relacional",
    ],
    github: null,
    demo: null,
  },
  {
    id: 3,
    title: "BaseDeHits - Análise Preditiva Musical",
    category: ["data"],
    image: "src/assets/images/projects/BHresults8.png",
    description:
      "Projeto de análise preditiva e segmentação de dados musicais utilizando modelos supervisionados e não supervisionados.",
    longDescription:
      "Projeto acadêmico de ciência de dados aplicado à análise musical, utilizando técnicas de machine learning para classificação, segmentação e exploração de padrões em bases musicais.",
    year: "2024",
    tags: ["Python", "Machine Learning", "Pandas", "Scikit-learn"],
    features: [
      "Análise exploratória de dados musicais",
      "Modelos supervisionados",
      "Modelos não supervisionados",
      "Segmentação de padrões musicais",
      "Visualização de resultados",
    ],
    github: null,
    demo: null,
  },
  {
    id: 4,
    title: "Email Classificador NLP",
    category: ["backend", "data"],
    image: "src/assets/images/404.svg",
    description:
      "Classificador binário de e-mails com NLP, pesos por critérios e geração automática de resposta com IA generativa.",
    longDescription:
      "Aplicação voltada à classificação de e-mails como produtivos ou improdutivos utilizando técnicas de NLP, critérios ponderados e engenharia de prompt. Além da classificação binária, o sistema gera uma sugestão de resposta com apoio de IA generativa, aproximando automação textual, processamento de linguagem natural e lógica aplicada ao contexto de comunicação profissional.",
    year: "2026",
    tags: [
      "Python",
      "NLP",
      "IA Generativa",
      "Prompt Engineering",
      "Text Classification",
      "Automation",
    ],
    features: [
      "Classificação binária de e-mails",
      "Uso de critérios ponderados para decisão",
      "Processamento de linguagem natural",
      "Geração automática de resposta",
      "Engenharia de prompt aplicada",
      "Automação de fluxo textual",
    ],
    github: "https://github.com/KevinL284/EmailClassificadorNLP",
    demo: null,
  },
  {
    id: 5,
    title: "Pipeline de Atos Internacionais em PDF",
    category: ["data"],
    image: "src/assets/images/projects/meutcc.jpg",
    description:
      "Pipeline de extração e análise de informações em documentos PDF usando IA generativa, regex, NER léxico e modelos de linguagem.",
    longDescription:
      "Projeto desenvolvido como trabalho de conclusão de curso, com foco em leitura, extração e análise de informações em documentos de atos internacionais. A pipeline explora múltiplas abordagens para capturar palavras-chave e informações relevantes em textos complexos, combinando IA generativa, regex, NER léxico com spaCy e experimentos com modelos como Gemini, Perplexity e BERT.",
    year: "2025",
    tags: [
      "Python",
      "NLP",
      "PDF",
      "spaCy",
      "Regex",
      "BERT",
      "Gemini",
      "IA Generativa",
    ],
    features: [
      "Leitura e processamento de múltiplos PDFs",
      "Extração de palavras-chave em documentos complexos",
      "Uso de regex para padrões textuais",
      "NER léxico com spaCy",
      "Exploração com IA generativa",
      "Experimentos com Gemini, Perplexity e BERT",
      "Aplicação acadêmica em atos internacionais",
    ],
    github: "https://github.com/KevinL284/Pdf-AtosInternacionais-pipeline",
    article: "https://repositorio.animaeducacao.com.br/items/089e3aac-acbc-4d33-a1db-80dce216292e",
    demo: null,
  },
  {
    id: 6,
    title: "Is Batman? - Classificador de Imagens",
    category: ["data"],
    image: "src/assets/images/projects/eobatman.jpg",
    description:
      "Projeto simples de visão computacional para classificação binária de imagens entre Batman e não-Batman.",
    longDescription:
      "Projeto experimental desenvolvido em Jupyter Notebook com foco em visão computacional e classificação binária de imagens. A proposta foi treinar modelos utilizando um pequeno conjunto de imagens para identificar se uma imagem representa ou não o Batman, explorando conceitos práticos de preparação de dados, treinamento, avaliação e inferência em modelos de classificação visual.",
    year: "2025",
    tags: [
      "Python",
      "Computer Vision",
      "Machine Learning",
      "Image Classification",
      "Jupyter Notebook",
    ],
    features: [
      "Classificação binária de imagens",
      "Treinamento de modelos com dataset próprio",
      "Separação entre imagens Batman e não-Batman",
      "Experimentos em Jupyter Notebook",
      "Avaliação prática de modelos de visão computacional",
    ],
    github: "https://github.com/KevinL284/isbatman",
    demo: null,
},
];

export const skills = [
  {
    title: "Backend Development",
    items: ["Python", "C#", "FastAPI", "SQL", "PostgreSQL", "MongoDB", "REST APIs"],
  },
  {
    title: "Data Engineering",
    items: ["Pandas", "NumPy", "ETL/ELT", "Data Visualization", "Lakehouse", "Data Warehousing", "Airflow", "Prefect", "neo4j"],
  },
  {
    title: "Ferramentas & DevOps",
    items: ["Git", "GitHub", "Docker", "GitHub Actions", "Linux", "VS Code"],
  },
];

export const contacts = [
  {
    label: "Email",
    value: "kevin.lucas284sz@gmail.com",
    href: "mailto:kevin.lucas284sz@gmail.com",
    icon: "fa-solid fa-envelope",
    color: "blue",
  },
  {
    label: "WhatsApp",
    value: "+55 (83) 9 9938-0246",
    href: "https://wa.me/5583999380246",
    icon: "fa-brands fa-whatsapp",
    color: "green",
  },
  {
    label: "LinkedIn",
    value: "Kevin Souza",
    href: "https://www.linkedin.com/in/kevin-souza-471791236/",
    icon: "fa-brands fa-linkedin",
    color: "blue",
  },
  {
    label: "GitHub",
    value: "KevinL284",
    href: "https://github.com/KevinL284",
    icon: "fa-brands fa-github",
    color: "gray",
  },
];
