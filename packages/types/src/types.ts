import type { EnigmaSlidevConfig } from './config'

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
 * Metadata for "enigmaslidev" field in themes' package.json
 */
export interface EnigmaSlidevThemeMeta {
  defaults?: Partial<EnigmaSlidevConfig>
  colorSchema?: 'dark' | 'light' | 'both'
  highlighter?: 'prism' | 'shiki' | 'both'
}

export type EnigmaSlidevThemeConfig = Record<string, string | number>

export interface EnigmaSlidevFeatureFlags {
  katex: boolean
  monaco: boolean
  tweet: boolean
  mermaid: boolean
}

export interface EnigmaSlidevMarkdown {
  slides: SlideInfo[]
  raw: string
  config: EnigmaSlidevConfig
  features: EnigmaSlidevFeatureFlags
  headmatter: Record<string, unknown>

  filepath?: string
  entries?: string[]
  themeMeta?: EnigmaSlidevThemeMeta
}

export interface EnigmaSlidevPreparserExtension {
  name: string
  transformRawLines?(lines: string[]): Promise<void> | void
  transformSlide?(content: string, frontmatter: any): Promise<string | undefined>
}

export type PreparserExtensionLoader = (headmatter?: Record<string, unknown>, filepath?: string) => Promise<EnigmaSlidevPreparserExtension[]>

// internal type?
export type PreparserExtensionFromHeadmatter = (headmatter: any, exts: EnigmaSlidevPreparserExtension[], filepath?: string) => Promise<EnigmaSlidevPreparserExtension[]>

export type RenderContext = 'slide' | 'overview' | 'presenter' | 'previewNext'
