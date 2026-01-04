import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/User';
import { connectToDB } from '@/libs/mongoose';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  await connectToDB();
  // Resolve the User model from the Promise
  const UserModel = await User;
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 });
  }

  // Find user
  const user = await UserModel.findOne({ email }).select('+password');
  if (!user) {
    return NextResponse.json({ error: 'Invalid credentials.' }, { status: 401 });
  }

  // Compare passwords
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return NextResponse.json({ error: 'Invalid credentials.' }, { status: 401 });
  }

  // You can add JWT/session logic here
  return NextResponse.json({ message: 'Signin successful', user: { name: user.name, email: user.email, image: user.image } });
}
