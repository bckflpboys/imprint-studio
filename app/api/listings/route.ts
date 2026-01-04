import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { connectToDB } from '@/libs/mongoose';
import Listing, { IListing } from '@/models/Listing';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/auth/[...nextauth]/auth.config';
import { uploadToCloudinary } from '@/libs/cloudinary';
import slugify from 'slugify';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    console.log('=== API Route Debug ===');
    console.log('Session:', JSON.stringify(session, null, 2));
    console.log('Has user:', !!session?.user);
    console.log('User ID:', session?.user?.id);
    console.log('======================');

    if (!session?.user) {
      console.error('No session found - User not authenticated');
      return NextResponse.json(
        { error: 'Unauthorized. Please log in to create a listing.' },
        { status: 401 }
      );
    }

    // Connect to database
    await connectToDB();

    const formData = await request.formData();
    const body = Object.fromEntries(formData.entries());

    // Validate required fields
    const requiredFields = ['name', 'category', 'description', 'address', 'phone', 'email'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        );
      }
    }

    // Generate slug from name
    let slug = slugify(body.name as string, { lower: true, strict: true });

    // Check if slug exists and append random string if it does
    const existingListing = await Listing.findOne({ slug });
    if (existingListing) {
      slug = `${slug}-${Date.now().toString().slice(-6)}`;
    }

    const listingData: any = {
      name: body.name,
      slug,
      category: body.category,
      description: body.description,
      longDescription: body.longDescription,
      address: body.address,
      phone: body.phone,
      email: body.email,
      website: body.website,
      featured: body.featured === 'true',
      verified: body.verified === 'true',
      userId: session.user.id || session.user.email,
      tags: body.tags ? JSON.parse(body.tags as string) : [],
      services: body.services ? JSON.parse(body.services as string) : [],
      hours: body.hours ? JSON.parse(body.hours as string) : {},
      coordinates: body.coordinates ? JSON.parse(body.coordinates as string) : {},
    };

    const newListing = new Listing(listingData);
    const savedListing: IListing = await newListing.save();
    const listingId = (savedListing._id as any).toString();
    const listingNameSlug = slug; // Use the generated slug for consistency

    const image = formData.get('image') as File;
    if (image) {
      const imageBuffer = Buffer.from(await image.arrayBuffer());
      const imageName = `main-${Date.now()}`;
      const result: any = await uploadToCloudinary(
        imageBuffer,
        `mmid/listings/${listingId}-${listingNameSlug}`,
        imageName
      );
      savedListing.image = result.secure_url;
    }

    const galleryImages = formData.getAll('gallery') as File[];
    if (galleryImages.length > 0) {
      const galleryUrls = [];
      for (let i = 0; i < galleryImages.length; i++) {
        const file = galleryImages[i];
        const imageBuffer = Buffer.from(await file.arrayBuffer());
        const imageName = `gallery-${Date.now()}-${i}`;
        const result: any = await uploadToCloudinary(
          imageBuffer,
          `mmid/listings/${listingId}-${listingNameSlug}`,
          imageName
        );
        galleryUrls.push(result.secure_url);
      }
      savedListing.gallery = galleryUrls;
    }

    await savedListing.save();

    const listing = savedListing;

    return NextResponse.json(
      {
        message: 'Listing created successfully',
        listing: {
          ...listing.toObject(),
          slug: listing.slug,
          id: (listing as any)._id.toString()
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating listing:', error);

    // Handle validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((err: any) => err.message);
      return NextResponse.json(
        { error: 'Validation error', details: messages },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to create listing. Please try again.' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    await connectToDB();

    // Get query parameters for filtering
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    const verified = searchParams.get('verified');
    const limit = parseInt(searchParams.get('limit') || '10');
    const page = parseInt(searchParams.get('page') || '1');

    // Build filter object
    const filter: any = {};
    if (category) filter.category = category;
    if (featured === 'true') filter.featured = true;
    if (verified === 'true') filter.verified = true;

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Fetch listings
    const listings = await Listing.find(filter)
      .limit(limit)
      .skip(skip)
      .sort({ createdAt: -1 });

    // Get total count for pagination
    const total = await Listing.countDocuments(filter);

    return NextResponse.json(
      {
        listings,
        pagination: {
          total,
          page,
          limit,
          pages: Math.ceil(total / limit),
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error fetching listings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch listings' },
      { status: 500 }
    );
  }
}
