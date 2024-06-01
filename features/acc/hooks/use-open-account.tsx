import { create } from "zustand";

type OpenAccountState = {
  isOpen: boolean;
  onOpen: (id: string) => void;
  onClose: () => void;
  id?: string;
};

export const useOpenAccount = create<OpenAccountState>((set) => ({
  isOpen: false,
  id: undefined,
  onOpen: (id: string) => set({ isOpen: true, id: id }),
  onClose: () => set({ isOpen: false, id: undefined }),
}));
