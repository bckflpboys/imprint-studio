import mongoose, { Document } from 'mongoose';

export interface IListing extends Document {
  name: string;
  slug: string;
  category: string;
  description: string;
  longDescription: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  image: string;
  featured: boolean;
  verified: boolean;
  tags: string[];
  coordinates: {
    lat: number;
    lng: number;
  };
  hours: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };
  services: string[];
  gallery: string[];
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

const listingSchema = new mongoose.Schema<IListing>(
  {
    name: {
      type: String,
      required: [true, 'Business name is required'],
      index: true,
    },
    slug: {
      type: String,
      required: [true, 'Slug is required'],
      unique: true,
      index: true,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      index: true,
    },
    description: {
      type: String,
      required: [true, 'Short description is required'],
      maxlength: [200, 'Description cannot exceed 200 characters'],
    },
    longDescription: {
      type: String,
      default: '',
    },
    address: {
      type: String,
      required: [true, 'Address is required'],
      index: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email'],
    },
    website: {
      type: String,
      default: '',
    },
    image: {
      type: String,
      default: '',
    },
    featured: {
      type: Boolean,
      default: false,
      index: true,
    },
    verified: {
      type: Boolean,
      default: false,
      index: true,
    },
    tags: [
      {
        type: String,
      },
    ],
    coordinates: {
      lat: {
        type: Number,
        default: 0,
      },
      lng: {
        type: Number,
        default: 0,
      },
    },
    hours: {
      monday: {
        type: String,
        default: '09:00 - 17:00',
      },
      tuesday: {
        type: String,
        default: '09:00 - 17:00',
      },
      wednesday: {
        type: String,
        default: '09:00 - 17:00',
      },
      thursday: {
        type: String,
        default: '09:00 - 17:00',
      },
      friday: {
        type: String,
        default: '09:00 - 17:00',
      },
      saturday: {
        type: String,
        default: 'Closed',
      },
      sunday: {
        type: String,
        default: 'Closed',
      },
    },
    services: [
      {
        type: String,
      },
    ],
    gallery: [
      {
        type: String,
      },
    ],
    userId: {
      type: String,
      required: [true, 'User ID is required'],
      index: true,
    },
  },
  {
    timestamps: true,
    strict: true,
    validateBeforeSave: true,
  }
);

const Listing =
  (mongoose.models.Listing as mongoose.Model<IListing>) ||
  mongoose.model<IListing>('Listing', listingSchema);

export default Listing;
