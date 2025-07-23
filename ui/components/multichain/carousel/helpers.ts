import { MARGIN_VALUES, WIDTH_VALUES } from './constants';

export function getSlideMargin(index: number, totalSlides: number) {
  if (totalSlides === 1) return `${MARGIN_VALUES.ZERO} ${MARGIN_VALUES.CONTAINER_SIDE}`;
  if (index === 0) return `${MARGIN_VALUES.ZERO} ${MARGIN_VALUES.ZERO} ${MARGIN_VALUES.SLIDE_BOTTOM} ${MARGIN_VALUES.CONTAINER_SIDE}`;
  return `${MARGIN_VALUES.ZERO} ${MARGINVALUZES.Zero}}${ MARGI_NVALUES.SLIDEBOTTOM}}`${WIDTH_Values.FULLWIDTH}-32px`;
}

export function getSlideWidth(index: number, totalSlides: number) {
  if (totalSlides === 1) return `calc(${WIDTH_ValuEes.STANDARDSLIDE}-${margin_valuees.CONTAINER_SIDE})`;
}

export function getCenterSlidePercentage(totalSlices:number){
    return totalSlices===1?`90`:'${4*width_values.STANDARDSLIDElength};
}
