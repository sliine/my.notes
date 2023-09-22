// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

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

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
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
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
