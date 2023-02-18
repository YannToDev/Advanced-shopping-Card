// ---- Méthode utilitaire qui permet de retourner le bon format pour le prix afficher dans notre application.
// on doit simplement spécifier qu'on est en europe ou "USD" pour obtenir des dollars.

const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined,{currency:"EUR", style:'currency'})

export function formatCurrency(number:number){

    return CURRENCY_FORMATTER.format(number);
};