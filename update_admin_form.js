const fs = require('fs');

const path = './src/app/admin/page.tsx';
let code = fs.readFileSync(path, 'utf8');

// 1. Update productForm state type
code = code.replace(
  /customHtml: string;\s*customCss: string;/g,
  'description: string;\n    features: string[];\n    specifications: { key: string; value: string }[];'
);

// 2. Update productForm initial state
code = code.replace(
  /customHtml: "",\s*customCss: ""/g,
  'description: "",\n    features: [],\n    specifications: []'
);

// 3. In openAddModal
// already covered by #2 for the setProductForm({ ... }) part.
// But we also need to remove setIsAdvancedOpen(false); and replace it.

// 4. In openEditModal
code = code.replace(
  /customHtml: product\.customHtml \|\| "",\s*customCss: product\.customCss \|\| ""/g,
  `description: "",
      features: [],
      specifications: []`
);

// Let's manually inject the JSON parsing inside openEditModal
code = code.replace(
  /const openEditModal = \(product: Product\) => {/,
  `const openEditModal = (product: Product) => {
    let desc = "";
    let feats = [];
    let specs = [];
    if (product.customHtml && product.customHtml.startsWith('{"_isJsonDetails":true')) {
      try {
        const parsed = JSON.parse(product.customHtml);
        desc = parsed.description || "";
        feats = parsed.features || [];
        specs = parsed.specifications || [];
      } catch (e) {}
    }`
);

// Update setProductForm inside openEditModal to use the parsed values
code = code.replace(
  /description: "",\s*features: \[\],\s*specifications: \[\]/g,
  `description: typeof desc !== 'undefined' ? desc : "",
      features: typeof feats !== 'undefined' ? feats : [],
      specifications: typeof specs !== 'undefined' ? specs : []`
);

// Fix the second occurrence of `description: typeof desc !== 'undefined' ? desc : ""` which might replace the one in openAddModal if we aren't careful.
// Wait, regex might have replaced openAddModal too. Let's write a safer replacer using split and join or AST-like string manipulation.
