import { atom } from "recoil";

export const configAtom = atom({
  key: 'configAtom',
  default: {
    healScale: 0.2,
    takenDamageScale: 0.2,
  }
});

export const apiKeyAtom = atom({
  key: 'apiKeyAtom',
  default: '',
})