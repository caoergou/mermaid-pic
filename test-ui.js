const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const errors = [];
  page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
  page.on('pageerror', err => errors.push('PAGE ERROR: ' + err.message));

  await page.goto('http://localhost:8080', { waitUntil: 'networkidle', timeout: 15000 });
  await page.waitForTimeout(2000);

  // Close tour overlay if present
  const tourVisible = await page.$eval('#tour-overlay', el => el.style.display !== 'none').catch(() => false);
  if (tourVisible) {
    await page.click('#tour-skip', { force: true });
    await page.waitForTimeout(300);
  }

  // Check key elements exist
  const checks = [
    ['#btn-download-png', '导出PNG主按钮'],
    ['#export-dropdown-toggle', '导出下拉箭头'],
    ['#export-dropdown-menu', '导出菜单'],
    ['#btn-download-svg', '下载SVG按钮'],
    ['#btn-copy-png', '复制PNG按钮'],
    ['#export-bg-select', '导出背景选择'],
    ['#btn-share', '分享按钮'],
    ['#settings-toggle', '设置按钮'],
    ['#settings-menu', '设置菜单'],
    ['#theme-select', '主题选择'],
    ['#hand-drawn-btn', '手绘按钮'],
    ['#btn-copy-ai-prompt', 'AI提示词按钮'],
    ['a[href*="github.com/caoergou"]', 'GitHub链接'],
    ['#btn-help', '帮助按钮'],
    ['#ui-theme-toggle', '暗色模式按钮'],
    ['#btn-zoom-in', '放大按钮'],
    ['#btn-zoom-out', '缩小按钮'],
    ['#btn-zoom-reset', '重置视图'],
    ['#btn-bg-toggle', '棋盘格背景'],
    ['#mermaid-preview svg', 'Mermaid图表渲染'],
  ];

  console.log('=== 元素检查 ===');
  for (const [sel, name] of checks) {
    const el = await page.$(sel);
    console.log((el ? '✓' : '✗') + ' ' + name + ' (' + sel + ')');
  }

  // Test export dropdown toggle
  console.log('\n=== 交互测试 ===');
  await page.click('#export-dropdown-toggle');
  await page.waitForTimeout(200);
  const menuOpen = await page.$eval('#export-dropdown-menu', el => el.classList.contains('open'));
  console.log((menuOpen ? '✓' : '✗') + ' 点击箭头展开导出菜单');

  await page.click('body', { position: { x: 10, y: 10 } });
  await page.waitForTimeout(200);
  const menuClosed = await page.$eval('#export-dropdown-menu', el => !el.classList.contains('open'));
  console.log((menuClosed ? '✓' : '✗') + ' 点击外部关闭菜单');

  // Test settings toggle
  await page.click('#settings-toggle');
  await page.waitForTimeout(200);
  const settingsOpen = await page.$eval('#settings-menu', el => el.classList.contains('open'));
  console.log((settingsOpen ? '✓' : '✗') + ' 点击齿轮展开设置面板');

  // ── 分享链接测试 ──────────────────────────────────────────────────
  console.log('\n=== 分享链接测试 ===');

  // Click share button to open share menu
  await page.click('body', { position: { x: 10, y: 10 } }); // close settings first
  await page.waitForTimeout(200);
  await page.click('#btn-share');
  await page.waitForTimeout(300);

  const shareMenuVisible = await page.$eval('.share-menu', el => el.style.display !== 'none').catch(() => false);
  console.log((shareMenuVisible ? '✓' : '✗') + ' 点击分享按钮弹出菜单');

  // Click "分享链接" and check clipboard
  const shareContext = await browser.newContext({ permissions: ['clipboard-read', 'clipboard-write'] });
  const sharePage = await shareContext.newPage();
  const shareErrors = [];
  sharePage.on('pageerror', err => shareErrors.push(err.message));
  await sharePage.goto('http://localhost:8080', { waitUntil: 'networkidle', timeout: 15000 });
  await sharePage.waitForTimeout(2000);

  const tourVisible2 = await sharePage.$eval('#tour-overlay', el => el.style.display !== 'none').catch(() => false);
  if (tourVisible2) {
    await sharePage.click('#tour-skip', { force: true });
    await sharePage.waitForTimeout(300);
  }

  await sharePage.click('#btn-share');
  await sharePage.waitForTimeout(300);

  // Click share link button
  await sharePage.evaluate(() => {
    const btns = document.querySelectorAll('.share-menu button');
    if (btns[0]) btns[0].click();
  });
  await sharePage.waitForTimeout(500);

  const shareUrl = await sharePage.evaluate(() => navigator.clipboard.readText()).catch(() => null);
  const hasHash = shareUrl && shareUrl.includes('#');
  console.log((hasHash ? '✓' : '✗') + ' 分享链接包含 hash: ' + (shareUrl ? shareUrl.substring(0, 80) + '...' : 'null'));

  // ── embed.html 测试 ───────────────────────────────────────────────
  console.log('\n=== embed.html 测试 ===');

  if (shareUrl && hasHash) {
    // Build embed URL from share URL
    const hash = shareUrl.split('#')[1];
    const embedUrl = 'http://localhost:8080/embed.html#' + hash;
    console.log('embed URL: ' + embedUrl.substring(0, 80) + '...');

    const embedPage = await shareContext.newPage();
    const embedErrors = [];
    embedPage.on('pageerror', err => embedErrors.push(err.message));
    await embedPage.goto(embedUrl, { waitUntil: 'networkidle', timeout: 15000 });
    await embedPage.waitForTimeout(3000);

    const hasSvg = await embedPage.$('#diagram svg').catch(() => null);
    console.log((hasSvg ? '✓' : '✗') + ' embed.html 渲染出 SVG 图表');

    const hasToolbar = await embedPage.$('.toolbar').catch(() => null);
    console.log((!hasToolbar ? '✓' : '✗') + ' embed.html 无工具栏（纯预览）');

    const errorVisible = await embedPage.$eval('#error', el => el.style.display !== 'none').catch(() => false);
    console.log((!errorVisible ? '✓' : '✗') + ' embed.html 无错误信息');

    if (embedErrors.length > 0) {
      console.log('embed.html JS错误:');
      embedErrors.forEach(e => console.log('  ' + e));
    }

    await embedPage.close();
  } else {
    console.log('✗ 无法获取分享链接，跳过 embed.html 测试');
  }

  await shareContext.close();

  if (errors.length > 0) {
    console.log('\n=== JS错误 ===');
    errors.forEach(e => console.log('  ' + e));
  } else {
    console.log('\n✓ 主页面无JS错误');
  }

  await browser.close();
})();
