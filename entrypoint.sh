#!/bin/sh

# Tunggu sampai DB ready
until nc -z mysql_db 3306; do
  echo "Waiting for MySQL..."
  sleep 2
done

# Jalankan migration
npx prisma migrate deploy

# Jalankan aplikasi
npm run start

