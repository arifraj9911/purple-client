/**
 * Multi-level Category Data (Dummy)
 * N-level nesting: Category → Sub-category → Sub-sub-category → ... → N
 */

export interface Category {
  name: string;
  slug: string;
  children?: Category[];
}

export const categories: Category[] = [
  {
    name: 'Paints',
    slug: 'paints',
    children: [
      {
        name: 'Acrylic Paints',
        slug: 'acrylic-paints',
        children: [
          { name: 'Set Packs', slug: 'acrylic-set-packs' },
          { name: 'Single Tubes', slug: 'acrylic-single-tubes' },
          { name: 'Bulk Pack', slug: 'acrylic-bulk-pack' },
        ],
      },
      {
        name: 'Watercolor Paints',
        slug: 'watercolor-paints',
        children: [
          { name: 'Pan Sets', slug: 'watercolor-pan-sets' },
          { name: 'Tube Sets', slug: 'watercolor-tube-sets' },
        ],
      },
      {
        name: 'Gouache Paints',
        slug: 'gouache-paints',
        children: [
          { name: 'Starter Kit', slug: 'gouache-starter-kit' },
          { name: 'Professional', slug: 'gouache-professional' },
        ],
      },
      { name: 'Oil Paints', slug: 'oil-paints' },
      { name: 'Poster Colors', slug: 'poster-colors' },
    ],
  },
  {
    name: 'Brushes',
    slug: 'brushes',
    children: [
      {
        name: 'Flat Brushes',
        slug: 'flat-brushes',
        children: [
          { name: 'Synthetic', slug: 'flat-synthetic' },
          { name: 'Natural Hair', slug: 'flat-natural' },
        ],
      },
      {
        name: 'Round Brushes',
        slug: 'round-brushes',
        children: [
          { name: 'Synthetic', slug: 'round-synthetic' },
          { name: 'Natural Hair', slug: 'round-natural' },
        ],
      },
      { name: 'Detail Brushes', slug: 'detail-brushes' },
      { name: 'Fan Brushes', slug: 'fan-brushes' },
      { name: 'Filbert Brushes', slug: 'filbert-brushes' },
    ],
  },
  {
    name: 'Pads & Paper',
    slug: 'pads-paper',
    children: [
      { name: 'Sketch Pad', slug: 'sketch-pad' },
      { name: 'Watercolor Pad', slug: 'watercolor-pad' },
      { name: 'Canvas Paper', slug: 'canvas-paper' },
      { name: 'Drawing Sheets', slug: 'drawing-sheets' },
    ],
  },
  {
    name: 'Canvas',
    slug: 'canvas',
    children: [
      {
        name: 'Canvas Panel',
        slug: 'canvas-panel',
        children: [
          { name: 'Small (8×10)', slug: 'canvas-panel-small' },
          { name: 'Medium (12×16)', slug: 'canvas-panel-medium' },
          { name: 'Large (18×24)', slug: 'canvas-panel-large' },
        ],
      },
      {
        name: 'Stretched Canvas',
        slug: 'stretched-canvas',
        children: [
          { name: 'Small', slug: 'stretched-small' },
          { name: 'Medium', slug: 'stretched-medium' },
          { name: 'Large', slug: 'stretched-large' },
        ],
      },
      { name: 'Canvas Roll', slug: 'canvas-roll' },
    ],
  },
  {
    name: 'Drawing',
    slug: 'drawing',
    children: [
      {
        name: 'Pencils',
        slug: 'pencils',
        children: [
          { name: 'Graphite', slug: 'graphite-pencils' },
          { name: 'Charcoal', slug: 'charcoal-pencils' },
          { name: 'Colored', slug: 'colored-pencils' },
        ],
      },
      { name: 'Erasers', slug: 'erasers' },
      { name: 'Sharpeners', slug: 'sharpeners' },
      { name: 'Markers & Pens', slug: 'markers-pens' },
    ],
  },
  {
    name: 'Combo Packs',
    slug: 'combo-packs',
    children: [
      { name: 'Acrylic Combo', slug: 'acrylic-combo' },
      { name: 'Watercolor Combo', slug: 'watercolor-combo' },
      { name: 'Starter Kit', slug: 'starter-kit' },
      { name: 'Professional Kit', slug: 'professional-kit' },
    ],
  },
  {
    name: 'Craft Supplies',
    slug: 'craft-supplies',
    children: [
      { name: 'Glue & Adhesives', slug: 'glue-adhesives' },
      { name: 'Cutting Tools', slug: 'cutting-tools' },
      { name: 'Decorative Items', slug: 'decorative-items' },
      { name: 'Clay & Molding', slug: 'clay-molding' },
    ],
  },
  {
    name: 'Easels & Stands',
    slug: 'easels-stands',
    children: [
      { name: 'Table Easels', slug: 'table-easels' },
      { name: 'Studio Easels', slug: 'studio-easels' },
      { name: 'Display Stands', slug: 'display-stands' },
    ],
  },
];
