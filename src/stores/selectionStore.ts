/**
 * stores — selection store (Zustand).
 *
 * Generic multi-select state (e.g. row checkboxes in a data table). Client-owned
 * ephemeral UI state; not persisted.
 */

import { create } from "zustand";

interface SelectionState {
  selectedIds: string[];
  toggle: (id: string) => void;
  set: (ids: string[]) => void;
  clear: () => void;
  isSelected: (id: string) => boolean;
}

export const useSelectionStore = create<SelectionState>((set, get) => ({
  selectedIds: [],
  toggle: (id) =>
    set((s) => ({
      selectedIds: s.selectedIds.includes(id)
        ? s.selectedIds.filter((x) => x !== id)
        : [...s.selectedIds, id],
    })),
  set: (ids) => set({ selectedIds: ids }),
  clear: () => set({ selectedIds: [] }),
  isSelected: (id) => get().selectedIds.includes(id),
}));
