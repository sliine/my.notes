// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Мои записки',
  tagline: 'Dinosaurs are cool',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://waif.cc',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'facebook', // Usually your GitHub org/user name.
  projectName: 'docusaurus', // Usually your repo name.

  
  onBrokenLinks: 'ignore',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
			({
				docs: {
					sidebarPath: require.resolve('./sidebars.js'),
					routeBasePath: "/docs",
					// Remove this to remove the "edit this page" links.
				},

				blog: {
					showReadingTime: true,
					routeBasePath: '/',
					blogSidebarCount: 'ALL',
					blogSidebarTitle: 'Другие посты',
					// Remove this to remove the "edit this page" links.
				},

				theme: {
					customCss: require.resolve('./src/css/custom.css'),
				},
			}),
    ],
  ],

  themeConfig:
  /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
  ({
    navbar: {
      title: 'Мои записки',
      items: [
        {
          type: 'dropdown',
          label: '✍️ Блог',
          position: 'left',
          items: [
            {
            label: 'Главная',
            to: '/',
            },
            {
            label: 'Все по годам',
            to: 'archive',
            },
          ],
        },
        // {to: '/', label: 'Блог', position: 'left'},
        {
          type: 'doc',
          docId: 'intro',
          position: 'left',
          label: '📦 Штуки',
        },
        {
          href: "https://t.me/pikaa_ks",
          position: "right",
          label: "💬 Telegram",
        },
      ],
    },
    }),
};

export default config;
