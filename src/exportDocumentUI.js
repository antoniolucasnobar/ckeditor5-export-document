
/**
 * @module exportDocument/exportDocumentui
 */

import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import {addToolbarToDropdown, createDropdown} from '@ckeditor/ckeditor5-ui/src/dropdown/utils';
import '../theme/exportDocument.css';
import documentIcon from '../theme/icons/document.svg'

/**
 * Export Document UI plugin.
 *
 * See the {@link module exportDocument/exportDocument~HighlightConfig#options configuration} to learn more
 * about the defaults.
 *
 * @extends module:core/plugin~Plugin
 */
export default class ExportDocumentUI extends Plugin {

	get localizedOptionTitles() {
		const t = this.editor.t;

		return {
			'Export to RTF': t( 'Export to RTF' ),
			'Export to PDF': t( 'Export to PDF' ),
			'Export to DOCX': t( 'Export to DOCX' ),
			'Export to TXT': t( 'Export to TXT' ),
		};
	}

	/**
	 * @inheritDoc
	 */
	static get pluginName() {
		return 'ExportDocumentUI';
	}

	/**
	 * @inheritDoc
	 */
	init() {
		const options = this.editor.config.get( 'export-document.options' );

		for ( const option of options ) {
			this._addHighlighterButton( option );
		}

		this._addDropdown( options );
	}

	/**
	 * Creates a toolbar button from the provided export options.
	 *
	 * @param {module:exportDocument/exportDocument~ExportDocumentOption} option
	 * @private
	 */
	_addHighlighterButton( option ) {
		const command = this.editor.commands.get( 'export-document' );

		this._addButton( 'export-document:' + option.extension, option.title,  option.icon , option, decorateHighlightButton );

		function decorateHighlightButton( button ) {
			button.bind( 'isEnabled' ).to( command, 'isEnabled' );
			button.bind( 'isOn' ).to( command, 'value', value => value === option.extension );
			button.isToggleable = true;
		}
	}

	/**
	 * Internal method for creating highlight buttons.
	 *
	 * @param {String} name The name of the button.
	 * @param {String} label The label for the button.
	 * @param {String} icon The button icon.
	 * @param {module exportDocument/exportDocument~HighlightOption} option the option object
	 * @param {Function} [decorateButton=()=>{}] Additional method for extending the button.
	 * @private
	 */
	_addButton( name, label, icon, option, decorateButton = () => {} ) {
		const editor = this.editor;

		editor.ui.componentFactory.add( name, locale => {
			const buttonView = new ButtonView( locale );

			const localized = this.localizedOptionTitles[ label ] ? this.localizedOptionTitles[ label ] : label;

			buttonView.set( {
				label: localized,
				icon,
				tooltip: true,
				class: 'export-button'
			} );

			buttonView.on( 'execute', () => {
				editor.execute( 'export-document', option );
				editor.editing.view.focus();
			} );

			// Add additional behavior for buttonView.
			decorateButton( buttonView );

			return buttonView;
		} );
	}

	/**
	 * Creates the button dropdown UI from the provided export options.
	 *
	 * @param {Array.<module exportDocument/exportDocument~ExportDocumentOption>} options
	 * @private
	 */
	_addDropdown( options ) {
		const editor = this.editor;
		const t = editor.t;
		const componentFactory = editor.ui.componentFactory;

		componentFactory.add( 'export-document', locale => {
			const dropdownView = createDropdown( locale );

			// Decorate dropdown's button.
			dropdownView.buttonView.set( {
				icon: documentIcon,
				label: t( 'Export Document' ),
				tooltip: true
			} );

			// Create buttons array.
			const buttons = options.map( option => {
				// Get existing exporter button.
				const buttonView = componentFactory.create( 'export-document:' + option.extension );

				return buttonView;
			} );


			addToolbarToDropdown( dropdownView, buttons );

			dropdownView.toolbarView.ariaLabel = t( 'Export Document options toolbar' );

			return dropdownView;
		} );
	}
}

