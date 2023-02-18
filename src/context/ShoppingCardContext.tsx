// pour créer et typer le contexte
import { createContext, useContext ,useState} from "react";
import { ShoppinngCartProviderProps,ShoppingCartContextProps, CartItem } from '../types/shoppingCartContext'

// composant qui correspond au panier et qui est passé en enfant au Provider du context
import { ShoppingCart } from '../components/ShoppingCart';

// import de la méthode qui permet de formater le prix
import { formatCurrency } from "../utils/formatCurrency";

// import du Hook personalisé qui permet la gestion du localStorage
import { useLocalStorage } from "../Hook/useLocalStorage";

// Création d'un context 
const ShoppingCartContext = createContext({} as ShoppingCartContextProps);

// on exporte ce context via un Hook personalisé
export function useShoppingCart () {
    return useContext(ShoppingCartContext)
};

// on exporte le provider
export function ShoppingCartProvider( { children }:ShoppinngCartProviderProps ){

    const [cartItems, setCartItems] = useLocalStorage<CartItem[]>("shopping-cart",[])
    const [isOpen,setIsOpen] = useState(false);

    // méthode pour ouvrir ou fermer le panier
    const openCart = () => setIsOpen(true);
    const closeCart = () => setIsOpen(false);

    // méthode qui retoune la quantité totale d'items disponible dans le panier
    const cartQuantity = cartItems.reduce(
        (quantity, item) => item.quantity + quantity, 0
    );

    // Permet de retourner la quantité pour un produit donné.
    function getItemQuantity(id:number){
        return cartItems.find(item => item.id === id)?.quantity || 0;
    };

    // on cherche l'item dont on veut augmenter la quantité.
    // 1. si on ne trouve pas l'item c'est qu'il n'est pas encore dans le panier donc on l'ajoute en initialisant sa quantité à 1.
    // 2. Si l'item exsite alors on parcours le panier pour trouver l'élément en question et on augmente sa quantité de 1.
    //    si on ne l'a pas trouvé alors on retourne l'item inchangé.
    function increaseCartQuantity(id:number){
        setCartItems(currItems => {

            if(currItems.find(item => item.id === id) == null){
                return [...currItems, { id, quantity : 1}];
            }else{
                
                return currItems.map(item => {
                    if(item.id === id){
                        return {...item, quantity: item.quantity + 1}
                    } 
                    else {
                        return item;
                    }
                })      
            }
        })
    
    };

    // On cherche l'item dont on veut diminuer la quantité à partir de son id.
    // 1. Si on trouve l'item et que sa quantité est à un alors c'est qu'on veut le supprimer du panier et on retourne ce dernier sans cet élément.
    // 2. Si l'item existe on boucle à travers le tableau pour trouver l'élément en question si on le trouve bien on diminue sa quantité de 1.
   function decreaseCartQuantity(id: number) {
    setCartItems(currItems => {

      if (currItems.find(item => item.id === id)?.quantity === 1) {
        return currItems.filter(item => item.id !== id)

      } else {
        return currItems.map(item => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 }
          } else {
            return item
          }
        })
      }

    })
  }


    //  on met le state à jour en renvoyant un tableau contenant tous les éléments sauf celui que l'on veut delete.
    function removeFromCart(id:number){
        setCartItems(currItems => {
            return currItems.filter(item => item.id !== id );
        })
    };

    // le context fournit à tous ses enfants les méthodes précédentes
    return (
        <ShoppingCartContext.Provider 
            value=
            {{
                getItemQuantity, 
                increaseCartQuantity, 
                decreaseCartQuantity,
                removeFromCart,
                cartItems,
                cartQuantity,
                openCart,
                closeCart,
            }}
        >
            { children }
            <ShoppingCart isOpen={isOpen} />
        </ShoppingCartContext.Provider>
    )
};

// pour rappel à chaque fois qu'on utilise un provider celui-çi doit avoir des objets et des enfants à l'intérieur.

// Ancienne version du state avant la mise en place du localStorage
// const [cartItems, setCartItems] = useState<CartItem[]>([]);