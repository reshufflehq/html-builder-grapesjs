import '@reshuffle/code-transform/macro';

import React, { useEffect, useState } from 'react';
import { GEditor } from 'grapesjs-react';
import GrapesJS from 'grapesjs';
import LoginNav from '../LoginNav';
import { saveHtml } from '../../../backend/backend';
import './htmlEditor.css';

export default function HtmlEditor() {
  const [editor, setEditor] = useState(GrapesJS.editors[0]);

  useEffect(() => {
    const savePage = async () => {
      try {
        const editor = GrapesJS.editors[0];
        const commands = editor.Commands;
        commands.add('my-command-id', editor => {
          alert('This is my command');
        });

        setEditor(editor);
        if (editor) {
          await saveHtml(editor.getHtml(), editor.getCss());
        }
      } catch (error) {
        console.log('TCL: HtmlEditor -> savePage -> error', error);
      }
    };
    savePage();
    // to display editor mode use editor.runCommand('preview') &&
  }, []);

  const onSave = async () => {
    if (editor) {
      editor.runCommand('my-command-id');
      await saveHtml(editor.getHtml(), editor.getCss());
    }
  };

  return (
    <>
      {<LoginNav handleSave={onSave} />}
      <div className='container-fluid'>
        <div>
          <GEditor id='geditor' webpage />
        </div>
      </div>
    </>
  );
}
