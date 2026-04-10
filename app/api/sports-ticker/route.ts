import { NextRequest, NextResponse } from "next/server"

const API_KEY = process.env.API_SPORTS_KEY || "5b1b4e785a317cd3ac06ed1e529e6120"

const SPORT_CONFIG: Record<string, { baseUrl: string; league?: string }> = {
  nba: { baseUrl: "https://v2.nba.api-sports.io" },
  nfl: { baseUrl: "https://v1.nfl.api-sports.io" },
  hockey: { baseUrl: "https://v1.hockey.api-sports.io", league: "57" },
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const sport = searchParams.get("sport") || "nba"
  const date = searchParams.get("date") || new Date().toISOString().slice(0, 10)

  const config = SPORT_CONFIG[sport]
  if (!config) {
    return NextResponse.json({ error: "Invalid sport" }, { status: 400 })
  }

  const url = new URL("/games", config.baseUrl)
  url.searchParams.set("date", date)
  if (config.league) url.searchParams.set("league", config.league)

  try {
    const res = await fetch(url.toString(), {
      headers: { "x-apisports-key": API_KEY },
      next: { revalidate: 60 },
    })

    if (!res.ok) {
      const text = await res.text()
      console.error("API-Sports error:", res.status, text)
      return NextResponse.json(
        { error: "Failed to fetch games", details: text },
        { status: res.status }
      )
    }

    const data = await res.json()
    const games = normalizeGames(data)
    return NextResponse.json({ games, sport })
  } catch (err) {
    console.error("Sports ticker fetch error:", err)
    return NextResponse.json(
      { error: "Failed to fetch games" },
      { status: 500 }
    )
  }
}

function normalizeGames(data: unknown): Array<{
  home: string
  away: string
  homeScore: number | null
  awayScore: number | null
  status: string
  statusShort: string
}> {
  const games: Array<{
    home: string
    away: string
    homeScore: number | null
    awayScore: number | null
    status: string
    statusShort: string
  }> = []

  const raw = data as { response?: unknown[] }
  const items = Array.isArray(raw?.response) ? raw.response : []

  for (const g of items) {
    const game = g as Record<string, unknown>
    const teams = game.teams as Record<string, { name?: string; score?: number; points?: number }> | undefined
    const scores = game.scores as Record<string, { points?: number } | { points?: number }> | undefined
    const total = scores?.total as Record<string, { points?: number }> | undefined
    const visitors = teams?.visitors ?? teams?.away
    const homeTeam = teams?.home

    const home =
      homeTeam?.name ??
      (game.homeTeam as { name?: string })?.name ??
      "TBD"
    const away =
      visitors?.name ??
      (game.awayTeam as { name?: string })?.name ??
      (game.visitors as { name?: string })?.name ??
      "TBD"
    const homeScores = scores?.home as { points?: number } | undefined
    const awayScores = scores?.visitors ?? (scores?.away as { points?: number })
    const homeScore =
      homeTeam?.score ??
      homeScores?.points ??
      (game.homeScore as number) ??
      total?.home?.points ??
      (scores?.home as number) ??
      null
    const awayScore =
      visitors?.score ??
      awayScores?.points ??
      (game.awayScore as number) ??
      total?.away?.points ??
      (scores?.away as number) ??
      (scores?.visitors as number) ??
      null
    const statusObj = game.status as { long?: string; short?: string | number } | undefined
    const status = statusObj?.long ?? (game.status as string) ?? "Scheduled"
    const rawShort = statusObj?.short ?? (game.statusShort as string)
    const statusShort = typeof rawShort === "number"
      ? (rawShort === 3 ? "FT" : rawShort === 4 ? "OT" : String(rawShort))
      : String(rawShort ?? "")

    games.push({
      home: String(home),
      away: String(away),
      homeScore: homeScore != null ? Number(homeScore) : null,
      awayScore: awayScore != null ? Number(awayScore) : null,
      status: String(status),
      statusShort: String(statusShort),
    })
  }

  return games
}
