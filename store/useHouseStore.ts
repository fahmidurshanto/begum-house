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
    set(() => {
      // Clamped strictly between 0.0 and 1.0 for fixed, predictable 3D corridor panning
      const clamped = Math.max(0, Math.min(1, progress));
      return { scrollProgress: clamped };
    }),

  openHouse: () => {
    // Reset scroll to top on enter so forward scroll starts at 0% depth
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
    set({ view: "ATRIUM", scrollProgress: 0 });
  },

  returnToFacade: () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    set({ view: "FACADE", scrollProgress: 0, selectedRoom: null, isRoiModalOpen: false, isGlobalModalOpen: false });
  },

  returnToLobby: () => {
    set({ view: "ATRIUM", selectedRoom: null, scrollProgress: 0 });
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
