export type ProductType =
  | "heat-resistant-casting"
  | "centrifugal-casting"
  | "furnace-equipment"
  | "machined-part"
  | "conveyor-part"
  | "custom-part";

export type ProductImage = { src: string; alt: string; label?: string };
export type ProductSpecification = {
  label: string;
  value: string | null;
  important?: boolean;
};
export type CompletenessOption = {
  id: string;
  title: string;
  description: string;
};
export type ProductDocument = {
  title: string;
  type: string;
  href?: string;
};
export type ProductVariant = {
  name: string;
  description: string;
  image?: ProductImage;
};

export type Product = {
  id: string;
  slug: string;
  categorySlug: string;
  name: string;
  shortName?: string;
  sku?: string;
  status: "draft" | "published";
  productType: ProductType;
  shortDescription: string;
  description: string;
  application: string[];
  images: ProductImage[];
  specifications: ProductSpecification[];
  variants?: ProductVariant[];
  completeness: CompletenessOption[];
  materials: string[];
  standards?: string[];
  documents?: ProductDocument[];
  drawings?: ProductDocument[];
  relatedProductIds?: string[];
  customProductionAvailable: boolean;
  featured?: boolean;
  calculationCta?: string;
  faq?: Array<{ question: string; answer: string }>;
  seo: { title: string; description: string };
};

export type Category = {
  slug: string;
  name: string;
  description: string;
  parent?: string;
};

export type DocumentItem = {
  id: string;
  title: string;
  type: string;
  category: string;
  updatedAt?: string;
  number?: string;
  expiresAt?: string;
  href?: string;
};
