
const pages = new Map()

pages.set('home', { name: 'Home', path: "/", anchorable: true })
pages.set("success", { name: "Success", path: "/success", anchorable: true })

/**
 * Returns the path for a given page name.
 * @param {string} pageName - The name of the page.
 * @returns {string} The path of the page, or an empty string if not found.
 */
export default pages
