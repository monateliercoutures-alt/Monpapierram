# Monpapierrame

Site vitrine one-page (Next.js App Router, TypeScript, Tailwind CSS, Framer Motion) pour la vente de ramettes de papier Double A à Abidjan.

## Démarrer

```bash
npm install
npm run dev
```

Puis ouvrir http://localhost:3000.

## Tout ce qu'on modifie : `lib/config.ts`

Numéro WhatsApp, e-mail, URL du site, prix, seuil de vente en gros, textes du montage et FAQ.
Pensez à remplacer `SITE.url` par votre vrai domaine (sitemap, Open Graph).

## Structure

- `components/ScrollMontage.tsx` : montage « vidéo » piloté par le scroll (400vh + conteneur sticky). Avec `prefers-reduced-motion`, les 4 images s'empilent sans animation.
- `public/images/etape-1..4.jpg` : images fournies, non modifiées.
- `tailwind.config.ts` : palette Double A (profond, nuit, cyan, brume, encre).

## Déploiement

Vercel : importer le dépôt, aucun réglage requis. Netlify : commande `npm run build`, plugin Next.js détecté automatiquement.
