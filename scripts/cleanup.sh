#!/bin/bash

# Remove node_modules
echo "Removing node_modules..."
rm -rf node_modules

# Remove Next.js build output
echo "Removing Next.js build files..."
rm -rf .next

# Remove any leftover build caches
echo "Removing build caches..."
rm -rf .cache

# Optional: Remove yarn.lock or package-lock.json
# echo "Removing package lock file..."
rm -f yarn.lock
rm -f package-lock.json
rm -rf .site
rm -rf public

echo "Cleanup complete!"
