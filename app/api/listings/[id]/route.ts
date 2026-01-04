import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/libs/mongoose';
import Listing from '@/models/Listing';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/auth/[...nextauth]/auth.config';
import mongoose from 'mongoose';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDB();

    const { id } = params;

    let listing;

    // Check if id is a valid MongoDB ObjectId
    if (mongoose.Types.ObjectId.isValid(id)) {
      listing = await Listing.findById(id);
    }

    // If not found by ID or invalid ID, try finding by slug
    if (!listing) {
      listing = await Listing.findOne({ slug: id });
    }

    if (!listing) {
      return NextResponse.json(
        { error: 'Listing not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(listing, { status: 200 });
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
    // Get user session
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Unauthorized. Please log in to update a listing.' },
        { status: 401 }
      );
    }

    await connectToDB();

    const { id } = params;

    // Parse request body
    const body = await request.json();

    // Find listing and verify ownership
    let listing;
    if (mongoose.Types.ObjectId.isValid(id)) {
      listing = await Listing.findById(id);
    }

    if (!listing) {
      listing = await Listing.findOne({ slug: id });
    }

    if (!listing) {
      return NextResponse.json(
        { error: 'Listing not found' },
        { status: 404 }
      );
    }

    // Check if user owns the listing
    if (listing.userId !== (session.user.id || session.user.email)) {
      return NextResponse.json(
        { error: 'You do not have permission to update this listing' },
        { status: 403 }
      );
    }

    // Update listing
    const updatedListing = await Listing.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    return NextResponse.json(
      {
        message: 'Listing updated successfully',
        listing: updatedListing,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error updating listing:', error);

    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((err: any) => err.message);
      return NextResponse.json(
        { error: 'Validation error', details: messages },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to update listing' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Get user session
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Unauthorized. Please log in to delete a listing.' },
        { status: 401 }
      );
    }

    await connectToDB();

    const { id } = params;

    // Find listing and verify ownership
    let listing;
    if (mongoose.Types.ObjectId.isValid(id)) {
      listing = await Listing.findById(id);
    }

    if (!listing) {
      listing = await Listing.findOne({ slug: id });
    }

    if (!listing) {
      return NextResponse.json(
        { error: 'Listing not found' },
        { status: 404 }
      );
    }

    // Check if user owns the listing
    if (listing.userId !== (session.user.id || session.user.email)) {
      return NextResponse.json(
        { error: 'You do not have permission to delete this listing' },
        { status: 403 }
      );
    }

    // Delete listing
    await Listing.findByIdAndDelete(id);

    return NextResponse.json(
      { message: 'Listing deleted successfully' },
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
