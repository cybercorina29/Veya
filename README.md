# VEYA — The Formulation Atelier

An elegant, installable personal archive for homemade product formulations and essential-oil fragrance blends.

## Pages

- **Home** — `index.html`: a proper home page introducing the atelier and linking to both libraries.
- **Products & Formulations** — `products.html`: individual product bases, ingredients, method, notes, and a **fragrance dropdown** in each recipe.
- **Fragrance Library** — `fragrances.html`: independent fragrance accord records with precise essential-oil quantities.
- `styles.css` provides the shared design. `app.js` stores the currently recorded formulas and makes the archive interactive.

## Current product base recipes

**Everyday Hygiene Cleaner**, 500 ml: coco glucoside 3 tsp (15 ml); Durosoft PG10CY-M just over ½ tsp; 70% rubbing alcohol 15–20 tsp (75–100 ml); distilled water to a 500 ml *final total*. Originally paired with Warm Luxe.

**Yoga Mat Cleaner**, 500 ml: coco glucoside ½ tsp; Durosoft PG10CY-M ¼ tsp; 70% rubbing alcohol 10 tsp (50 ml); distilled water to a 500 ml *final total*. Originally paired with Namaspray.

These are two distinct base recipes. The oil compositions are not baked into the product ingredients. Opening a product first shows a blank **Select your fragrance** dropdown, plus an unscented choice. Selecting any fragrance in the library reveals its exact essential-oil drops, without changing the underlying base. **Copy Recipe** includes the current selected blend.

## Current fragrance library

**Warm Luxe**, 15 drops: bergamot 5; sandalwood 4; cedarwood 3; ho wood 2; vetiver 1.

**Namaspray**, 10 drops: lavender 3; petitgrain 2; ho wood 2; cypress 1; sandalwood 1; vetiver 1.

To add a new blend permanently, append a fragrance object to the `fragrances` array at the top of `app.js`. It then appears in the Fragrance Library and automatically becomes an option in each product dropdown. Add new products to the `products` array. The website no longer advertises the local-only recipe creation form; new recipes can be committed directly in GitHub.

Previously saved entries from the original browser-only form are still read from the existing local storage key `veya.atelier.entries.v1` on the same browser and will continue to appear in the two libraries. They are *not* synchronized with the repo.

## Install / offline access

This site includes a manifest, 192 px and 512 px application icons and a service worker. Install with supported browser's **Add to Home screen / Install app** option. The service-worker cache version has been updated to **veya-atelier-v2** so previously installed clients fetch the new home and library pages.

## Hosting

GitHub Pages: **Settings → Pages → Deploy from a branch → main → /(root)**. GitHub Pages eligibility for a private repo depends on your GitHub plan. Changing the repository to public would expose these formulas. When correctly published, the intended URL is https://cybercorina29.github.io/Veya/.

## Care and safety

This is a personal formulation notebook, not validation of antimicrobial efficacy, long-term stability, surface suitability or pet safety. Test each surface and follow yoga-mat manufacturer recommendations. Essential oils may be harmful to cats: avoid spraying around them and allowing contact with wet treated surfaces. Never mix these formulas with bleach.
