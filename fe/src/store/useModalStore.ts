import { create } from "zustand";

type ModalStore = {
  open: boolean;
  data: unknown;
  type: string | null;
  toggle: (type?: string) => void;
};

const useModalStore = create<ModalStore>((set) => ({
  open: false,
  data: null,
  type: null,

  toggle: (type) =>
    set((state) => ({
      open: !state.open,
      type: type ?? null
    })),
}));

export default useModalStore;