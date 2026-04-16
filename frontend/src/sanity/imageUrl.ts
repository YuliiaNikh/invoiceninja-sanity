import imageUrlBuilder from '@sanity/image-url'
import { client } from './client'

const builder = imageUrlBuilder(client)

export type LogoImageSource = {
  asset?: {_ref?: string} | null
} | null

/** Header mark: 32×32 @2x for sharpness on retina */
export function urlForLogoImage(source: LogoImageSource | undefined): string | null {
  if (!source?.asset?._ref) return null
  return builder.image(source).width(64).height(64).fit('max').auto('format').url()
}
