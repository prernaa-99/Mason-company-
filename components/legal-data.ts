/* The written content of the three legal pages. Kept as structured data so the
   shared LegalPage layout renders all three identically. Paragraphs may carry
   inline [label](/href) links, which the layout promotes to real links.

   This is plain-language, India-oriented boilerplate written for a home
   bathroom-safety assessment-and-installation business. It is a solid starting
   point, NOT a substitute for review by a qualified lawyer. The business
   specifics (registered name, address, GSTIN, jurisdiction) come from
   company.ts — fill those in before publishing. */

import type { LegalDoc } from "./LegalPage";
import {
  COMPANY_NAME,
  LEGAL_NAME,
  REGISTERED_OFFICE,
  GOVERNING_CITY,
  GOVERNING_STATE,
  SERVICE_CITIES,
  LEGAL_EFFECTIVE_DATE,
  CARE_EMAIL,
  PHONE_DISPLAY,
  PHONE_HREF,
  HOURS,
} from "./company";

const contactLine = `Questions about this policy? Email us at [${CARE_EMAIL}](mailto:${CARE_EMAIL}) or call [${PHONE_DISPLAY}](${PHONE_HREF}) (${HOURS}).`;

export const PRIVACY: LegalDoc = {
  title: "Privacy Policy",
  updated: LEGAL_EFFECTIVE_DATE,
  intro: `${COMPANY_NAME} ("we", "us", "our") helps families make bathrooms safer for ageing parents. This policy explains what personal information we collect when you contact us, book a safety visit, or use this website, how we use it, and the choices you have. By sharing your details with us, you agree to the practices described here.`,
  sections: [
    {
      heading: "Information We Collect",
      blocks: [
        { p: "We only collect what we need to answer you and to plan and carry out a bathroom safety visit or installation. This includes:" },
        {
          list: [
            "Contact details you give us — your name, phone number, email address, and the city or area of the home, submitted through our enquiry and booking forms.",
            "Visit and installation details — information about the bathroom, the person the upgrade is for, mobility needs relevant to safety, and any preferences or access instructions you share so our team can plan the work.",
            "Communication records — notes from calls, WhatsApp messages, and emails, kept so we can follow up and serve you well.",
            "Website usage data — basic technical information such as your device type, browser, and pages viewed, collected automatically to keep the site working and to understand how it is used.",
          ],
        },
        { p: "We do not ask for, and you should not send us, more sensitive information than a safety assessment requires." },
      ],
    },
    {
      heading: "How We Use Your Information",
      blocks: [
        { p: "We use the information you provide to:" },
        {
          list: [
            "Respond to your enquiry and arrange a free safety visit.",
            "Plan, quote, and carry out the assessment and any installation you choose.",
            "Contact you about your booking, including reminders, follow-ups, and after-installation support.",
            "Improve our service, our recommendations, and this website.",
            "Meet our legal, tax, and record-keeping obligations.",
          ],
        },
        { p: "We do not use your details for unrelated marketing without your consent, and you can ask us to stop contacting you at any time." },
      ],
    },
    {
      heading: "How We Share Information",
      blocks: [
        { p: "We do not sell your personal information. We share it only where it is needed to deliver our service:" },
        {
          list: [
            "With our trained installation team and technicians assigned to your visit or job.",
            "With service providers who help us operate — for example scheduling, payment processing, and communication tools — who may only use the information to perform that service for us.",
            "Where required by law, or to protect our rights, safety, or property.",
          ],
        },
      ],
    },
    {
      heading: "Data Retention",
      blocks: [
        { p: "We keep your information only for as long as needed for the purposes above — to serve you, honour warranties on completed work, and meet legal and accounting requirements. When it is no longer needed, we delete or anonymise it." },
      ],
    },
    {
      heading: "How We Protect Your Information",
      blocks: [
        { p: "We take reasonable technical and organisational measures to protect your information against loss, misuse, and unauthorised access. No method of transmission or storage is completely secure, but we work to keep your data safe and to limit access to those who need it to do their job." },
      ],
    },
    {
      heading: "Your Rights and Choices",
      blocks: [
        { p: "You can ask us to:" },
        {
          list: [
            "Access the personal information we hold about you.",
            "Correct information that is inaccurate or out of date.",
            "Delete your information, where we are not required to keep it.",
            "Stop contacting you for follow-ups or marketing.",
          ],
        },
        { p: `To make any of these requests, email us at [${CARE_EMAIL}](mailto:${CARE_EMAIL}). We will respond within a reasonable time.` },
      ],
    },
    {
      heading: "Cookies and Analytics",
      blocks: [
        { p: "This website may use cookies and similar technologies to remember your preferences and to understand how the site is used so we can improve it. You can control cookies through your browser settings; blocking some may affect how parts of the site work." },
      ],
    },
    {
      heading: "Third-Party Links",
      blocks: [
        { p: "Our website may link to other sites — for example a maps or messaging service. We are not responsible for the privacy practices of those sites, and we encourage you to read their policies." },
      ],
    },
    {
      heading: "Children's Privacy",
      blocks: [
        { p: "Our services are intended for adults arranging safety upgrades for a home. We do not knowingly collect personal information from children under 18. If you believe a child has provided us information, please contact us so we can remove it." },
      ],
    },
    {
      heading: "Changes to This Policy",
      blocks: [
        { p: "We may update this policy from time to time. When we do, we will change the “last updated” date at the top of this page. Significant changes may be communicated to you directly." },
      ],
    },
    {
      heading: "Contact Us",
      blocks: [
        { p: `This site and our services are provided by ${LEGAL_NAME}, ${REGISTERED_OFFICE}.` },
        { p: contactLine },
      ],
    },
  ],
};

