import { reactive } from 'vue'
import { TowerEvent } from "./models/Event.js"

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  /** @type {import('./models/Account.js').Account} */
  account: {},

  /**@type {Ticket[]} */
  myTickets: [],

/**@type {TowerEvent[]} */
events: [],

/**@type {TowerEvent} */
activeEvent: null,

/**@type {Comment[]} */
activeEventComments: [],

/**@type {Ticket[]} */
activeEventTickets: [],



})
