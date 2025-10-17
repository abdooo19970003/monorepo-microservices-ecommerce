import { create } from "zustand"
import { CartItemType } from "../../../../packages/types";
import { createJSONStorage, persist } from "zustand/middleware";
import { CartItemsType } from "../../../../packages/types";

type CartState = {
  cart: CartItemsType,
  isHydrated: boolean
}
type CartActions = {
  addToCart: (p: CartItemType) => void
  removeFromCart: (p: CartItemType) => void
  clearCart: () => void,
}

const useCartStore = create<CartState & CartActions>()(
  persist(
    (set) => ({
      cart: [],
      isHydrated: false,
      addToCart: (product) => set((state) => {
        const existingIndex = state.cart.findIndex(p =>
          p.id === product.id &&
          p.color === product.color &&
          p.size === product.size)
        if (existingIndex !== -1) {
          const updatedCart = [...state.cart];
          const itemToUpdate = updatedCart[existingIndex];
          if (itemToUpdate) {
            updatedCart[existingIndex] = { ...itemToUpdate, quantity: itemToUpdate.quantity + 1 };
          }
          return { cart: updatedCart };
        }
        else return { cart: [...state.cart, product] }
      }),
      removeFromCart: (product) => set((state) => ({
        cart: [...state.cart.filter(p =>
          p.id !== product.id ||
          p.size !== product.size ||
          p.color !== product.color)]
      })),
      clearCart: () => set({ cart: [] }),
    })
    , {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => state => {
        if (state) {
          state.isHydrated = true
        }
      }
    })
)

export default useCartStore