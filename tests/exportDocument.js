/* global document */

import ExportDocument from '../src/exportDocument';
import ExportDocumentEditing from '../src/exportDocumentEditing';
import ExportDocumentUI from '../src/exportDocumentUI';

import ClassicTestEditor from '@ckeditor/ckeditor5-core/tests/_utils/classictesteditor';

describe( 'ExportDocument', () => {
	let editor, element;

	beforeEach( () => {
		element = document.createElement( 'div' );
		document.body.appendChild( element );

		return ClassicTestEditor
			.create( element, {
				plugins: [ ExportDocument ]
			} )
			.then( newEditor => {
				editor = newEditor;
			} );
	} );

	afterEach( () => {
		element.remove();

		return editor.destroy();
	} );

	it( 'requires ExportDocumentEditing and ExportDocumentUI', () => {
		expect( ExportDocument.requires ).to.deep.equal( [ ExportDocumentEditing, ExportDocumentUI ] );
	} );
} );
