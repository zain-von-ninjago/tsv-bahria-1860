const swc = require('@next/swc-win32-x64-msvc');

const jsxCode = `
export function Test() {
  return (
    <section>
      <h1>Test</h1>
    </section>
  );
}
`;

try {
  const result = swc.parseSync(jsxCode, {
    syntax: 'typescript',
    tsx: true,
  });
  console.log('Parse successful!');
  console.log(JSON.stringify(result, null, 2).slice(0, 500));
} catch (e) {
  console.error('Parse failed:', e.message);
}