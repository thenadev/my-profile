export type DocumentType = "cv" | "certificate" | "degree";

export interface BaseDocumentItem {
  title: string; // translation key
  description: string; // translation key
  platform?: string;
  type: DocumentType;
  tags?: string[];
}

export interface DocumentWithSingleUrl extends BaseDocumentItem {
  url: string;
  links?: never;
}

export interface DocumentWithLinks extends BaseDocumentItem {
  links: { language: "english" | "german"; url: string }[];
  url?: never;
}

export type DocumentItem = DocumentWithSingleUrl | DocumentWithLinks;

export const documents: DocumentItem[] = [
  {
    title: "cvTitle",
    description: "cvDescription",
    type: "cv",
    tags: ["profile", "resume"],
    links: [
      { language: "english", url: "/cv-en.pdf" },
      { language: "german", url: "/cv-de.pdf" },
    ],
  },
  {
    title: "bachelorTitle",
    description: "bachelorDescription",
    type: "degree",
    tags: ["education", "university"],
    url: "/bachelor-certificate.pdf",
  },
  {
    title: "blockchainTitle",
    platform: "AlgoExpert.io",
    description: "blockchainDescription",
    type: "certificate",
    tags: ["blockchain", "web3"],
    url: "/BlockchainExpert_Certificate.pdf",
  },
  {
    platform: "Udemy",
    title: "springBootTitle",
    description: "springBootDescription",
    type: "certificate",
    tags: ["java", "spring"],
    url: "/Spring-Boot-Beginners.pdf",
  },
];
