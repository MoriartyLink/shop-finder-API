-- 1. Setup Extensions
CREATE EXTENSION IF NOT EXISTS postgis;

-- 2. Drop existing tables if they exist (Careful: This wipes data)
DROP TABLE IF EXISTS public.post_photos CASCADE;
DROP TABLE IF EXISTS public.userpost CASCADE;
DROP TABLE IF EXISTS public.shop_service CASCADE;
DROP TABLE IF EXISTS public.user CASCADE;

-- 3. USER TABLE
-- Handles Consumers, Business Owners, and Platform Admins
CREATE TABLE public.user (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'Consumer', -- Options: 'Consumer', 'Business', 'Platform Admin'
    profile_pic_url TEXT,
    phone_number VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. SHOP_SERVICE TABLE
-- latest_paid_date replaces the old boolean flag for a 30-day window
CREATE TABLE public.shop_service (
    shop_id SERIAL PRIMARY KEY,
    owner_id INTEGER REFERENCES public.user(user_id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    address TEXT NOT NULL,
    lat DECIMAL(9,6),
    lon DECIMAL(9,6),
    category VARCHAR(100),
    open_end_time VARCHAR(100), -- Example: '9:00 AM - 5:00 PM'
    description TEXT,
    payment_slip_url TEXT, -- Admin checks this file
    latest_paid_date TIMESTAMP NULL, -- If NULL or >30 days, shop is hidden
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. USERPOST TABLE
-- The main post entity
CREATE TABLE public.userpost (
    post_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES public.user(user_id) ON DELETE CASCADE,
    shop_id INTEGER REFERENCES public.shop_service(shop_id) ON DELETE SET NULL,
    content TEXT NOT NULL,
    hashtag TEXT,
    post_type VARCHAR(50) NOT NULL, -- 'Business' or 'Consumer'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 6. POST_PHOTOS TABLE
-- Supports multiple photos per post
CREATE TABLE public.post_photos (
    photo_id SERIAL PRIMARY KEY,
    post_id INTEGER REFERENCES public.userpost(post_id) ON DELETE CASCADE,
    photo_url TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 7. INITIAL DATA (Admin & Sample Shop)
-- Password for admin is 'admin123' (Example Hash)
INSERT INTO public.user (username, email, password_hash, role) 
VALUES ('SuperAdmin', 'admin@findme.com', '$2b$10$7RGE6Lx9UfJ8mK18A8NOn.O6WjK38PjR1.6Vp.pW6.pW6.pW6.pW6', 'Platform Admin');

-- Indices for performance
CREATE INDEX idx_shop_location ON public.shop_service(lat, lon);
CREATE INDEX idx_user_email ON public.user(email);