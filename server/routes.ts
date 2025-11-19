import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import {
  insertProjectSchema,
  insertCategorySchema,
  insertCustomRequestSchema,
  insertInquirySchema,
  insertTestimonialSchema,
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/projects", async (_req, res) => {
    try {
      const projects = await storage.getAllProjects();
      res.json(projects);
    } catch (error: any) {
      console.error("Error fetching projects:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/projects/:id", async (req, res) => {
    try {
      const projectId = req.params.id;
      if (!projectId || typeof projectId !== 'string') {
        return res.status(400).json({ error: "Invalid project ID" });
      }
      const project = await storage.getProject(projectId);
      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }
      res.json(project);
    } catch (error: any) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/projects", async (req, res) => {
    try {
      const result = insertProjectSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ error: "Invalid project data", details: result.error.errors });
      }
      const project = await storage.createProject(result.data);
      res.status(201).json(project);
    } catch (error: any) {
      console.error("Error creating project:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/categories", async (_req, res) => {
    try {
      const categories = await storage.getAllCategories();
      res.json(categories);
    } catch (error: any) {
      console.error("Error fetching categories:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/categories/:slug", async (req, res) => {
    try {
      const slug = req.params.slug;
      if (!slug || typeof slug !== 'string') {
        return res.status(400).json({ error: "Invalid category slug" });
      }
      const category = await storage.getCategoryBySlug(slug);
      if (!category) {
        return res.status(404).json({ error: "Category not found" });
      }
      res.json(category);
    } catch (error: any) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/categories", async (req, res) => {
    try {
      const result = insertCategorySchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ error: "Invalid category data", details: result.error.errors });
      }
      const category = await storage.createCategory(result.data);
      res.status(201).json(category);
    } catch (error: any) {
      console.error("Error creating category:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/custom-requests", async (_req, res) => {
    try {
      const requests = await storage.getAllCustomRequests();
      res.json(requests);
    } catch (error: any) {
      console.error("Error fetching custom requests:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/custom-requests", async (req, res) => {
    try {
      const result = insertCustomRequestSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ error: "Invalid request data", details: result.error.errors });
      }
      const request = await storage.createCustomRequest(result.data);
      res.status(201).json(request);
    } catch (error: any) {
      console.error("Error creating custom request:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/inquiries", async (_req, res) => {
    try {
      const inquiries = await storage.getAllInquiries();
      res.json(inquiries);
    } catch (error: any) {
      console.error("Error fetching inquiries:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/inquiries", async (req, res) => {
    try {
      const result = insertInquirySchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ error: "Invalid inquiry data", details: result.error.errors });
      }
      const inquiry = await storage.createInquiry(result.data);
      res.status(201).json(inquiry);
    } catch (error: any) {
      console.error("Error creating inquiry:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/testimonials", async (_req, res) => {
    try {
      const testimonials = await storage.getAllTestimonials();
      res.json(testimonials);
    } catch (error: any) {
      console.error("Error fetching testimonials:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/testimonials", async (req, res) => {
    try {
      const result = insertTestimonialSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ error: "Invalid testimonial data", details: result.error.errors });
      }
      const testimonial = await storage.createTestimonial(result.data);
      res.status(201).json(testimonial);
    } catch (error: any) {
      console.error("Error creating testimonial:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
