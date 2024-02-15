exports.isImage = (ctx) => {
    return !!(ctx.message?.imageMessage || ctx.message?.extendedTextMessage?.contextInfo?.quotedMessage?.imageMessage)
}
exports.isVideo = (ctx) => {
    return !!(ctx.message?.videoMessage || ctx.message?.extendedTextMessage?.contextInfo?.quotedMessage?.videoMessage)
}
exports.isAudio = (ctx) => {
    return !!(ctx.message?.audioMessage || ctx.message?.extendedTextMessage?.contextInfo?.quotedMessage?.audioMessage)
}
exports.isDocument = (ctx) => {
    return !!(ctx.message?.documentMessage || ctx.message?.extendedTextMessage?.contextInfo?.quotedMessage?.documentMessage)
}