import {
  type Project,
  type InsertProject,
  type Category,
  type InsertCategory,
  type CustomRequest,
  type InsertCustomRequest,
  type Inquiry,
  type InsertInquiry,
  type Testimonial,
  type InsertTestimonial,
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getProject(id: string): Promise<Project | undefined>;
  getAllProjects(): Promise<Project[]>;
  getProjectsByCategory(category: string): Promise<Project[]>;
  createProject(project: InsertProject): Promise<Project>;
  
  getCategory(id: string): Promise<Category | undefined>;
  getCategoryBySlug(slug: string): Promise<Category | undefined>;
  getAllCategories(): Promise<Category[]>;
  createCategory(category: InsertCategory): Promise<Category>;
  
  getCustomRequest(id: string): Promise<CustomRequest | undefined>;
  getAllCustomRequests(): Promise<CustomRequest[]>;
  createCustomRequest(request: InsertCustomRequest): Promise<CustomRequest>;
  
  getInquiry(id: string): Promise<Inquiry | undefined>;
  getAllInquiries(): Promise<Inquiry[]>;
  createInquiry(inquiry: InsertInquiry): Promise<Inquiry>;
  
  getTestimonial(id: string): Promise<Testimonial | undefined>;
  getAllTestimonials(): Promise<Testimonial[]>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
}

export class MemStorage implements IStorage {
  private projects: Map<string, Project>;
  private categories: Map<string, Category>;
  private customRequests: Map<string, CustomRequest>;
  private inquiries: Map<string, Inquiry>;
  private testimonials: Map<string, Testimonial>;

  constructor() {
    this.projects = new Map();
    this.categories = new Map();
    this.customRequests = new Map();
    this.inquiries = new Map();
    this.testimonials = new Map();
    
    this.seedInitialData();
  }

