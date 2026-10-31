export interface RegisterForm {
  name: string;
  username?: string;
  dateOfBirth: string;
  email: string;
  password: string;
  rePassword: string;
  gender:""| "male" | "female";
}