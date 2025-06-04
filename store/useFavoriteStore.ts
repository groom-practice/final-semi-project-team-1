import { Photo } from "@/type/photo";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type FavoriteState = {
  favoriteImgs: Photo[];
  addFavoriteImg: (photo: Photo) => void;
  removeFavoriteImg: (id: string) => void;
  isFavorite: (id: string) => boolean;
};

export const useFavoriteImgs = create<FavoriteState>()(
  persist(
    (set, get) => ({
      favoriteImgs: [],
      addFavoriteImg: (photo: Photo) =>
        set((state: FavoriteState) =>
          state.favoriteImgs.some((p) => p.id === photo.id)
            ? state
            : { favoriteImgs: [...state.favoriteImgs, photo] }
        ),
      removeFavoriteImg: (id: string) =>
        set((state: FavoriteState) => ({
          favoriteImgs: state.favoriteImgs.filter((p) => p.id !== id),
        })),
      isFavorite: (id: string) =>
        get().favoriteImgs.some((p: Photo) => p.id === id),
    }),
    {
      name: "favoriteImgs-storage",
    }
  )
);
