import { getTodos, addTodo, updateTodo, deleteTodo } from "@/controllers/TodoController";
import { jwtmiddleware } from "@/utils/middleware";
import { NextResponse } from "next/server";

// GET - Buscar todos os "todos"
export async function GET(request) {
  return jwtmiddleware(async (request) => {
    return await getTodos(request);
  })(request);
}

// POST - Adicionar novo "todo"
export async function POST(request) {
  return jwtmiddleware(async (request) => {
    return await addTodo(request);
  })(request);
}

// PUT - Atualizar um "todo"
export async function PUT(request) {
  return jwtmiddleware(async (request) => {
    return await updateTodo(request);
  })(request);
}

// DELETE - Deletar um "todo"
export async function DELETE(request) {
  return jwtmiddleware(async (request) => {
    return await deleteTodo(request);
  })(request);
}
