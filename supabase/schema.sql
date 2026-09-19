create extension if not exists "pgcrypto";

create table if not exists mechanics (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  phone text not null,
  email text not null unique,
  business_name text,
  specialties text[] not null default '{}',
  service_radius_km numeric(6,2) not null default 10,
  latitude double precision,
  longitude double precision,
  service_type text not null default 'mobile',
  availability text not null default 'day',
  verified boolean not null default false,
  rating_average numeric(3,2) not null default 0,
  rating_count integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists jobs (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid,
  mechanic_id uuid not null references mechanics(id) on delete restrict,
  service_type text not null,
  status text not null default 'requested',
  customer_latitude double precision,
  customer_longitude double precision,
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  constraint jobs_status_check check (status in ('requested','accepted','on_the_way','arrived','diagnosing','repairing','completed','cancelled'))
);

create table if not exists mechanic_ratings (
  id uuid primary key default gen_random_uuid(),
  job_id uuid not null unique references jobs(id) on delete restrict,
  mechanic_id uuid not null references mechanics(id) on delete cascade,
  customer_id uuid,
  service_type text not null,
  rating integer not null check (rating between 1 and 5),
  review text,
  recommended boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists jobs_mechanic_status_idx on jobs(mechanic_id, status);
create index if not exists ratings_mechanic_idx on mechanic_ratings(mechanic_id, created_at desc);

create or replace function refresh_mechanic_rating()
returns trigger language plpgsql as $$
begin
  update mechanics
  set rating_average = coalesce((select round(avg(rating)::numeric, 2) from mechanic_ratings where mechanic_id = new.mechanic_id), 0),
      rating_count = coalesce((select count(*) from mechanic_ratings where mechanic_id = new.mechanic_id), 0)
  where id = new.mechanic_id;
  return new;
end;
$$;

drop trigger if exists mechanic_rating_refresh on mechanic_ratings;
create trigger mechanic_rating_refresh
after insert or update on mechanic_ratings
for each row execute function refresh_mechanic_rating();
