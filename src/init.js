import React from 'react';

import 'moment/locale/de';

import { loadTheme, registerIcons } from '@fluentui/react';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// library could be replaced by setting <FontAwesomeIcon icon={faEdit} />
// directly, but this is only advantageous if the icon is only configured
// in this file and in all other files the fluent-icon-component is used
// which is not clear until now, so the more boilerplate was being chosen
library.add(faEdit, faPlus);

registerIcons({
  icons: {
    edit: <FontAwesomeIcon icon="edit" />,
    plus: <FontAwesomeIcon icon="plus" />,
  },
});

loadTheme({
  defaultFontStyle: {
    fontFamily: 'Open Sans',
  },
});
