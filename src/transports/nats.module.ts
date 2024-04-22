import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import envVars from 'src/common/config/envs';
import { NATS_SERVICE } from 'src/common/config/services';


@Module({
    imports: [
        // Registra el cliente para el servicio de productos utilizando el transporte TCP.
        ClientsModule.register([
            {
                // Asigna el nombre del servicio al cliente.
                name: NATS_SERVICE,

                // Establece el transporte como NATS.
                transport: Transport.NATS,

                // Establece las opciones de conexión para el cliente.
                options: {
                    servers: envVars.NATS_SERVERS,
                }
            },
        ]),
    ],
    exports: [
        // Registra el cliente para el servicio de productos utilizando el transporte TCP.
        ClientsModule.register([
            {
                // Asigna el nombre del servicio al cliente.
                name: NATS_SERVICE,

                // Establece el transporte como NATS.
                transport: Transport.NATS,

                // Establece las opciones de conexión para el cliente.
                options: {
                    servers: envVars.NATS_SERVERS,
                }
            },
        ]),
    ]
})
export class NatsModule {
}
