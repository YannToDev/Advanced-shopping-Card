import { createContext, useContext , ReactNode} from "react";

// Pour typer la méthode qui fournit le Provider et préciser qu'elle va recevoir des ReactNode qui est
// un type large qui accepte beaucoup de propriétés.
export type ShoppinngCartProviderProps ={
    children: ReactNode
};

// pour typer le le state du context qui reçoit un tableau d'item.
export type CartItem = {
    id: number,
    quantity : number
};

// Pour typer les méthode mises à disposition par le context via son Provider
export type ShoppingCartContextProps = {
    openCart:() => void
    closeCart:() => void
    getItemQuantity: (id:number) => number
    increaseCartQuantity: (id:number) => void
    decreaseCartQuantity: (id:number) => void
    removeFromCart: (id:number) => void
    cartQuantity : number
    cartItems: CartItem[]
};