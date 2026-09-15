import fs from 'fs';
import path from 'path';

console.log('--- Midnight Governance Suite Pre-flight Verification ---');

const requiredFiles = [
  'README.md',
  'PROPOSAL.md',
  'product_proposal.md',
  'contracts/voting.compact',
  'test/voting.test.ts',
  'tests/voting.test.ts',
  'src/test/voting.test.ts',
  '.github/workflows/ci.yml'
];

let allPassed = true;

requiredFiles.forEach((file) => {
  const fullPath = path.resolve(process.cwd(), file);
  if (fs.existsSync(fullPath)) {
    console.log(`[PASS] Verified file existence: ${file}`);
  } else {
    console.error(`[FAIL] Missing required file: ${file}`);
    allPassed = false;
  }
});

if (allPassed) {
  console.log('\n✅ All pre-flight check requirements verified successfully!');
  process.exit(0);
} else {
  console.error('\n❌ Pre-flight check failed.');
  process.exit(1);
}
