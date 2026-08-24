/**
 * =============================================================================
 * BOOKING ACTIONS — single source of truth for every conversion CTA on the site
 * =============================================================================
 * Update the constants here and every "Reserve" / "Book" / "Call" button
 * follows. Lane reservations go to the Meriq portal; parties are handled by
 * the events desk (phone ext. 238 or email).
 */

/** Meriq internet reservations portal. Always open in a new tab with rel="noopener noreferrer". */
export const LANE_BOOKING_URL = "https://secure.meriq.com/concoursebowling/"

export const PHONE_DISPLAY = "(714) 666-2695"
export const PHONE_TEL = "tel:+17146662695"

export const EVENTS_PHONE_DISPLAY = "(714) 666-2695 ext. 238"
/** The comma is a dial-pause so mobile phones ring through to the events extension automatically. */
export const EVENTS_PHONE_TEL = "tel:+17146662695,238"

export const EVENTS_EMAIL = "events@concoursebowling.com"

export function eventsMailto(subject: string): string {
  return `mailto:${EVENTS_EMAIL}?subject=${encodeURIComponent(subject)}`
}
