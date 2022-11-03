import { deviceHeight, deviceWidth } from './platform';

const ASPECT_RATIO = deviceWidth / deviceHeight;

export const DEFAULT_LATITUDE = -6.175094;
export const DEFAULT_LONGITUDE = 106.8272;
export const LATITUDE_DELTA = 0.005;
export const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
