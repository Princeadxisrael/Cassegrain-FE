import { create } from 'zustand';
import { createJSONStorage, persist, PersistStorage } from 'zustand/middleware';


export interface UserType {
  companyName: string;
  role: string;
  certifications: string;
}

interface TokenAccount {
  symbol: string;
  balance: number;
  decimals: number;
  image: string;
  mint: string;
  name: string;
}

export interface userWalletType {
  balance: number;
  solBalance: number;
  tokenAccounts: TokenAccount[];
  totalUsdBalance: number;
}
export interface Userstore {
  session: { id: string; expiry: number } | null;
  clearData: () => void;
  user: UserType | null;
  setUser: (user: UserType | null) => void;
  logout: () => void;
  userWallet: userWalletType;
  updateUserWallet: (userWallet: userWalletType) => void;
  createSession: () => void;
  getSession: () => {
    session: { id: string; expiry: number } | null;
    user: UserType | null;
  };
}

const UserItem = create(
  persist<Userstore>(
    (set, get) => ({
      session: null,
      user: null,
      userWallet: {
        balance: 0,
        solBalance: 0,
        tokenAccounts: [],
        totalUsdBalance: 0,
      },
      setUser: (user: UserType | null) => set({ user }),
      updateUserWallet: (userWallet: userWalletType) => set({ userWallet }),
      createSession: () => {
        const session = {
          id: `${Math.random()}${new Date().getTime()}${Math.random()}`,
          expiry: new Date().getTime() + 1000 * 60 * 60 * 24 * 7, // 7 days
        };
        set({ session });
      },
      getSession: () => {
        //check if session is expired
        if (get().session && get().session.expiry < new Date().getTime()) {
          set({ session: null });
        }
        return { session: get().session, user: get().user };
      },
      clearData: () => {
        // Clear user state and wallet state
        set({
          user: null,
          userWallet: {
            balance: 0,
            solBalance: 0,
            tokenAccounts: [],
            totalUsdBalance: 0,
          }
        })
      },
      logout: () => {
        set({ session: null })
      },
    }),
    {
      name: 'user', // Storage key
      storage: createJSONStorage(() => localStorage), // Use AsyncStorage for React Native
      onRehydrateStorage: () => (state) => {
        // console.log("Rehydrating:", state);
      }
    }
  )
);

export default UserItem;
