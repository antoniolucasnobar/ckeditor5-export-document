/**
 * @module exportDocument/exportDocument
 */

import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

import ExportDocumentEditing from './exportDocumentEditing';
import ExportDocumentUI from './exportDocumentUI';

/**
 * Export Document plugin.
 *
 * It allows you to export your document to any format you want (since you provide a function that does the conversion)
 *
 * As for now, it provides builtin support to RTF export
 *
 * This is a "glue" plugin which loads the {@link module:exportDocument/exportDocumentediting~ExportDocumentEditing} and
 * {@link module:exportDocument/exportDocumentui~ExportDocumentUI} plugins.
 *
 * @extends module:core/plugin~Plugin
 */
export default class ExportDocument extends Plugin {
	/**
	 * @inheritDoc
	 */
	static get requires() {
		return [ ExportDocumentEditing, ExportDocumentUI ];
	}

	/**
	 * @inheritDoc
	 */
	static get pluginName() {
		return 'ExportDocument';
	}
}

/**
 * The exportDocument option descriptor.
 *
 *		{
 *			extension: 'rtf'
 *			title: 'Export to RTF',
 *			icon: rtfIcon,
 *			export: (text) => {},
 *			mime: 'application/rtf;charset=utf-8'
 *		}
 *
 * @typedef {Object} module:exportDocument/exportDocument~ExportDocumentOption
 * @property {String} extension unique identifier of the option
 * @property {String} title the title of the export option
 * @property {String} icon the icon to be shown in the toolbar
 * @property {Function} export The function to transform the contents
 * @property {String} mime Mime type of the object
 */

