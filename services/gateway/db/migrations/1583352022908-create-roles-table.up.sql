-- Your migration code here.
create table roles (
  id uuid primary key default uuid_generate_v4,
  name text not null,
  created_at timestamp default current_timestamp
);

-- Create basic roles.
insert into roles (name)
  values
    ('admin')
    ('user');

create table user_roles (
  user_id uuid not null,
  role_id uuid not null references roles(id),
  created_at timestamp default current_timestamp,
  primary key(user_id, role_id)
);
