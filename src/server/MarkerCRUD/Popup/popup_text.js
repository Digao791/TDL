export function getPopUpTextFor(type, values) {
  let finalText = `
    <div style="
      max-width: 300px;
      padding: 12px;
      box-sizing: border-box;
      font-family: sans-serif;
      border: 1px solid #ccc;
      border-radius: 8px;
    ">

      <h2 style="
        margin: 0 0 12px 0;
        font-size: 16px;
        font-weight: 600;
        text-align: center;
        word-break: break-word;
      ">${type}</h2>

      <div style="
        display: grid;
        grid-template-columns: max-content 1fr;
        font-size: 12px;
        gap: 0;
        align-items: stretch;
        word-break: break-word;
      ">
  `;

  for (let [key, value] of Object.entries(values)) {
    if (typeof value === "object") value = Object.values(value);
    finalText += `
      <div style="padding: 6px; border: 1px solid #ddd; font-weight: bold;">${key}</div>
      <div style="padding: 6px; border: 1px solid #ddd;">${value}</div>
    `;
  }

  finalText += `</div></div>`;

  return finalText;
}
