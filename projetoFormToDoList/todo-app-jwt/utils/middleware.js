import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export const jwtmiddleware = (handler) => async (request) => {
  const authorizationHeader = request.headers.get("authorization");
  const token = authorizationHeader?.split(" ")[1];

  if (!token) {
    return NextResponse.json({ message: "Token ausente ou inválido" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    request.user = decoded; // Armazena os dados do usuário no request
    return handler(request); // Continua para o próximo handler
  } catch (error) {
    return NextResponse.json({ message: "Token inválido" }, { status: 401 });
  }
};
