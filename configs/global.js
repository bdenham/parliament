const path = require("path")
const projectRootDir = path.dirname(__dirname)

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

console.log(`Prefix Path: ${process.env.GATSBY_SITE_PATH_PREFIX}`)

module.exports = {
  pathPrefix: `${process.env.GATSBY_SITE_PATH_PREFIX}`,
  siteMetadata: {
    title: `${process.env.GATSBY_SOURCE_TITLE}`,
    description: `Page Builder developer documentation. Learn how Page Builder works and how you can customize it to build beautiful storefronts.`,
    author: `Page Builder team`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: "@adobe/gatsby-add-launch-script",
      options: {
        scriptUrl: `${process.env.GATSBY_LAUNCH_SRC}`,
        includeInDevelopment: false,
      },
    },
    {
      resolve: `gatsby-plugin-emotion`,
      options: {},
    },
    {
      resolve: `gatsby-transformer-yaml-full`,
      options: {
        typeName: `YamlFile`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${projectRootDir}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `markdown-pages`,
        path: `${projectRootDir}/src/markdown-pages`,
      },
    },
    {
      resolve: `gatsby-plugin-react-svg`,
      options: {
        rule: {
          include: `${projectRootDir}/src/images`,
        },
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `${projectRootDir}/src/images/favicon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        gatsbyRemarkPlugins: [
          {
            resolve: `@adobe/gatsby-remark-afm`,
            options: {
              directory: `${
                process.env.NODE_ENV === `development`
                  ? `${path.join(projectRootDir, "../")}docs`
                  : `${projectRootDir}/.cache/gatsby-source-git/`
              }`,
            },
          },
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              removeAccents: true,
              icon: false,
            },
          },
          `gatsby-plugin-catch-links`,
          {
            resolve: "gatsby-remark-external-links",
            options: {
              target: "_blank",
            },
          },
          {
            resolve: `gatsby-remark-copy-linked-files`,
            options: {
              ignoreFileExtensions: [`png`, `jpg`, `jpeg`, `bmp`, `tiff`, `md`],
            },
          },
          {
            resolve: "gatsby-remark-images",
            options: {
              maxWidth: 970,
            },
          },
          `gatsby-remark-embedder`,
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: "language-",
              inlineCodeMarker: null,
              aliases: {},
              showLineNumbers: false,
              noInlineHighlight: false,
              languageExtensions: [
                {
                  language: "superscript",
                  extend: "javascript",
                  definition: {
                    superscript_types: /(SuperType)/,
                  },
                  insertBefore: {
                    function: {
                      superscript_keywords: /(superif|superelse)/,
                    },
                  },
                },
              ],
              prompt: {
                user: "root",
                host: "localhost",
                global: false,
              },
            },
          },
        ],
      },
    },
    {
      resolve: `@adobe/parliament-transformer-navigation`,
      options: {},
    },
    {
      resolve: `gatsby-plugin-algolia-docsearch`,
      options: {
        apiKey: `63fd05c5e157b32f13aa0b92fa16b2b2`, // required
        indexName: `magento2_page-builder`, // required
        inputSelector: `#editing-view-port`, // required
        debug: false, // (bool) Optional. Default `false`
      },
    },
  ],
}
