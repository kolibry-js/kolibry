import type { KolibriConfig } from './config'

export type FrontmatterStyle = 'frontmatter' | 'yaml'

export interface SlideInfoBase {
  raw: string
  content: string
  note?: string
  frontmatter: Record<string, any>
  frontmatterStyle?: FrontmatterStyle
  title?: string
  level?: number
}

export interface SlideInfo extends SlideInfoBase {
  index: number
  start: number
  end: number
  inline?: SlideInfoBase
  source?: SlideInfoWithPath
}

export interface SlideInfoWithPath extends SlideInfoBase {
  filepath: string
}

export interface SlideInfoExtended extends SlideInfo {
  noteHTML: string
}

/**
 * Metadata for "kolibri" field in themes' package.json
 */
export interface KolibriThemeMeta {
  defaults?: Partial<KolibriConfig>
  colorSchema?: 'dark' | 'light' | 'both'
  highlighter?: 'prism' | 'shiki' | 'both'
}

export type KolibriThemeConfig = Record<string, string | number>

export interface KolibriFeatureFlags {
  katex: boolean
  monaco: boolean
  tweet: boolean
  mermaid: boolean
}

export interface KolibriMarkdown {
  slides: SlideInfo[]
  raw: string
  config: KolibriConfig
  features: KolibriFeatureFlags
  headmatter: Record<string, unknown>

  filepath?: string
  entries?: string[]
  themeMeta?: KolibriThemeMeta
}

export interface KolibriPreparserExtension {
  name: string
  transformRawLines?(lines: string[]): Promise<void> | void
  transformSlide?(content: string, frontmatter: any): Promise<string | undefined>
}

export type PreparserExtensionLoader = (headmatter?: Record<string, unknown>, filepath?: string) => Promise<KolibriPreparserExtension[]>

// internal type?
export type PreparserExtensionFromHeadmatter = (headmatter: any, exts: KolibriPreparserExtension[], filepath?: string) => Promise<KolibriPreparserExtension[]>

export type RenderContext = 'slide' | 'overview' | 'presenter' | 'previewNext'
