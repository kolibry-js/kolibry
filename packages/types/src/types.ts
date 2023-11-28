import type { KolibryConfig } from './config'

export interface SlideInfoBase {
  raw: string
  content: string
  note?: string
  frontmatter: Record<string, any>
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
  notesHTML: string
}

/**
 * Metadata for "kolibry" field in themes' package.json
 */
export interface KolibryThemeMeta {
  defaults?: Partial<KolibryConfig>
  colorSchema?: 'dark' | 'light' | 'both'
  highlighter?: 'prism' | 'shiki' | 'both'
}

export type KolibryThemeConfig = Record<string, string | number>

export interface KolibryFeatureFlags {
  katex: boolean
  monaco: boolean
  tweet: boolean
  mermaid: boolean
}

export interface KolibryMarkdown {
  slides: SlideInfo[]
  raw: string
  config: KolibryConfig
  features: KolibryFeatureFlags
  headmatter: Record<string, unknown>

  filepath?: string
  entries?: string[]
  themeMeta?: KolibryThemeMeta
}

export type RenderContext = 'slide' | 'overview' | 'presenter' | 'previewNext'
