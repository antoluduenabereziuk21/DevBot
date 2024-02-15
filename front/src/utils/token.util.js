const {jwtDecode} = require("jwt-decode");
const jwt = require('jsonwebtoken');
const dayjs = require('dayjs')
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');
const {JsonWebTokenError} = require("jsonwebtoken");
dayjs.extend(utc);
dayjs.extend(timezone);

function expiredToken(token) {
    const decoded = jwtDecode(token);
    const now = new Date();
    console.log("Fecha actual: ", now.getTime() / 1000);
    console.log("Fecha expiración: ", decoded.exp);
    return decoded.exp < now.getTime() / 1000;
}

const createSimpleToken = (data) => {
    const iat = dayjs().tz('America/Lima');
    const exp = iat.add(1, 'hours');
    const payload = {
        sub: data?.from,
        pushName: data?.pushName ?? data?.key?.remoteJid,
        iat: iat.unix(),
        exp: exp.unix(),
    };
    return jwt.sign(payload, process.env.JWT_SECRET);

}

const createToken = (user) => {
    const iat = dayjs().tz('America/Lima');
    const exp = iat.add(8, 'hours');
    const payload = {
        sub: user?.numDoc,
        name: user?.priNombre,
        lastname: `${user?.apePaterno} ${user?.apeMaterno}`,
        birthdate: user?.fecNacimiento,
        data: {
            hospital: user?.desCentro,
            address: user?.dirCentro
        },
        iat: iat.unix(),
        exp: exp.unix(),
    };
    return jwt.sign(payload, process.env.JWT_SECRET);
}

const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (e) {
        return false;
    }
}

module.exports = {expiredToken, createToken, verifyToken, createSimpleToken};