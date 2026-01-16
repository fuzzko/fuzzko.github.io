import { QuartzConfig } from "./quartz/cfg";
import * as Plugin from "./quartz/plugins";

const theme = {
  light: "#10171f",
  lightgray: "#142436",
  gray: "#3974b0",
  darkgray: "#e5f0ff",
  dark: "#b4d2f0",
  secondary: "#74a5e7",
  tertiary: "#3c8de0",
  highlight: "#5b99e4",
  textHighlight: "#5b99e4",
};

const config: QuartzConfig = {
  configuration: {
    pageTitle: "komo's digital garden",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: null,
    locale: "en-US",
    baseUrl: "fuzzko.github.io",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Schibsted Grotesk",
        body: "Source Sans Pro",
        code: "Fira Code",
      },
      colors: {
        lightMode: theme,
        darkMode: theme,
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "catppuccin-frappe",
          dark: "catppuccin-frappe",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents({
        showByDefault: false,
      }),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
      Plugin.HardLineBreaks(),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      // Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages({
        colorScheme: "lightMode",
      }),
    ],
  },
};

export default config;
