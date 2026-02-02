import { User } from "@supabase/supabase-js";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface UserState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  userCredits: number;
  lastReset: string;
}

interface UserActions {
  setUser: (user: User) => void;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: string) => void;
  setUserCredits: (userCredits: number) => void;
  setLastReset: (lastReset: string) => void;
  clearUser: () => void;
}

interface UserStore extends UserState, UserActions {}

const initialState: UserState = {
  user: null,
  isLoading: false,
  error: null,
  userCredits: 0,
  lastReset: "",
};

export const useUserStore = create<UserStore>()(
  devtools(
    (set) => ({
      ...initialState,
      setUser: (user: User) => set({ user }),
      setIsLoading: (isLoading: boolean) => set({ isLoading }),
      setError: (error: string) => set({ error }),
      setUserCredits: (userCredits: number) => set({ userCredits }),
      setLastReset: (lastReset: string) => set({ lastReset }),
      clearUser: () => set(initialState),
    }),
    { name: "user-store" }
  )
);
