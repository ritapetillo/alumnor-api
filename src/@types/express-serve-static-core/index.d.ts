declare namespace Express {
  interface Request {
    user: {
      email: string;
      _id: string;
    };
  }
}
