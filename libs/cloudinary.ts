import { v2 as cloudinary } from 'cloudinary';

// Debug environment variables
console.log('Cloudinary Environment Variables:', {
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'not set',
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY || 'not set',
  api_secret: process.env.CLOUDINARY_API_SECRET ? '***' : 'not set'
});

if (!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || !process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
  throw new Error('Cloudinary environment variables are not properly configured');
}

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadToCloudinary = (
  file: Buffer,
  folder: string,
  fileName: string
) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder: folder,
          public_id: fileName,
          resource_type: 'auto',
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      )
      .end(file);
  });
};

export default cloudinary;