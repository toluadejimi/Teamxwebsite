/**
 * Curated Unsplash image URLs for Team X Technologies Ltd website.
 * All images use consistent sizing parameters for optimal performance.
 */

const unsplash = (photoId: string, width = 1200) =>
  `https://images.unsplash.com/photo-${photoId}?w=${width}&q=80`;

export const images = {
  hero: {
    main: unsplash("1451187580459-43490279c0fa"),
    secondary: unsplash("1519389950473-47ba0277781c"),
    overlay: unsplash("1550751827-4bd374c3f58b"),
  },
  services: {
    banking: unsplash("1563986768609-322da13575f3"),
    education: unsplash("1523240795612-9a054b0de244"),
    healthcare: unsplash("1576091160399-112ba8d25d1f"),
    hospitality: unsplash("1566073771259-6a8506099945"),
    government: unsplash("1557804506-669a67965ba0"),
    retail: unsplash("1441986300917-64674bd600d8"),
    logistics: unsplash("1586528116311-ad8dd3c8310d"),
    ai: unsplash("1677442136019-21780ecad995"),
    mobile: unsplash("1512941937669-90a1b58e7e9c"),
    cloud: unsplash("1544197150-b99a580bb7a8"),
    enterprise: unsplash("1460925895917-afdab827c52f"),
    customSoftware: unsplash("1498050108023-c5249f4df085"),
    erp: unsplash("1551288049-bebda4e38f71"),
    crm: unsplash("1553877522-43269d4ea984"),
    default: unsplash("1555066931-4365d14bab8c"),
  },
  portfolio: {
    banking: unsplash("1554224155-6726b3ff858f"),
    fintech: unsplash("1563013544-824ae1b704d3"),
    education: unsplash("1503676260728-1c00da094a0b"),
    healthcare: unsplash("1631217868264-e5b165ff0a0a"),
    hospitality: unsplash("1551882547-ff40c63fe580"),
    government: unsplash("1529107386315-d1ae1e222776"),
    retail: unsplash("1472851297138-1fhd485fd41c"),
    logistics: unsplash("1601584111327-776967627a91"),
    ai: unsplash("1620712943543-bcc4688e7485"),
    mobile: unsplash("1511707171634-5f897ff72aa8"),
    cloud: unsplash("1451187958440-131fb7429581"),
    manufacturing: unsplash("1581091226825-a6a2a5aee158"),
    insurance: unsplash("1450101499163-c8848c66ca85"),
    telecom: unsplash("1558618666-fcd25c85cd64"),
    energy: unsplash("1473341304170-971d4b93a451"),
    agriculture: unsplash("1625246333195-78d9c38ad449"),
    realEstate: unsplash("1560518883-ce09059eeffa"),
    nonprofit: unsplash("153262934542-8c9b0e8e6c2d"),
  },
  blog: {
    engineering: unsplash("1516321318423-f06f85e504b3"),
    ai: unsplash("1676299081847-824957444d04"),
    cloud: unsplash("1504639729090-34d0984388bd"),
    security: unsplash("1563986768494-4bbd10913983"),
    mobile: unsplash("1551650975-87deedd944c3"),
    fintech: unsplash("1559526324-4b87b5e93e44"),
    healthcare: unsplash("1579684385127-1ef15d508118"),
    leadership: unsplash("1522071820081-009f0129c71c"),
    default: unsplash("1497366216548-37526070297c"),
  },
  company: {
    office: unsplash("1497366811353-6870744d04b2"),
    team: unsplash("1522071820081-009f0129c71c"),
    meeting: unsplash("1600880292203-75762b2875ea"),
    workspace: unsplash("1497215842964-222b430dc094"),
    leadership: unsplash("1573496359142-b8d87734a435"),
    award: unsplash("1567427017947-545c1078772b"),
    global: unsplash("1526304640581-d334cdbbf45e"),
  },
  careers: {
    culture: unsplash("1522202176988-66273c2fd55f"),
    remote: unsplash("1588196749597-9ff07509d88e"),
    growth: unsplash("1552664730-d307ca884978"),
    benefits: unsplash("1600880292084-5c141b5a4c4e"),
  },
  caseStudies: {
    challenge: unsplash("1553877522-43269d4ea984"),
    solution: unsplash("1551288049-bebda4e38f71"),
    results: unsplash("1460925895917-afdab827c52f"),
  },
  testimonials: {
    executive: unsplash("1472099645785-5658abf4ff4e"),
    techLead: unsplash("1438761681033-6461ffad8d80"),
    product: unsplash("1507003211169-0a1dd7228f2d"),
  },
} as const;

export type ImageCategory = keyof typeof images;

export function getImageByCategory(
  category: ImageCategory,
  subcategory?: string
): string {
  const categoryImages = images[category];
  if (subcategory && subcategory in categoryImages) {
    return categoryImages[subcategory as keyof typeof categoryImages];
  }
  const values = Object.values(categoryImages);
  return values[0] as string;
}

export function getServiceBanner(category: string): string {
  const categoryMap: Record<string, string> = {
    "financial-solutions": images.services.banking,
    "enterprise-software": images.services.enterprise,
    education: images.services.education,
    healthcare: images.services.healthcare,
    hospitality: images.services.hospitality,
    government: images.services.government,
    retail: images.services.retail,
    logistics: images.services.logistics,
    "ai-solutions": images.services.ai,
    "mobile-applications": images.services.mobile,
    cloud: images.services.cloud,
  };
  return categoryMap[category] ?? images.services.default;
}
