import { JournalPost } from '../types';

export const journalPostsData: JournalPost[] = [
  {
    id: 'opencv-preprocessing-notes',
    title: 'Pre-Processing Notes for Document OCR with OpenCV',
    date: 'October 2026',
    readTime: '4 min read',
    topic: 'Computer Vision',
    tags: ['Python', 'OpenCV', 'OCR', 'Image Processing'],
    summary: 'Observations on why raw document binarization fails on handwritten prescriptions and how adaptive thresholding creates cleaner contours for Tesseract OCR.',
    content: `When experimenting with optical character recognition on scanned paper documents and handwritten notes, passing raw RGB or even simple grayscale images to an OCR engine like Tesseract almost always yields poor recognition scores.

Key takeaways from our MedScribe exploration:
1. Grayscale & Blurring: Converting the image to grayscale and applying a mild 3x3 or 5x5 Gaussian blur significantly reduces high-frequency sensor noise without destroying character edges.
2. Adaptive Thresholding: Standard Otsu thresholding assumes a bimodal pixel distribution. In real-world photos with gradient shadows or uneven lighting across the paper, Otsu over-darkens edges. OpenCV's cv2.adaptiveThreshold using Gaussian or Mean weighting across local neighborhoods yields much cleaner text isolation.
3. Morphological Operations: Applying cv2.morphologyEx with rectangular kernels helps bridge broken strokes in cursive writing before contour bounding box detection.

Understanding these fundamentals reinforces that data preparation and image pre-processing account for more than 70% of accuracy improvements in computer vision pipelines.`,
    relatedProjectId: 'medscribe-ocr'
  },
  {
    id: 'git-branching-student-perspective',
    title: 'Cultivating Git Hygiene: From Solo Coursework to Collaborative Workflows',
    date: 'September 2026',
    readTime: '3 min read',
    topic: 'Developer Workflow',
    tags: ['Git', 'GitHub', 'Workflow', 'Best Practices'],
    summary: 'Moving beyond single-commit repositories: structured conventional commits, feature branches, and keeping history readable.',
    content: `During introductory programming classes, it is common to treat Git as a simple online backup: editing code directly on 'main' and committing with vague messages like 'update code' or 'fixed bug'.

Transitioning to engineering standards required building deliberate habits:
1. Conventional Commits: Using prefixes like 'feat:', 'fix:', 'docs:', and 'refactor:' makes commit history searchable and forces you to isolate atomic changes.
2. Topic Branches: Creating dedicated feature branches (e.g., 'feat/navigation-drawer') ensures that experimental refactors never destabilize a working base.
3. Clean .gitignore: Ensuring environment files, node_modules, and cache directories are never committed to version control prevents accidental credential leakage.

These habits make learning in public on GitHub far more credible for peers, recruiters, and future collaborators.`,
    relatedProjectId: 'developer-portfolio'
  },
  {
    id: 'relational-vs-document-schema-library',
    title: 'Relational Database Schema Design for Library Circulation',
    date: 'August 2026',
    readTime: '5 min read',
    topic: 'Database Architecture',
    tags: ['SQL', 'Databases', 'Schema Design', 'Backend'],
    summary: 'Evaluating normalization, foreign key constraints, and multi-copy tracking while architecting the Smart Library Resource Management System.',
    content: `While planning the data layer for the Smart Library Resource Management System, an important architectural decision was distinguishing between a book title record and physical inventory copies.

Architecture Considerations:
1. Books vs. Book Copies: A single work has an ISBN, Title, Author, and Edition. However, a library may hold 5 physical copies of that exact book, each with a distinct barcode, condition status, and checkout history. Separating 'books' from 'book_copies' prevents inventory anomalies.
2. Loan Transactions: The 'loans' table references both 'user_id' and 'copy_id', maintaining checkout timestamps, expected due dates, and return confirmations.
3. Referential Integrity: Enforcing foreign key constraints guarantees that a member cannot be deleted if active book loans are still checked out against their profile.

Working through relational normalization directly reinforces lessons learned in university database management lectures.`,
    relatedProjectId: 'smart-library-system'
  }
];
