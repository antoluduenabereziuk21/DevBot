const formatText = (text) => {
    // Eliminar saltos de línea
    text = text.replace(/\r?\n|\r/g, '');
    // Eliminar espacios al principio y al final
    text = text.trim();
    // Eliminar caracteres especiales
    text = text.replace(/[!@#$%^&*(),.?":{}♠♦♣•◘○☺☻♥|<>]/g, '');
    // Eliminar emoticonos
    text = text.replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, '');
    text = text.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    text = text.replace(/\d/g, '');
    text = text.replace(/\t/g, '');
    return text

}

module.exports = {
    formatText
}