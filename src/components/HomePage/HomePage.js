import '@reshuffle/code-transform/macro';
import React, { useEffect, useState } from 'react';
import HtmlEditor from '../HtmlEditor/HtmlEditor';
import LoginNav from '../LoginNav';
import GrapesJS from 'grapesjs';
import { getHtmlData, getCssData, saveHtml } from '../../../backend/backend';

export default function HomePage() {
  const [htmlContent, setHtmlContent] = useState();

  useEffect(() => {
    const loadHtml = async () => {
      const html = await getHtmlData();
      const css = await getCssData();
      const js = `<script>
      function newRegister() {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
          if (this.readyState == 4 && this.status == 200) {
            document.getElementById("form").innerHTML = "<div>Thank you for registering!<div>"
          }
        };
        xhttp.open("POST", "./register", true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send({"email": + document.getElementById("email").value});
      }
    </script>`;
      let htmlWithCss = `<style>${css}</style>` + html + js;

      setHtmlContent(htmlWithCss);
    };

    loadHtml();
  }, []);
  return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
}
