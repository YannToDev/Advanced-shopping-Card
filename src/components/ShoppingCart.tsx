// ---- Composant qui correspond au panier ----

import React from 'react'
import { Offcanvas, Stack } from 'react-bootstrap';

// import du context
import { useShoppingCart } from '../context/ShoppingCardContext';

// import du composant
import { CartItem } from './CartItem';

import { formatCurrency } from '../utils/formatCurrency';

// Fichier Json contenant tous les produits
import storeItems  from '../data/items.json';

type ShoppingCartProps  = {
    isOpen: boolean
}

// il reçoit en props du provider le booléan associé à l'état d'ouveture/fermeture du panier
export function ShoppingCart({ isOpen } : ShoppingCartProps) {

    // on récupère via le context la méthode qui permet de mettre à jour le state lié à l'ouverture/fermeture du panier.
    // on récupère aussi les items qui sont dans le panier
    const { closeCart, cartItems } = useShoppingCart()

  return (

   <Offcanvas show={isOpen} placement="end" onHide={closeCart}>

    <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
    </Offcanvas.Header>

    <Offcanvas.Body>
        <Stack gap={3}>
        {cartItems.map(item =>(
            <CartItem 
                key={item.id}
                {...item}
            />
        ))}
         <div className="ms-auto fw-bold fs-5">
            Total{" "}
            {formatCurrency(
              cartItems.reduce((total, cartItem) => {
                const item = storeItems.find(i => i.id === cartItem.id)
                return total + (item?.price || 0) * cartItem.quantity
              }, 0)
            )}
        </div>
        </Stack>
    </Offcanvas.Body>

   </Offcanvas>
  )
}

