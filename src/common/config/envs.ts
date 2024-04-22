// Importa las bibliotecas dotenv y joi
import * as dotenv from 'dotenv';
import * as joi from 'joi';

// Carga las variables de entorno desde el archivo .env
dotenv.config();

// Define el esquema de validación para las variables de entorno
const envVarsSchema = joi.object({
    PORT: joi.number().required(),
    NATS_SERVERS: joi.array().items(joi.string())
        // Indica que la URL de NATS es obligatoria
        .required(),
    
}).unknown(true);

// Valida las variables de entorno utilizando el esquema definido
const { error, value: envVars } = envVarsSchema.validate({
    ...process.env,
    NATS_SERVERS: process.env.NATS_SERVERS?.split(',')
});

// Si hay algún error de validación, lanza una excepción
if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

// Exporta las variables de entorno validadas
export default envVars;
