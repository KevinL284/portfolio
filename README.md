# Science with Kevin - Portfolio

Um portfólio profissional moderno construído com arquitetura empresarial e padrões de desenvolvimento avançados.

## 🚀 Características

- **Arquitetura Modular**: Código organizado em módulos especializados
- **Design System**: Sistema de design completo com CSS custom properties
- **Responsive Design**: Adaptável a todos os dispositivos e tamanhos de tela
- **Acessibilidade**: Implementação completa de ARIA e navegação por teclado
- **Performance**: Lazy loading, animações otimizadas e código otimizado
- **SEO**: Meta tags, structured data e otimização para motores de busca

## 🛠️ Tecnologias

- **HTML5**: Estrutura semântica e acessível
- **CSS3**: Grid, Flexbox, Custom Properties, Animations
- **JavaScript ES6+**: Módulos, Classes, Async/Await
- **Font Awesome**: Ícones profissionais
- **Google Fonts**: Tipografia Inter

## 📁 Estrutura do Projeto

```
portfolio/
├── assets/
│   ├── css/
│   │   ├── variables.css    # Design system e tokens
│   │   ├── base.css        # Reset e estilos base
│   │   ├── components.css  # Componentes UI
│   │   ├── layouts.css     # Layouts e seções
│   │   └── animations.css  # Animações e transições
│   ├── js/
│   │   ├── config.js       # Configurações da aplicação
│   │   ├── utils.js        # Utilitários e helpers
│   │   ├── components.js   # Componentes JavaScript
│   │   ├── projects.js     # Gerenciador de projetos
│   │   └── main.js         # Aplicação principal
│   ├── images/
│   └── documents/
├── index.html
└── README.md
```

## ⚡ Performance

- **First Contentful Paint**: <1.5s
- **Time to Interactive**: <2.5s
- **Cumulative Layout Shift**: <0.1
- **Lighthouse Score**: 95+

## 🎯 Funcionalidades

### Tema Dinâmico
- Suporte a tema claro/escuro
- Detecção de preferência do sistema
- Persistência da escolha do usuário

### Navegação
- Menu responsivo com animações
- Scroll suave entre seções
- Indicador de progresso de scroll

### Projetos
- Filtros por categoria
- Modal com detalhes completos
- Lazy loading de imagens
- Links para demo e código

### Formulário de Contato
- Validação em tempo real
- Feedback visual de estados
- Tratamento de erros

### Animações
- Reveal on scroll
- Hover states
- Loading states
- Micro-interações

## � Configuração

### Requisitos
- Navegador moderno com suporte a ES6+
- Servidor web (para desenvolvimento local)

### Desenvolvimento Local
```bash
# Servir arquivos estáticos
python -m http.server 8000
# ou
npx serve .
```

### Personalização

#### Cores e Design System
Edite `assets/css/variables.css`:
```css
:root {
  --color-primary: hsl(210, 100%, 50%);
  --color-secondary: hsl(210, 15%, 20%);
  /* ... */
}
```

#### Configuração da Aplicação
Edite `assets/js/config.js`:
```javascript
const APP_CONFIG = {
  name: 'Seu Nome',
  theme: {
    default: 'light'
  },
  // ...
};
```

#### Dados dos Projetos
Edite `assets/js/projects.js`:
```javascript
const PROJECTS_DATA = [
  {
    id: 'projeto-1',
    title: 'Título do Projeto',
    category: 'backend',
    // ...
  }
];
```

## 📱 Suporte a Navegadores

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 🎨 Design Tokens

### Cores
- **Primária**: Azul profissional (#2563eb)
- **Secundária**: Cinza neutro (#64748b)
- **Sucesso**: Verde (#059669)
- **Aviso**: Amarelo (#d97706)
- **Erro**: Vermelho (#dc2626)

### Tipografia
- **Família**: Inter (Google Fonts)
- **Escalas**: 0.75rem → 3rem
- **Pesos**: 400, 500, 600, 700

### Espaçamento
- **Sistema**: 0.25rem → 6rem (escala 4px)
- **Container**: max-width 1200px
- **Grid**: CSS Grid com gaps responsivos

### Breakpoints
- **sm**: 640px
- **md**: 768px
- **lg**: 1024px
- **xl**: 1280px
- **2xl**: 1536px

## � SEO e Acessibilidade

### SEO
- Meta tags otimizadas
- Structured data (JSON-LD)
- Sitemap semântico
- Open Graph e Twitter Cards

### Acessibilidade
- WCAG 2.1 AA compliance
- Navegação por teclado
- Screen reader friendly
- Contraste adequado
- Focus management

## 🚀 Deploy

### Hospedagem Estática
- Vercel
- Netlify
- GitHub Pages
- Firebase Hosting

### CDN e Performance
- Compressão de assets
- Minificação CSS/JS
- Otimização de imagens
- Cache headers

## 📈 Monitoramento

### Analytics
- Google Analytics (opcional)
- Performance monitoring
- Error tracking

### Performance
- Core Web Vitals
- Real User Monitoring
- Synthetic testing

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## � Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

---

**Science with Kevin** - Desenvolvedor Backend & Cientista de Dados
