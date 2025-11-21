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

  // Helper function to get appropriate thumbnail image for a project
  private getProjectThumbnail(category: string, title: string): string {
    const categoryImages: Record<string, string> = {
      "it": "/assets/generated_images/IT_Computer_Science_project_thumbnail_f71a1bbf.png",
      "cs": "/assets/generated_images/IT_Computer_Science_project_thumbnail_f71a1bbf.png",
      "ece": "/assets/generated_images/ECE_Electronics_project_thumbnail_c7385ad9.png",
      "electrical": "/assets/generated_images/Electrical_engineering_project_thumbnail_32fc478c.png",
      "mechanical": "/assets/generated_images/Mechanical_engineering_project_thumbnail_43cbef9f.png",
      "civil": "/assets/generated_images/Civil_engineering_project_thumbnail_d89a625e.png",
      "diploma": "/assets/generated_images/ECE_Electronics_project_thumbnail_c7385ad9.png",
    };

    // Return category-specific image or default IT image
    return categoryImages[category] || categoryImages["it"];
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
        thumbnail: "/assets/generated_images/ecommerce_website_payment_gateway.jpeg",
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
        thumbnail: "/assets/generated_images/Machine Learning Based Disease Prediction System.jpeg",
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
        thumbnail: this.getProjectThumbnail("ece", "IoT Based Smart Home Automation System"),
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
        thumbnail: this.getProjectThumbnail("electrical", "Renewable Energy Monitoring System"),
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
        thumbnail: this.getProjectThumbnail("mechanical", "Automated CNC Machine Design and Simulation"),
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
        thumbnail: "/assets/generated_images/Smart Traffic Management System Using AI.jpg",
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
        thumbnail: "/assets/generated_images/Automatic Irrigation System with Soil Monitoring.jpg",
        samplePptUrl: "/samples/irrigation-ppt.pdf",
        popular: 56,
      },
      // Management Systems
      {
        title: "Apartment Management Website",
        description: "Complete apartment management system for managing residents, maintenance, billing, parking, and amenities. Includes admin panel, resident portal, and mobile app integration.",
        category: "it",
        branch: "IT / Computer Engineering",
        features: ["Resident management", "Maintenance requests", "Billing and payments", "Parking management", "Amenity booking", "Notice board", "Complaint management"],
        technologies: ["React", "Node.js", "Express", "MySQL", "Stripe API"],
        price: "5499.00",
        deliverables: ["Complete source code", "Database schema", "Documentation", "PPT", "Deployment guide", "30 days support"],
        thumbnail: "/assets/generated_images/Apartment Management Website.jpeg",
        samplePptUrl: "/samples/apartment-ppt.pdf",
        popular: 42,
      },
      {
        title: "Online Food Order System",
        description: "Full-featured food ordering platform with restaurant management, menu customization, order tracking, payment integration, and delivery management system.",
        category: "it",
        branch: "IT / Computer Engineering",
        features: ["Restaurant dashboard", "Menu management", "Order tracking", "Payment gateway", "Delivery tracking", "Customer reviews", "Loyalty program"],
        technologies: ["React", "Node.js", "MongoDB", "Razorpay", "Socket.io"],
        price: "4999.00",
        deliverables: ["Complete source code", "Documentation", "PPT", "Video demo", "Setup guide", "30 days support"],
        thumbnail: "/assets/generated_images/Online Food Order System.jpg",
        samplePptUrl: "/samples/food-order-ppt.pdf",
        popular: 78,
      },
      {
        title: "Courier and Logistics Management Website",
        description: "Comprehensive logistics management system for tracking shipments, managing delivery routes, driver assignments, and real-time package tracking with SMS notifications.",
        category: "it",
        branch: "IT / Computer Engineering",
        features: ["Shipment tracking", "Route optimization", "Driver management", "Real-time updates", "SMS notifications", "Analytics dashboard", "Invoice generation"],
        technologies: ["React", "Node.js", "PostgreSQL", "Google Maps API", "Twilio SMS"],
        price: "5999.00",
        deliverables: ["Complete source code", "Database design", "Documentation", "PPT", "API documentation", "30 days support"],
        thumbnail: "assets/generated_images/Courier and Logistics Management Website.jpg",
        samplePptUrl: "/samples/courier-ppt.pdf",
        popular: 35,
      },
      {
        title: "CAR Workshop Website",
        description: "Automotive workshop management system for managing appointments, services, inventory, billing, and customer records with service history tracking.",
        category: "it",
        branch: "IT / Computer Engineering",
        features: ["Appointment booking", "Service management", "Inventory tracking", "Billing system", "Customer history", "Staff management", "Reports and analytics"],
        technologies: ["React", "Node.js", "MySQL", "PDF generation", "Email notifications"],
        price: "5499.00",
        deliverables: ["Complete source code", "Documentation", "PPT", "User manual", "Setup guide", "30 days support"],
        thumbnail: "/assets/generated_images/CAR Workshop Website.jpg",
        samplePptUrl: "/samples/workshop-ppt.pdf",
        popular: 28,
      },
      {
        title: "Hotel Management System",
        description: "Complete hotel management solution for room booking, check-in/check-out, billing, housekeeping, restaurant management, and guest services.",
        category: "it",
        branch: "IT / Computer Engineering",
        features: ["Room booking system", "Check-in/check-out", "Billing and invoicing", "Housekeeping management", "Restaurant POS", "Guest services", "Reports"],
        technologies: ["React", "Node.js", "PostgreSQL", "Payment gateway", "Email service"],
        price: "6499.00",
        deliverables: ["Complete source code", "Database schema", "Documentation", "PPT", "Admin guide", "30 days support"],
        thumbnail: "/assets/generated_images/Hotel Management System.jpg",
        samplePptUrl: "/samples/hotel-ppt.pdf",
        popular: 61,
      },
      {
        title: "Pharmacy Management System",
        description: "Pharmacy management system for inventory management, prescription handling, billing, expiry tracking, and supplier management with low stock alerts.",
        category: "it",
        branch: "IT / Computer Engineering",
        features: ["Inventory management", "Prescription handling", "Billing system", "Expiry tracking", "Supplier management", "Low stock alerts", "Sales reports"],
        technologies: ["React", "Node.js", "MySQL", "Barcode scanner", "Printing system"],
        price: "5499.00",
        deliverables: ["Complete source code", "Documentation", "PPT", "User manual", "Setup guide", "30 days support"],
        thumbnail: "/assets/generated_images/Pharmacy Management System.jpeg",
        samplePptUrl: "/samples/pharmacy-ppt.pdf",
        popular: 47,
      },
      {
        title: "Human Resource Management Website",
        description: "Comprehensive HR management system for employee management, attendance, payroll, leave management, performance reviews, and recruitment.",
        category: "it",
        branch: "IT / Computer Engineering",
        features: ["Employee management", "Attendance tracking", "Payroll system", "Leave management", "Performance reviews", "Recruitment module", "Analytics"],
        technologies: ["React", "Node.js", "PostgreSQL", "PDF generation", "Email service"],
        price: "5999.00",
        deliverables: ["Complete source code", "Documentation", "PPT", "Admin guide", "Setup guide", "30 days support"],
        thumbnail: "/assets/generated_images/Human Resource Management Website.jpeg",
        samplePptUrl: "/samples/hrm-ppt.pdf",
        popular: 54,
      },
      {
        title: "College Management Website",
        description: "Complete college management system for student information, attendance, grades, timetable, fees, library, and examination management.",
        category: "it",
        branch: "IT / Computer Engineering",
        features: ["Student management", "Attendance system", "Grade management", "Timetable", "Fee management", "Library system", "Examination portal"],
        technologies: ["React", "Node.js", "MySQL", "PDF reports", "Email notifications"],
        price: "6499.00",
        deliverables: ["Complete source code", "Database design", "Documentation", "PPT", "Admin guide", "30 days support"],
        thumbnail: "/assets/generated_images/School Management Website.jpeg",
        samplePptUrl: "/samples/college-ppt.pdf",
        popular: 72,
      },
      {
        title: "Gym Management and Fitness Management",
        description: "Fitness center management system for member management, workout plans, trainer scheduling, payment tracking, and attendance monitoring.",
        category: "it",
        branch: "IT / Computer Engineering",
        features: ["Member management", "Workout plans", "Trainer scheduling", "Payment tracking", "Attendance monitoring", "Equipment management", "Reports"],
        technologies: ["React", "Node.js", "MongoDB", "Payment gateway", "SMS notifications"],
        price: "5499.00",
        deliverables: ["Complete source code", "Documentation", "PPT", "User manual", "Setup guide", "30 days support"],
        thumbnail: "/assets/generated_images/Gym Management and Fitness Management.jpeg",
        samplePptUrl: "/samples/gym-ppt.pdf",
        popular: 39,
      },
      {
        title: "Hospital Management Website",
        description: "Complete hospital management system for patient records, appointments, billing, pharmacy, lab management, and doctor scheduling.",
        category: "it",
        branch: "IT / Computer Engineering",
        features: ["Patient management", "Appointment system", "Billing and insurance", "Pharmacy integration", "Lab management", "Doctor scheduling", "Reports"],
        technologies: ["React", "Node.js", "PostgreSQL", "HL7 integration", "PDF reports"],
        price: "6999.00",
        deliverables: ["Complete source code", "Database schema", "Documentation", "PPT", "Admin guide", "30 days support"],
        thumbnail: "/assets/generated_images/Hospital Management Website.jpeg",
        samplePptUrl: "/samples/hospital-ppt.pdf",
        popular: 68,
      },
      {
        title: "Real Estate Management",
        description: "Real estate management platform for property listing, tenant management, rent collection, maintenance tracking, and property analytics.",
        category: "it",
        branch: "IT / Computer Engineering",
        features: ["Property listing", "Tenant management", "Rent collection", "Maintenance tracking", "Document management", "Financial reports", "Mobile app"],
        technologies: ["React", "Node.js", "MySQL", "Payment gateway", "Google Maps"],
        price: "5999.00",
        deliverables: ["Complete source code", "Documentation", "PPT", "User manual", "Setup guide", "30 days support"],
        thumbnail: "/assets/generated_images/Real Estate Management.jpeg",
        samplePptUrl: "/samples/realestate-ppt.pdf",
        popular: 45,
      },
      {
        title: "Stock Management System",
        description: "Inventory and stock management system with real-time tracking, low stock alerts, supplier management, and comprehensive reporting.",
        category: "it",
        branch: "IT / Computer Engineering",
        features: ["Stock tracking", "Low stock alerts", "Supplier management", "Purchase orders", "Sales tracking", "Analytics dashboard", "Barcode support"],
        technologies: ["React", "Node.js", "PostgreSQL", "Barcode API", "Email alerts"],
        price: "5499.00",
        deliverables: ["Complete source code", "Documentation", "PPT", "User manual", "Setup guide", "30 days support"],
        thumbnail: "/assets/generated_images/Stock Management System.png",
        samplePptUrl: "/samples/stock-ppt.pdf",
        popular: 51,
      },
      {
        title: "Ultimate Inventory Website",
        description: "Advanced inventory management system with multi-location support, batch tracking, expiry management, and comprehensive analytics.",
        category: "it",
        branch: "IT / Computer Engineering",
        features: ["Multi-location inventory", "Batch tracking", "Expiry management", "Purchase management", "Sales tracking", "Advanced analytics", "Mobile app"],
        technologies: ["React", "Node.js", "MongoDB", "Chart.js", "Export to Excel"],
        price: "5999.00",
        deliverables: ["Complete source code", "Documentation", "PPT", "Admin guide", "Setup guide", "30 days support"],
        thumbnail: "/assets/generated_images/Ultimate Inventory Website.jpeg",
        samplePptUrl: "/samples/inventory-ppt.pdf",
        popular: 58,
      },
      {
        title: "Learning Management Website",
        description: "Complete LMS platform for course management, student enrollment, assignments, quizzes, video lectures, and progress tracking.",
        category: "it",
        branch: "IT / Computer Engineering",
        features: ["Course management", "Student enrollment", "Assignment system", "Quiz and exams", "Video lectures", "Progress tracking", "Certificates"],
        technologies: ["React", "Node.js", "PostgreSQL", "Video streaming", "PDF generation"],
        price: "6499.00",
        deliverables: ["Complete source code", "Documentation", "PPT", "Admin guide", "Setup guide", "30 days support"],
        thumbnail: "/assets/generated_images/Learning Management Website.jpeg",
        samplePptUrl: "/samples/lms-ppt.pdf",
        popular: 63,
      },
      // AI & Python OpenCV Projects
      {
        title: "Object Detection and Recognition Using OpenCV",
        description: "Real-time object detection and recognition system using OpenCV and deep learning. Detects and classifies multiple objects in images and video streams with high accuracy.",
        category: "cs",
        branch: "Computer Science",
        features: ["Real-time object detection", "Multiple object recognition", "Video stream processing", "Accuracy metrics", "Custom model training", "Web interface", "API integration"],
        technologies: ["Python", "OpenCV", "TensorFlow", "YOLO", "Flask", "NumPy"],
        price: "5999.00",
        deliverables: ["Python code with notebooks", "Trained models", "Dataset", "Documentation", "PPT", "Video demo", "30 days support"],
        thumbnail: "/assets/generated_images/Object Detection and Recognition Using OpenCV.jpeg",
        samplePptUrl: "/samples/object-detection-ppt.pdf",
        popular: 71,
      },
      {
        title: "Human Pose Estimation Using AI",
        description: "Advanced human pose estimation system that detects and tracks human body keypoints in real-time using deep learning and computer vision techniques.",
        category: "cs",
        branch: "Computer Science",
        features: ["Real-time pose detection", "Multiple person tracking", "Keypoint visualization", "Movement analysis", "Web interface", "Video processing", "API support"],
        technologies: ["Python", "OpenCV", "MediaPipe", "TensorFlow", "Flask", "NumPy"],
        price: "6499.00",
        deliverables: ["Complete Python code", "Trained models", "Documentation", "PPT", "Video demo", "Setup guide", "30 days support"],
        thumbnail: "/assets/generated_images/Human Pose Estimation Using AI.jpeg",
        samplePptUrl: "/samples/pose-estimation-ppt.pdf",
        popular: 56,
      },
      {
        title: "Facial Recognition System Using OpenCV",
        description: "Secure facial recognition system for authentication and identification. Includes face detection, feature extraction, and matching with database integration.",
        category: "cs",
        branch: "Computer Science",
        features: ["Face detection", "Feature extraction", "Face matching", "Database integration", "Real-time processing", "Security features", "Web interface"],
        technologies: ["Python", "OpenCV", "Face Recognition", "Flask", "SQLite", "NumPy"],
        price: "5999.00",
        deliverables: ["Complete source code", "Trained models", "Documentation", "PPT", "Video demo", "Setup guide", "30 days support"],
        thumbnail: "/assets/generated_images/Facial Recognition System Using OpenCV.jpeg",
        samplePptUrl: "/samples/face-recognition-ppt.pdf",
        popular: 82,
      },
      {
        title: "License Plate Recognition Using OpenCV",
        description: "Automatic license plate recognition system for vehicle identification. Processes images and video to extract and recognize license plate numbers with high accuracy.",
        category: "cs",
        branch: "Computer Science",
        features: ["Plate detection", "Character recognition", "Video processing", "Database storage", "Real-time processing", "Web interface", "Export reports"],
        technologies: ["Python", "OpenCV", "Tesseract OCR", "Flask", "MySQL", "NumPy"],
        price: "5999.00",
        deliverables: ["Complete source code", "Trained models", "Documentation", "PPT", "Video demo", "Setup guide", "30 days support"],
        thumbnail: "/assets/generated_images/License Plate Recognition Using OpenCV.jpeg",
        samplePptUrl: "/samples/license-plate-ppt.pdf",
        popular: 64,
      },
      {
        title: "Age and Gender Detection Using AI",
        description: "AI-powered system that automatically detects age and gender from facial images using deep learning models. Includes real-time video processing capabilities.",
        category: "cs",
        branch: "Computer Science",
        features: ["Age estimation", "Gender classification", "Real-time processing", "Video stream support", "Accuracy metrics", "Web interface", "API integration"],
        technologies: ["Python", "OpenCV", "TensorFlow", "Keras", "Flask", "NumPy"],
        price: "5499.00",
        deliverables: ["Complete Python code", "Trained models", "Documentation", "PPT", "Video demo", "Setup guide", "30 days support"],
        thumbnail: "/assets/generated_images/Age and Gender Detection Using AI.jpeg",
        samplePptUrl: "/samples/age-gender-ppt.pdf",
        popular: 48,
      },
      {
        title: "Brain Tumor Detection Using Deep Learning",
        description: "Medical image analysis system using deep learning to detect brain tumors from MRI scans. Includes preprocessing, segmentation, and classification with high accuracy.",
        category: "cs",
        branch: "Computer Science",
        features: ["MRI image processing", "Tumor detection", "Segmentation", "Classification", "Accuracy metrics", "Web interface", "Medical reports"],
        technologies: ["Python", "TensorFlow", "Keras", "OpenCV", "Flask", "NumPy", "PIL"],
        price: "6999.00",
        deliverables: ["Complete Python code", "Trained models", "Dataset", "Documentation", "PPT", "Video demo", "30 days support"],
        thumbnail: "/assets/generated_images/Brain Tumor Detection Using Deep Learning.jpeg",
        samplePptUrl: "/samples/brain-tumor-ppt.pdf",
        popular: 75,
      },
      {
        title: "Plant Disease Detection Using Deep Learning",
        description: "Agricultural AI system that identifies plant diseases from leaf images using convolutional neural networks. Helps farmers detect diseases early for better crop management.",
        category: "cs",
        branch: "Computer Science",
        features: ["Disease detection", "Multiple disease classification", "Image preprocessing", "Mobile app", "Treatment suggestions", "Database storage", "Reports"],
        technologies: ["Python", "TensorFlow", "OpenCV", "Flask", "React Native", "MySQL"],
        price: "5999.00",
        deliverables: ["Complete source code", "Trained models", "Dataset", "Documentation", "PPT", "Mobile app", "30 days support"],
        thumbnail: "/assets/generated_images/Plant Disease Detection Using Deep Learning.jpeg",
        samplePptUrl: "/samples/plant-disease-ppt.pdf",
        popular: 59,
      },
      {
        title: "Sign Language Detection and Hand Gesture Recognition",
        description: "Real-time sign language recognition system using computer vision and deep learning. Recognizes hand gestures and converts them to text or speech.",
        category: "cs",
        branch: "Computer Science",
        features: ["Hand gesture recognition", "Sign language translation", "Real-time processing", "Text output", "Speech synthesis", "Web interface", "Mobile app"],
        technologies: ["Python", "OpenCV", "MediaPipe", "TensorFlow", "Flask", "gTTS"],
        price: "6499.00",
        deliverables: ["Complete source code", "Trained models", "Documentation", "PPT", "Video demo", "Mobile app", "30 days support"],
        thumbnail: "/assets/generated_images/Sign Language Detection and Hand Gesture Recognition.jpeg",
        samplePptUrl: "/samples/sign-language-ppt.pdf",
        popular: 52,
      },
      {
        title: "Students Attendance Using Face Detection and Recognition",
        description: "Automated attendance system using facial recognition technology. Marks attendance automatically when students are detected, eliminating manual processes.",
        category: "cs",
        branch: "Computer Science",
        features: ["Face detection", "Face recognition", "Automatic attendance", "Database storage", "Reports generation", "Web interface", "Mobile app"],
        technologies: ["Python", "OpenCV", "Face Recognition", "Flask", "MySQL", "React"],
        price: "5999.00",
        deliverables: ["Complete source code", "Documentation", "PPT", "Video demo", "Setup guide", "Admin panel", "30 days support"],
        thumbnail: "/assets/generated_images/Students Attendance Using Face Detection and Recognition.jpeg",
        samplePptUrl: "/samples/attendance-ppt.pdf",
        popular: 67,
      },
      {
        title: "Helmet Detection Using OpenCV",
        description: "Safety monitoring system that detects whether individuals are wearing helmets in real-time. Useful for construction sites, factories, and traffic monitoring.",
        category: "cs",
        branch: "Computer Science",
        features: ["Real-time helmet detection", "Video stream processing", "Alert system", "Database logging", "Web dashboard", "Mobile notifications", "Reports"],
        technologies: ["Python", "OpenCV", "YOLO", "Flask", "MySQL", "Socket.io"],
        price: "5499.00",
        deliverables: ["Complete source code", "Trained models", "Documentation", "PPT", "Video demo", "Setup guide", "30 days support"],
        thumbnail: "/assets/generated_images/Helmet Detection Using OpenCV.jpeg",
        samplePptUrl: "/samples/helmet-detection-ppt.pdf",
        popular: 43,
      },
      {
        title: "Vehicle Number Plate Detection Using OpenCV",
        description: "Automated vehicle number plate detection and recognition system for parking management, traffic monitoring, and security applications.",
        category: "cs",
        branch: "Computer Science",
        features: ["Plate detection", "Character recognition", "Database storage", "Real-time processing", "Web interface", "Export functionality", "API support"],
        technologies: ["Python", "OpenCV", "Tesseract OCR", "Flask", "PostgreSQL", "NumPy"],
        price: "5999.00",
        deliverables: ["Complete source code", "Documentation", "PPT", "Video demo", "Setup guide", "API docs", "30 days support"],
        thumbnail: "/assets/generated_images/License Plate Recognition Using OpenCV.jpeg",
        samplePptUrl: "/samples/vehicle-plate-ppt.pdf",
        popular: 55,
      },
      {
        title: "Traffic Sign Detection Using OpenCV",
        description: "Intelligent traffic sign detection and recognition system for autonomous vehicles and driver assistance systems using computer vision and machine learning.",
        category: "cs",
        branch: "Computer Science",
        features: ["Sign detection", "Sign classification", "Real-time processing", "Video processing", "Accuracy metrics", "Web interface", "Mobile integration"],
        technologies: ["Python", "OpenCV", "TensorFlow", "Flask", "NumPy", "PIL"],
        price: "5999.00",
        deliverables: ["Complete source code", "Trained models", "Dataset", "Documentation", "PPT", "Video demo", "30 days support"],
        thumbnail: "/assets/generated_images/Traffic Sign Detection Using OpenCV.jpeg",
        samplePptUrl: "/samples/traffic-sign-ppt.pdf",
        popular: 49,
      },
      {
        title: "Road Lane Detection Using OpenCV",
        description: "Advanced lane detection system for autonomous vehicles using computer vision. Detects lane markings in real-time and provides steering assistance information.",
        category: "cs",
        branch: "Computer Science",
        features: ["Lane detection", "Curve detection", "Real-time processing", "Video stream support", "Visualization", "Web interface", "API integration"],
        technologies: ["Python", "OpenCV", "NumPy", "Flask", "Matplotlib", "Hough Transform"],
        price: "5499.00",
        deliverables: ["Complete source code", "Documentation", "PPT", "Video demo", "Setup guide", "Algorithm explanation", "30 days support"],
        thumbnail: "/assets/generated_images/Road Lane Detection Using OpenCV.jpeg",
        samplePptUrl: "/samples/lane-detection-ppt.pdf",
        popular: 41,
      },
      {
        title: "Parking Space Detection Using Machine Learning",
        description: "Smart parking management system that detects available parking spaces using computer vision and machine learning. Helps optimize parking space utilization.",
        category: "cs",
        branch: "Computer Science",
        features: ["Space detection", "Occupancy tracking", "Real-time updates", "Mobile app", "Payment integration", "Analytics dashboard", "Notifications"],
        technologies: ["Python", "OpenCV", "TensorFlow", "Flask", "React Native", "MySQL"],
        price: "6499.00",
        deliverables: ["Complete source code", "Trained models", "Documentation", "PPT", "Mobile app", "Video demo", "30 days support"],
        thumbnail: "/assets/generated_images/Parking Space Detection Using Machine Learning.jpeg",
        samplePptUrl: "/samples/parking-detection-ppt.pdf",
        popular: 58,
      },
      {
        title: "AI-Powered Traffic Control System",
        description: "Intelligent traffic management system using AI to optimize traffic flow, reduce congestion, and manage traffic signals based on real-time vehicle density.",
        category: "cs",
        branch: "Computer Science",
        features: ["Traffic density analysis", "Signal optimization", "Real-time monitoring", "Emergency vehicle priority", "Analytics dashboard", "Mobile app", "Reports"],
        technologies: ["Python", "OpenCV", "TensorFlow", "Flask", "React", "PostgreSQL"],
        price: "6999.00",
        deliverables: ["Complete source code", "AI models", "Documentation", "PPT", "Video demo", "Setup guide", "30 days support"],
        thumbnail: "/assets/generated_images/AI-Powered Traffic Control System.jpeg",
        samplePptUrl: "/samples/traffic-control-ppt.pdf",
        popular: 62,
      },
      {
        title: "Emotion Detection Using Machine Learning",
        description: "Real-time emotion detection system that analyzes facial expressions to identify emotions like happy, sad, angry, surprised, etc. using deep learning models.",
        category: "cs",
        branch: "Computer Science",
        features: ["Real-time emotion detection", "Multiple emotion classification", "Video processing", "Accuracy metrics", "Web interface", "API integration", "Reports"],
        technologies: ["Python", "OpenCV", "TensorFlow", "Keras", "Flask", "NumPy"],
        price: "5999.00",
        deliverables: ["Complete source code", "Trained models", "Documentation", "PPT", "Video demo", "Setup guide", "30 days support"],
        thumbnail: "/assets/generated_images/Emotion Detection Using Machine Learning.jpeg",
        samplePptUrl: "/samples/emotion-detection-ppt.pdf",
        popular: 54,
      },
      // Machine Learning Projects
      {
        title: "Price Prediction Using Machine Learning",
        description: "ML-based price prediction system for real estate, stocks, or products. Uses historical data and multiple features to predict future prices with high accuracy.",
        category: "cs",
        branch: "Computer Science",
        features: ["Price prediction", "Multiple ML algorithms", "Data visualization", "Accuracy metrics", "Web interface", "API integration", "Reports"],
        technologies: ["Python", "Scikit-learn", "Pandas", "Flask", "React", "MySQL"],
        price: "5499.00",
        deliverables: ["Complete Python code", "Trained models", "Dataset", "Documentation", "PPT", "Video demo", "30 days support"],
        thumbnail: "/assets/generated_images/Price Prediction Using Machine Learning.jpeg",
        samplePptUrl: "/samples/price-prediction-ppt.pdf",
        popular: 47,
      },
      {
        title: "Weather Prediction Using Machine Learning",
        description: "Advanced weather forecasting system using machine learning algorithms to predict temperature, rainfall, humidity, and other weather parameters with improved accuracy.",
        category: "cs",
        branch: "Computer Science",
        features: ["Weather prediction", "Multiple parameters", "Historical data analysis", "Visualization", "Web interface", "API integration", "Mobile app"],
        technologies: ["Python", "Scikit-learn", "TensorFlow", "Flask", "React", "PostgreSQL"],
        price: "5999.00",
        deliverables: ["Complete source code", "Trained models", "Dataset", "Documentation", "PPT", "Video demo", "30 days support"],
        thumbnail: "/assets/generated_images/Weather Prediction Using Machine Learning.jpeg",
        samplePptUrl: "/samples/weather-prediction-ppt.pdf",
        popular: 51,
      },
      {
        title: "Medical Chatbot",
        description: "AI-powered medical chatbot that provides health information, symptom analysis, and preliminary medical advice using natural language processing and machine learning.",
        category: "cs",
        branch: "Computer Science",
        features: ["Natural language processing", "Symptom analysis", "Health information", "Chat interface", "Database integration", "Mobile app", "Admin panel"],
        technologies: ["Python", "NLTK", "TensorFlow", "Flask", "React", "MongoDB"],
        price: "6499.00",
        deliverables: ["Complete source code", "Trained models", "Documentation", "PPT", "Video demo", "Mobile app", "30 days support"],
        thumbnail: "/assets/generated_images/Medical Chatbot.jpeg",
        samplePptUrl: "/samples/medical-chatbot-ppt.pdf",
        popular: 73,
      },
      {
        title: "Credit Scoring Using Machine Learning",
        description: "ML-based credit scoring system that evaluates loan applications and predicts creditworthiness using various financial and personal factors with high accuracy.",
        category: "cs",
        branch: "Computer Science",
        features: ["Credit scoring", "Risk assessment", "Multiple ML models", "Data visualization", "Web interface", "API integration", "Reports"],
        technologies: ["Python", "Scikit-learn", "XGBoost", "Flask", "React", "PostgreSQL"],
        price: "5999.00",
        deliverables: ["Complete source code", "Trained models", "Dataset", "Documentation", "PPT", "Video demo", "30 days support"],
        thumbnail: "/assets/generated_images/Credit Scoring Using Machine Learning.png",
        samplePptUrl: "/samples/credit-scoring-ppt.pdf",
        popular: 56,
      },
      {
        title: "Sentiment Analysis Using Machine Learning",
        description: "Advanced sentiment analysis system that analyzes text data from social media, reviews, or comments to determine positive, negative, or neutral sentiment using NLP and ML.",
        category: "cs",
        branch: "Computer Science",
        features: ["Sentiment classification", "Text preprocessing", "Multiple ML models", "Visualization", "Web interface", "API integration", "Batch processing"],
        technologies: ["Python", "NLTK", "Scikit-learn", "Flask", "React", "MongoDB"],
        price: "5499.00",
        deliverables: ["Complete source code", "Trained models", "Dataset", "Documentation", "PPT", "Video demo", "30 days support"],
        thumbnail: "/assets/generated_images/Sentiment Analysis Using Machine Learning.jpeg",
        samplePptUrl: "/samples/sentiment-analysis-ppt.pdf",
        popular: 61,
      },
      {
        title: "Fraud Detection Using Machine Learning",
        description: "Intelligent fraud detection system that identifies fraudulent transactions, activities, or patterns using machine learning algorithms and anomaly detection techniques.",
        category: "cs",
        branch: "Computer Science",
        features: ["Fraud detection", "Anomaly detection", "Real-time monitoring", "Alert system", "Analytics dashboard", "API integration", "Reports"],
        technologies: ["Python", "Scikit-learn", "TensorFlow", "Flask", "React", "PostgreSQL"],
        price: "6999.00",
        deliverables: ["Complete source code", "Trained models", "Dataset", "Documentation", "PPT", "Video demo", "30 days support"],
        thumbnail: "/assets/generated_images/Fraud Detection Using Machine Learning.jpeg",
        samplePptUrl: "/samples/fraud-detection-ppt.pdf",
        popular: 68,
      },
      {
        title: "Customer Segmentation Using Machine Learning",
        description: "ML-based customer segmentation system that groups customers based on behavior, preferences, and characteristics for targeted marketing and personalized services.",
        category: "cs",
        branch: "Computer Science",
        features: ["Customer segmentation", "Clustering algorithms", "Data visualization", "Analytics dashboard", "Web interface", "Export functionality", "Reports"],
        technologies: ["Python", "Scikit-learn", "Pandas", "Flask", "React", "MySQL"],
        price: "5499.00",
        deliverables: ["Complete source code", "Trained models", "Dataset", "Documentation", "PPT", "Video demo", "30 days support"],
        thumbnail: "/assets/generated_images/Customer Segmentation Using Machine Learning.jpeg",
        samplePptUrl: "/samples/customer-segmentation-ppt.pdf",
        popular: 44,
      },
      {
        title: "Stock Price Prediction Using Machine Learning",
        description: "Advanced stock market prediction system using machine learning and deep learning to forecast stock prices and trends with technical analysis and historical data.",
        category: "cs",
        branch: "Computer Science",
        features: ["Stock prediction", "Multiple ML models", "Technical indicators", "Data visualization", "Web interface", "Real-time updates", "Portfolio tracking"],
        technologies: ["Python", "TensorFlow", "LSTM", "Flask", "React", "PostgreSQL"],
        price: "6499.00",
        deliverables: ["Complete source code", "Trained models", "Dataset", "Documentation", "PPT", "Video demo", "30 days support"],
        thumbnail: "/assets/generated_images/Stock Price Prediction Using Machine Learning.jpeg",
        samplePptUrl: "/samples/stock-prediction-ppt.pdf",
        popular: 66,
      },
      // Web Applications
      {
        title: "Online Examination System",
        description: "Complete online examination platform with question bank, automated testing, timer, result generation, and anti-cheating features for educational institutions.",
        category: "it",
        branch: "IT / Computer Engineering",
        features: ["Question bank", "Automated testing", "Timer system", "Result generation", "Anti-cheating", "Admin panel", "Reports"],
        technologies: ["React", "Node.js", "MySQL", "PDF generation", "Email service"],
        price: "5999.00",
        deliverables: ["Complete source code", "Documentation", "PPT", "Admin guide", "Setup guide", "30 days support"],
        thumbnail: "/assets/generated_images/Online Examination System.jpeg",
        samplePptUrl: "/samples/examination-ppt.pdf",
        popular: 69,
      },
      {
        title: "Online Shopping Cart System",
        description: "Full-featured e-commerce shopping cart system with product management, user accounts, cart functionality, wishlist, and secure checkout process.",
        category: "it",
        branch: "IT / Computer Engineering",
        features: ["Product catalog", "Shopping cart", "Wishlist", "User accounts", "Checkout process", "Order management", "Payment integration"],
        technologies: ["React", "Node.js", "MongoDB", "Stripe", "JWT"],
        price: "4999.00",
        deliverables: ["Complete source code", "Documentation", "PPT", "Setup guide", "30 days support"],
        thumbnail: "/assets/generated_images/Online Shopping Cart System.jpeg",
        samplePptUrl: "/samples/shopping-cart-ppt.pdf",
        popular: 76,
      },
      {
        title: "Online Banking System",
        description: "Secure online banking platform with account management, fund transfers, bill payments, transaction history, and multi-factor authentication.",
        category: "it",
        branch: "IT / Computer Engineering",
        features: ["Account management", "Fund transfers", "Bill payments", "Transaction history", "Security features", "Mobile app", "Admin panel"],
        technologies: ["React", "Node.js", "PostgreSQL", "Encryption", "OTP service"],
        price: "6999.00",
        deliverables: ["Complete source code", "Documentation", "PPT", "Security guide", "Setup guide", "30 days support"],
        thumbnail: "/assets/generated_images/Online Banking System.jpeg",
        samplePptUrl: "/samples/banking-ppt.pdf",
        popular: 58,
      },
      {
        title: "School Management Website",
        description: "Comprehensive school management system for student information, attendance, grades, fees, timetable, library, and parent-teacher communication.",
        category: "it",
        branch: "IT / Computer Engineering",
        features: ["Student management", "Attendance system", "Grade management", "Fee management", "Timetable", "Library system", "Parent portal"],
        technologies: ["React", "Node.js", "MySQL", "PDF reports", "SMS notifications"],
        price: "6499.00",
        deliverables: ["Complete source code", "Database design", "Documentation", "PPT", "Admin guide", "30 days support"],
        thumbnail: "/assets/generated_images/School Management Website.jpeg",
        samplePptUrl: "/samples/school-ppt.pdf",
        popular: 71,
      },
      {
        title: "Library Management System",
        description: "Complete library management system for book cataloging, member management, issue/return tracking, fine calculation, and inventory management.",
        category: "it",
        branch: "IT / Computer Engineering",
        features: ["Book cataloging", "Member management", "Issue/return", "Fine calculation", "Inventory tracking", "Reports", "Barcode support"],
        technologies: ["React", "Node.js", "MySQL", "Barcode API", "PDF generation"],
        price: "5499.00",
        deliverables: ["Complete source code", "Documentation", "PPT", "User manual", "Setup guide", "30 days support"],
        thumbnail: "/assets/generated_images/Library Management System.jpeg",
        samplePptUrl: "/samples/library-ppt.pdf",
        popular: 53,
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
