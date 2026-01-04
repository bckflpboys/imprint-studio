import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/auth/[...nextauth]/auth.config';
import { connectToDB } from '@/libs/mongoose';
import Listing from '@/models/Listing';

export async function PATCH(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
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

        const { id } = params;
        const body = await request.json();
        const { verified } = body;

        const updatedListing = await Listing.findByIdAndUpdate(
            id,
            { verified },
            { new: true }
        );

        if (!updatedListing) {
            return NextResponse.json(
                { error: 'Listing not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            message: 'Listing verified status updated',
            listing: updatedListing
        });
    } catch (error: any) {
        console.error('Error toggling verified:', error);
        return NextResponse.json(
            { error: 'Failed to update listing' },
            { status: 500 }
        );
    }
}
