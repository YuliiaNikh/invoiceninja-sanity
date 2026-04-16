export const SETTINGS_QUERY = `*[_type == "settings"][0]{
  siteName,
  logoImage,
  logo,
  headerNav[]{_key, label, href},
  headerActions[]{_key, label, href, variant},
  footerColumns[]{_key, heading, links[]{_key, label, href}},
  socialLinks[]{_key, platform, href},
  legalLinks[]{_key, label, href}
}`

// Prefer stable seed id `page-{slug}` so a duplicate Studio draft with the same slug does not win `[0]`.
export const PAGE_QUERY = `coalesce(
  *[_type == "page" && _id == "page-" + $slug][0],
  *[_type == "page" && slug.current == $slug][0]
){
  _id,
  title,
  slug,
  seo,
  sections[]{
    ...,
    _type == "faqSection" => {
      "items": items[]{
        _key,
        ...,
        "answer": answer[]{...}
      }
    }
  }
}`

export const ALL_PAGES_QUERY = `*[_type == "page"]{
  _id,
  title,
  slug
}`
