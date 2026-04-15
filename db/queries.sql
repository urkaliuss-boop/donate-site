INSERT INTO public.users (email, password_hash, username, role) 
VALUES (
    'player1@example.com', 
    '$2b$12$eImiTXuWVxfM37uY4JANjQ==',
    'New_Player', 
    'user'
)
RETURNING id;


SELECT id, email, password_hash, role 
FROM public.users 
WHERE email = 'player1@example.com' 
LIMIT 1;


INSERT INTO public.products (name, description, price_cents, category, duration_days)
VALUES ('PLATINUM PATRON', 'Набор PLATINUM PATRON — плашка «FUNCLUB PLATINUM PATRON» + бонус к XP +90%.', 35000, 'Наборы', 30)
RETURNING id;


INSERT INTO public.transactions (user_id, status, total_amount_cents, payment_method)
VALUES (
    (SELECT id FROM public.users WHERE email = 'player1@example.com'), 
    'pending', 
    35000, 
    'enot.io'
) RETURNING id;


INSERT INTO public.transaction_items (transaction_id, product_id, price_cents, quantity)
VALUES (
    (SELECT id FROM public.transactions WHERE status = 'pending' LIMIT 1),
    (SELECT id FROM public.products WHERE name = 'PLATINUM PATRON'),
    35000,
    1
);


UPDATE public.transactions 
SET status = 'completed', updated_at = NOW()
WHERE id = (SELECT id FROM public.transactions WHERE status = 'pending' LIMIT 1);


INSERT INTO public.user_purchases (user_id, product_id, transaction_id, starts_at, expires_at)
VALUES (
    (SELECT id FROM public.users WHERE email = 'player1@example.com'),
    (SELECT id FROM public.products WHERE name = 'PLATINUM PATRON'),
    (SELECT id FROM public.transactions WHERE status = 'completed' ORDER BY updated_at DESC LIMIT 1),
    NOW(),
    NOW() + INTERVAL '30 days'
);


SELECT 
    u.username,
    u.email,
    p.name AS product_name,
    up.starts_at,
    up.expires_at,
    up.is_active
FROM public.user_purchases up
JOIN public.users u ON up.user_id = u.id
JOIN public.products p ON up.product_id = p.id
WHERE u.email = 'player1@example.com' AND up.is_active = true AND up.expires_at > NOW();


SELECT 
    t.created_at,
    t.status,
    t.total_amount_cents / 100 as total_amount_rub,
    p.name AS product_name,
    ti.quantity
FROM public.transactions t
JOIN public.transaction_items ti ON t.id = ti.transaction_id
JOIN public.products p ON ti.product_id = p.id
JOIN public.users u ON t.user_id = u.id
WHERE u.email = 'player1@example.com'
ORDER BY t.created_at DESC;