  private async seedInitialData() {
    const categories: InsertCategory[] = [
      {
        name: "IT / Computer Engineering",
        slug: "it",
        description: "Information Technology and Computer Engineering projects including web development, mobile apps, and networking solutions.",
        icon: "code",
        projectCount: 45,
      },
      {
        name: "Computer Science",
        slug: "cs",
        description: "Advanced CS projects in AI, Machine Learning, Data Science, Cloud Computing, and Blockchain technology.",
        icon: "cpu",
        projectCount: 52,
      },
      {
        name: "Electronics & Telecommunication",
        slug: "ece",
        description: "ECE projects covering IoT, embedded systems, robotics, signal processing, and wireless communication.",
        icon: "radio",
        projectCount: 38,
      },
      {
        name: "Electrical Engineering",
        slug: "electrical",
        description: "Power systems, renewable energy, control systems, and electrical automation projects.",
        icon: "zap",
        projectCount: 28,
      },
      {
        name: "Mechanical Engineering",
        slug: "mechanical",
        description: "CAD/CAM, thermal engineering, automobile, manufacturing, and automation projects.",
        icon: "cog",
        projectCount: 35,
      },
      {
        name: "Civil Engineering",
        slug: "civil",
        description: "Structural analysis, construction management, smart cities, and environmental engineering projects.",
        icon: "building",
        projectCount: 24,
      },
      {
        name: "Diploma Projects",
        slug: "diploma",
        description: "Comprehensive projects for diploma students across all engineering branches with simplified implementation.",
        icon: "graduation",
        projectCount: 42,
      },
    ];

    for (const cat of categories) {
      await this.createCategory(cat);
    }

    const projects: InsertProject[] = [
      {
        title: "E-Commerce Website with Payment Gateway Integration",
        description: "A full-stack e-commerce platform with user authentication, product management, shopping cart, order tracking, and secure payment gateway integration using Razorpay. Includes admin dashboard for managing products, orders, and customers.",
        category: "it",
        branch: "IT / Computer Engineering",
        features: [
          "User registration and authentication with JWT",
          "Product catalog with search and filters",
          "Shopping cart and wishlist functionality",
          "Razorpay payment gateway integration",
          "Order tracking and management",
          "Admin dashboard with analytics",
          "Responsive design for all devices",
        ],
        technologies: ["React", "Node.js", "Express", "MongoDB", "Razorpay API"],
        price: "4999.00",
        deliverables: [
          "Complete source code with comments",
          "Project documentation (50+ pages)",
          "PowerPoint presentation",
          "Video demonstration",
          "Setup and deployment guide",
          "30 days support",
        ],
        thumbnail: "/api/placeholder/400/300",
        samplePptUrl: "/samples/ecommerce-ppt.pdf",
        popular: 45,
      },
      {
        title: "Machine Learning Based Disease Prediction System",
        description: "An intelligent healthcare system using machine learning algorithms to predict diseases based on patient symptoms and medical history. Includes data preprocessing, model training, and a web interface for predictions.",
        category: "cs",
        branch: "Computer Science",
        features: [
          "Multiple ML algorithms (Random Forest, SVM, Neural Networks)",
          "Data preprocessing and feature engineering",
          "Model accuracy comparison and selection",
          "Web-based user interface for predictions",
          "Historical data visualization",
          "Medical reports generation in PDF",
          "Admin panel for model management",
        ],
        technologies: ["Python", "Scikit-learn", "TensorFlow", "Flask", "Pandas", "MySQL"],
        price: "5999.00",
        deliverables: [
          "Complete Python code with notebooks",
          "Trained ML models",
          "Dataset and preprocessing scripts",
          "Web application source code",
          "Detailed project report",
          "PPT presentation",
          "Implementation guide",
        ],
        thumbnail: "/api/placeholder/400/300",
        samplePptUrl: "/samples/ml-disease-ppt.pdf",
        popular: 67,
      },
      {
        title: "IoT Based Smart Home Automation System",
        description: "Complete home automation system using ESP8266/ESP32, sensors, and actuators. Control lights, fans, temperature, and security through mobile app and voice commands. Includes real-time monitoring and automation rules.",
        category: "ece",
        branch: "Electronics & Telecommunication",
        features: [
          "Remote control via mobile app (Android/iOS)",
          "Voice control integration (Google Assistant)",
          "Real-time sensor data monitoring",
          "Automated rules and scheduling",
          "Energy consumption tracking",
          "Security alerts and notifications",
          "Multi-room support",
        ],
        technologies: ["ESP32", "Arduino", "MQTT", "React Native", "Firebase", "Google Assistant API"],
        price: "6499.00",
        deliverables: [
          "Complete circuit diagrams",
          "PCB design files",
          "Microcontroller code",
          "Mobile app source code",
          "Component list with datasheets",
          "Assembly and testing guide",
          "Project documentation",
        ],
        thumbnail: "/api/placeholder/400/300",
        samplePptUrl: "/samples/iot-home-ppt.pdf",
        popular: 52,
      },
      {
        title: "Renewable Energy Monitoring System",
        description: "Solar and wind energy monitoring system with real-time data collection, analysis, and optimization. Includes power generation tracking, efficiency analysis, and predictive maintenance features.",
        category: "electrical",
        branch: "Electrical Engineering",
        features: [
          "Real-time power generation monitoring",
          "Energy efficiency analysis",
          "Weather data integration",
          "Predictive maintenance alerts",
          "Historical data visualization",
          "Performance optimization suggestions",
          "Mobile and web dashboard",
        ],
        technologies: ["Arduino", "Sensors", "Python", "Django", "PostgreSQL", "Chart.js"],
        price: "5499.00",
        deliverables: [
          "Hardware setup guide",
          "Sensor integration code",
          "Web dashboard source code",
          "Database schema and setup",
          "Calibration procedures",
          "User manual",
          "Project report and PPT",
        ],
        thumbnail: "/api/placeholder/400/300",
        samplePptUrl: "/samples/renewable-ppt.pdf",
        popular: 31,
      },
      {
        title: "Automated CNC Machine Design and Simulation",
        description: "Design and simulation of a 3-axis CNC machine with G-code interpretation. Includes CAD modeling, motion simulation, and control system design for precision machining operations.",
        category: "mechanical",
        branch: "Mechanical Engineering",
        features: [
          "Complete 3D CAD design in SolidWorks",
          "G-code parser and interpreter",
          "Motion simulation and analysis",
          "Stepper motor control system",
          "Tool path optimization",
          "Material stress analysis",
          "Cost estimation and BOM",
        ],
        technologies: ["SolidWorks", "ANSYS", "Arduino", "G-code", "C++", "MATLAB"],
        price: "5999.00",
        deliverables: [
          "3D CAD files (all parts and assembly)",
          "Engineering drawings",
          "Simulation results",
          "Control software code",
          "Bill of materials",
          "Manufacturing guide",
          "Detailed project report",
        ],
        thumbnail: "/api/placeholder/400/300",
        samplePptUrl: "/samples/cnc-ppt.pdf",
        popular: 28,
      },
      {
        title: "Smart Traffic Management System Using AI",
        description: "Intelligent traffic signal control system using computer vision and AI to optimize traffic flow, reduce congestion, and emergency vehicle priority. Includes real-time vehicle detection and adaptive signal timing.",
        category: "civil",
        branch: "Civil Engineering",
        features: [
          "Real-time vehicle detection using OpenCV",
          "AI-based traffic density analysis",
          "Adaptive signal timing optimization",
          "Emergency vehicle priority system",
          "Traffic flow visualization",
          "Historical data analytics",
          "Mobile app for traffic updates",
        ],
        technologies: ["Python", "OpenCV", "TensorFlow", "Raspberry Pi", "Node.js", "MongoDB"],
        price: "6999.00",
        deliverables: [
          "Computer vision algorithms",
          "AI model and training data",
          "Hardware setup guide",
          "Web dashboard code",
          "Simulation results",
          "Implementation report",
          "PPT and video demo",
        ],
        thumbnail: "/api/placeholder/400/300",
        samplePptUrl: "/samples/traffic-ppt.pdf",
        popular: 38,
      },
      {
        title: "Automatic Irrigation System with Soil Monitoring",
        description: "Smart irrigation system for agriculture using soil moisture sensors, weather data, and automated water management. Includes mobile app for remote monitoring and control.",
        category: "diploma",
        branch: "Diploma - Electronics",
        features: [
          "Soil moisture and temperature sensing",
          "Automated water pump control",
          "Weather forecast integration",
          "Mobile app for monitoring",
          "Water usage analytics",
          "Low-cost implementation",
          "Battery backup system",
        ],
        technologies: ["Arduino", "Soil Sensors", "GSM Module", "Android App", "ThingSpeak"],
        price: "3999.00",
        deliverables: [
          "Complete circuit diagram",
          "Arduino code with comments",
          "Mobile app APK and code",
          "Component list",
          "Assembly instructions",
          "User guide",
          "Project documentation",
        ],
        thumbnail: "/api/placeholder/400/300",
        samplePptUrl: "/samples/irrigation-ppt.pdf",
        popular: 56,
      },
    ];

    for (const proj of projects) {
      await this.createProject(proj);
    }

    const testimonials: InsertTestimonial[] = [
      {
        studentName: "Rahul Sharma",
        college: "VIT Vellore",
        quote: "TechFinalYear saved my final year! Got an amazing IoT project with complete support. The team explained everything clearly and helped me during my presentation. Highly recommended!",
        rating: 5,
        projectCategory: "IoT",
        avatarUrl: null,
      },
      {
        studentName: "Priya Patel",
        college: "BITS Pilani",
        quote: "Best decision ever! The ML project I received was outstanding with proper documentation. The support team was available 24/7 and helped me understand every concept. Got excellent marks!",
        rating: 5,
        projectCategory: "Machine Learning",
        avatarUrl: null,
      },
      {
        studentName: "Arjun Kumar",
        college: "NIT Trichy",
        quote: "Professional service and quality work. The custom project they built for me was exactly what I needed. The code quality was excellent and well-commented. Worth every rupee!",
        rating: 5,
        projectCategory: "Web Development",
        avatarUrl: null,
      },
      {
        studentName: "Sneha Reddy",
        college: "RVCE Bangalore",
        quote: "Amazing experience! Got my ECE project delivered on time with all materials. The PPT was presentation-ready and the team even helped with viva preparation. Thank you so much!",
        rating: 5,
        projectCategory: "Electronics",
        avatarUrl: null,
      },
      {
        studentName: "Amit Singh",
        college: "IIT Roorkee",
        quote: "Exceptional quality and support. The mechanical design project was thoroughly detailed with all CAD files and simulations. The documentation helped me understand everything perfectly.",
        rating: 5,
        projectCategory: "Mechanical",
        avatarUrl: null,
      },
    ];

    for (const testimonial of testimonials) {
      await this.createTestimonial(testimonial);
    }
  }

