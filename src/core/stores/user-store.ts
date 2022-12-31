import create, {UseBoundStore} from "zustand";
import {persist} from "zustand/middleware";

export const useUserStore: UseBoundStore<any> = create(
    persist(
        (set, get) => ({
            user: null,
            setUser: (user: any) => set((state: { user: any }) => state.user = user),
        })
    )
)