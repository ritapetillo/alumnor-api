declare global {
  namespace Express {
    interface Request {
      authInfo?: AuthInfo;
      user?: {
        email: string;
        _id: string;
      };
    }
  }
}
