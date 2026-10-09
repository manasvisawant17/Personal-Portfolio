import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import fs from 'fs';

interface InquiryRecord {
  id: string;
  fullName: string;
  email: string;
  company?: string;
  serviceId: string;
  projectDescription: string;
  budgetRange: string;
  desiredDeadline: string;
  referenceUrl?: string;
  additionalRequirements?: string;
  submittedAt: string;
}

const INQUIRIES_FILE = path.resolve(process.cwd(), 'inquiries_store.json');

function loadInquiries(): InquiryRecord[] {
  try {
    if (fs.existsSync(INQUIRIES_FILE)) {
      return JSON.parse(fs.readFileSync(INQUIRIES_FILE, 'utf-8'));
    }
  } catch (err) {
    console.error('Error loading inquiries store:', err);
  }
  return [];
}

function saveInquiry(inquiry: InquiryRecord) {
  try {
    const list = loadInquiries();
    list.push(inquiry);
    fs.writeFileSync(INQUIRIES_FILE, JSON.stringify(list, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing inquiries store:', err);
  }
}

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
  const isProd = process.env.NODE_ENV === 'production';

  app.use(express.json());

  // API endpoint for freelance inquiries
  app.post('/api/inquiry', (req, res) => {
    const { fullName, email, projectDescription, serviceId, budgetRange, desiredDeadline, company, referenceUrl, additionalRequirements } = req.body;

    if (!fullName || !email || !projectDescription) {
      return res.status(400).json({ error: 'Missing mandatory fields (fullName, email, projectDescription).' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email address provided.' });
    }

    const newInquiry: InquiryRecord = {
      id: `INQ-${Date.now().toString(36).toUpperCase()}`,
      fullName: String(fullName).slice(0, 100),
      email: String(email).slice(0, 100),
      company: company ? String(company).slice(0, 100) : undefined,
      serviceId: String(serviceId || 'General Inquiry').slice(0, 100),
      projectDescription: String(projectDescription).slice(0, 3000),
      budgetRange: String(budgetRange || 'Flexible').slice(0, 50),
      desiredDeadline: String(desiredDeadline || 'Flexible').slice(0, 50),
      referenceUrl: referenceUrl ? String(referenceUrl).slice(0, 300) : undefined,
      additionalRequirements: additionalRequirements ? String(additionalRequirements).slice(0, 2000) : undefined,
      submittedAt: new Date().toISOString()
    };

    saveInquiry(newInquiry);
    console.log(`[INQUIRY RECEIVED] from ${newInquiry.fullName} (${newInquiry.email}) for ${newInquiry.serviceId}`);

    return res.status(201).json({
      success: true,
      inquiryId: newInquiry.id,
      message: 'Inquiry safely recorded on server.'
    });
  });

  // Healthcheck endpoint
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

startServer();
