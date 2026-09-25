// prisma/seed.js — Seed database dari data JSON yang ada (SWA Digital Solusindo)
// Jalankan: npx prisma db seed

'use strict';

const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed SWA Digital Solusindo...');

  // ─────────────────────────────────────────────
  // 1. ADMIN CONFIG
  // ─────────────────────────────────────────────
  let adminJson = { username: 'admin', password: 'swa123', siteName: 'SWA Digital Solusindo CMS' };
  try {
    const raw = fs.readFileSync(path.join(__dirname, '../data/auth.json'), 'utf8');
    const parsed = JSON.parse(raw);
    if (parsed.username) adminJson.username = parsed.username;
    if (parsed.password) adminJson.password = parsed.password;
  } catch (e) {}

  const passwordHash = await bcrypt.hash(adminJson.password || 'swa123', 10);

  await prisma.adminConfig.upsert({
    where: { username: adminJson.username || 'admin' },
    update: { passwordHash, siteName: adminJson.siteName || 'SWA Digital Solusindo CMS' },
    create: {
      username: adminJson.username || 'admin',
      passwordHash,
      siteName: adminJson.siteName || 'SWA Digital Solusindo CMS',
    },
  });
  console.log('✅ AdminConfig seeded for username:', adminJson.username);

  // ─────────────────────────────────────────────
  // 2. SITE CONTENT (Default customizable data)
  // ─────────────────────────────────────────────
  let contentData = {};
  try {
    const raw = fs.readFileSync(path.join(__dirname, '../data/content.json'), 'utf8');
    contentData = JSON.parse(raw);
  } catch (e) {
    console.warn('Could not read data/content.json, using empty object');
  }

  await prisma.siteContent.upsert({
    where: { key: 'main' },
    update: { data: contentData },
    create: { key: 'main', data: contentData },
  });
  console.log('✅ SiteContent seeded from data/content.json');

  console.log('\n🎉 Seed SWA selesai dengan sukses!');
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
