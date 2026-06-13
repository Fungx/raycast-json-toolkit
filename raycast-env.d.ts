/// <reference types="@raycast/api">

/* 🚧 🚧 🚧
 * This file is auto-generated from the extension's manifest.
 * Do not modify manually. Instead, update the `package.json` file.
 * 🚧 🚧 🚧 */

/* eslint-disable @typescript-eslint/ban-types */

type ExtensionPreferences = {}

/** Preferences accessible in all the extension's commands */
declare type Preferences = ExtensionPreferences

declare namespace Preferences {
  /** Preferences accessible in the `format-json` command */
  export type FormatJson = ExtensionPreferences & {}
  /** Preferences accessible in the `format-json-selected-text` command */
  export type FormatJsonSelectedText = ExtensionPreferences & {}
  /** Preferences accessible in the `format-json-clipboard` command */
  export type FormatJsonClipboard = ExtensionPreferences & {}
  /** Preferences accessible in the `escape-json` command */
  export type EscapeJson = ExtensionPreferences & {}
  /** Preferences accessible in the `unescape-json` command */
  export type UnescapeJson = ExtensionPreferences & {}
}

declare namespace Arguments {
  /** Arguments passed to the `format-json` command */
  export type FormatJson = {}
  /** Arguments passed to the `format-json-selected-text` command */
  export type FormatJsonSelectedText = {}
  /** Arguments passed to the `format-json-clipboard` command */
  export type FormatJsonClipboard = {}
  /** Arguments passed to the `escape-json` command */
  export type EscapeJson = {}
  /** Arguments passed to the `unescape-json` command */
  export type UnescapeJson = {}
}

