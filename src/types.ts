export type EventType = 'pareekshana' | 'prashnotri' | 'prayas' | 'conclave';

export interface ParticipantInfo {
  name: string;
  email: string;
  phone: string;
  studentId: string;
  yearOfStudy: string;
}

export interface RegistrationData {
  id: string;
  event: 'pareekshana' | 'prashnotri';
  teamName: string;
  collegeName: string;
  city: string;
  leader: ParticipantInfo;
  members: ParticipantInfo[];
  needsAccommodation: boolean;
  timestamp: string;
  amountPaid: number;
  paymentRef: string;
  status: 'Confirmed' | 'Pending' | 'Waitlist';
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  committee: 'Executive' | 'Pareekshana' | 'Prashnotri' | 'Marketing' | 'Logistics' | 'Sponsorship' | 'Technology' | 'Hospitality';
  tagline: string;
  image: string;
  linkedin?: string;
  instagram?: string;
  email?: string;
}

export interface FacultyMember {
  id: string;
  name: string;
  designation: string;
  department: string;
  image: string;
  email: string;
  specialization: string;
}

export interface LeaderboardEntry {
  rank: number;
  teamName: string;
  college: string;
  event: 'Pareekshana' | 'Prashnotri';
  round1Score: number;
  round2Score: number;
  round3Score: number;
  finalScore: number;
  status: 'Qualified' | 'Active' | 'Eliminated';
}

export interface FestScheduleItem {
  id: string;
  time: string;
  title: string;
  round: string;
  venue: string;
  event: 'Pareekshana' | 'Prashnotri' | 'General';
  description: string;
  coordinator: string;
}

export interface AchievementItem {
  id: string;
  title: string;
  year: string;
  category: 'National Trophies' | 'Research & Academics' | 'Corporate & Placements' | 'Heritage Records';
  institutionOrForum: string;
  description: string;
  badge: string;
  highlightMetric: string;
  image?: string;
}

export interface SupportQuery {
  id: string;
  delegateName: string;
  email: string;
  phone: string;
  college: string;
  category: string;
  question: string;
  status: 'Pending' | 'Resolved';
  submittedAt: string;
  resolvedAt?: string;
  solutionNotes?: string;
  adminResponder?: string;
}

export interface SearchResultItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'Events' | 'Achievements' | 'Rules & Formats' | 'Leadership' | 'Venues & Schedule' | 'Registrations' | 'Connect';
  targetSection: string;
  keywords: string[];
  actionType?: 'scroll' | 'register_pareekshana' | 'register_prashnotri' | 'video' | 'chat';
}

