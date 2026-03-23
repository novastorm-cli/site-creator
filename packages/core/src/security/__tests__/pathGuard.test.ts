import { describe, it, expect, vi } from 'vitest';
import { PathGuard } from '../PathGuard.js';
import { PathDeniedError, PathTraversalError } from '../../contracts/IPathGuard.js';

describe('PathGuard', () => {
  const PROJECT_ROOT = '/projects/my-app';

  it('allows project root and subdirectories without prompt', async () => {
    const promptFn = vi.fn();
    const guard = new PathGuard(PROJECT_ROOT, promptFn);
    // Files directly in the project root
    await guard.check('/projects/my-app/package.json');
    // Files in subdirectories
    await guard.check('/projects/my-app/src/components/Button.tsx');
    await guard.check('/projects/my-app/app/page.tsx');
    expect(promptFn).not.toHaveBeenCalled();
  });

  it('allows .nova/ without prompt', async () => {
    const promptFn = vi.fn();
    const guard = new PathGuard(PROJECT_ROOT, promptFn);
    await guard.check('/projects/my-app/.nova/agents/developer.md');
    expect(promptFn).not.toHaveBeenCalled();
  });

  it('throws PathTraversalError for paths outside project root', () => {
    const guard = new PathGuard(PROJECT_ROOT);
    expect(() => guard.validate('/etc/passwd')).toThrow(PathTraversalError);
    expect(() => guard.validate('/projects/other-app/file.ts')).toThrow(PathTraversalError);
  });

  it('does not prompt for subdirectories of project root', async () => {
    const promptFn = vi.fn();
    const guard = new PathGuard('/tmp/test-project', promptFn);
    await guard.check('/tmp/test-project/unknown-dir/file.ts');
    expect(promptFn).not.toHaveBeenCalled();
  });

  it('parent allow covers children', async () => {
    const promptFn = vi.fn();
    const guard = new PathGuard(PROJECT_ROOT, promptFn);
    guard.allow('/projects/my-app/src');
    await guard.check('/projects/my-app/src/components/Button.tsx');
    expect(promptFn).not.toHaveBeenCalled();
  });

  it('validate() accepts all paths under project root', () => {
    const guard = new PathGuard(PROJECT_ROOT);
    // These should not throw
    guard.validate('/projects/my-app/src/deep/nested/file.ts');
    guard.validate('/projects/my-app/.nova/config.toml');
    guard.validate('/projects/my-app/package.json');
  });

  it('throws PathTraversalError for check() on paths outside root', async () => {
    const guard = new PathGuard(PROJECT_ROOT);
    await expect(guard.check('/etc/passwd')).rejects.toThrow(PathTraversalError);
  });
});
