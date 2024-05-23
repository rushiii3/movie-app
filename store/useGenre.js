import { create } from 'zustand'

const useGenreStore = create((set) => ({
    movieGenre: null,
    showGenre: null,
    setMovieGenre: (genre) => set({ movieGenre: genre }),
    setShowGenre: (genre) => set({ showGenre: genre }),
}))

export default useGenreStore;
