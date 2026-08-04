/**
 * Multi-level Category Data (Dummy)
 * Flat structure using parentId for N-level nesting.
 * Top-level categories have parentId = null.
 */

export interface Category {
  id: number;
  name: string;
  slug: string;
  parentId: number | null;
  children?: Category[];
}

export const categories: Category[] = [
  // ───────── Paints ─────────
  { id: 1, name: 'Paints', slug: 'paints', parentId: null },
  { id: 2, name: 'Acrylic Paints', slug: 'acrylic-paints', parentId: 1 },
  { id: 3, name: 'Set Packs', slug: 'acrylic-set-packs', parentId: 2 },
  { id: 4, name: 'Single Tubes', slug: 'acrylic-single-tubes', parentId: 2 },
  { id: 5, name: 'Bulk Pack', slug: 'acrylic-bulk-pack', parentId: 2 },
  { id: 6, name: 'Watercolor Paints', slug: 'watercolor-paints', parentId: 1 },
  { id: 7, name: 'Pan Sets', slug: 'watercolor-pan-sets', parentId: 6 },
  { id: 8, name: 'Tube Sets', slug: 'watercolor-tube-sets', parentId: 6 },
  { id: 9, name: 'Gouache Paints', slug: 'gouache-paints', parentId: 1 },
  { id: 10, name: 'Starter Kit', slug: 'gouache-starter-kit', parentId: 9 },
  { id: 11, name: 'Professional', slug: 'gouache-professional', parentId: 9 },
  { id: 12, name: 'Oil Paints', slug: 'oil-paints', parentId: 1 },
  { id: 13, name: 'Poster Colors', slug: 'poster-colors', parentId: 1 },

  // ───────── Brushes ─────────
  { id: 14, name: 'Brushes', slug: 'brushes', parentId: null },
  { id: 15, name: 'Flat Brushes', slug: 'flat-brushes', parentId: 14 },
  { id: 16, name: 'Synthetic', slug: 'flat-synthetic', parentId: 15 },
  { id: 17, name: 'Natural Hair', slug: 'flat-natural', parentId: 15 },
  { id: 18, name: 'Round Brushes', slug: 'round-brushes', parentId: 14 },
  { id: 19, name: 'Synthetic', slug: 'round-synthetic', parentId: 18 },
  { id: 20, name: 'Natural Hair', slug: 'round-natural', parentId: 18 },
  { id: 21, name: 'Detail Brushes', slug: 'detail-brushes', parentId: 14 },
  { id: 22, name: 'Fan Brushes', slug: 'fan-brushes', parentId: 14 },
  { id: 23, name: 'Filbert Brushes', slug: 'filbert-brushes', parentId: 14 },

  // ───────── Pads & Paper ─────────
  { id: 24, name: 'Pads & Paper', slug: 'pads-paper', parentId: null },
  { id: 25, name: 'Sketch Pad', slug: 'sketch-pad', parentId: 24 },
  { id: 26, name: 'Watercolor Pad', slug: 'watercolor-pad', parentId: 24 },
  { id: 27, name: 'Canvas Paper', slug: 'canvas-paper', parentId: 24 },
  { id: 28, name: 'Drawing Sheets', slug: 'drawing-sheets', parentId: 24 },

  // ───────── Canvas ─────────
  { id: 29, name: 'Canvas', slug: 'canvas', parentId: null },
  { id: 30, name: 'Canvas Panel', slug: 'canvas-panel', parentId: 29 },
  { id: 31, name: 'Small (8×10)', slug: 'canvas-panel-small', parentId: 30 },
  { id: 32, name: 'Medium (12×16)', slug: 'canvas-panel-medium', parentId: 30 },
  { id: 33, name: 'Large (18×24)', slug: 'canvas-panel-large', parentId: 30 },
  { id: 34, name: 'Stretched Canvas', slug: 'stretched-canvas', parentId: 29 },
  { id: 35, name: 'Small', slug: 'stretched-small', parentId: 34 },
  { id: 36, name: 'Medium', slug: 'stretched-medium', parentId: 34 },
  { id: 37, name: 'Large', slug: 'stretched-large', parentId: 34 },
  { id: 38, name: 'Canvas Roll', slug: 'canvas-roll', parentId: 29 },

  // ───────── Drawing ─────────
  { id: 39, name: 'Drawing', slug: 'drawing', parentId: null },
  { id: 40, name: 'Pencils', slug: 'pencils', parentId: 39 },
  { id: 41, name: 'Graphite', slug: 'graphite-pencils', parentId: 40 },
  { id: 42, name: 'Charcoal', slug: 'charcoal-pencils', parentId: 40 },
  { id: 43, name: 'Colored', slug: 'colored-pencils', parentId: 40 },
  { id: 44, name: 'Erasers', slug: 'erasers', parentId: 39 },
  { id: 45, name: 'Sharpeners', slug: 'sharpeners', parentId: 39 },
  { id: 46, name: 'Markers & Pens', slug: 'markers-pens', parentId: 39 },

  // ───────── Combo Packs ─────────
  { id: 47, name: 'Combo Packs', slug: 'combo-packs', parentId: null },
  { id: 48, name: 'Acrylic Combo', slug: 'acrylic-combo', parentId: 47 },
  { id: 49, name: 'Watercolor Combo', slug: 'watercolor-combo', parentId: 47 },
  { id: 50, name: 'Starter Kit', slug: 'starter-kit', parentId: 47 },
  { id: 51, name: 'Professional Kit', slug: 'professional-kit', parentId: 47 },

  // ───────── Craft Supplies ─────────
  { id: 52, name: 'Craft Supplies', slug: 'craft-supplies', parentId: null },
  { id: 53, name: 'Glue & Adhesives', slug: 'glue-adhesives', parentId: 52 },
  { id: 54, name: 'Cutting Tools', slug: 'cutting-tools', parentId: 52 },
  { id: 55, name: 'Decorative Items', slug: 'decorative-items', parentId: 52 },
  { id: 56, name: 'Clay & Molding', slug: 'clay-molding', parentId: 52 },

  // ───────── Easels & Stands ─────────
  { id: 57, name: 'Easels & Stands', slug: 'easels-stands', parentId: null },
  { id: 58, name: 'Table Easels', slug: 'table-easels', parentId: 57 },
  { id: 59, name: 'Studio Easels', slug: 'studio-easels', parentId: 57 },
  { id: 60, name: 'Display Stands', slug: 'display-stands', parentId: 57 },
];

/**
 * Build a nested category tree from the flat array using parentId.
 * Returns top-level categories with their descendants in `children`.
 */
export function buildCategoryTree(flatList: Category[]): Category[] {
  const map = new Map<number, Category>();
  const roots: Category[] = [];

  // First pass: shallow clone each category
  for (const cat of flatList) {
    map.set(cat.id, { ...cat, children: [] });
  }

  // Second pass: attach children
  for (const cat of flatList) {
    const node = map.get(cat.id)!;
    if (cat.parentId === null) {
      roots.push(node);
    } else {
      const parent = map.get(cat.parentId);
      if (parent) {
        parent.children!.push(node);
      }
    }
  }

  // Clean up empty children arrays
  const cleanEmpty = (nodes: Category[]) => {
    for (const node of nodes) {
      if (node.children && node.children.length === 0) {
        delete node.children;
      } else if (node.children) {
        cleanEmpty(node.children);
      }
    }
  };
  cleanEmpty(roots);

  return roots;
}
