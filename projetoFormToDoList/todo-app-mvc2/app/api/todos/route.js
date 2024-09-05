import { getTodos, createTodo } from "@/controllers/TodoController";
import { NextResponse } from "next/server";
import { Suspense } from "react";

export async function GET(){
    try{
    const todos = await getTodos();
    return NextResponse.json({ success: true, data: todos});
    }catch(error){
        return NextResponse.json({ success: false }, { status: 400 });

    }
}
export async function POST(req) {
    try {
      const data = await req.json();
      const todo = await createTodo(data);
      return NextResponse.json({ success: true, data: todo });
    } catch (error) {
      return NextResponse.json({ success: false }, { status: 400 });
    }
  }