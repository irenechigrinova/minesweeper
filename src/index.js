import './index.scss';
import init from './init';
import isBrowserCompatible from './utils/isBrowserCompatible';

import renderAlertModal from './renders/renderAlertModal';

if (!isBrowserCompatible()) renderAlertModal();
else init();
