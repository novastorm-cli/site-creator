import { readFile, writeFile, readdir, mkdir, rm } from 'node:fs/promises';
import { join } from 'node:path';
import crypto from 'node:crypto';
import type { TaskItem, BackgroundTask } from '../models/types.js';

export class BackgroundQueue {
  constructor(private readonly queuePath: string) {}

  async enqueue(task: TaskItem): Promise<BackgroundTask> {
    await mkdir(this.queuePath, { recursive: true });

    const bgTask: BackgroundTask = {
      id: crypto.randomUUID(),
      task,
      status: 'queued',
      queuedAt: Date.now(),
    };

    await this.writeToDisk(bgTask);
    return bgTask;
  }

  async dequeue(): Promise<BackgroundTask | null> {
    const all = await this.getAll();
    const next = all
      .filter((t) => t.status === 'queued')
      .sort((a, b) => a.queuedAt - b.queuedAt)[0];

    if (!next) return null;

    next.status = 'running';
    next.startedAt = Date.now();
    await this.writeToDisk(next);
    return next;
  }

  async update(id: string, updates: Partial<BackgroundTask>): Promise<void> {
    const filePath = join(this.queuePath, `${id}.json`);
    let existing: BackgroundTask;

    try {
      const raw = await readFile(filePath, 'utf-8');
      existing = JSON.parse(raw) as BackgroundTask;
    } catch {
      throw new Error(`BackgroundTask ${id} not found`);
    }

    const updated = { ...existing, ...updates };
    await writeFile(filePath, JSON.stringify(updated, null, 2), 'utf-8');
  }

  async getAll(): Promise<BackgroundTask[]> {
    await mkdir(this.queuePath, { recursive: true });

    const entries = await readdir(this.queuePath);
    const tasks: BackgroundTask[] = [];

    for (const entry of entries) {
      if (!entry.endsWith('.json')) continue;
      try {
        const raw = await readFile(join(this.queuePath, entry), 'utf-8');
        tasks.push(JSON.parse(raw) as BackgroundTask);
      } catch {
        // Skip corrupted files
      }
    }

    return tasks.sort((a, b) => a.queuedAt - b.queuedAt);
  }

  async getPending(): Promise<BackgroundTask[]> {
    const all = await this.getAll();
    return all.filter((t) => t.status === 'queued' || t.status === 'running');
  }

  async remove(id: string): Promise<void> {
    try {
      await rm(join(this.queuePath, `${id}.json`));
    } catch {
      // Already removed or never existed
    }
  }

  async clear(): Promise<void> {
    const entries = await readdir(this.queuePath).catch(() => [] as string[]);
    for (const entry of entries) {
      if (entry.endsWith('.json')) {
        await rm(join(this.queuePath, entry)).catch(() => {});
      }
    }
  }

  private async writeToDisk(bgTask: BackgroundTask): Promise<void> {
    const filePath = join(this.queuePath, `${bgTask.id}.json`);
    await writeFile(filePath, JSON.stringify(bgTask, null, 2), 'utf-8');
  }
}
