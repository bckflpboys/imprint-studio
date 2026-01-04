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
                { error: 'Unauthorized. Please log in.' },
                { status: 401 }
            );
        }

        await connectToDB();

        const { id } = params;

        // Find and delete the listing
        const deletedListing = await Listing.findByIdAndDelete(id);

        if (!deletedListing) {
            return NextResponse.json(
                { error: 'Listing not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            {
                message: 'Listing deleted successfully',
                listing: deletedListing,
            },
            { status: 200 }
        );
    } catch (error: any) {
        console.error('Error deleting listing:', error);
        return NextResponse.json(
            { error: 'Failed to delete listing' },
            { status: 500 }
        );
    }
}

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user) {
            return NextResponse.json(
                { error: 'Unauthorized. Please log in.' },
                { status: 401 }
            );
        }

        await connectToDB();

        const { id } = params;

        // Find the listing
        const listing = await Listing.findById(id);

        if (!listing) {
            return NextResponse.json(
                { error: 'Listing not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            {
                listing,
            },
            { status: 200 }
        );
    } catch (error: any) {
        console.error('Error fetching listing:', error);
        return NextResponse.json(
            { error: 'Failed to fetch listing' },
            { status: 500 }
        );
    }
}

export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user) {
            return NextResponse.json(
                { error: 'Unauthorized. Please log in.' },
                { status: 401 }
            );
        }

        await connectToDB();

        const { id } = params;
        const body = await request.json();

        // Update the listing
        const updatedListing = await Listing.findByIdAndUpdate(
            id,
            { $set: body },
            { new: true, runValidators: true }
        );

        if (!updatedListing) {
            return NextResponse.json(
                { error: 'Listing not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            {
                message: 'Listing updated successfully',
                listing: updatedListing,
            },
            { status: 200 }
        );
    } catch (error: any) {
        console.error('Error updating listing:', error);
        return NextResponse.json(
            { error: 'Failed to update listing' },
            { status: 500 }
        );
    }
}
