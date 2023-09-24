import {IButtons} from "../types/buttons";

export const headerButtons: IButtons[] = [{name: 'Buy', to: '/buy'}, {name: 'Mint', to: '/mint', color: '#658d1b'}, {name: 'employment', to: '/employment'}, {name: 'About', to: '/about'}]; //{name: 'Your collection', to: '/collection'},
export const buttons: IButtons[] = [{name: 'Buy', to: '/buy'}, {name: 'Mint', to: '/mint', color: 'blue'}, {name: 'Your collection', to: '/collection'}];
export const otherButtons: IButtons[] = [{name: 'Documentation', to: '/buy'}, {name: 'About', to: '/about'}, {name: 'FAQ', to: '/faq'}];
export const connectWalletHeaderButtons: IButtons[] = [{name: 'Disconnect', to: '/buy'}];
