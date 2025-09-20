// Test if we can use existing Next.js build with vercel build
const { execSync } = require('child_process');

// Check if vercel build can use existing .next directory
try {
  console.log('Testing vercel build with existing .next...');
  execSync('npx vercel build --help', { stdio: 'inherit' });
} catch (error) {
  console.error('Failed:', error.message);
}
