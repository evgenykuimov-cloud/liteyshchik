import type { DocumentItem, Product } from "@/types/catalog";
import type { LeadInput } from "@/lib/lead-schema";

export interface ProductRepository {
  list(): Promise<Product[]>;
  findBySlug(category: string, slug: string): Promise<Product | null>;
}
export interface DocumentRepository {
  list(): Promise<DocumentItem[]>;
}
export interface LeadRepository {
  create(lead: LeadInput): Promise<{ id: string }>;
}
export interface FileStorage {
  save(file: File, leadId: string): Promise<{ key: string }>;
}
export interface NotificationService {
  notifyNewLead(lead: LeadInput, leadId: string): Promise<void>;
}
export interface CRMAdapter {
  createLead(lead: LeadInput, leadId: string): Promise<void>;
}

export class UnconfiguredFileStorage implements FileStorage {
  async save(): Promise<{ key: string }> {
    throw new Error("FILE_STORAGE_NOT_CONFIGURED");
  }
}
