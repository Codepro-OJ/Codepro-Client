const fs = require('node:fs/promises');
const path = require('node:path');

function publicPage(bank, query = {}) {
  if (query.difficulty) throw new Error('Bộ lọc độ khó cần kết nối máy chủ.');
  const q = String(query.q || '').trim().toLocaleLowerCase();
  const tag = String(query.tag || '').trim();
  const page = Math.max(1, Number.parseInt(query.page, 10) || 1);
  const pageSize = Math.min(1000, Math.max(1, Number.parseInt(query.page_size, 10) || 500));
  const objects = bank.objects.filter(item =>
    (!q || `${item.code} ${item.name}`.toLocaleLowerCase().includes(q)) &&
    (!tag || item.types?.some(type => (typeof type === 'string' ? type : type.name) === tag))
  );
  return {
    current_page: page, page_size: pageSize, total_objects: objects.length,
    total_pages: Math.max(1, Math.ceil(objects.length / pageSize)),
    has_more: page * pageSize < objects.length,
    objects: objects.slice((page - 1) * pageSize, page * pageSize),
    offline: true
  };
}

async function readBank(file, origin) {
  try {
    const bank = JSON.parse(await fs.readFile(file, 'utf8'));
    if (bank.version === 1 && bank.origin === origin && Array.isArray(bank.objects) &&
        bank.details && typeof bank.details === 'object') return bank;
  } catch { /* No complete public snapshot yet. */ }
  return null;
}

async function saveBank(file, bank) {
  await fs.mkdir(path.dirname(file), { recursive: true });
  const temporary = `${file}.${process.pid}.tmp`;
  try {
    await fs.writeFile(temporary, JSON.stringify(bank), { encoding: 'utf8', mode: 0o600 });
    await fs.rename(temporary, file);
  } finally {
    await fs.rm(temporary, { force: true });
  }
}

async function syncBank(file, origin, fetchPublic, progress = () => {}) {
  const objects = [];
  let page = 1;
  let totalPages = 1;
  let expectedCount = null;
  do {
    const data = await fetchPublic('problems', null, { page, page_size: 1000 });
    if (!Array.isArray(data?.objects) || !Number.isInteger(data.total_pages) || data.total_pages < page) {
      throw new Error('Danh sách bài công khai không hợp lệ.');
    }
    if (expectedCount === null) expectedCount = data.total_objects;
    objects.push(...data.objects);
    totalPages = data.total_pages;
    page++;
  } while (page <= totalPages);
  if (objects.length !== expectedCount || new Set(objects.map(item => item.code)).size !== objects.length) {
    throw new Error('Danh sách bài đã thay đổi trong khi đồng bộ. Vui lòng thử lại.');
  }

  const details = {};
  for (const [index, item] of objects.entries()) {
    if (!item || !/^[A-Za-z0-9_-]{1,64}$/.test(item.code) || item.is_public === false) {
      throw new Error('Danh sách bài công khai không hợp lệ.');
    }
    const data = await fetchPublic('problem', item.code);
    if (!data?.object || data.object.code !== item.code || data.object.is_public === false) {
      throw new Error(`Không tải được đề công khai ${item.code}.`);
    }
    details[item.code] = data.object;
    progress({ current: index + 1, total: objects.length });
  }
  const bank = { version: 1, origin, updatedAt: new Date().toISOString(), objects, details };
  await saveBank(file, bank);
  return { count: objects.length, updatedAt: bank.updatedAt };
}

module.exports = { publicPage, readBank, syncBank };
