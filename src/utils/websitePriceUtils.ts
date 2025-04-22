import { websiteConfig } from "@/config/prices/website";

export const calculatePrice = (
  design: string,
  pages: number,
  features: string[],
  additional: string[]
) => {
  let basePrice = 0;

  // Design-Kosten
  switch (design) {
    case "basic":
      basePrice += websiteConfig.websitePackage.basic.price;
      // Seiten-Kosten
      basePrice += (pages - 1) * websiteConfig.websitePackage.basic.pagePrice;
      break;
    case "premium":
      basePrice += websiteConfig.websitePackage.premium.price;
      // Seiten-Kosten
      basePrice += (pages - 1) * websiteConfig.websitePackage.premium.pagePrice;
      break;
    case "individual":
      basePrice += websiteConfig.websitePackage.individual.price;
      // Seiten-Kosten
      basePrice +=
        (pages - 1) * websiteConfig.websitePackage.individual.pagePrice;
      break;
  }

  // Feature-Kosten
  features.forEach((feature) => {
    switch (feature) {
      case "contact":
        basePrice += websiteConfig.features.contact.price;
        break;
      case "blog":
        basePrice += websiteConfig.features.blog.price;
        break;
    }
  });

  additional.forEach((additional) => {
    switch (additional) {
      case "brochure":
        basePrice += websiteConfig.additional.brochure.price;
        break;
      case "media":
        basePrice += websiteConfig.additional.media.price;
        break;
    }
  });

  return basePrice;
};

export const calculateMonthlyPrice = (additional: string[]) => {
  let monthlyPrice = 0;

  // Wartungskosten
  additional.forEach((additional) => {
    switch (additional) {
      case "maintenance":
        monthlyPrice += websiteConfig.additional.maintenance.price;
        break;
    }
  });
  return monthlyPrice;
};
