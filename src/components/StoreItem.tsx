// Composant qui permet d'afficher chacun des items de notre store, il est appelé dans la vue /store

import { StoreItemProps } from "../types/storeItems";
import { Button, Card } from "react-bootstrap";
import { formatCurrency } from "../utils/formatCurrency";
import { useShoppingCart } from "../context/ShoppingCardContext";

// on récupère toutes les props que le composant à besoin
export function StoreItem({ id, name, price, imgUrl }:StoreItemProps) {

    //  On récupère vua le contexte toutes les méthodes pour gérer le up/down/remove de la quantité d'un objet.
    // mais aussi la méthode qui permet de récupérer la quantité associée à un produit.
    const { getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart } = useShoppingCart();

    // on utilise l'id du produit en question( qui es reçu en props ) pour récupérer la quantité du produit associé.
    const quantity = getItemQuantity(id);

    return(
        <Card className="h-100">
            <Card.Img 
                variant="top"
                src={imgUrl}
                height="200px"
                style={ {objectFit:"cover"}}
            />

            <Card.Body 
                className="d-flex flex-column"
            >
                <Card.Title
                    className="d-flex justify-content-between align-items-baseline mb-4"
                >
                    <span className="fs-2">{name}</span>
                    <span className="ms-2 text-muted">{ formatCurrency (price)}</span>
                </Card.Title>

                {/* on affiche le bouton d'ajout si quantité nulle sinon on affiche les boutons d'add et diminution */}
                <div className="mt-auto">
                    {quantity === 0 ? (
                        <Button onClick={() => increaseCartQuantity(id)} className="w-100"> + Add to Card</Button>
                    ):(
                        <div className="d-flex align-items-center flex-column" style={{gap: '0.5rem'}}>
                            <div className="d-flex align-items-center justify-center" style={{gap: '0.5rem'}}>
                                <Button onClick={() =>decreaseCartQuantity(id)}>-</Button>
                                <div>
                                    <span className="fs-3">{quantity}</span>
                                </div>
                                <Button onClick={() =>increaseCartQuantity(id)}>+</Button>
                            </div>
                            <Button onClick={() =>removeFromCart(id)} variant="danger" size="sm">Remove</Button>
                        </div>
                    )}
                </div>
            </Card.Body>

       
        </Card>
    )  
};

// la class "mt-auto" utilise le fait que notre cardBody utilise Flexbox pour remplir le contenu de la même manière