import { optimize } from 'svgo/browser';

// 安全的 SVGO 配置：保留 @font-face、<defs>、<style>
export function optimizeSvg(svgString: string): string {
  try {
    const result = optimize(svgString, {
      plugins: [
        {
          name: 'preset-default',
          params: {
            overrides: {
              removeComments: true,
              removeDesc: true,
              cleanupIds: true,
              cleanupNumericValues: true,
              convertColors: true,
              collapseGroups: true,
              sortAttrs: true,
              // 明确禁用可能破坏 Mermaid SVG 的插件
              removeUselessDefs: false,
              cleanupStylesheet: false,
              inlineStyles: false,
              // 还有其他可能有风险的插件？
              removeMetadata: false, // 保留 metadata
              removeTitle: false,   // 保留标题
            },
          },
        },
      ] as any,
    });
    return result.data;
  } catch (e) {
    // SVGO 失败时返回原始 SVG
    return svgString;
  }
}
