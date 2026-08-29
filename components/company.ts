/* Company + legal constants, kept in one place so the legal pages, the footer
   and any future invoice/receipt copy all read from the same source.

   ─────────────────────────────────────────────────────────────────────────
   TO FILL IN before these pages go live (search for "TODO" below):
     • LEGAL_NAME       — the full registered entity name, if different from
                           "Mason Company" (e.g. "Mason Company Private Limited")
     • REGISTERED_OFFICE — the registered business address
     • GSTIN            — GST registration number, if registered
     • GOVERNING_CITY   — the city whose courts have jurisdiction (defaults to
                           Bengaluru, the primary base of operations)
   The policy text itself is a solid, plain-language starting point but is not a
   substitute for review by a qualified lawyer before publishing.
   ───────────────────────────────────────────────────────────────────────── */

import { CARE_EMAIL, PHONE_DISPLAY, PHONE_HREF, HOURS } from "./contact-details";

/** The trading name used across the site. */
export const COMPANY_NAME = "Mason Company";

/** The full registered legal name. TODO: confirm the registered entity name. */
export const LEGAL_NAME = "Mason Company";

/** TODO: add the registered office address. */
export const REGISTERED_OFFICE = "[Registered office address — to be added]";

/** TODO: add the GST registration number, or leave the placeholder if not yet
    registered. */
export const GSTIN = "[GSTIN — to be added]";

/** The city whose courts govern disputes. TODO: confirm jurisdiction. */
export const GOVERNING_CITY = "Bengaluru";
export const GOVERNING_STATE = "Karnataka";

/** Cities we currently install in. Kept in sync with ServiceArea's CITIES. */
export const SERVICE_CITIES = "Bengaluru and Goa";

/** The date the current legal documents took effect. Fixed, not generated —
    a policy's effective date should only change when the policy changes. */
export const LEGAL_EFFECTIVE_DATE = "29 August 2026";

export { CARE_EMAIL, PHONE_DISPLAY, PHONE_HREF, HOURS };
