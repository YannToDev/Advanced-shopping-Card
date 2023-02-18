// ----- Composant qui correspond à la vue /store -----

import storeItems from '../data/items.json';
import { StoreItem } from '../components/StoreItem';

import { Col, Row } from 'react-bootstrap';

// on boucle sur les éléménts du tableau de produit pour créer un composant StoreItem pour chacun d'eux et on passe
// toutes propriétés associés à un item(produit) à l'aide du destructuring.
// Elles sont récupérées de la même façon par le composant enfant
export function Store () {

    return (
        <>
            <h1>Store Page</h1>
            <Row md={2} xs={1} lg={3} className="g-3">
                {storeItems.map((item) =>(
                    <Col key={item.id}>
                        <StoreItem  {...item}/>
                    </Col>
                ))}
            
            </Row>
            
        </>
    )
};