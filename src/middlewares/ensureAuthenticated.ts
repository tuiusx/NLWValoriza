import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
    sub: string;
}

export function ensureAuthenticated(
    request: Request, 
    response: Response, 
    next: NextFunction
) {
    
    //Receber o token
    const authToken = request.headers.authorization;

    //Separando o Bearer do token
    const [, token] = authToken.split(" ")

    //Validar se o token está preenchido
    if(!authToken) {
        return response.status(401).end();
    }

    //Validar se token é válido
    try{
        const { sub } = verify(token, "8bcd94919f000c18342cbb288a317c90") as IPayload;

        // Recuperar as informações do usuário
        request.user_id = sub

        return next();
    }catch(err) {
        return response.status(401).end();
    }
}