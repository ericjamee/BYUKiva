export interface Student {
  id: string;
  name: string;
  email: string;
  country: string;
  pathwayProgram: string;
  desiredDegree: string;
  story?: string;
  academicProgress?: string;
  futureGoals?: string;
  whyNeedLoan?: string;
  profilePictureUrl: string;
  amountRaised: number;
  fundingGoal: number;
  status: 'pending' | 'approved' | 'rejected';
  progressReports?: ProgressReport[];
  donations?: Donation[];
}

export interface Donation {
  id: string;
  amount: number;
  studentId: string;
  donorName: string;
  message?: string;
  date: string;
}

export enum DonationType {
  OneTime = 'OneTime',
  Monthly = 'Monthly',
  Quarterly = 'Quarterly'
}

export interface Donor {
  id: string;
  name: string;
  email: string;
  donations?: Donation[];
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

export enum UserRole {
  Admin = 'Admin',
  Student = 'Student',
  Donor = 'Donor'
}

export interface ProgressReport {
  id: string;
  studentId: string;
  date: string;
  academicPerformance: string;
  challenges: string;
  goals: string;
  nextSteps: string;
}

export interface LoanRepayment {
  id: string;
  studentId: string;
  amount: number;
  date: Date;
  status: RepaymentStatus;
  notes: string;
  student?: Student;
}

export enum RepaymentStatus {
  Scheduled = 'Scheduled',
  Paid = 'Paid',
  Late = 'Late',
  Missed = 'Missed'
}

export interface StudentApplicationData {
  name: string;
  email: string;
  country: string;
  pathwayProgram: string;
  desiredDegree: string;
  story: string;
  academicProgress: string;
  futureGoals: string;
  whyNeedLoan: string;
  profilePicture?: File;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
} 