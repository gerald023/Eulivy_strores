import cloudnary from 'cloudinary';
import dotenv from 'dotenv';


cloudnary.v2.config({
    cloud_name: process.env.CLOUDNARY_CLOUD_NAME,
    api_key: process.env.CLOUDNARY_API_KEY,
    api_secret: process.env.CLOUDNARY_API_SECRET
})

export default cloudnary.v2;