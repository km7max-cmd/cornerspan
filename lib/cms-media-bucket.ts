import { getCloudflareContext } from '@opennextjs/cloudflare';

/**
 * The bucket is optional until it has been created in the owner's Cloudflare account.
 * Missing Preview/Production bindings must never point uploads at the other environment.
 */
export type CmsR2Object = {
  body: ReadableStream<Uint8Array>;
  size: number;
  httpMetadata?: { contentType?: string };
};

export type CmsR2Bucket = {
  put(key: string, data: Uint8Array, options: { httpMetadata: { contentType: string } }): Promise<unknown>;
  get(key: string): Promise<CmsR2Object | null>;
};

export function mediaBucket(): CmsR2Bucket | null {
  try {
    const env = getCloudflareContext().env as unknown as Record<string, unknown>;
    const storage = env.CMS_MEDIA_BUCKET as Partial<CmsR2Bucket> | undefined;
    if (!storage || typeof storage.put !== 'function' || typeof storage.get !== 'function') return null;
    return storage as CmsR2Bucket;
  } catch {
    return null;
  }
}
