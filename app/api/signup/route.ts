import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/User';
import { connectToDB } from '@/libs/mongoose';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  await connectToDB();
  // Resolve the User model from the Promise
  const UserModel = await User;
  const { name, email, password } = await req.json();

  if (!name || !email || !password) {
    return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
  }

  // Check if user already exists
  const existing = await UserModel.findOne({ email });
  if (existing) {
    return NextResponse.json({ error: 'User already exists.' }, { status: 409 });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user
  const user = new UserModel({ name, email, password: hashedPassword });
  await user.save();

  return NextResponse.json({ message: 'User registered successfully.' }, { status: 201 });
}
