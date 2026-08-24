import type { MetadataRoute } from "next"

const BASE_URL = "https://www.concoursebowling.com"

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  const routes: { path: string; priority: number }[] = [
    { path: "/", priority: 1 },
    { path: "/reservations", priority: 0.9 },
    { path: "/bowling", priority: 0.9 },
    { path: "/league-bowling", priority: 0.8 },
    { path: "/menu", priority: 0.8 },
    { path: "/arcade", priority: 0.7 },
    { path: "/events", priority: 0.7 },
    { path: "/about", priority: 0.6 },
    { path: "/careers", priority: 0.5 },
    { path: "/contact", priority: 0.6 },
    { path: "/community-partnerships", priority: 0.5 },
  ]

  return routes.map(({ path, priority }) => ({
    url: `${BASE_URL}${path}`,
    lastModified,
    changeFrequency: "weekly",
    priority,
  }))
}
