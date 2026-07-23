import { create } from "zustand";

type ModalStore = {
  open: boolean;
  data: unknown | null;
  toggle: () => void;
};

const useModalStore = create<ModalStore>((set) => ({
  open: false,
  data: null,

  toggle: () =>
    set((state) => ({
      open: !state.open,
    })),
}));

export default useModalStore;