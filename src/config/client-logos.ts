/**
 * Zentrale Kundenlogo-Konfiguration für einheitliches Handling
 * auf Startseite und Unternehmenswebsite
 */
export interface ClientLogo {
  name: string;
  logo: string;
}

export const clientLogos: ClientLogo[] = [
  { name: "Porsche", logo: "/customer/porsche.png" },
  { name: "Audi", logo: "/customer/audi.png" },
  { name: "Valtech Mobility", logo: "/customer/valtech-mobility.png" },
  { name: "Tricon", logo: "/customer/tricon.svg" },
  { name: "Alcedis", logo: "/customer/alcedis.png" },
  { name: "Solarwerk", logo: "/customer/solarwerk.png" },
  { name: "Physio Andre", logo: "/customer/physio-andre.png" },
  { name: "Hypofy", logo: "/customer/hypofy.png" },
  { name: "Digitalsocial.ID", logo: "/customer/solanaid.webp" },
  { name: "Edona Design", logo: "/customer/goldeneringe.svg" },
];
