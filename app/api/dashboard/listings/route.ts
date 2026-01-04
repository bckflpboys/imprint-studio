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
                { error: 'Unauthorized. Please log in.' },
                { status: 401 }
            );
        }

        await connectToDB();

        // Fetch all listings from the database
        const listings = await Listing.find({})
            .sort({ createdAt: -1 })
            .lean();

        return NextResponse.json(
            {
                listings,
                total: listings.length,
            },
            { status: 200 }
        );
    } catch (error: any) {
        console.error('Error fetching dashboard listings:', error);
        return NextResponse.json(
            { error: 'Failed to fetch listings' },
            { status: 500 }
        );
    }
}
