import { CS_CASE } from './csCase';
import { PILULKA_CASE } from './pilulkaCase';

export const EDITORIAL_CASES = {
  pilulka: PILULKA_CASE,
  cs: CS_CASE,
};

export function getEditorialCase(slug) {
  return EDITORIAL_CASES[slug] ?? null;
}
