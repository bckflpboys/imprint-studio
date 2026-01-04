import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/auth/[...nextauth]/auth.config';
import { connectToDB } from '@/libs/mongoose';
import Listing from '@/models/Listing';

export async function DELETE(
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

        const deletedListing = await Listing.findByIdAndDelete(id);

        if (!deletedListing) {
            return NextResponse.json(
                { error: 'Listing not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            message: 'Listing deleted successfully',
            listing: deletedListing
        });
    } catch (error: any) {
        console.error('Error deleting listing:', error);
        return NextResponse.json(
            { error: 'Failed to delete listing' },
            { status: 500 }
        );
    }
}
