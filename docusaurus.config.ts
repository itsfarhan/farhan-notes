import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: "Farhan's Notes",
  tagline: "Personal notes, guides, and documentation",
  favicon: "img/logo.png",

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  // future: {
  //   v4: true, // Improve compatibility with the upcoming Docusaurus v4
  // },

  // Set the production url of your site here
  url: "https://notes.farhanahmed.pro",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "itsfarhan", // Usually your GitHub org/user name.
  projectName: "PortfolioFarhan", // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          // Enable breadcrumbs
          breadcrumbs: true,
          // Show last update author and date from git history
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //   'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ["rss", "atom"],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //   'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
          // Useful options to enforce blogging best practices
          onInlineTags: "warn",
          onInlineAuthors: "warn",
          onUntruncatedBlogPosts: "warn",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      {
        // Whether to index docs pages
        indexDocs: true,
        
        // Whether to index blog pages
        indexBlog: true,
        
        // Whether to index static pages
        indexPages: false,
        
        // Language of your documentation, supports multiple languages
        language: ["en"],
      },
    ],
  ],

  themeConfig: {
    metadata: [
      {property: 'og:type', content: 'website'},
      {property: 'og:url', content: 'https://notes.farhanahmed.pro'},
      {property: 'og:title', content: "Farhan's Notes"},
      {property: 'og:description', content: 'Personal notes, guides, and documentation'},
      {property: 'og:image', content: 'https://notes.farhanahmed.pro/img/social_card_v3.png'},
      {property: 'og:image:width', content: '1200'},
      {property: 'og:image:height', content: '630'},
      {name: 'twitter:card', content: 'summary_large_image'},
      {name: 'twitter:url', content: 'https://notes.farhanahmed.pro'},
      {name: 'twitter:title', content: "Farhan's Notes"},
      {name: 'twitter:description', content: 'Personal notes, guides, and documentation'},
      {name: 'twitter:image', content: 'https://notes.farhanahmed.pro/img/social_card_v3.png'},
    ],
    colorMode: {
      defaultMode: "dark",
      disableSwitch: false,
      respectPrefersColorScheme: false,
    },
    // Replace with your project's social card
    image: "img/social_card_v3.png",
    navbar: {
      title: "Farhan's Notes",
      logo: {
        alt: "Farhan Ahmed Logo",
        src: "img/logo.png",
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "tutorialSidebar",
          position: "left",
          label: "📚 Documentation",
        },
        { 
          to: "/blog", 
          label: "✍️ Blog", 
          position: "left" 
        },
        {
          type: 'dropdown',
          label: '🔗 Quick Links',
          position: 'left',
          items: [
            {
              label: '🚀 Getting Started',
              to: '/docs/intro',
            },
            {
              label: '☁️ AWS Guides',
              to: '/docs/aws/',
            },
            {
              label: '🐳 Kubernetes',
              to: '/docs/kubernetes/',
            },
            {
              label: '🏗️ System Design',
              to: '/docs/systemdesign/',
            },
          ],
        },
        {
          href: "https://ko-fi.com/itsfarhan",
          label: "☕ Support",
          position: "right",
        },
        {
          href: "https://farhanahmed.pro/home",
          label: "🌐 Portfolio",
          position: "right",
        },
        {
          href: "https://github.com/itsfarhan",
          label: "🐙 GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [],
      copyright: `Built with ❤️ by Farhan Ahmed <a href="https://github.com/itsfarhan" target="_blank">GitHub</a> • <a href="https://linkedin.com/in/itsfarhan" target="_blank">LinkedIn</a> • <a href="https://ko-fi.com/itsfarhan" target="_blank">Support</a>`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
