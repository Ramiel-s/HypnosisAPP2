import type { HypnosisFeature } from '../types';

function normalizeText(text: string | undefined): string {
  return (text ?? '').replaceAll('\r\n', '\n').trimEnd();
}

function indentLines(text: string, spaces: number): string {
  const pad = ' '.repeat(spaces);
  return normalizeText(text)
    .split('\n')
    .map(line => (line.length ? `${pad}${line}` : pad))
    .join('\n');
}

export function buildHypnosisSendMessage({
  features,
  durationMinutes,
  globalNote,
}: {
  features: HypnosisFeature[];
  durationMinutes: number;
  globalNote: string;
}): string {
  const selected = features.filter(f => f.isEnabled);
  const names = selected.map(f => f.title).filter(Boolean);

  const lines: string[] = [];
  lines.push('<催眠发送>');
  lines.push(`开启的功能名列表: ${names.length ? names.join('、') : ''}`);
  lines.push('本次的催眠效果:');

  for (const f of selected) {
    lines.push(`  ${f.title}:`);
    lines.push('    描述:');
    lines.push(indentLines(f.description ?? '', 6));
    lines.push('    备注:');
    lines.push(indentLines(f.userNote ?? '', 6));
  }

  lines.push(`本次催眠的持续时间: ${durationMinutes}分钟`);
  lines.push('备注:');
  lines.push(indentLines(globalNote ?? '', 2));
  lines.push('');
  lines.push('</催眠发送>');
  return lines.join('\n');
}