  async getProject(id: string): Promise<Project | undefined> {
    return this.projects.get(id);
  }

  async getAllProjects(): Promise<Project[]> {
    return Array.from(this.projects.values());
  }

  async getProjectsByCategory(category: string): Promise<Project[]> {
    return Array.from(this.projects.values()).filter(
      (project) => project.category === category
    );
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const id = randomUUID();
    const project: Project = { ...insertProject, id };
    this.projects.set(id, project);
    return project;
  }

  async getCategory(id: string): Promise<Category | undefined> {
    return this.categories.get(id);
  }

  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    return Array.from(this.categories.values()).find(
      (category) => category.slug === slug
    );
  }

  async getAllCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }

  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const id = randomUUID();
    const category: Category = { ...insertCategory, id };
    this.categories.set(id, category);
    return category;
  }

  async getCustomRequest(id: string): Promise<CustomRequest | undefined> {
    return this.customRequests.get(id);
  }

  async getAllCustomRequests(): Promise<CustomRequest[]> {
    return Array.from(this.customRequests.values());
  }

  async createCustomRequest(insertRequest: InsertCustomRequest): Promise<CustomRequest> {
    const id = randomUUID();
    const request: CustomRequest = {
      ...insertRequest,
      id,
      status: "pending",
    };
    this.customRequests.set(id, request);
    return request;
  }

  async getInquiry(id: string): Promise<Inquiry | undefined> {
    return this.inquiries.get(id);
  }

  async getAllInquiries(): Promise<Inquiry[]> {
    return Array.from(this.inquiries.values());
  }

  async createInquiry(insertInquiry: InsertInquiry): Promise<Inquiry> {
    const id = randomUUID();
    const inquiry: Inquiry = { ...insertInquiry, id };
    this.inquiries.set(id, inquiry);
    return inquiry;
  }

  async getTestimonial(id: string): Promise<Testimonial | undefined> {
    return this.testimonials.get(id);
  }

  async getAllTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values());
  }

  async createTestimonial(insertTestimonial: InsertTestimonial): Promise<Testimonial> {
    const id = randomUUID();
    const testimonial: Testimonial = { ...insertTestimonial, id };
    this.testimonials.set(id, testimonial);
    return testimonial;
  }
}

export const storage = new MemStorage();
