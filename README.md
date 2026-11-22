# VEYA — The Formulation Atelier

A minimal luxury-inspired static formulation notebook with two first-class libraries: **Products & Recipes** and **Fragrance Library**.

## Products & recipes

**Everyday Hygiene Cleaner** · 500 ml
- Coco glucoside: 3 tsp (15 ml)
- Durosoft PG10CY-M: just over ½ tsp
- 70% rubbing alcohol: 15–20 tsp (75–100 ml)
- Distilled water: top up to 500 ml total
- Associated fragrance: **Warm Luxe**

**Yoga Mat Cleaner** · 500 ml
- Coco glucoside: ½ tsp (2.5 ml)
- Durosoft PG10CY-M: ¼ tsp (1.25 ml)
- 70% rubbing alcohol: 10 tsp (50 ml)
- Distilled water: top up to 500 ml total
- Associated fragrance: **Namaspray**

These have **distinct base recipes**. Fragrances are separate records and can eventually be associated with other products.

## Fragrance library

**Warm Luxe** (15 drops): bergamot 5, sandalwood 4, cedarwood 3, ho wood 2, vetiver 1.

**Namaspray** (10 drops): lavender 3, petitgrain 2, ho wood 2, cypress 1, sandalwood 1, vetiver 1.

## Site and deployment

The complete standalone site lives in `index.html`, ready for GitHub Pages with no build process.

To publish, open **Settings → Pages → Build and deployment → Deploy from a branch → main → / (root) → Save**. GitHub Pages support for private repositories depends on account eligibility; a public site also exposes formula details publicly. Do not make your repo public unless you want these details published.

Expected URL once Pages is successfully enabled: `https://cybercorina29.github.io/Veya/`.

## Adding more formulations

Use **+ NEW ENTRY** on the site to add a *Product / Recipe* or independent *Fragrance Blend*. Product entries have a product type, base measurements, batch size, method and optional linked fragrance name. Fragrance entries have their own oil measurements and notes.

New entries added in the browser are stored only in **that browser's localStorage**, not synced automatically to GitHub. Use **Export Notes** to back up the entries and **Import Notes** to restore them. To make future entries permanent for all visitors/devices, edit the `products` and `fragrances` arrays in `index.html` and commit.

## Important safety notes

This is a personal experimental archive, **not** a laboratory-validated disinfectant or preservation system. Check surface and yoga-mat manufacturer guidance, chemical compatibility and stability. Essential oils can be hazardous around cats; avoid spraying near pets and allowing contact with treated wet surfaces. Never mix with bleach.
