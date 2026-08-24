/** Structured FAQ copy consolidated from concoursebowling.com walk-in, reservation, and bar FAQ pages. */

export type FaqItem = {
  question: string
  paragraphs: string[]
  listTitle?: string
  listItems?: string[]
}

export type FaqCategory = {
  id: string
  label: string
  description: string
  items: FaqItem[]
}

export const contactFaqCategories: FaqCategory[] = [
  {
    id: "general",
    label: "General",
    description: "Quick answers about visiting, lanes, parties, and leagues.",
    items: [
      {
        question: "Do you take reservations?",
        paragraphs: [
          "Yes, we accept reservations for lanes, especially for groups. You can make a reservation online or by calling us directly.",
        ],
      },
      {
        question: "What are your busiest times?",
        paragraphs: [
          "Friday and Saturday evenings are typically our busiest times. We recommend making a reservation or coming earlier in the day to avoid waiting.",
        ],
      },
      {
        question: "Do you have bumpers for kids?",
        paragraphs: [
          "Yes, we have automatic bumpers that can be set up for specific players in your lane, allowing adults and children to play together.",
        ],
      },
      {
        question: "Can we bring our own food and drinks?",
        paragraphs: [
          "Outside food and beverages are not permitted, with the exception of birthday cakes and desserts. We have a full-service bar and grill with a variety of options.",
        ],
      },
      {
        question: "Do you host birthday parties?",
        paragraphs: [
          "Yes, we offer several birthday party packages that include bowling, food, and arcade play. Contact us for details and availability.",
        ],
      },
      {
        question: "How do I join a bowling league?",
        paragraphs: [
          "You can sign up for a league by visiting our League Bowling page, calling us, or stopping by in person. We have leagues for all skill levels.",
        ],
      },
    ],
  },
  {
    id: "walk-in",
    label: "Walk-in bowling",
    description: "Rates, shoes, cosmic bowling, holidays, and walk-in details.",
    items: [
      {
        question: "Observed holidays",
        paragraphs: [
          "We observe the following holidays (hours or pricing may differ):",
        ],
        listItems: [
          "President’s Day",
          "Martin Luther King Day",
          "Memorial Day",
          "Veterans Day",
          "Labor Day",
          "Juneteenth",
          "Independence Day",
          "Day After Christmas",
          "New Year’s Day",
          "Day After New Year’s",
        ],
      },
      {
        question: "Game rate vs. hourly rate?",
        paragraphs: [
          "Game rate is charged per person. Each person pays for their own game. There is no time limit—you bowl until you finish your 10 frames, then buy another game if you like. It is a good fit when you want to take your time.",
          "Hourly rate is charged per lane, per hour. For example, if the hourly rate is $20 and you want two lanes, that is $40 per hour (shoe rental is separate). Watch the clock—you have that window to bowl as many games as you can. Hourly works well for larger groups who want a set time, or for a few people trying to pack in a lot of games.",
        ],
      },
      {
        question: "Are bowling shoes really necessary?",
        paragraphs: [
          "Yes. Bowling shoes protect you and our approaches. The smooth sole is designed for the slide at the finish of a throw; street shoes that grip can cause slips. Keep the soles dry—moisture can make you stick.",
          "Street shoes also scuff approaches, which is hard on the lanes and expensive to fix. Please use only bowling shoes on the approach.",
        ],
      },
      {
        question: "When is the DJ?",
        paragraphs: [
          "We have a DJ weekly on Friday and Saturday nights from 8:30 p.m. until close.",
        ],
      },
      {
        question: "What is Cosmic Bowling, and when is it?",
        paragraphs: [
          "Cosmic bowling replaces regular lighting with black lights and LEDs, with music turned up for more of a party vibe.",
        ],
        listTitle: "Typical Cosmic times",
        listItems: [
          "Friday: cosmic from 3 p.m. to close",
          "Saturday: cosmic all day",
          "Sunday: cosmic until 5 p.m.",
        ],
      },
      {
        question: "Can I use a free game pass?",
        paragraphs: [
          "Free game passes are good for one free game for one person. Rules:",
        ],
        listItems: [
          "Must be used before 5 p.m.",
          "Not valid on holidays",
          "Only one pass per person per day",
          "They do not expire",
        ],
      },
    ],
  },
  {
    id: "reservations",
    label: "Parties & reservations",
    description: "Guest counts, packages, food, drinks, arcade, and booking policies.",
    items: [
      {
        question: "How important is guest count?",
        paragraphs: [
          "Guest count matters for how many lanes you need, how much food we prepare, and sometimes what time of day works for a party. Give us a solid tentative headcount when you book; we need the final headcount the week of the event.",
        ],
      },
      {
        question: "When should I schedule my party?",
        paragraphs: [
          "Availability changes week to week. Come with a few dates and times that work—popular days fill fast, so backups help.",
        ],
      },
      {
        question: "What can we bring for parties?",
        paragraphs: [
          "We provide most of what you need on site. If you bring food, it should be dessert only (cakes, cupcakes, pies). We handle paper goods and the meal service.",
          "Please bring a knife for cake, candles, and matches or a lighter.",
        ],
      },
      {
        question: "Are decorations allowed?",
        paragraphs: [
          "Creative decorations are welcome. Avoid piñatas, silly string, confetti, or other messy small items.",
          "If you are not in a private area, keep decorations considerate of nearby guests. For large items (photo booths, face painters, etc.), check with event booking for space.",
        ],
      },
      {
        question: "Who helps run my party?",
        paragraphs: [
          "For lane reservations and walk-ins, Score-Techs and counter staff support you on the lanes.",
          "Most party packages include a dedicated server who keeps service consistent through your event.",
        ],
      },
      {
        question: "What bar options do parties have?",
        paragraphs: [
          "Outside of large contracted events, you can run a tab through your server or use drink tickets:",
        ],
        listItems: [
          "Beer, wine & well tickets: $9 each",
          "Premium drink tickets: $12 each",
          "Each ticket covers one drink",
        ],
      },
      {
        question: "How is food served during events?",
        paragraphs: [
          "Food is served at the lanes, behind your bowling couches, so you can eat while you play. Large VIP suite packages may use chafing dishes. Seating depends on how many bowlers are in your group.",
        ],
      },
      {
        question: "Can we use the arcade with a bowling reservation?",
        paragraphs: [
          "Yes. Ask about adding arcade cards to your reservation.",
        ],
      },
      {
        question: "What if we want more time when our slot ends?",
        paragraphs: [
          "If scheduling allows, you can often extend on the day of your event. Ask your server or the front desk to add an hour or two.",
        ],
      },
      {
        question: "Why can’t I book some party packages same-day?",
        paragraphs: [
          "Parties that need a server must be booked at least two weeks ahead so we can staff properly. Have a second date in mind in case your first choice is not available.",
        ],
      },
    ],
  },
  {
    id: "bar",
    label: "Bar & drinks",
    description: "Happy hour, ID policy, pitchers, and where drinks are allowed.",
    items: [
      {
        question: "Do you sell pitchers?",
        paragraphs: [
          "We do not sell beer by the pitcher. With a wide tap list, beer is served in regular pint glasses.",
        ],
      },
      {
        question: "When is Happy Hour?",
        paragraphs: ["Happy hour schedule:"],
        listItems: [
          "Monday: open–close",
          "Tuesday: 2:00 p.m.–6:00 p.m. and 9:00 p.m.–close",
          "Wednesday: 2:00 p.m.–6:00 p.m. and 9:00 p.m.–close",
          "Thursday–Friday: 2:00 p.m.–6:00 p.m.",
        ],
      },
      {
        question: "When should I have my ID ready?",
        paragraphs: [
          "Always be ready to prove age in a bar setting. On Friday and Saturday nights we card at the door; guests 21+ get a wristband so bartenders can serve quickly.",
        ],
      },
      {
        question: "What IDs do you accept?",
        paragraphs: [
          "We primarily accept valid state-issued driver’s licenses or ID cards with a photo. We also accept military IDs, consulate cards, and passports with a photo.",
          "We cannot accept temporary driver’s licenses, non-photo driver’s licenses, birth certificates, or school/work ID cards.",
        ],
      },
      {
        question: "Do drinks have to stay in the bar?",
        paragraphs: [
          "No. Drinks may go anywhere inside the center. They may not leave the building.",
        ],
      },
      {
        question: "How many drinks can I order at once?",
        paragraphs: [
          "We use a strict one ID, one drink policy to keep service fair and fast.",
        ],
      },
      {
        question: "Can kids sit with me in the bar area?",
        paragraphs: [
          "Guests under 21 are welcome in bar and food areas until 8:00 p.m. After that, the bar area is 21+ only.",
        ],
      },
      {
        question: "What drinks can you make?",
        paragraphs: [
          "We are a full bar with experienced bartenders—most standard cocktails and calls are fine. We do not have a blender.",
        ],
      },
    ],
  },
]
