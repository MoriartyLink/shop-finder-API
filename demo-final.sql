-- Clear existing data
DELETE FROM userconnection;
DELETE FROM postcomments;
DELETE FROM userpost;
DELETE FROM shoppost;
DELETE FROM shop_service;
DELETE FROM admin;
DELETE FROM "user";

-- Test Users
INSERT INTO "user" (username, email, password_hash, phone_number, created_at) VALUES
('john_doe', 'john@example.com', '$2b$10$wUOYoCdsj7jnEbsXPvXoTODYN.Iw45U70kFF2FRrZyQGuC4vuqVii', '+1234567890', NOW()),
('jane_smith', 'jane@example.com', '$2b$10$wUOYoCdsj7jnEbsXPvXoTODYN.Iw45U70kFF2FRrZyQGuC4vuqVii', '+0987654321', NOW()),
('admin_user', 'admin@lbdp.com', '$2b$10$buTpA3AQY/D1n0Es8CnBgeY48Xq8a8McLHJbtkUt1Sq9sG5WTgdOe', '+1122334455', NOW()),
('shop_owner1', 'owner1@shop.com', '$2b$10$wUOYoCdsj7jnEbsXPvXoTODYN.Iw45U70kFF2FRrZyQGuC4vuqVii', '+5566778899', NOW()),
('shop_owner2', 'owner2@shop.com', '$2b$10$wUOYoCdsj7jnEbsXPvXoTODYN.Iw45U70kFF2FRrZyQGuC4vuqVii', '+9988776655', NOW());

-- Admin Users
INSERT INTO admin (admin_name, email, password, privilege_level, status, created_by_admin_id) VALUES
('Super Admin', 'admin@lbdp.com', '$2b$10$buTpA3AQY/D1n0Es8CnBgeY48Xq8a8McLHJbtkUt1Sq9sG5WTgdOe', 'SUPER', 'ACTIVE', NULL),
('Moderator', 'mod@lbdp.com', '$2b$10$wUOYoCdsj7jnEbsXPvXoTODYN.Iw45U70kFF2FRrZyQGuC4vuqVii', 'MODERATOR', 'ACTIVE', 1);

-- Test Shops in Mandalay, Myanmar
INSERT INTO shop_service (name, address, phone_number, description, monthly_fee_paid, created_at) VALUES
('Mandalay Coffee House', '84th Street, Between 26th & 27th, Mandalay', '+959234567890', 'Traditional Myanmar coffee with local beans', true, NOW()),
('Shwe Noodle Shop', '35th Street, Chan Aye Thar Zan, Mandalay', '+959345678901', 'Authentic Mandalay noodles and Shan cuisine', false, NOW()),
('Royal Tea Garden', 'Pyin Oo Lwin Road, Mandalay', '+959456789012', 'Premium tea house with garden seating', true, NOW()),
('Mandalay BBQ Palace', 'Mahar Aung Myay Township, Mandalay', '+959567890123', 'Grilled meats and local BBQ specialties', false, NOW()),
('Golden Pagoda Restaurant', 'Near Mahamuni Buddha, Mandalay', '+959678901234', 'Traditional Myanmar dishes with temple view', true, NOW());

-- Test Posts (userpost table structure)
INSERT INTO userpost (user_id, content, hashtag, shop_id, created_at) VALUES
(1, 'Amazing coffee at Mandalay Coffee House! The atmosphere is perfect for morning meetings ☕', '#coffee', 1, NOW()),
(2, 'Shwe Noodle Shop has 20% off on all Shan noodles today only! 🍜', '#promotion', 2, NOW()),
(3, 'Just had the best BBQ at Mandalay BBQ Palace. Highly recommend the grilled chicken! 🍗', '#food', 4, NOW()),
(1, 'Royal Tea Garden now open until 10 PM for evening tea service!', '#announcement', 3, NOW()),
(4, 'Golden Pagoda Restaurant has the best view of Mahamuni Buddha during sunset! 🛕', '#mandalay', 5, NOW());

-- User Connections
INSERT INTO userconnection (follower_id, following_id, created_at) VALUES
(1, 2, NOW()),
(1, 3, NOW()),
(2, 1, NOW()),
(2, 4, NOW()),
(3, 1, NOW()),
(3, 5, NOW()),
(4, 2, NOW()),
(5, 3, NOW());

-- Post Comments (postcomments table uses view_timestamp)
INSERT INTO postcomments (user_id, post_id, view_timestamp) VALUES
(2, 1, NOW()),
(3, 1, NOW()),
(1, 2, NOW()),
(4, 3, NOW()),
(5, 4, NOW());

-- More Test Users
INSERT INTO "user" (username, email, password_hash, created_at)
SELECT 
    'user_' || generate_series,
    'user' || generate_series || '@test.com',
    '$2b$10$wUOYoCdsj7jnEbsXPvXoTODYN.Iw45U70kFF2FRrZyQGuC4vuqVii',
    NOW()
FROM generate_series(6, 50);

-- More Test Posts
INSERT INTO userpost (user_id, content, hashtag, shop_id, created_at)
SELECT 
    (random() * 50)::integer + 1,
    'Test post content ' || generate_series,
    '#test',
    (random() * 5)::integer + 1,
    NOW()
FROM generate_series(6, 100);

-- Login Credentials:
-- admin@lbdp.com / admin123 (Super Admin)
-- john@example.com / password123 (Regular User)
-- jane@example.com / password123 (Regular User)
