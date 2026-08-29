import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { REFUND } from "@/components/legal-data";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy - Mason Company",
  description:
    "When you can cancel or reschedule a Mason Company booking, and how refunds are handled.",
};

export default function RefundPage() {
  return <LegalPage doc={REFUND} />;
}
