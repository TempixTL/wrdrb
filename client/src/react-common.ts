import * as React from 'react';

/**
 * Shorthand alias for `React.createElement()`.
 */
export const ce = React.createElement;

/**
 * String containing the CSRF token for the application. Needed for POST
 * requests.
 */
export const csrfToken: string =
  (document.getElementById('csrfToken') as HTMLInputElement).value;

/**
 * A simple helper function to get versioned assets from Play in Javascript.
 * 
 * Similar to `@routes.Assets.versioned(...)` in Scala.
 * @param {string} src The path of the asset starting within the `public`
 * directory.
 * @returns The full path to the versioned asset from Play.
 */
export function versionedAsset(src: string): string {
  if (src.startsWith('/'))
    src = src.slice(1);

  return `/versionedAssets/${src}`;
}
