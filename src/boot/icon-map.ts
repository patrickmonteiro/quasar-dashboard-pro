import { defineBoot } from '#q-app';
import { Quasar } from 'quasar';

/**
 * Every <q-icon>/icon prop in the app uses plain Material Icons names
 * (e.g. "dashboard"). Remapping them here to their Material Symbols
 * Outlined equivalent means switching icon sets never requires touching
 * call sites — only this file and the `iconSet`/`extras` in quasar.config.ts.
 */
export default defineBoot(() => {
  Quasar.iconSet.iconMapFn = (iconName) => {
    if (iconName.includes(':') || iconName.startsWith('sym_') || iconName.startsWith('mdi-')) {
      return undefined;
    }

    return { icon: `sym_o_${iconName}` };
  };
});
