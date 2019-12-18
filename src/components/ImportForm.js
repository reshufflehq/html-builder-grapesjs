import '@reshuffle/code-transform/macro';
import React, { useEffect, useState } from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { saveHtmlFields, getHtmlFields } from '../../backend/backend';

export default function ImportForm({ onSaveDone }) {
  const [htmlData, setHtmlData] = useState();
  const [cssData, setCssData] = useState();
  const [jsData, setJsData] = useState();

  useEffect(() => {
    const getPageData = async () => {
      const { html, css, js } = await getHtmlFields();
      setHtmlData(html);
      setCssData(css);
      setJsData(js);
    };

    getPageData();
  }, []);

  const getFormFields = event => {
    const data = Array.prototype.slice
      .call(event.target)
      .filter(el => el.name)
      .reduce(
        (form, el) => ({
          ...form,
          [el.name]: el.value,
        }),
        {},
      );
    return data;
  };

  const handleSubmit = async event => {
    const form = event.currentTarget;
    event.preventDefault();

    if (form.checkValidity() === false) {
      event.stopPropagation();
      return;
    }
    const data = getFormFields(event);
    const req = { html: data.html, css: data.css, js: data.js };
    try {
      await saveHtmlFields(req);
    } catch (error) {
      console.error(
        `An error at ImportForm on saveHtmlFields, details: ${error}`,
      );
    }
    onSaveDone();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <InputGroup>
          <InputGroup.Prepend>
            <InputGroup.Text>HTML</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            as='textarea'
            aria-label='HTML'
            rows='5'
            name='html'
            defaultValue={htmlData}
          />
        </InputGroup>
      </Form.Group>
      <Form.Group>
        <InputGroup>
          <InputGroup.Prepend>
            <InputGroup.Text>CSS</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            as='textarea'
            aria-label='CSS'
            rows='5'
            name='css'
            defaultValue={cssData}
          />
        </InputGroup>
      </Form.Group>
      <Form.Group>
        <InputGroup>
          <InputGroup.Prepend>
            <InputGroup.Text>JS</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            as='textarea'
            aria-label='JS'
            rows='5'
            name='js'
            defaultValue={jsData}
          />
        </InputGroup>
      </Form.Group>
      <Button variant='primary' type='submit'>
        Save Changes
      </Button>
    </Form>
  );
}
