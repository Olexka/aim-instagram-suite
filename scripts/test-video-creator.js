const assert = require('node:assert/strict');

async function main() {
  const { videoCreator, VideoCreatorInputSchema } = require('../dist/tools/videoCreator.js');

  const parsed = VideoCreatorInputSchema.parse({
    action: 'prepare',
    prompt: 'A candle flame moves gently while the camera slowly pushes in.',
    seconds: '8',
    size: '720x1280',
  });
  const result = JSON.parse(await videoCreator(parsed));

  assert.equal(result.action, 'prepare');
  assert.equal(result.ready, true);
  assert.equal(result.seconds, '8');
  assert.equal(result.size, '720x1280');
  assert.match(result.nextStep, /action=create/);

  assert.throws(() => VideoCreatorInputSchema.parse({ action: 'status' }));
  assert.throws(() => VideoCreatorInputSchema.parse({
    action: 'prepare',
    prompt: 'test',
    referenceImagePath: '/tmp/a.png',
    referenceImageUrl: 'https://example.com/a.png',
  }));

  console.log('aim_video_creator prepare-mode tests passed');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
