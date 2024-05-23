import {create} from 'zustand';
import { MMKV } from 'react-native-mmkv';

const storage = new MMKV();
const zustandStorage = {
    setItem: (name, value) => {
      return storage.set(name, value);
    },
    getItem: (name) => {
      const value = storage.getString(name);
      return value ?? null;
    },
    removeItem: (name) => {
      return storage.delete(name);
    },
  };
// Zustand store for bookmarks
const useBookmarkStore = create((set, get) => ({
    bookmarks: [],
    addBookmark: (bookmark) => {
      const updatedBookmarks = [...get().bookmarks, bookmark];
      zustandStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
      set({ bookmarks: updatedBookmarks });
    },
    removeBookmark: (bookmarkId) => {
      const updatedBookmarks = get().bookmarks.filter(b => b.id !== bookmarkId);
      zustandStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
      set({ bookmarks: updatedBookmarks });
    },
    loadBookmarks: () => {
      const storedBookmarks = zustandStorage.getItem('bookmarks');
      if (storedBookmarks) {
        set({ bookmarks: JSON.parse(storedBookmarks) });
      }
    },
  }));
  
  export default useBookmarkStore;