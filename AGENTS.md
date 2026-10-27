<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Project rules
- Business details (name, address, phone, email, nav) live only in src/lib/site.ts; import from there so NAP stays consistent.
- Shared layout (Header/Footer) is mounted in src/routes/__root.tsx; every page uses pageMeta() for unique head metadata.
- Forms deliver via FormSubmit AJAX (no backend, per brand rule against unnecessary integrations); success shown only on a confirmed success response.
- SITE.url in src/lib/site.ts is the single preferred domain; canonicals, og:url, sitemap and JSON-LD all build from it.
- /sitemap.xml is generated in src/routes/sitemap[.]xml.ts; add new public static pages to its STATIC list.
- Old Wix URLs are 301-redirected by tiny route files using beforeLoad redirect; keep them.
