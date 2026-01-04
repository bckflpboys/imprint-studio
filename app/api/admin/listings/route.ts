import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/auth/[...nextauth]/auth.config';
import { connectToDB } from '@/libs/mongoose';
import Listing from '@/models/Listing';

export async function GET(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        // Check for admin role
        if ((session.user as any).role !== 'admin') {
            return NextResponse.json({ error: 'Forbidden - Admin access required' }, { status: 403 });
        }

        await connectToDB();

        const listings = await Listing.find({})
            .sort({ createdAt: -1 })
            .lean();

        return NextResponse.json({ listings });
    } catch (error: any) {
        console.error('Error fetching listings:', error);
        return NextResponse.json(
            { error: 'Failed to fetch listings' },
            { status: 500 }
        );
    }
}
