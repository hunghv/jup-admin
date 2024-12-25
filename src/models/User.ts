export interface User {
  id: string;
  fullname: string;
  email: string;
  uuid: string;
  phone: string;
  address1: string;
  address2: string;
  country: string;
  dateOfBirth: string;
  profilePictureUrl: string | null;
  role: string;
  accountStatus: string;
  facebookProfile: string | null;
  twitterProfile: string | null;
  linkedinProfile: string | null;
  company: string | null;
  isActive: boolean;
  occupation: string | null;
  bio: string;
  address_code: string | null;
  gender: string | null;
  city: string | null;
}
