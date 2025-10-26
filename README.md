# 🥷 format-strings-ninja

Format your strings **like a ninja** — fast, precise, and dependency-free.

- ✅ Works in **TypeScript** and **JavaScript**
- ✅ Supports **Node.js** (CommonJS) and **browsers** (ES2015)
- ✅ **No dependencies**
- ✅ **Tree-shakeable** exports

```ts
import { format } from "format-strings-ninja";

format.toSlug("Hello World!");              // "hello-world"
format.titleSmart("the lord of the rings"); // "The Lord of the Rings"
```

---

## Installation

```bash
npm i format-strings-ninja
# or
pnpm add format-strings-ninja
# or
yarn add format-strings-ninja
```

---

## Usage

### In TypeScript / ESM
```ts
import { format } from "format-strings-ninja";

console.log(format.camelCase("Hello brave world")); // "helloBraveWorld"
console.log(format.toTitleCase("the quick brown fox")); // "The Quick Brown Fox"
```

### In Node (CommonJS)
```js
const { format } = require("format-strings-ninja");

console.log(format.toSlug("Hello World!")); // "hello-world"
console.log(format.capitalize("ninja"));    // "Ninja"
```

### In Browser (bundler or CDN)
```html
<script type="module">
  import { format } from "https://esm.sh/format-strings-ninja";
  console.log(format.randomCase("hello ninja world"));
</script>
```

---

## 🧩 API — `format`

### 🔤 **Basics**

| Function | Example | Output |
|-----------|----------|---------|
| `removeAccents(str)` | `"canción"` | `"cancion"` |
| `normalizeWhitespace(str)` | `"  Hello   world  "` | `"Hello world"` |
| `reverse(str)` | `"ninja"` | `"ajnin"` |
| `stripNonAscii(str)` | `"héllö 🌎"` | `"hell "` |

---

### 🧠 **Case & Titles**

| Function | Example | Output |
|-----------|----------|---------|
| `capitalize(str)` | `"ninja"` | `"Ninja"` |
| `toTitleCase(str)` | `"the quick brown fox"` | `"The Quick Brown Fox"` |
| `toSentenceCase(str)` | `"hello world"` | `"Hello world"` |
| `titleSmart(str)` | `"the lord of the rings"` | `"The Lord of the Rings"` |
| `nameCase(str)` | `"jUAN pérez roJas"` | `"Juan Pérez Rojas"` |

---

### 🪶 **Slug & Cases**

| Function | Example | Output |
|-----------|----------|---------|
| `toSlug(str)` | `"Hello World!"` | `"hello-world"` |
| `kebabCase(str)` | `"Hello Ninja World"` | `"hello-ninja-world"` |
| `snakeCase(str)` | `"Hello Ninja World"` | `"hello_ninja_world"` |
| `camelCase(str)` | `"Hello ninja world"` | `"helloNinjaWorld"` |

---

### ✂️ **Trim & Pad**

| Function | Example | Output |
|-----------|----------|---------|
| `truncate(str, len)` | `"This text is too long", 10` | `"This te..."` |
| `limitWords(str, count)` | `"This is an example text", 3` | `"This is an..."` |
| `pad(str, length, char)` | `"42", 6, "0"` | `"002420"` |
| `wrap(str, width)` | `"This text is too long", 8` | `"This text\nis too\nlong"` |

---

### 🧹 **Clean & Count**

| Function | Example | Output |
|-----------|----------|---------|
| `cleanHTML(html)` | `"<p>Hello <b>world</b></p>"` | `"Hello world"` |
| `countWords(str)` | `"The ninja writes code"` | `4` |
| `countOccurrences(str, sub)` | `"banana", "na"` | `2` |

---

### 🎭 **Fun & Stylized**

| Function | Example | Output |
|-----------|----------|---------|
| `randomCase(str)` | `"ninja"` | `"nInJa"` *(random)* |
| `alternatingCase(str)` | `"ninja"` | `"NiNjA"` |
| `stylize(str, "upper")` | `"ninja"` | `"NINJA"` |
| `stylize(str, "lower")` | `"NINJA"` | `"ninja"` |
| `stylize(str, "leet")` | `"hacker"` | `"h4ck3r"` |
| `stylize(str, "weird")` | `"ninja"` | `"ñïñjä"` |

---

## ⚙️ Scripts

```bash
npm run build-browser  # Build ES2015 modules for browsers (dist-browser/)
npm run build-node    # Build CommonJS modules for Node.js (dist-node/)
npm run build         # Build both browser and Node.js versions
```

---

## 🪪 License

MIT © Freddy Vincenty
