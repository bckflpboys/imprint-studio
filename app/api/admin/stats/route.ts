import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/auth/[...nextauth]/auth.config';
import { connectToDB } from '@/libs/mongoose';
import Listing from '@/models/Listing';
import User from '@/models/User';

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

        // Get stats
        const [totalUsers, totalListings, featuredListings, verifiedListings, pendingListings] = await Promise.all([
            User.countDocuments(),
            Listing.countDocuments(),
            Listing.countDocuments({ featured: true }),
            Listing.countDocuments({ verified: true }),
            Listing.countDocuments({ verified: false })
        ]);

        return NextResponse.json({
            totalUsers,
            totalListings,
            featuredListings,
            verifiedListings,
            pendingListings
        });
    } catch (error: any) {
        console.error('Error fetching admin stats:', error);
        return NextResponse.json(
            { error: 'Failed to fetch stats' },
            { status: 500 }
        );
    }
}
