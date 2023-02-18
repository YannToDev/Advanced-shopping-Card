// ---- Méthode qui permet de crée un localStorage flexible qui peut recevoir différent type de state en paramètre ----

import { useState, useEffect } from 'react'

// hook personalisé qui reçoit un type générique dont la valeur initiale est soit le type en question ou 
// une fonction qui retoure ce type.
// On commence par définir un state qui va gérer les opérations suivante :
// 1. On récupère l'item dans le localStorage.
//    - Si les données ne sont pas null alors on les pase pour les convertir en JSON
//     - On Check le type qui est passé en valeur initial à ce localStorage, si c'est une fonction alors on 
//       initialise la valeur par défaut comme une fonction dont le type est celui passé én générique.
//       Sinon c'est que c'est une valeur et on initialise la valeur par défaut avec cette valeur.

// 2. on Utilise un useEffect qui a pour rôle de surveiller le localStorage et il peut le modifier dans deux cas:
//  - si la clée qui lui est associée change, ce qui signifie qu'on définit un nouveau storage.
//  - si la valeur  du state stockée dans le localStorage en cours change.

// 3. Enfin on retourne la valeur du state et la méthode pour l'update afin qu'ils soient disponnible dans le composant
//    qui utilise localement ce Hook
export function useLocalStorage<T>( key:string, initialValue: T | (() => T) ) {

    const [ value, setValue ] = useState<T>(() => {

        const jsonValue = localStorage.getItem(key);
        if(jsonValue !== null) {
            return JSON.parse(jsonValue);
        }

        if(typeof initialValue  === "function"){
            return (initialValue as () => T)
        }
        else {
            return initialValue;
        }
    });

    useEffect(() => {

        localStorage.setItem(key, JSON.stringify(value))
    },[key,value])

    return [value, setValue] as [typeof value, typeof setValue]

}