export const TERMS: LegalDoc = {
  title: "Terms & Conditions",
  updated: LEGAL_EFFECTIVE_DATE,
  intro: `These terms govern your use of the ${COMPANY_NAME} website and the safety visits, assessments, and installation services we provide. By booking a visit or engaging our services, you agree to these terms. Please read them alongside our [Privacy Policy](/privacy) and [Refund & Cancellation Policy](/refund).`,
  sections: [
    {
      heading: "About Our Services",
      blocks: [
        { p: `${COMPANY_NAME} provides bathroom safety assessments and the supply and installation of safety upgrades — such as grab bars, anti-slip flooring, seating, and related fittings — for homes with ageing or less-mobile residents. We currently operate in ${SERVICE_CITIES}.` },
        { p: "A booking is a request for our services. It becomes a confirmed engagement once we have discussed the work with you and agreed a scope and price." },
      ],
    },
    {
      heading: "Safety Visits and Assessments",
      blocks: [
        { p: "Our initial safety visit is offered free of charge and carries no obligation to purchase. During the visit, a trained member of our team reviews the bathroom, discusses needs and preferences, and recommends suitable upgrades. Recommendations are based on the information available at the time and on generally accepted safety practice." },
      ],
    },
    {
      heading: "Quotes and Pricing",
      blocks: [
        { p: "Any quote we provide is based on the scope agreed at the time and is valid for the period stated in it. Prices may change if the scope changes, if site conditions differ from what was assessed, or if additional work is needed once installation begins. We will tell you before carrying out any work not covered by the agreed quote." },
        { p: "Unless stated otherwise, prices include applicable taxes as required by law." },
      ],
    },
    {
      heading: "Payment",
      blocks: [
        { p: "Payment terms — including any advance or deposit and the balance due on completion — will be set out in your quote or order confirmation. Please pay by the methods and within the timelines stated there. We issue a receipt or invoice for payments made." },
      ],
    },
    {
      heading: "Installation and Site Access",
      blocks: [
        { p: "So that we can complete the work safely and on time, you agree to:" },
        {
          list: [
            "Provide safe access to the bathroom and the home at the scheduled time.",
            "Tell us in advance of anything that may affect the work — for example concealed pipes or wiring, wall or tile condition, or building-society or landlord permissions required.",
            "Ensure someone aged 18 or over is present during the visit and installation.",
          ],
        },
        { p: "If access is not available at the agreed time, we may need to reschedule, which can affect timelines and, in some cases, costs." },
      ],
    },
    {
      heading: "Workmanship and Warranty",
      blocks: [
        { p: "We install using trained technicians and take care to leave the work safe and tidy. We stand behind our workmanship: if an installation is defective due to our work, we will put it right in line with the warranty terms provided with your job." },
        { p: "Products we supply may also carry a manufacturer's warranty. Warranties do not cover damage from misuse, accidental damage, unauthorised alterations, or normal wear and tear." },
      ],
    },
    {
      heading: "Safety Disclaimer",
      blocks: [
        { p: "Our upgrades are designed to reduce the risk of falls and to support safer movement in the bathroom. They cannot eliminate all risk, and they do not guarantee that a fall or injury will never occur." },
        { p: "Our recommendations are practical safety guidance and are not medical advice. For questions about a specific medical condition, mobility need, or care plan, please consult a qualified healthcare professional. Safety equipment should be used as intended and, where relevant, alongside professional care." },
      ],
    },
    {
      heading: "Cancellations and Refunds",
      blocks: [
        { p: "You may cancel or reschedule under the terms set out in our [Refund & Cancellation Policy](/refund), which forms part of these terms." },
      ],
    },
    {
      heading: "Limitation of Liability",
      blocks: [
        { p: "To the extent permitted by law, our liability arising from our services is limited to the amount you paid for the work concerned. We are not liable for indirect or consequential losses. Nothing in these terms limits any liability that cannot be limited under applicable law, including for death or personal injury caused by our negligence." },
      ],
    },
    {
      heading: "Intellectual Property",
      blocks: [
        { p: `The content of this website — text, images, graphics, and the ${COMPANY_NAME} name and logo — belongs to us or our licensors and may not be copied or reused without our permission.` },
      ],
    },
    {
      heading: "Governing Law and Jurisdiction",
      blocks: [
        { p: `These terms are governed by the laws of India. Any dispute arising from them or from our services is subject to the exclusive jurisdiction of the courts of ${GOVERNING_CITY}, ${GOVERNING_STATE}.` },
      ],
    },
    {
      heading: "Changes to These Terms",
      blocks: [
        { p: "We may update these terms from time to time. The version in force is the one published on this page, dated at the top. Continued use of our services after a change means you accept the updated terms." },
      ],
    },
    {
      heading: "Contact Us",
      blocks: [
        { p: `These services are provided by ${LEGAL_NAME}, ${REGISTERED_OFFICE}.` },
        { p: `Questions about these terms? Email [${CARE_EMAIL}](mailto:${CARE_EMAIL}) or call [${PHONE_DISPLAY}](${PHONE_HREF}) (${HOURS}).` },
      ],
    },
  ],
};

