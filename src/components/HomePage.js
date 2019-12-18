import '@reshuffle/code-transform/macro';
import React, { useEffect, useState } from 'react';
import { getHtmlFields } from '../../backend/backend';

export default function HomePage() {
  const [htmlContent, setHtmlContent] = useState();

  useEffect(() => {
    const loadHtml = async () => {
      const { html, css, js } = await getHtmlFields();
      const htmlWithCss = `<style>${css}</style>${html}<script>${js}</script>`;
      setHtmlContent(htmlWithCss);
    };

    loadHtml();
  }, []);
  return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
}
