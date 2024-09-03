import dbConnect from '../../../../utils/dbConnect';
import User from '../../../../models/User';
import { NextResponse } from 'next/server';
import { signToken } from '../../../../utils/jwtUtils';


export async function POST(req) {
  await dbConnect();
  const { name, email, password } = await req.json();


  try {
    let user = await User.findOne({ email });
    if (user) {
      return NextResponse.json({ message: 'Usuário já existe.' }, { status: 400 });
    }


    user = new User({ name, email, password });
    await user.save();


    const token = signToken(user._id);


    return NextResponse.json({ token }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Erro ao registrar usuário.' }, { status: 500 });
  }
}
