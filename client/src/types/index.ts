export interface Student {
    id: string;
    firstName: string;
    lastName: string;
    name: string;  // Full name
    age: number;
    country: string;
    profilePictureUrl: string;
    fundingGoal: number;
    amountRaised: number;
    loanAmount: number;
    monthlyPaymentCapacity: number;
    pathwayProgram: string;
    desiredDegree: string;
    familyHistoryExperience: string;
    futureGoals: string;
    estimatedNamesPerYear: number;
    startDate: string;
    applicationDate: string;
    applicationStatus: 'Pending' | 'Approved' | 'Rejected';
    story: string;
    whyNeedLoan: string;
    academicProgress: string;
    adminNotes?: string;
    donations: Donation[];
    progressReports: ProgressReport[];
}

export interface Donation {
    id: string;
    amount: number;
    donorName: string;
    message?: string;
    date: string;
    studentId: string;
    redirectUrl?: string;
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
    namesIndexed: number;
    date: string;
    description: string;
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
  age: number;
  country: string;
  pathwayProgram: string;
  desiredDegree: string;
  story: string;
  photo: File | null;
  loanAmount: number;
  monthlyPaymentCapacity: number;
  academicProgress: string;
  futureGoals: string;
  whyNeedLoan: string;
  expectedGraduation: Date;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
} 