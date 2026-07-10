import { CS_CASE } from './csCase';
import { DOFE_CASE } from './dofeCase';
import { KITKAT_CASE } from './kitkatCase';
import { PILULKA_CASE } from './pilulkaCase';
import { SPORTISIMO_CASE } from './sportisimoCase';

export const EDITORIAL_CASES = {
  pilulka: PILULKA_CASE,
  cs: CS_CASE,
  kitkat: KITKAT_CASE,
  dofe: DOFE_CASE,
  sportisimo: SPORTISIMO_CASE,
};

export function getEditorialCase(slug) {
  return EDITORIAL_CASES[slug] ?? null;
}
