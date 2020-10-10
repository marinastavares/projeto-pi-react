import { get } from './requests'

export const getLabs = (key) => get(key)('labs/')
export const getLab = (slug) => (key) => get(key)(`labs/${slug}`)
