// ----Composant qui permet d'afficher dans le panier les propriétées associées à un Item ----

import React from 'react'
import { useShoppingCart } from '../context/ShoppingCardContext';

// import de tous les items depuis le fichier json
import storeItems from "../data/items.json"

// Import provenant de Bootstrap.
import { Stack, Button } from 'react-bootstrap';

// import de la méthode qui permet le formatage du prix
import { formatCurrency } from '../utils/formatCurrency';

// Pour typer les propriétées reçues par le composant.
type CartItemProps ={
    id:number,
    quantity:number
}

export function CartItem({id,quantity}: CartItemProps  ) {

    //  on utilise le conexte pour récupérer la méthode qui permet de supprimer un item
    const { removeFromCart } = useShoppingCart();

    const item = storeItems.find(item => item.id === id);
    if(item == null) return null;

    return (
        <Stack 
            direction="horizontal" 
            gap={2}
            className="d-flex  align-items-center"
        >
            <img 
                src={item.imgUrl}
                style={{ width: "125px", height: "75px", objectFit:"cover"}}
            />
            <div className='me-auto'>
                <div>
                    {item.name} {quantity > 1 
                                && <span className='text-muted' style={{fontSize :"0.65rem"}}>x{quantity}</span>}
                </div>

                <div className='text-muted' style={{ fontSize :"0.75rem"}}>
                    {formatCurrency(item.price)}
                </div>
            </div>
            <Button
                onClick={() => removeFromCart(item.id)} 
                variant="outline-danger"
            >
                &times;
            </Button>
       </Stack>
  )
}

