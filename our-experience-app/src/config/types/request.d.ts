// reference for what the user can hold
type User = {
  id: number;
  username: string;
  password: string;
  role: string;
};

declare namespace Express {
  export interface Request {
    user: any;
  }
}
