import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const projects = pgTable("projects", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  branch: text("branch").notNull(),
  features: text("features").array().notNull(),
  technologies: text("technologies").array().notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  deliverables: text("deliverables").array().notNull(),
  thumbnail: text("thumbnail"),
  samplePptUrl: text("sample_ppt_url"),
  popular: integer("popular").default(0),
});

export const categories = pgTable("categories", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull(),
  icon: text("icon").notNull(),
  projectCount: integer("project_count").default(0),
});

export const customRequests = pgTable("custom_requests", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email"),
  whatsapp: text("whatsapp").notNull(),
  branch: text("branch").notNull(),
  projectTitle: text("project_title"),
  requirements: text("requirements").notNull(),
  technologies: text("technologies").array(),
  deadline: text("deadline"),
  budget: text("budget"),
  additionalNotes: text("additional_notes"),
  status: text("status").default("pending"),
});

export const inquiries = pgTable("inquiries", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  branch: text("branch").notNull(),
  whatsapp: text("whatsapp").notNull(),
  requirement: text("requirement").notNull(),
});

export const testimonials = pgTable("testimonials", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  studentName: text("student_name").notNull(),
  college: text("college").notNull(),
  quote: text("quote").notNull(),
  rating: integer("rating").notNull(),
  projectCategory: text("project_category").notNull(),
  avatarUrl: text("avatar_url"),
});

export const insertProjectSchema = createInsertSchema(projects).omit({
  id: true,
});

export const insertCategorySchema = createInsertSchema(categories).omit({
  id: true,
});

export const insertCustomRequestSchema = createInsertSchema(customRequests).omit({
  id: true,
  status: true,
}).extend({
  email: z.string().email().optional(),
  whatsapp: z.string().min(10, "WhatsApp number must be at least 10 digits"),
  requirements: z.string().min(20, "Please provide detailed requirements (min 20 characters)"),
});

export const insertInquirySchema = createInsertSchema(inquiries).omit({
  id: true,
}).extend({
  whatsapp: z.string().min(10, "WhatsApp number must be at least 10 digits"),
  requirement: z.string().min(10, "Please provide your requirement"),
});

export const insertTestimonialSchema = createInsertSchema(testimonials).omit({
  id: true,
});

export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Project = typeof projects.$inferSelect;

export type InsertCategory = z.infer<typeof insertCategorySchema>;
export type Category = typeof categories.$inferSelect;

export type InsertCustomRequest = z.infer<typeof insertCustomRequestSchema>;
export type CustomRequest = typeof customRequests.$inferSelect;

export type InsertInquiry = z.infer<typeof insertInquirySchema>;
export type Inquiry = typeof inquiries.$inferSelect;

export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;
export type Testimonial = typeof testimonials.$inferSelect;

export interface FAQ {
  question: string;
  answer: string;
}
