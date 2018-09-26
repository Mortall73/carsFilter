let expressions = {
    'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 
    'е': 'e', 'ё': 'e', 'ж': 'j', 'з': 'z', 'и': 'i', 
    'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o', 
    'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u', 
    'ф': 'f', 'х': 'h', 'ц': 'c', 'ч': 'ch', 'ш': 'sh', 
    'щ': 'shch', 'ы': 'y', 'э': 'e', 'ю': 'u', 'я': 'ya',
    
    'a': 'a', 'b': 'б', 'v': 'в', 'g': 'г', 'd': 'д',
    'е': 'e', 'j': 'ж', 'z': 'з', 'i': 'и',
    'k': 'к', 'l': 'л', 'm': 'м', 'n': 'н', 'о': 'o', 
    'p': 'п', 'r': 'р', 's': 'с', 't': 'т', 'u': 'у',
    'f': 'ф', 'h': 'х', 'c': 'ц', 'ch': 'ч', 'sh': 'ш', 
    'shch': 'щ', 'y': 'ы', 'e': 'э', 'u': 'ю', 'ya': 'я',
};
export default function cyrillicTransform(cyrillic_letter) {

    if(cyrillic_letter == '') return '';

    if ( cyrillic_letter.length > 0 && cyrillic_letter.length == 1 ) {

        if (expressions[cyrillic_letter] == undefined) return cyrillic_letter;

        return expressions[cyrillic_letter];
    } 

    if (cyrillic_letter.length > 1) {

        let letters = cyrillic_letter.split('');
        let result = [];

        letters.forEach(letter => {

            if(expressions[letter] == undefined) {
                result.push(letter); 
            } else {
                result.push(expressions[letter]);
            }

        });

        return result.join('');
    }
}