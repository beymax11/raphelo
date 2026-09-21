-- ==============================================================================
-- RAPHÈLO Luxury Fragrance House — Supabase Database Schema & Initial Seed
-- ==============================================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. PROFILES / USERS
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  first_name text,
  last_name text,
  email text unique not null,
  phone text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. PRODUCTS
create table if not exists public.products (
  id uuid default uuid_generate_v4() primary key,
  slug text unique not null,
  name text not null,
  subtitle text not null,
  description text not null,
  family text not null,
  atmosphere text not null,
  price numeric(10, 2) not null,
  compare_at_price numeric(10, 2),
  inventory integer default 100 not null,
  is_new boolean default false,
  is_best_seller boolean default false,
  is_sale boolean default false,
  rating numeric(3, 2) default 5.0,
  review_count integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. PRODUCT IMAGES
create table if not exists public.product_images (
  id uuid default uuid_generate_v4() primary key,
  product_id uuid references public.products(id) on delete cascade not null,
  url text not null,
  alt text not null,
  display_order integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. FRAGRANCE NOTES
create table if not exists public.fragrance_notes (
  id uuid default uuid_generate_v4() primary key,
  product_id uuid references public.products(id) on delete cascade unique not null,
  top_notes text[] not null,
  heart_notes text[] not null,
  base_notes text[] not null
);

-- 5. COLLECTIONS
create table if not exists public.collections (
  id uuid default uuid_generate_v4() primary key,
  slug text unique not null,
  title text not null,
  description text not null,
  image_url text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table if not exists public.product_collections (
  product_id uuid references public.products(id) on delete cascade,
  collection_id uuid references public.collections(id) on delete cascade,
  primary key (product_id, collection_id)
);

-- 6. CATEGORIES
create table if not exists public.categories (
  id uuid default uuid_generate_v4() primary key,
  slug text unique not null,
  name text not null,
  description text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table if not exists public.product_categories (
  product_id uuid references public.products(id) on delete cascade,
  category_id uuid references public.categories(id) on delete cascade,
  primary key (product_id, category_id)
);

-- 7. ORDERS & ORDER ITEMS
create table if not exists public.orders (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete set null,
  order_number text unique not null,
  email text not null,
  status text default 'processing' not null,
  subtotal numeric(10, 2) not null,
  shipping_cost numeric(10, 2) default 0.00 not null,
  total numeric(10, 2) not null,
  shipping_address jsonb not null,
  payment_status text default 'paid' not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table if not exists public.order_items (
  id uuid default uuid_generate_v4() primary key,
  order_id uuid references public.orders(id) on delete cascade not null,
  product_id uuid references public.products(id) on delete set null,
  product_name text not null,
  size text not null,
  quantity integer not null,
  price numeric(10, 2) not null,
  image_url text
);

-- 8. ADDRESSES
create table if not exists public.addresses (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  first_name text not null,
  last_name text not null,
  street text not null,
  apartment text,
  city text not null,
  province text not null,
  postal_code text not null,
  phone text,
  is_default boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 9. WISHLISTS & WISHLIST ITEMS
create table if not exists public.wishlists (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade unique not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table if not exists public.wishlist_items (
  id uuid default uuid_generate_v4() primary key,
  wishlist_id uuid references public.wishlists(id) on delete cascade not null,
  product_id uuid references public.products(id) on delete cascade not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(wishlist_id, product_id)
);

-- 10. REVIEWS
create table if not exists public.reviews (
  id uuid default uuid_generate_v4() primary key,
  product_id uuid references public.products(id) on delete cascade not null,
  author_name text not null,
  rating integer check (rating >= 1 and rating <= 5) not null,
  title text not null,
  comment text not null,
  verified_purchase boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 11. JOURNAL POSTS
create table if not exists public.journal_posts (
  id uuid default uuid_generate_v4() primary key,
  slug text unique not null,
  title text not null,
  category text not null,
  excerpt text not null,
  content text not null,
  image_url text not null,
  read_time text not null,
  published_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 12. NEWSLETTER SUBSCRIBERS
create table if not exists public.newsletter_subscribers (
  id uuid default uuid_generate_v4() primary key,
  email text unique not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ENABLE ROW LEVEL SECURITY
alter table public.profiles enable row level security;
alter table public.products enable row level security;
alter table public.product_images enable row level security;
alter table public.fragrance_notes enable row level security;
alter table public.collections enable row level security;
alter table public.categories enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.addresses enable row level security;
alter table public.wishlists enable row level security;
alter table public.wishlist_items enable row level security;
alter table public.reviews enable row level security;
alter table public.journal_posts enable row level security;
alter table public.newsletter_subscribers enable row level security;

-- PUBLIC READ POLICIES
create policy "Allow public read on products" on public.products for select using (true);
create policy "Allow public read on product_images" on public.product_images for select using (true);
create policy "Allow public read on fragrance_notes" on public.fragrance_notes for select using (true);
create policy "Allow public read on collections" on public.collections for select using (true);
create policy "Allow public read on categories" on public.categories for select using (true);
create policy "Allow public read on reviews" on public.reviews for select using (true);
create policy "Allow public read on journal_posts" on public.journal_posts for select using (true);

-- USER SPECIFIC POLICIES
create policy "Users can view and edit own profile" on public.profiles for all using (auth.uid() = id);
create policy "Users can view and edit own addresses" on public.addresses for all using (auth.uid() = user_id);
create policy "Users can view own orders" on public.orders for select using (auth.uid() = user_id);
create policy "Users can manage own wishlist" on public.wishlists for all using (auth.uid() = user_id);
create policy "Users can manage own wishlist items" on public.wishlist_items for all using (
  exists (select 1 from public.wishlists where wishlists.id = wishlist_items.wishlist_id and wishlists.user_id = auth.uid())
);

-- INSERT SEED DATA FOR RAPHÈLO CORE FRAGRANCES
insert into public.products (id, slug, name, subtitle, description, family, atmosphere, price, compare_at_price, is_new, is_best_seller, is_sale, rating, review_count)
values
  ('11111111-1111-1111-1111-111111111111', 'halo', 'HALO', 'Eau de Parfum', 'A luminous halo of crystalline iris, fresh white tea, and soft cashmere wood that lingers like clean morning light.', 'Musky Floral', 'Clean morning light.', 195.00, null, true, true, false, 4.9, 38),
  ('22222222-2222-2222-2222-222222222222', 'ember-veil', 'EMBER VEIL', 'Eau de Parfum', 'A warm and enveloping aura of pink pepper, rich saffron, and smoky amber, inspired by the quiet warmth after dusk.', 'Woody Amber', 'Warm light after sunset.', 210.00, null, false, true, false, 4.8, 42),
  ('33333333-3333-3333-3333-333333333333', 'still-room', 'STILL ROOM', 'Eau de Parfum', 'Fig leaf and powdery violet resting against dry cedarwood and intimate skin musk. The lingering stillness of a room after someone leaves.', 'Woody Musk', 'A quiet room after someone leaves.', 195.00, null, false, false, false, 4.9, 29),
  ('44444444-4444-4444-4444-444444444444', 'late-light', 'LATE LIGHT', 'Eau de Parfum', 'Golden mandarin and radiant jasmine steeped in comforting tonka bean and soft woods. The final slice of afternoon sunlight across plaster.', 'Amber Floral', 'The final sunlight entering a room.', 205.00, null, true, false, false, 4.7, 19),
  ('55555555-5555-5555-5555-555555555555', 'sable', 'SABLE', 'Eau de Parfum', 'Sharp black pepper, aromatic cardamom, and tactile leather accord anchored by dark cedar and dry amber. Tactile, shadowed, and profound.', 'Woody Spicy', 'Dark fabric and warm wood.', 220.00, null, false, false, false, 4.8, 31),
  ('66666666-6666-6666-6666-666666666666', 'after-rain', 'AFTER RAIN', 'Eau de Parfum', 'Crisp bergamot, mineral wet stones, and dewy crushed leaves grounded in earthy vetiver and damp green moss.', 'Fresh Woody', 'Wet pavement, cool air, and earth after rain.', 195.00, null, false, true, false, 4.9, 47),
  ('77777777-7777-7777-7777-777777777777', 'discovery-set', 'MEET RAPHÈLO', 'The Discovery Set (6 x 2ml)', 'Six fragrances. Six atmospheres. One introduction to the contemporary house of RAPHÈLO. Includes voucher towards full 100ml bottle.', 'Discovery', 'Six atmospheres. One introduction.', 45.00, null, true, true, false, 5.0, 84)
on conflict (slug) do nothing;

-- SEED FRAGRANCE NOTES
insert into public.fragrance_notes (product_id, top_notes, heart_notes, base_notes)
values
  ('11111111-1111-1111-1111-111111111111', array['Bergamot', 'White Tea'], array['Iris', 'Cashmere'], array['Soft Musk', 'Cashmere Wood']),
  ('22222222-2222-2222-2222-222222222222', array['Pink Pepper', 'Saffron'], array['Cedar', 'Incense'], array['Amber', 'Smoked Vanilla']),
  ('33333333-3333-3333-3333-333333333333', array['Fig Leaf'], array['Violet', 'Sandalwood'], array['Vetiver', 'Skin Musk']),
  ('44444444-4444-4444-4444-444444444444', array['Mandarin', 'Bergamot'], array['Jasmine', 'Benzoin'], array['Tonka', 'Soft Woods']),
  ('55555555-5555-5555-5555-555555555555', array['Black Pepper', 'Cardamom'], array['Leather Accord', 'Nutmeg'], array['Cedar', 'Dry Amber']),
  ('66666666-6666-6666-6666-666666666666', array['Bergamot', 'Green Leaves'], array['Mineral Accord', 'Violet Leaf'], array['Vetiver', 'Moss']),
  ('77777777-7777-7777-7777-777777777777', array['Halo', 'Ember Veil'], array['Still Room', 'Late Light'], array['Sable', 'After Rain'])
on conflict (product_id) do nothing;

-- SEED COLLECTIONS
insert into public.collections (id, slug, title, description, image_url)
values
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'core-collection', 'The Core Collection', 'Six definitive atmospheres capturing quiet confidence and memory.', '/images/products/halo.jpg'),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'discovery-collection', 'Discovery Collection', 'Curated samplers and miniature sets designed for sensory exploration.', '/images/products/discovery-set.jpg'),
  ('cccccccc-cccc-cccc-cccc-cccccccccccc', 'limited-editions', 'Limited Editions', 'Special extraits and seasonal small-batch releases.', '/images/products/sable.jpg'),
  ('dddddddd-dddd-dddd-dddd-dddddddddddd', 'seasonal-atmospheres', 'Seasonal Atmospheres', 'Scents curated for changing light, air, and temperament.', '/images/products/after-rain.jpg')
on conflict (slug) do nothing;
