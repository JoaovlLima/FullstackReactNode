import User from "@/models/User";
import connectMongo from "@/utils/dbConnect";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(request) {
  const { email, password } = await request.json();
  await connectMongo(); // Conectando ao MongoDB
  
  try {
    const user = await User.findOne({ email });

    if (user && (await user.comparePassword(password))) { // Certifique-se de que o método esteja correto
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });

      return NextResponse.json({ token });
    } else {
      return NextResponse.json({ success: false, message: 'Credenciais inválidas' }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Erro interno do servidor' }, { status: 500 });
  }
}
