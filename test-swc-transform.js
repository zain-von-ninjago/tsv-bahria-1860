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
  const result = swc.transformSync(jsxCode, {
    filename: 'test.tsx',
    jsc: {
      parser: {
        syntax: 'typescript',
        tsx: true,
      },
      target: 'es2020',
    },
  });
  console.log('Transform successful!');
  console.log(result.code.slice(0, 500));
} catch (e) {
  console.error('Transform failed:', e.message);
  console.error(e.stack);
}