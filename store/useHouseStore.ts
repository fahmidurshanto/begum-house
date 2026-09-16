import { create } from "zustand";
import { ServiceRoom } from "@/data/houseData";

export type AppView = "FACADE" | "ATRIUM";

interface HouseStore {
  view: AppView;
  scrollProgress: number; // 0.0 to 1.0
  selectedRoom: ServiceRoom | null;
  isRoiModalOpen: boolean;
  isGlobalModalOpen: boolean;
  selectedGlobalTab: string;
  isSoundMuted: boolean;
  
  // Actions
  setView: (view: AppView) => void;
  setScrollProgress: (progress: number) => void;
  openHouse: () => void;
  returnToFacade: () => void;
  setSelectedRoom: (room: ServiceRoom | null) => void;
  setIsRoiModalOpen: (isOpen: boolean) => void;
  setIsGlobalModalOpen: (isOpen: boolean, tabId?: string) => void;
  toggleSound: () => void;
}

export const useHouseStore = create<HouseStore>((set) => ({
  view: "FACADE",
  scrollProgress: 0,
  selectedRoom: null,
  isRoiModalOpen: false,
  isGlobalModalOpen: false,
  selectedGlobalTab: "turkiye",
  isSoundMuted: false,

  setView: (view) => set({ view }),

  setScrollProgress: (progress) =>
    set((state) => {
      let newView = state.view;
      if (progress < 0.15) {
        newView = "FACADE";
      } else {
        newView = "ATRIUM";
      }
      return { scrollProgress: progress, view: newView };
    }),

  openHouse: () => {
    // Instant seamless 3D camera fly-through transition without loader interrupts
    set({ view: "ATRIUM", scrollProgress: 0.25 });
  },

  returnToFacade: () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    set({ view: "FACADE", scrollProgress: 0, selectedRoom: null, isRoiModalOpen: false, isGlobalModalOpen: false });
  },

  setSelectedRoom: (room) => set({ selectedRoom: room }),

  setIsRoiModalOpen: (isOpen) => set({ isRoiModalOpen: isOpen }),

  setIsGlobalModalOpen: (isOpen, tabId) =>
    set((state) => ({
      isGlobalModalOpen: isOpen,
      selectedGlobalTab: tabId || state.selectedGlobalTab,
    })),

  toggleSound: () => set((state) => ({ isSoundMuted: !state.isSoundMuted })),
}));