export const REFUND: LegalDoc = {
  title: "Refund & Cancellation Policy",
  updated: LEGAL_EFFECTIVE_DATE,
  intro: `We want you to feel confident booking with ${COMPANY_NAME}. This policy explains when you can cancel or reschedule, and how refunds work. It should be read together with our [Terms & Conditions](/terms).`,
  sections: [
    {
      heading: "Free Safety Visits",
      blocks: [
        { p: "Our initial safety visit is free and carries no obligation. You can cancel or reschedule it at any time, at no cost, by letting us know as early as you can so we can offer the slot to another family." },
      ],
    },
    {
      heading: "Cancelling a Booked Installation",
      blocks: [
        { p: "Once you have confirmed an installation, you may cancel or reschedule subject to the following:" },
        {
          list: [
            "If you cancel before we have ordered materials or scheduled technicians for your job, any advance you have paid is refundable in full, minus any costs already incurred on your behalf.",
            "If you cancel after materials have been ordered or custom items have been prepared for your bathroom, the cost of those materials or preparation may be deducted from your refund.",
            "To reschedule, please give us reasonable notice so we can adjust our team's plan. Repeated last-minute changes may affect timelines.",
          ],
        },
        { p: "Please confirm the exact notice periods and any advance for your job in your quote or order confirmation, as they can vary with the scope of work." },
      ],
    },
    {
      heading: "Deposits and Advance Payments",
      blocks: [
        { p: "Where a job requires an advance or deposit, this reserves your slot and covers initial material and planning costs. The refundable portion of an advance depends on how much work and procurement has already taken place when you cancel, as described above." },
      ],
    },
    {
      heading: "Refund Method and Timeline",
      blocks: [
        { p: "Approved refunds are made to the original payment method wherever possible. We aim to process refunds promptly once the amount is agreed; the time for the money to reach you also depends on your bank or payment provider." },
      ],
    },
    {
      heading: "If Something Isn't Right",
      blocks: [
        { p: "If an installation is defective because of our workmanship, we will put it right — that is our first commitment to you, under the workmanship warranty in our [Terms & Conditions](/terms). Please tell us promptly so we can inspect and resolve it." },
        { p: "Where a supplied product is faulty, we will help you claim under the applicable manufacturer or workmanship warranty." },
      ],
    },
    {
      heading: "Non-Refundable Items",
      blocks: [
        { p: "The following are generally not refundable:" },
        {
          list: [
            "Work already completed to the agreed standard.",
            "Custom-made or made-to-measure items prepared specifically for your bathroom, once production has begun.",
            "Third-party charges already incurred on your behalf that we cannot recover.",
          ],
        },
      ],
    },
    {
      heading: "How to Request a Cancellation or Refund",
      blocks: [
        { p: `To cancel, reschedule, or request a refund, contact us as early as possible:` },
        {
          list: [
            `Email: [${CARE_EMAIL}](mailto:${CARE_EMAIL})`,
            `Phone / WhatsApp: [${PHONE_DISPLAY}](${PHONE_HREF}) (${HOURS})`,
          ],
        },
        { p: "Please include your name, the phone number you booked with, and your booking or job reference so we can find your details quickly." },
      ],
    },
  ],
};
