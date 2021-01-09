import defaultSettings from '@/settings'

const title = defaultSettings.title || '微机原理教学平台'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
