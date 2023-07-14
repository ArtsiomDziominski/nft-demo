import {IButtons} from "../types/buttons";

export const buttons: IButtons[] = [{name: 'Buy', to: '/buy'}, {name: 'Mint', to: '/mint', color: 'blue'}, {name: 'Your collection', to: '/collection'}];
// export const buttons: IButtons[] = [{name: 'Buy', to: '/buy'}, {name: 'Mint', to: '/mint', color: 'blue'}, {name: 'Your collection', to: '/collection'}, {name: 'Rewards', to: '/rewards'}, {name: 'Statistic', to: '/statistic'}, {name: 'About', to: '/about'}, {name: 'FAQ', to: '/faq'}];
export const otherButtons: IButtons[] = [{name: 'Documentation', to: '/buy'}, {name: 'About', to: '/about'}, {name: 'FAQ', to: '/faq'}];
export const connectWalletHeaderButtons: IButtons[] = [{name: 'Disconnect', to: '/buy'}];
