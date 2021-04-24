/**
 * Shorthand alias for `React.createElement()`.
 * @function
 */
export const ce = React.createElement;

/**
 * String containing the CSRF token for the application. Needed for POST
 * requests.
 * @type {string}
 */
export const csrfToken = document.getElementById('csrfToken').value;

/**
 * A simple helper function to get versioned assets from Play in Javascript.
 * 
 * Similar to `@routes.Assets.versioned(...)` in Scala.
 * @param {string} src The path or the asset starting within the `public`
 * directory.
 * @returns The full path to the versioned asset from Play.
 */
export function versionedAsset(src) {
  if (src.startsWith('/'))
    src = src.slice(1);

  return `/versionedAssets/${src}`;
}
