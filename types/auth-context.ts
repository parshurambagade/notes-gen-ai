// Better-auth session type
type BetterAuthSession = {
  user: {
    id: string;
    email: string;
    name?: string | null;
    emailVerified: boolean;
    image?: string | null;
    createdAt: Date;
    updatedAt: Date;
  };
  session: {
    id: string;
    userId: string;
    expiresAt: Date;
    token: string;
    ipAddress?: string | null;
    userAgent?: string | null;
  };
};

export type AuthContextType = {
  user: BetterAuthSession["user"] | null;
  session: BetterAuthSession["session"] | null;
  loading: boolean;
  refetch: () => Promise<void>;
};
