#!/usr/bin/env tsx

/**
 * Custom build script that runs pre-build tasks and then vercel build
 * This creates .vercel/output directory needed for next-on-pages --skip-build
 */

import { spawn } from 'child_process';
import { existsSync } from 'fs';
import path from 'path';

async function runCommand(command: string, args: string[]): Promise<void> {
  return new Promise((resolve, reject) => {
    console.log(`🚀 Running: ${command} ${args.join(' ')}`);

    const child = spawn(command, args, {
      stdio: 'inherit',
      shell: true,
    });

    child.on('close', (code) => {
      if (code !== 0) {
        reject(new Error(`${command} exited with code ${code}`));
      } else {
        resolve();
      }
    });
  });
}

async function main() {
  try {
    console.log('📦 Starting optimized build process...\n');

    // 1. Run pre-build script
    console.log('1️⃣  Running pre-build script...');
    await runCommand('npm', ['run', 'pre-build']);
    console.log('✅ Pre-build completed\n');

    // 2. Set environment variable
    console.log('2️⃣  Setting environment variables...');
    if (process.env.CF_PAGES_URL) {
      const fs = await import('fs');
      fs.writeFileSync('.env.production', `NEXT_PUBLIC_BASE_URL=${process.env.CF_PAGES_URL}\n`);
      console.log(`   NEXT_PUBLIC_BASE_URL=${process.env.CF_PAGES_URL}`);
    }
    console.log('✅ Environment variables set\n');

    // 3. Run vercel build (which includes next build internally)
    console.log('3️⃣  Running vercel build...');
    await runCommand('npx', ['vercel', 'build', '--prod']);
    console.log('✅ Vercel build completed\n');

    // 4. Check if .vercel/output exists
    const outputDir = path.join(process.cwd(), '.vercel', 'output');
    if (!existsSync(outputDir)) {
      throw new Error('.vercel/output directory was not created');
    }

    // 5. Run next-sitemap
    console.log('4️⃣  Generating sitemap...');
    await runCommand('npx', ['next-sitemap']);
    console.log('✅ Sitemap generated\n');

    console.log('🎉 Build process completed successfully!');
    console.log('📁 Output directory: .vercel/output');
    console.log('Next step: Run "npx next-on-pages --skip-build"');

  } catch (error) {
    console.error('❌ Build failed:', error);
    process.exit(1);
  }
}

main();