/* The twelve items we actually install.
   Shared by the hero rail and the packages page so the two can never end up
   describing different kit — the rail is where most people first see this list,
   and the packages page is where they go to read it properly.

   Names and tags are verbatim from the What We Do section of the masonco build
   so both sites describe the same thing. Photography is ours — that project's
   whatwedo/ images are abstract background washes, not product shots. */

export type KitItem = { title: string; label: string; img: string };

export const KIT: KitItem[] = [
  { title: "PVD-coated vertical grab bars", label: "Grab support", img: "/images/bath-3.jpg" },
  { title: "PVD-coated L / angled grab bar", label: "Grab support", img: "/images/bath-5.jpg" },
  { title: "PVD-coated flip-up / folding bar", label: "Grab support", img: "/images/bath-1.jpg" },
  { title: "Anti-slip solution / coating", label: "Traction", img: "/images/shower-3.jpg" },
  { title: "Premium anti-slip mats", label: "Traction", img: "/images/shower-4.jpg" },
  { title: "Toilet seat / raised seat / commode support", label: "Support", img: "/images/bath-4.jpg" },
  { title: "Shower seating stool", label: "Support", img: "/images/shower-2.jpg" },
  { title: "Sensor lighting unit", label: "Comfort", img: "/images/bath-6.jpg" },
  { title: "Two-way lock", label: "Safety", img: "/images/detail-1.jpg" },
  { title: "8-corner equivalent corner safety", label: "Protection", img: "/images/bath-2.jpg" },
  { title: "Drainage solutions", label: "Hygiene", img: "/images/shower-1.jpg" },
  { title: "Bathroom slippers", label: "Comfort", img: "/images/care-1.jpg" },
];
