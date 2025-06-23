export function getPopUpTextFor(data) {
  let trackAdditionalText = data.options.type === "TRACK" ? `<div style="padding: 6px; border: 1px solid #ddd; font-weight: bold;">Track Reference</div>
    <div style="padding: 6px; border: 1px solid #ddd;">${data.options.trackNumberReference}</div>` : ''
  let defaultText = `
    <h2 style="
    margin: 0 0 12px 0;
    font-size: 16px;
    font-weight: 600;
    text-align: center;
  ">${data.options.name}</h2>

  <div style="
    display: grid;
    grid-template-columns: max-content auto;
    font-size: 12px;
    gap: 0;
    align-items: center;
    justify-content: center;
    margin: auto;
  ">
    <div style="padding: 6px; border: 1px solid #ddd; font-weight: bold;">ID</div>
    <div style="padding: 6px; border: 1px solid #ddd;">${data.options.id}</div>

    <div style="padding: 6px; border: 1px solid #ddd; font-weight: bold;">Lat</div>
    <div style="padding: 6px; border: 1px solid #ddd;">${data._latlng.lat.toFixed(5)}</div>

    <div style="padding: 6px; border: 1px solid #ddd; font-weight: bold;">Lng</div>
    <div style="padding: 6px; border: 1px solid #ddd;">${data._latlng.lng.toFixed(5)}</div>

    <div style="padding: 6px; border: 1px solid #ddd; font-weight: bold;">Speed</div>
    <div style="padding: 6px; border: 1px solid #ddd;">${data.options.speed}</div>

    <div style="padding: 6px; border: 1px solid #ddd; font-weight: bold;">Course</div>
    <div style="padding: 6px; border: 1px solid #ddd;">${data.options.course}</div>

    <div style="padding: 6px; border: 1px solid #ddd; font-weight: bold;">Track Source</div>
    <div style="padding: 6px; border: 1px solid #ddd;">${data.options.trackNumberSource}</div>

    ${trackAdditionalText}
  </div>`

  return defaultText
}