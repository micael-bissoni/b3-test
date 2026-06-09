import StyleDictionary from 'style-dictionary';
import { formats, transformGroups } from 'style-dictionary/enums';
import fs from 'fs';
import path from 'path';

const brands = fs.readdirSync(path.join(process.cwd(), 'design-system/tokens/properties/brands')).filter((brand) => !brand.startsWith('.'));
const platforms = fs.readdirSync(path.join(process.cwd(), 'design-system/tokens/properties/platforms')).filter((platform) => !platform.startsWith('.'));

const { androidColors, androidDimens, androidFontDimens, iosMacros, cssVariables } = formats;
const { web } = transformGroups;

function toBabelCase(str) {
  if (typeof str !== 'string') {
    throw new TypeError('Input must be a string');
  }

  return str
    .trim()
    .toLowerCase()
    .replace(/[-_\s]+(.)?/g, (_, chr) => (chr ? chr.toUpperCase() : ''));
}

function minify(obj) {
  if (obj.value !== undefined) {
    return obj.value;
  }
  const minified = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      minified[key] = minify(obj[key]);
    }
  }
  return minified;
}

// HAVE THE STYLE DICTIONARY CONFIG DYNAMICALLY GENERATED
function getStyleDictionaryConfig(brand, platform) {
  return {
    source: [
      'design-system/tokens/properties/globals/**/*.json',
      `design-system/tokens/properties/platforms/${platform}/*.json`,
      `design-system/tokens/properties/brands/${brand}/*.json`,
    ],
    platforms: {
      web: {
        transformGroup: web,
        buildPath: `design-system/tokens/assets/web/${brand}/`, // Pointing directly to library assets
        files: [
          {
            destination: 'tokens.css',
            format: cssVariables,
          },
        ],
      },

      ts: {
        transformGroup: 'js',
        buildPath: `design-system/tokens/src/lib/generated/${brand}/`,
        files: [
          {
            destination: 'index.ts',
            format: 'typescript/multibrand'
          }
        ]
      },
      android: {
        transformGroup: 'android',
        buildPath: `design-system/tokens/assets/android/${brand}/`,
        files: [
          {
            destination: 'tokens.colors.xml',
            format: androidColors,
          },
          {
            destination: 'tokens.dimens.xml',
            format: androidDimens,
          },
          {
            destination: 'tokens.font_dimens.xml',
            format: androidFontDimens,
          },
        ],
      },
      ios: {
        transformGroup: 'ios',
        buildPath: `design-system/tokens/assets/ios/${brand}/`,
        files: [
          {
            destination: 'tokens.h',
            format: iosMacros,
          },
        ],
      },
    },
  };
}

console.log('Cleaning existing styles...');
const buildDir = path.join(process.cwd(), 'design-system/tokens/assets');
if (fs.existsSync(buildDir)) {
  fs.rmSync(buildDir, { recursive: true, force: true });
}
fs.mkdirSync(buildDir, { recursive: true });

const internalTsDir = path.join(process.cwd(), 'design-system/tokens/src/lib/generated');
if (fs.existsSync(internalTsDir)) {
  fs.rmSync(internalTsDir, { recursive: true, force: true });
}
fs.mkdirSync(internalTsDir, { recursive: true });

console.log('Build started...');

// PROCESS THE DESIGN TOKENS FOR THE DIFFEREN BRANDS AND PLATFORMS

const brandFileContent = [];

brands.forEach(function (brand) {
  platforms.forEach(function (platform) {
    console.log('\n==============================================');
    console.log(`\nProcessing: [${platform}] [${brand}]`);

    const sdConfig = getStyleDictionaryConfig(brand, platform);
    const sd = new StyleDictionary(sdConfig);

    // Register custom format for TypeScript multibrand support
    sd.registerFormat({
      name: 'typescript/multibrand',
      format: async function ({ dictionary }) {
        const brandName = toBabelCase(brand);
        const tokens = minify(dictionary.tokens);
        return `export const ${brandName} = ${JSON.stringify(tokens, null, 2)} as const;\n`;
      }
    });

    try {
      sd.buildPlatform(platform);
    } catch (error) {
      console.error(`Error building platform [${platform}] for brand [${brand}]:`, error.message);
    }

    if (platform === 'ts') {
      // Copy assets if they exist for this brand
      const brandAssetsDir = path.join(process.cwd(), `design-system/tokens/properties/brands/${brand}/assets`);
      const publicBrandAssetsDir = path.join(process.cwd(), `design-system/tokens/assets/web/${brand}/assets`);

      if (fs.existsSync(brandAssetsDir)) {
        console.log(`Copying brand assets for ${brand}...`);
        fs.mkdirSync(publicBrandAssetsDir, { recursive: true });
        fs.cpSync(brandAssetsDir, publicBrandAssetsDir, { recursive: true });
      }

      brandFileContent.push({
        name: toBabelCase(brand),
        key: brand,
        path: `./generated/${brand}/index`
      });
    }
  });
});

let tokensTsContent = '';
brandFileContent.forEach(b => {
  tokensTsContent += `import { ${b.name} } from '${b.path}';\n`;
  tokensTsContent += `export { ${b.name} };\n`;
});

tokensTsContent += `\nexport const brands = {\n`;
brandFileContent.forEach(b => {
  tokensTsContent += `  '${b.name.toLowerCase()}': '${b.key}',\n`;
});
tokensTsContent += `} as const;\n\n`;
tokensTsContent += `export type Brand = keyof typeof brands;\n`;

fs.writeFileSync(
  path.join(process.cwd(), 'design-system/tokens/src/lib/tokens.ts'),
  tokensTsContent,
);

console.log('\n==============================================');
console.log('\nTokens.ts generated successfully!');
console.log('\nBuild completed!');
