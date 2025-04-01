"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Type definitions for our league data
type LeagueEntry = {
  name: string
  bowlTime?: string
  weeklyFee: string
  startDate: string
  endDate: string
  teamComposition: string
  sanctioned?: string
  notes?: string
}

type LeagueTableProps = {
  leagues: LeagueEntry[]
  showBowlTime?: boolean
  showSanctioned?: boolean
}

export function LeagueTable({ leagues, showBowlTime = false, showSanctioned = true }: LeagueTableProps) {
  return (
    <>
      {/* Desktop view - Table */}
      <div className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>League Name</TableHead>
              {showBowlTime && <TableHead>Bowl Time</TableHead>}
              <TableHead>Weekly Fee</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date/Sweeps</TableHead>
              <TableHead>Team Composition</TableHead>
              {showSanctioned && <TableHead>Sanctioned</TableHead>}
              <TableHead>Notes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leagues.map((league, index) => (
              <TableRow key={index}>
                <TableCell>{league.name}</TableCell>
                {showBowlTime && <TableCell>{league.bowlTime}</TableCell>}
                <TableCell>{league.weeklyFee}</TableCell>
                <TableCell>{league.startDate}</TableCell>
                <TableCell>{league.endDate}</TableCell>
                <TableCell>{league.teamComposition}</TableCell>
                {showSanctioned && <TableCell>{league.sanctioned}</TableCell>}
                <TableCell>{league.notes}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      {/* Mobile view - Cards */}
      <div className="grid gap-6 md:hidden">
        {leagues.map((league, index) => (
          <div key={index} className="rounded-lg border p-4">
            <h3 className="text-lg font-semibold">{league.name}</h3>
            <div className="mt-2 grid grid-cols-2 gap-y-2 text-sm">
              {showBowlTime && league.bowlTime && (
                <>
                  <div className="font-medium text-muted-foreground">Bowl Time:</div>
                  <div>{league.bowlTime}</div>
                </>
              )}
              <div className="font-medium text-muted-foreground">Weekly Fee:</div>
              <div>{league.weeklyFee}</div>
              <div className="font-medium text-muted-foreground">Start Date:</div>
              <div>{league.startDate}</div>
              <div className="font-medium text-muted-foreground">End Date:</div>
              <div>{league.endDate}</div>
              <div className="font-medium text-muted-foreground">Team:</div>
              <div>{league.teamComposition}</div>
              {showSanctioned && league.sanctioned && (
                <>
                  <div className="font-medium text-muted-foreground">Sanctioned:</div>
                  <div>{league.sanctioned}</div>
                </>
              )}
              {league.notes && (
                <>
                  <div className="font-medium text-muted-foreground">Notes:</div>
                  <div>{league.notes}</div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  )
} 