import mongoose, { Document } from 'mongoose';

interface IBlog extends Document {
  blogId: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  readingTime: string;
  tags: string[];
  author: string;
  userId: string;
  isBanner: boolean;
  isFeatured: boolean;
  isMusicFeatured: boolean;
  isMusicBanner: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const blogSchema = new mongoose.Schema<IBlog>({
  blogId: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
    index: true, // Add index for search
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  excerpt: {
    type: String,
    required: [true, 'Summary preview is required'],
  },
  content: {
    type: String,
    required: [true, 'Content is required'],
  },
  coverImage: {
    type: String,
    required: [true, 'Cover image is required'],
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    index: true, // Add index for filtering
  },
  readingTime: {
    type: String,
    required: true,
  },
  tags: [{
    type: String,
  }],
  author: {
    type: String,
    required: [true, 'Author is required'],
  },
  userId: {
    type: String,
    required: [true, 'User ID is required'],
    index: true,
  },
  isBanner: {
    type: Boolean,
    default: false,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  isMusicFeatured: {
    type: Boolean,
    default: false,
  },
  isMusicBanner: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  }
}, {
  timestamps: true,
  strict: true,
  validateBeforeSave: true,
});

// Ensure boolean fields are properly set before saving
blogSchema.pre('save', function(next) {
  if (typeof this.isBanner !== 'undefined') {
    this.isBanner = Boolean(this.isBanner);
  }
  if (typeof this.isFeatured !== 'undefined') {
    this.isFeatured = Boolean(this.isFeatured);
  }
  if (typeof this.isMusicFeatured !== 'undefined') {
    this.isMusicFeatured = Boolean(this.isMusicFeatured);
  }
  if (typeof this.isMusicBanner !== 'undefined') {
    this.isMusicBanner = Boolean(this.isMusicBanner);
  }
  next();
});

// Generate slug from title
blogSchema.pre('save', function(next) {
  if (this.isModified('title')) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  next();
});

// Add a method to properly serialize the document
blogSchema.methods.toJSON = function() {
  const obj = this.toObject();
  obj.isBanner = Boolean(obj.isBanner);
  obj.isFeatured = Boolean(obj.isFeatured);
  obj.isMusicFeatured = Boolean(obj.isMusicFeatured);
  obj.isMusicBanner = Boolean(obj.isMusicBanner);
  return obj;
};

const Blog = mongoose.models.Blog as mongoose.Model<IBlog> || mongoose.model<IBlog>('Blog', blogSchema);

export default Blog;