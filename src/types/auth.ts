// Authentication and user management types

export interface OwnerPasswordFormData {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  username: string;
}

export interface OwnerPasswordFormState {
  errors?: {
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
    firstName?: string[];
    lastName?: string[];
    username?: string[];
    general?: string[];
  };
  message?: string;
  success?: boolean;
}

export interface ChallengeData {
  id: string;
  name: string;
  email: string;
  answers: {
    question1?: string;
    question2?: string;
    question3?: string;
    additionalInfo?: string;
  };
  documents?: string[];
  status: 'submitted' | 'pending_verification' | 'verified' | 'in_progress' | 'completed' | 'rejected';
  submittedAt: string;
  verifiedAt?: string;
  completedAt?: string;
}

export interface DocumentData {
  id: string;
  title: string;
  description?: string;
  files?: string[];
  user?: string;
  challenge?: string;
  status: 'pending' | 'verified' | 'processed' | 'rejected';
  uploadedAt: string;
  verifiedAt?: string;
}

export interface UserCreationResult {
  success: boolean;
  user?: {
    id: string;
    email: string;
    username: string;
    firstName: string;
    lastName: string;
  };
  challenge?: ChallengeData;
  documents?: DocumentData[];
  errors?: string[];
}

export interface PasswordVerificationData {
  challengeId: string;
  password: string;
  confirmPassword: string;
}