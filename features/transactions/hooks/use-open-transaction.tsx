import { create } from "zustand";

type OpenTransactionState = {
  isOpen: boolean;
  onOpen: (id: string) => void;
  onClose: () => void;
  id?: string;
};

export const useOpenTransaction = create<OpenTransactionState>((set) => ({
  isOpen: false,
  id: undefined,
  onOpen: (id: string) => set({ isOpen: true, id: id }),
  onClose: () => set({ isOpen: false, id: undefined }),
}));
