/* eslint-disable max-len */
export const chatIcon = (status) => {
  if (status === 'ON') {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
      <g fill="#FFF" stroke="#3876BE">
        <path d="M3.727 5.346H1.315c-.224 0-.427.093-.575.24-.147.148-.24.352-.24.576V16.8l1.825-1.81h9.513c.223 0 .424-.095.57-.244.151-.153.246-.363.246-.593v-2.188H5.352c-.449 0-.855-.182-1.15-.476-.293-.294-.475-.7-.475-1.149V5.346z"/>
        <path d="M4.41.5c-.279 0-.53.114-.714.297-.183.183-.297.435-.297.713v9.783c0 .279.115.532.298.717.183.183.435.298.712.298h10.464l2.618 1.828-.259-12.893c-.366-.157-.98-.288-2-.402C13.306.628 10.017.5 4.409.5z"/>
      </g>
    </svg>`;
  } else {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
    <g fill="#FFF" stroke="#555">
      <path d="M3.727 5.346H1.315c-.224 0-.427.093-.575.24-.147.148-.24.352-.24.576V16.8l1.825-1.81h9.513c.223 0 .424-.095.57-.244.151-.153.246-.363.246-.593v-2.188H5.352c-.449 0-.855-.182-1.15-.476-.293-.294-.475-.7-.475-1.149V5.346z"/>
      <path d="M4.41.5c-.279 0-.53.114-.714.297-.183.183-.297.435-.297.713v9.783c0 .279.115.532.298.717.183.183.435.298.712.298h10.464l2.618 1.828-.259-12.893c-.366-.157-.98-.288-2-.402C13.306.628 10.017.5 4.409.5z"/>
    </g>
  </svg>`;
  }
};