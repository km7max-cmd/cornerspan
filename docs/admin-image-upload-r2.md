# CornerSpan CMS — Direct Image Upload (Cloudflare R2)

**Status:** Upload UI, secure API, public image serving and isolated tests are implemented on GitHub `feature/posts-admin-dashboard`. **Not yet active on cornerspan.com.** The owner must first create or confirm isolated R2 buckets and bind them to the correct Worker environments. No bucket, billing setting, Production Worker or existing article was changed by this code work.

## What the editor now supports

- In Media Library and featured-image fields, select a JPG, PNG or WebP file from Android, iPhone or desktop (up to 5 MB), **or** continue pasting a hosted image URL.
- The private `POST /api/admin/media/upload` endpoint requires an authenticated Admin session and exact same-origin request; it reads the raw file with a strict upper bound, validates the actual image signature against MIME and generates an unpredictable filename.
- The Worker stores the file using the optional `CMS_MEDIA_BUCKET` R2 binding, then returns a site-relative `/cms-images/<uuid>.<ext>` URL. The browser fills the URL and dimensions where supported. Add descriptive ALT text and save the media record or article draft.
- Public image GETs use narrow filename allowlisting and fixed image content types, with `nosniff` and immutable cache headers; published posts and search/social previews can load the image without authentication.
- No new D1 migrations. The existing `admin_media` records store reusable URL and metadata; **the R2 image object is separate from the media record**. Removing a library record deliberately **does not delete the R2 file**, because published article copies might still use its URL.
- Uploads are intentionally blocked with a clear message until a bucket is configured; existing URL records continue to work. There is no upload to GitHub or through ChatGPT.

## Safe Cloudflare storage setup — owner approval required

Cloudflare R2 requires enabled account storage and may require billing setup. Do not create buckets without the owner's approval. The following checks and setup belong in the authenticated GitHub Codespace, not in ChatGPT:

```bash
cd /workspaces/cornerspan
npx --no-install wrangler r2 bucket list
```

Once approved, provision **two independent buckets**, with these project names **only if not already listed**:

```bash
npx --no-install wrangler r2 bucket create cornerspan-cms-images-preview
npx --no-install wrangler r2 bucket create cornerspan-cms-images
```

After both exist, update `wrangler.jsonc` on the feature branch via a reviewed Git commit (do not overwrite the user's local uncommitted files). The two binding declarations must be:

```json
{
  "r2_buckets": [
    { "binding": "CMS_MEDIA_BUCKET", "bucket_name": "cornerspan-cms-images" }
  ],
  "previews": {
    "r2_buckets": [
      { "binding": "CMS_MEDIA_BUCKET", "bucket_name": "cornerspan-cms-images-preview" }
    ]
  }
}
```

**These are additive sections** of the existing Wrangler JSON; preserve all existing Worker, D1, assets, Preview vars and secrets settings. Never bind a Preview upload to Production R2. Never use the Production database to test the Preview uploader.

## Acceptance before any Live deploy

1. Check the new code's GitHub Admin CI and desktop/Android browser QA. The route security suite uses mocked storage; it does not create R2 objects.
2. Confirm that the isolated Preview Worker has `CMS_MEDIA_BUCKET` connected to the **Preview** bucket. Log into the Preview using the owner's private password; do not send it to ChatGPT.
3. Upload a small non-sensitive image from the phone, check that the preview URL loads, edit ALT text, save a media record, set a test featured image and verify a saved Preview draft. Remove temporary D1 records. Uploaded R2 objects remain until explicitly reviewed and cleaned up by a privileged storage operation.
4. Confirm the Public image URL has the correct `Content-Type` and `X-Content-Type-Options: nosniff`, and that unauthorized upload requests return HTTP 401.
5. Only after Preview acceptance and explicit owner approval should a new **undeployed** Production version be built with the Production R2 binding and existing admin secrets, undergo version/rollback/route comparison, and be promoted. Do not reuse earlier pinned-deployment scripts: their old-version assumptions predate this release.
6. Never modify existing posts or AdSense review content as part of image-upload testing.

## Important limitations

- The allowed formats are JPG, PNG and WebP. HEIC, SVG, executable content, PDFs and files larger than 5 MB are not accepted.
- Once uploaded, the image URL is suitable for public content. Do not upload private documents, personal photos without permission or copyrighted images you are not allowed to publish.
- The browser uploads immediately to R2; saving the media record or article is a separate action. Navigating away before saving can leave an unreferenced R2 file, so cleanup needs a cautious manual review rather than deleting published images blindly.
- A successful code build does not prove that Cloudflare storage was configured. The API returns HTTP 503 with a helpful message while the bucket binding is absent.

Official Cloudflare docs: [R2 bucket setup](https://developers.cloudflare.com/r2/get-started/workers-api/), [separate Worker Preview bindings](https://developers.cloudflare.com/workers/previews/configuration/).
