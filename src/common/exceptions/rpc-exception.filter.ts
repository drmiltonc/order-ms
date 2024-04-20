// Importa las clases y decoradores necesarios de la biblioteca NestJS.
import { Catch, ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

// Define el filtro de excepciones personalizado para excepciones RPC.
@Catch(RpcException)
export class RpcCustomExceptionFilter implements ExceptionFilter {
  // Implementa el método 'catch' para manejar excepciones RPC.
  catch(exception: RpcException, host: ArgumentsHost) {
    // Obtiene el contexto HTTP de la solicitud.
    const ctx = host.switchToHttp();
    // Obtiene la respuesta HTTP.
    const res = ctx.getResponse();
    // Obtiene el error RPC.
    const rpcError = exception.getError();

    // Si el error RPC es un objeto con propiedades 'status' y 'message', devuelve el error con el código de estado correspondiente.
    if (typeof rpcError === 'object' && 'status' in rpcError && 'message' in rpcError) {
        const status = rpcError.status;
        return res.status(status).json(rpcError);
    }

    // De lo contrario, devuelve un error genérico con código de estado 400.
    res.status(400).json({
        status: 400,
        message: rpcError
    });
  }
}
