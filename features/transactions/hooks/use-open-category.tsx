import { create } from "zustand";

type OpenCategoryState = {
  isOpen: boolean;
  onOpen: (id: string) => void;
  onClose: () => void;
  id?: string;
};

export const useOpenCategory = create<OpenCategoryState>((set) => ({
  isOpen: false,
  id: undefined,
  onOpen: (id: string) => set({ isOpen: true, id: id }),
  onClose: () => set({ isOpen: false, id: undefined }),
}));
