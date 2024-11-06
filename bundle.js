var app = (function () {
	'use strict';

	// generated during release, do not modify
	const PUBLIC_VERSION = '5';

	if (typeof window !== 'undefined')
		// @ts-ignore
		(window.__svelte ||= { v: new Set() }).v.add(PUBLIC_VERSION);

	const TEMPLATE_FRAGMENT = 1;
	const TEMPLATE_USE_IMPORT_NODE = 1 << 1;

	/** @import { ComponentContext, Derived, Effect, Reaction, Signal, Source, Value } from '#client' */

	/** @type {null | Effect} */
	let active_effect = null;

	/** @import { TemplateNode } from '#client' */

	/** @type {() => Node | null} */
	var first_child_getter;

	/**
	 * @template {Node} N
	 * @param {N} node
	 * @returns {Node | null}
	 */
	/*@__NO_SIDE_EFFECTS__*/
	function get_first_child(node) {
		return first_child_getter.call(node);
	}

	/**
	 * Don't mark this as side-effect-free, hydration needs to walk all nodes
	 * @template {Node} N
	 * @param {N} node
	 * @param {boolean} is_text
	 * @returns {Node | null}
	 */
	function child(node, is_text) {
		{
			return get_first_child(node);
		}
	}

	/** @param {string} html */
	function create_fragment_from_html(html) {
		var elem = document.createElement('template');
		elem.innerHTML = html;
		return elem.content;
	}

	/** @import { Effect, TemplateNode } from '#client' */

	/**
	 * @param {TemplateNode} start
	 * @param {TemplateNode | null} end
	 */
	function assign_nodes(start, end) {
		var effect = /** @type {Effect} */ (active_effect);
		if (effect.nodes_start === null) {
			effect.nodes_start = start;
			effect.nodes_end = end;
		}
	}

	/**
	 * @param {string} content
	 * @param {number} flags
	 * @returns {() => Node | Node[]}
	 */
	/*#__NO_SIDE_EFFECTS__*/
	function template(content, flags) {
		var is_fragment = (flags & TEMPLATE_FRAGMENT) !== 0;
		var use_import_node = (flags & TEMPLATE_USE_IMPORT_NODE) !== 0;

		/** @type {Node} */
		var node;

		/**
		 * Whether or not the first item is a text/element node. If not, we need to
		 * create an additional comment node to act as `effect.nodes.start`
		 */
		var has_start = !content.startsWith('<!>');

		return () => {

			if (node === undefined) {
				node = create_fragment_from_html(has_start ? content : '<!>' + content);
				if (!is_fragment) node = /** @type {Node} */ (get_first_child(node));
			}

			var clone = /** @type {TemplateNode} */ (
				use_import_node ? document.importNode(node, true) : node.cloneNode(true)
			);

			if (is_fragment) {
				var start = /** @type {TemplateNode} */ (get_first_child(clone));
				var end = /** @type {TemplateNode} */ (clone.lastChild);

				assign_nodes(start, end);
			} else {
				assign_nodes(clone, clone);
			}

			return clone;
		};
	}

	/**
	 * Assign the created (or in hydration mode, traversed) dom elements to the current block
	 * and insert the elements into the dom (in client mode).
	 * @param {Text | Comment | Element} anchor
	 * @param {DocumentFragment | Element} dom
	 */
	function append(anchor, dom) {

		if (anchor === null) {
			// edge case — void `<svelte:element>` with content
			return;
		}

		anchor.before(/** @type {Node} */ (dom));
	}

	var root = template(`<main><h1></h1></main>`);

	function Popup($$anchor) {
		let message = "Hello, this is a test!";
		var main = root();
		var h1 = child(main);

		h1.textContent = message;
		append($$anchor, main);
	}

	// popup.js

	const app = new Popup({
	  target: document.getElementById('svelte-root')
	});

	return app;

})();
