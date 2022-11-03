
/* eslint-disable max-len */
const bonusIcon = (status) => {
  if (status === 'ON') {
    return `<?xml version="1.0" encoding="UTF-8"?>
    <svg xmlns="http://www.w3.org/2000/svg" width="60" height="14" viewBox="0 0 60 14">
      <g fill="none" fill-rule="evenodd">
        <g fill="#00C04B">
          <g>
            <path stroke="#00C04B" stroke-width=".6" d="M2.082 2h5.954c.067 0 .12.054.12.12v.625h1.237c.2 0 .382.08.512.212.13.13.213.311.213.51v2.42c0 .12-.027.23-.077.328-.05.1-.124.186-.22.256L8.115 7.723l-.014.01-1.583 1.158c-.064.047-.114.106-.147.171-.032.064-.05.139-.05.22v1.704h1.11c.202 0 .382.082.513.213.13.132.212.313.212.512v.919c0 .067-.053.12-.12.12H2.082c-.067 0-.12-.053-.12-.12v-.919c0-.2.081-.38.212-.512.13-.13.313-.213.512-.213h1.208V9.38c0-.08-.017-.152-.048-.218-.032-.063-.08-.122-.144-.169L2.017 7.732l-.006-.004L.296 6.471c-.095-.07-.169-.155-.219-.256C.027 6.117 0 6.006 0 5.887v-2.42c0-.199.082-.38.213-.51.13-.132.312-.212.512-.212H1.96V2.12c0-.066.054-.12.12-.12zM6.2 11.227H2.686c-.134 0-.254.056-.341.143-.088.087-.143.209-.143.341v.798h5.713v-.798c0-.134-.053-.254-.14-.341h-.002c-.087-.087-.207-.143-.341-.143H6.2zm-2.756-6.49c-.034.002-.065.016-.089.043-.043.05-.04.125.01.169l.817.72-.236 1.053c-.01.032-.007.066.012.096.033.057.107.075.164.042l.937-.554.935.554c.025.015.056.021.087.013.066-.013.106-.077.092-.142L5.936 5.67l.816-.72h-.001c.023-.02.038-.047.042-.078.005-.066-.044-.126-.11-.13l-1.082-.105-.43-.997h-.002c-.011-.027-.032-.05-.062-.064-.062-.025-.132.002-.159.064l-.431.997-1.073.1zm1.166.133l-.877.082.661.582c.032.029.047.074.037.117l-.192.859.756-.447c.037-.023.086-.023.124-.002l.758.45-.189-.85c-.015-.043-.002-.093.035-.127l.661-.58-.868-.082c-.045-.002-.089-.029-.107-.074l-.35-.807-.348.804c-.015.04-.054.072-.1.075zm3.546-1.884v4.408L9.68 6.277c.066-.047.114-.105.148-.17.033-.064.05-.14.05-.22v-2.42c0-.132-.054-.252-.143-.34h0c-.087-.088-.207-.141-.34-.141H8.155zM1.961 7.394V2.986H.725c-.134 0-.255.053-.342.142-.087.087-.14.207-.14.34v2.42c0 .08.016.155.048.219.034.065.084.123.147.17l1.523 1.117zM7.915 2.24H2.202v5.33L3.846 8.8c.093.07.165.156.214.254.05.099.077.21.077.325v1.606H6.08V9.281c0-.119.026-.23.077-.328.05-.099.123-.186.219-.256l1.54-1.128V2.241h0z" transform="translate(-43 -181) translate(44 181)"/>
            <text font-family="Roboto-Regular, Roboto" font-size="12" transform="translate(-43 -181) translate(44 181)">
              <tspan x="16" y="11">Bonus</tspan>
            </text>
          </g>
        </g>
      </g>
    </svg>`;
  } else {
    return `<?xml version="1.0" encoding="UTF-8"?>
    <svg xmlns="http://www.w3.org/2000/svg" width="60" height="14" viewBox="0 0 60 14">
      <g fill="none" fill-rule="evenodd">
        <g>
          <g>
            <path stroke="#C6C5C5" stroke-width=".6" d="M2.082 2h5.954c.067 0 .12.054.12.12v.625h1.237c.2 0 .382.08.512.212.13.13.213.311.213.51v2.42c0 .12-.027.23-.077.328-.05.1-.124.186-.22.256L8.115 7.723l-.014.01-1.583 1.158c-.064.047-.114.106-.147.171-.032.064-.05.139-.05.22v1.704h1.11c.202 0 .382.082.513.213.13.132.212.313.212.512v.919c0 .067-.053.12-.12.12H2.082c-.067 0-.12-.053-.12-.12v-.919c0-.2.081-.38.212-.512.13-.13.313-.213.512-.213h1.208V9.38c0-.08-.017-.152-.048-.218-.032-.063-.08-.122-.144-.169L2.017 7.732l-.006-.004L.296 6.471c-.095-.07-.169-.155-.219-.256C.027 6.117 0 6.006 0 5.887v-2.42c0-.199.082-.38.213-.51.13-.132.312-.212.512-.212H1.96V2.12c0-.066.054-.12.12-.12zM6.2 11.227H2.686c-.134 0-.254.056-.341.143-.088.087-.143.209-.143.341v.798h5.713v-.798c0-.134-.053-.254-.14-.341h-.002c-.087-.087-.207-.143-.341-.143H6.2zm-2.756-6.49c-.034.002-.065.016-.089.043-.043.05-.04.125.01.169l.817.72-.236 1.053c-.01.032-.007.066.012.096.033.057.107.075.164.042l.937-.554.935.554c.025.015.056.021.087.013.066-.013.106-.077.092-.142L5.936 5.67l.816-.72h-.001c.023-.02.038-.047.042-.078.005-.066-.044-.126-.11-.13l-1.082-.105-.43-.997h-.002c-.011-.027-.032-.05-.062-.064-.062-.025-.132.002-.159.064l-.431.997-1.073.1zm1.166.133l-.877.082.661.582c.032.029.047.074.037.117l-.192.859.756-.447c.037-.023.086-.023.124-.002l.758.45-.189-.85c-.015-.043-.002-.093.035-.127l.661-.58-.868-.082c-.045-.002-.089-.029-.107-.074l-.35-.807-.348.804c-.015.04-.054.072-.1.075zm3.546-1.884v4.408L9.68 6.277c.066-.047.114-.105.148-.17.033-.064.05-.14.05-.22v-2.42c0-.132-.054-.252-.143-.34h0c-.087-.088-.207-.141-.34-.141H8.155zM1.961 7.394V2.986H.725c-.134 0-.255.053-.342.142-.087.087-.14.207-.14.34v2.42c0 .08.016.155.048.219.034.065.084.123.147.17l1.523 1.117zM7.915 2.24H2.202v5.33L3.846 8.8c.093.07.165.156.214.254.05.099.077.21.077.325v1.606H6.08V9.281c0-.119.026-.23.077-.328.05-.099.123-.186.219-.256l1.54-1.128V2.241h0z" transform="translate(-43 -181) translate(44 181)"/>
              <text fill="#C6C5C5" font-family="Roboto-Regular, Roboto" font-size="12" transform="translate(-43 -181) translate(44 181)">
                <tspan x="16" y="11">Bonus</tspan>
              </text>
          </g>
        </g>
      </g>
    </svg>`;
  }
};

export default bonusIcon;