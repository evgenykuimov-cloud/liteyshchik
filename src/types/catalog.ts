export type LoadClass = "A15" | "B125" | "C250" | "D400" | "E600" | "F900";
export type ProductType =
  | "manhole"
  | "storm-drain"
  | "frame"
  | "cover"
  | "grate"
  | "set"
  | "component";

export type ProductImage = { src: string; alt: string };
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
};

export type Product = {
  id: string;
  slug: string;
  categorySlug: string;
  name: string;
  shortName?: string;
  sku?: string;
  status: "draft" | "published";
  shape?: "round" | "rectangular" | "other";
  productType: ProductType;
  shortDescription: string;
  description: string;
  application?: string[];
  images: ProductImage[];
  specifications: ProductSpecification[];
  variants?: ProductVariant[];
  completeness: CompletenessOption[];
  loadClasses?: LoadClass[];
  materials?: string[];
  coating?: string;
  standards?: string[];
  documents?: ProductDocument[];
  drawings?: ProductDocument[];
  relatedProductIds?: string[];
  customProductionAvailable: boolean;
  featured?: boolean;
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
