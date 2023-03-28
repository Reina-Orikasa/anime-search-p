import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface ShowState {
  shows: showDataI[];
  addShow: (show: showDataI[]) => void;
  removeAllShows: () => void;
}

interface showDataI {
  mal_id: number;
  url: string;
  episodes: number;
  title_english: string;
  title: string;
  episodes_watched: number;
}

export const useShowStore = create<ShowState>()(
  persist(
    (set) => ({
      shows: [],
      addShow: (show: showDataI[]) =>
        set((state) => ({ shows: [...state.shows, ...show] })),
      removeAllShows: () => set({ shows: [] }),
    }),
    {
      name: "show-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
