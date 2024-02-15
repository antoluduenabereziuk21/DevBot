const dayjs = require('dayjs')
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');
const isBetween = require('dayjs/plugin/isBetween');
let customParseFormat = require('dayjs/plugin/customParseFormat');
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isBetween);
dayjs.extend(customParseFormat);
const randomGreeting = () => {
    // Crea un objeto con las variantes de hora y saludos
    const saludos = {
        "06:00-12:00": ["*Buenos Días*", "*Buenos Días* 🌤","*¡Hola, buen día!* 🌞","*Saludos matutinos* ☀️"],
        "12:00-18:00": ["*Saludos vespertinos* 🌅","*Buenas Tardes*", "*Buenas Tardes* ⛅"],
        "18:00-23:59": ["*Hora de relajarse*, *¡Buenas Noches!* 🌌","*Buenas Noches*", "*Buenas Noches* 🌚","*¡Buenas noches!* 🌙"],
        "00:00-06:00": ["*El que madruga Dios lo ayuda*", "*Buena Amanecida* ☕"],
    };

    // Función para obtener la hora local del sistema o la hora peruana
    const getLocalTime = () => {
        const systemTime = dayjs.utc();
        if (systemTime.isValid()) {
            return systemTime.tz('America/Lima');
        } else {
            return dayjs().tz('America/Lima');
        }
    };

    const horaActual = getLocalTime();
    let saludo;

    for (let clave in saludos) {
        let rangoHorario = clave.split("-");
        let horaInicio = dayjs(rangoHorario[0], 'HH:mm');
        let horaFin = dayjs(rangoHorario[1], 'HH:mm');
        if (horaActual.isBetween(horaInicio, horaFin)) {
            saludo = saludos[clave];
            break;
        }
    }
    console.log(saludo);
    return saludo;
};
const greetingUtil = () =>{
    return [
        ` Soy *MaiviBot* ,soy un *bot de consulta* en desarrollo , por favor sea paciente conmigo 😅
          \nFui *creada para AYUDAR a los usuarios* a encontrar su *CENTRO DE SALUD* donde deberian atenderse.`,
        `¡Hola! Soy *MaiviBot*, tu guía para encontrar el centro de salud adecuado. Estoy en desarrollo, pero estoy aquí para ayudarte. 😊`,
        `¡Hola! Soy *MaiviBot*, tu asistente virtual. Estoy aquí para ayudarte a encontrar el centro de salud que necesitas. 😊`,
            `¡Hola! ¿Necesitas ayuda para encontrar un centro de salud? *MaiviBot* está a tu servicio. 😊`,
        `¡Encantada de conocerte! Soy *MaiviBot* 💁🏼‍♀️, un bot de consulta en desarrollo que te ayudará a encontrar el centro de salud que necesitas.`,
            `¡Hola! No pierdas tiempo buscando un centro de salud, deja que *MaiviBot* lo haga por ti. ⏱️`,
        `¡Hola! Soy *MaiviBot*, tu bot de consulta para la salud. Estoy en desarrollo, pero estoy aprendiendo cada día para poder ayudarte mejor.🤩`
    ]
}

module.exports = {randomGreeting,greetingUtil};