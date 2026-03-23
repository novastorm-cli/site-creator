import type { IEmbeddingService } from '../contracts/IStorage.js';

const DEFAULT_BASE_URL = 'http://127.0.0.1:11434';
const DEFAULT_MODEL = 'nomic-embed-text';
const MAX_RETRIES = 3;

export class OllamaEmbedding implements IEmbeddingService {
  private readonly baseUrl: string;
  private readonly model: string;

  constructor(baseUrl?: string, model?: string) {
    this.baseUrl = (baseUrl ?? DEFAULT_BASE_URL).replace(/\/$/, '');
    this.model = model ?? DEFAULT_MODEL;
  }

  async embed(texts: string[]): Promise<number[][]> {
    const results: number[][] = [];
    // Ollama processes one at a time (no native batching)
    for (const text of texts) {
      const embedding = await this.callWithRetry(text);
      results.push(embedding);
    }
    return results;
  }

  async embedSingle(text: string): Promise<number[]> {
    return this.callWithRetry(text);
  }

  private async callWithRetry(text: string): Promise<number[]> {
    for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
      try {
        const response = await fetch(`${this.baseUrl}/api/embeddings`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ model: this.model, prompt: text }),
        });

        if (!response.ok) {
          const body = await response.text();
          throw new Error(`Ollama ${response.status}: ${body}`);
        }

        const data = (await response.json()) as { embedding: number[] };
        if (!data.embedding || !Array.isArray(data.embedding)) {
          throw new Error('Ollama returned invalid embedding');
        }
        return data.embedding;
      } catch (err: unknown) {
        if (attempt < MAX_RETRIES - 1) {
          await new Promise((r) => setTimeout(r, 500 * (attempt + 1)));
          continue;
        }
        throw err;
      }
    }
    throw new Error('Ollama embedding failed after max retries');
  }
}
