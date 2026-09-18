import { create } from "zustand";
import { ServiceRoom } from "@/data/houseData";

export type AppView = "FACADE" | "ATRIUM" | "ROOM";

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
  returnToLobby: () => void;
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
      // Return to FACADE only if user scrolls all the way back up to top while in ATRIUM
      if (progress < 0.05 && state.view === "ATRIUM") {
        newView = "FACADE";
      }
      return { scrollProgress: progress, view: newView };
    }),

  openHouse: () => {
    // Explicit click required to open facade doors and enter lobby
    set({ view: "ATRIUM", scrollProgress: 0.15 });
  },

  returnToFacade: () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    set({ view: "FACADE", scrollProgress: 0, selectedRoom: null, isRoiModalOpen: false, isGlobalModalOpen: false });
  },

  returnToLobby: () => {
    set({ view: "ATRIUM", selectedRoom: null, scrollProgress: 0.15 });
  },

  setSelectedRoom: (room) =>
    set(() => {
      if (room && room.id === "business-advisory") {
        return { selectedRoom: room, view: "ROOM", scrollProgress: 0 };
      }
      return { selectedRoom: room };
    }),

  setIsRoiModalOpen: (isOpen) => set({ isRoiModalOpen: isOpen }),

  setIsGlobalModalOpen: (isOpen, tabId) =>
    set((state) => ({
      isGlobalModalOpen: isOpen,
      selectedGlobalTab: tabId || state.selectedGlobalTab,
    })),

  toggleSound: () => set((state) => ({ isSoundMuted: !state.isSoundMuted })),
}));
