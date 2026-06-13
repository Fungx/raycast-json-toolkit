# JSON Toolkit for Raycast

![JSON Toolkit icon](assets/extension-icon.png)

A Raycast-native toolkit for formatting JSON and JSON-like text, working with
JSON embedded in logs, and escaping or unescaping JSON strings.

Everything runs inside Raycast. No browser, terminal workflow, external editor,
or network service is required after installation.

## Features

- Format JSON entered manually, selected in another application, or copied to
  the clipboard.
- Pretty-print valid JSON and copy either the pretty or minified result.
- Accept any valid JSON root, including strings, numbers, booleans, and `null`.
- Conservatively format balanced JSON-like fragments embedded in logs.
- Preserve relaxed syntax such as single quotes, unquoted keys, comments, and
  trailing commas.
- Escape an entire text value as one standards-compliant JSON string.
- Unescape exactly one JSON string layer.
- Send unescaped text directly into the formatter.
- Reject input larger than 5 MB before parsing or rendering.

## Commands

| Command                          | Description                                        |
| -------------------------------- | -------------------------------------------------- |
| `Format JSON`                    | Enter JSON or JSON-like text in a multiline form.  |
| `Format JSON from Selected Text` | Format text selected in the frontmost application. |
| `Format JSON from Clipboard`     | Format the current textual clipboard contents.     |
| `Escape JSON String`             | Serialize the complete input as one JSON string.   |
| `Unescape JSON String`           | Decode exactly one valid JSON string layer.        |

The input source commands are deliberately separate. If selected text is
unavailable, the extension reports that condition instead of silently reading
the clipboard.

## Formatting Behavior

JSON Toolkit always attempts strict `JSON.parse` first.

### Valid JSON

Valid JSON is displayed as a syntax-highlighted, pretty-formatted document.
Available actions:

- `Copy Pretty JSON` with `Command-C`
- `Copy Minified JSON` with `Command-Shift-C`

A stringified JSON value remains a JSON string. The formatter does not
automatically unescape or reinterpret it.

### Invalid or Relaxed JSON

If strict parsing fails, the extension displays:

> Invalid JSON · Best-effort formatting

It then conservatively formats safely balanced object and array fragments while
preserving all surrounding text. This works well for logs and JavaScript-style
object output such as:

```text
INFO request={user:'alice',roles:['admin',],/* retained */active:true}
```

The formatter does not invent missing commas, quotes, or closing delimiters. It
also does not remove comments or convert relaxed syntax into standard JSON.

## Requirements

- macOS with [Raycast](https://www.raycast.com/) installed
- Node.js `22.22.2` or newer
- npm
- GNU Make, optional but recommended

## Local Installation

Clone the repository, then run:

```bash
make install
make local
```

`make local` starts Raycast development mode and installs the extension into
your local Raycast instance. Keep the process running while developing; stop it
with `Ctrl-C`.

Without Make:

```bash
npm install
npm run dev
```

## Development

```bash
make help        # List available commands
make test        # Run the Vitest suite
make test-watch  # Run tests in watch mode
make lint        # Run Raycast manifest, ESLint, and Prettier checks
make lint-fix    # Apply automatic lint and formatting fixes
make typecheck   # Run TypeScript checks
make build       # Build and install the production bundle locally
make check       # Run all release checks
```

### Project Structure

```text
src/
  components/   Raycast forms and result views
  lib/          Pure formatting, escaping, input, and Markdown utilities
  *.tsx         Raycast command entry points
tests/
  fixtures/     Deterministic large-input generators
  *.test.ts     Unit and behavior tests
assets/         Extension icon sources
```

Core behavior belongs in `src/lib` as pure, testable functions. Command entry
points should remain thin and delegate to shared components and domain logic.

## Testing

The test suite covers:

- Strict JSON parsing and serialization
- Primitive and stringified JSON roots
- Logs containing one or more JSON-like fragments
- Single quotes, comments, trailing commas, and unquoted keys
- Ambiguous or unclosed structures
- Markdown fence safety
- Escape and single-layer unescape behavior
- UTF-8 size limits
- Compact, nested, and invalid 5 MB fixtures

Run all automated project checks with:

```bash
make check
```

Before publishing, manually verify all five commands inside Raycast, including
selected-text permissions, clipboard behavior, actions, shortcuts, and a 5 MB
result.

## Design Constraints

- The result view is text-only; v0 does not provide a tree inspector.
- Raycast `Detail` does not expose programmable in-document search, so custom
  find and jump-to-match behavior is out of scope.
- Inputs larger than 5 MB are rejected before parsing.
- Best-effort formatting favors preserving content over repairing uncertain
  syntax.
- JSON diff is not included in v0.

## Contributing

Contributions are welcome.

1. Open an issue before making substantial user-visible or architectural
   changes.
2. Keep changes focused and preserve the product invariants in
   [`AGENTS.md`](AGENTS.md).
3. Add or update tests for every behavior change.
4. Run `make check`.
5. Open a pull request with a concise explanation and manual verification notes.

## Publishing

Publishing is maintainer-only and is intentionally not exposed through the
Makefile, npm scripts, contribution workflow, or automation instructions.
Contributors should stop after `make check` and submit a pull request. The
project maintainer performs Raycast Store submission separately.

## License

[MIT](LICENSE)
