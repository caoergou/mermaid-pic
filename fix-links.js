const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

// 模拟 MermZen 的编码过程
function buildPayload(code) {
    const p = { v: 2, c: code };
    return p;
}

function encodePayload(payload) {
    const json = JSON.stringify(payload);
    const bytes = Buffer.from(json);
    const compressed = zlib.deflateSync(bytes);
    const binary = compressed.toString('binary');
    return Buffer.from(binary, 'binary').toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}

function encodeCode(code) {
    return encodePayload(buildPayload(code));
}

// 修复指定目录下所有博客文章的链接
function fixBlogLinks(dir) {
    console.log(`正在修复 ${dir} 目录下的博客文章链接...`);

    const files = fs.readdirSync(dir);

    files.forEach(file => {
        if (!file.endsWith('.md')) return;

        const filePath = path.join(dir, file);
        console.log(`\n处理文件: ${file}`);

        let content = fs.readFileSync(filePath, 'utf8');

        // 查找所有代码块
        const codeBlocks = [];
        const codeBlockRegex = /```([\s\S]*?)```/g;
        let match;
        while ((match = codeBlockRegex.exec(content)) !== null) {
            const code = match[1].trim();
            if (code) {
                codeBlocks.push(code);
            }
        }

        // 查找所有的 "在 MermZen 中试试" 链接
        const linkRegex = /<a href="https:\/\/eric\.run\.place\/MermZen\/#([^"]+)" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →<\/a>/g;

        const links = [];
        while ((match = linkRegex.exec(content)) !== null) {
            links.push(match);
        }

        // 确保代码块和链接数量匹配
        if (codeBlocks.length === 0 || links.length === 0) {
            console.log(`  未找到代码块或链接，跳过`);
            return;
        }

        if (codeBlocks.length !== links.length) {
            console.log(`  警告: 代码块数量 (${codeBlocks.length}) 与链接数量 (${links.length}) 不匹配`);
        }

        // 重新编码每个代码块并替换链接
        let updatedContent = content;
        links.forEach((link, index) => {
            if (index < codeBlocks.length) {
                const originalEncoded = link[1];
                const newEncoded = encodeCode(codeBlocks[index]);

                if (originalEncoded !== newEncoded) {
                    const oldLink = link[0];
                    const newLink = `<a href="https://eric.run.place/MermZen/#${newEncoded}" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>`;

                    updatedContent = updatedContent.replace(oldLink, newLink);
                    console.log(`  链接 ${index + 1}: 已更新`);
                }
            }
        });

        // 更新 iframe 链接（如果有）
        const iframeRegex = /<iframe src="https:\/\/eric\.run\.place\/MermZen\/embed\.html#([^"]+)" width="100%" height="600" frameborder="0"><\/iframe>/;
        match = iframeRegex.exec(content);

        if (match && codeBlocks.length > 0) {
            const firstCode = codeBlocks[0]; // 使用第一个代码块
            const encodedCode = encodeCode(firstCode);
            const oldIframe = match[0];
            const newIframe = `<iframe src="https://eric.run.place/MermZen/embed.html#${encodedCode}" width="100%" height="600" frameborder="0"></iframe>`;

            updatedContent = updatedContent.replace(oldIframe, newIframe);
            console.log(`  Iframe 链接已更新`);
        }

        fs.writeFileSync(filePath, updatedContent, 'utf8');
        console.log(`  文件已保存`);
    });
}

// 修复中英文版本的博客文章
fixBlogLinks(path.join(__dirname, 'blog', 'zh', 'posts'));
fixBlogLinks(path.join(__dirname, 'blog', 'en', 'posts'));

console.log(`\n✅ 所有博客文章链接修复完成！`);
