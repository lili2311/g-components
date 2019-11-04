/**
 * @file
 * Util functions for UK elections
 */

export const getPartyInfo = name => {
  switch (name.toUpperCase()) {
    case 'CONSERVATIVE':
      return {
        color: '#149adb',
        shortName: 'Con',
      };
    case 'LABOUR':
      return {
        color: '#cf4d3c',
        shortName: 'Lab',
      };
    case 'LIBERAL DEMOCRATS':
      return {
        color: '#f09000',
        shortName: 'Lib Dem',
      };
    case 'GREEN':
      return {
        color: '#8deb9d',
        shortName: 'Green',
      };
    case 'CHANGE UK':
      return {
        color: '#fc8b9d',
        shortName: 'TIGfC',
      };
    case 'BREXIT':
      return {
        color: '#80cfd6',
        shortName: 'Brexit',
      };
    case 'UKIP':
      return {
        color: '#7200ab',
        shortName: 'UKIP',
      };
    case 'PLAID CYMRU':
      return {
        color: '#990000',
        shortName: 'PC',
      };
    case 'SNP':
      return {
        color: '#ffdf00',
        shortName: 'SNP',
      };
    case 'SINN FÉIN':
      return {
        color: '#006643',
        shortName: 'SF',
      };
    case 'DUP':
      return {
        color: '#210066',
        shortName: 'DUP',
      };
    case 'UUP':
      return {
        color: '#3f67cc',
        shortName: 'UUP',
      };
    case 'SDLP':
      return {
        color: '#5ba373',
        shortName: 'SDLP',
      };
    case 'ALLIANCE':
      return {
        color: '#ffbe18',
        shortName: 'APNI',
      };
    case 'INDEPENDENT/OTHER':
      return {
        color: '#d9cace',
        shortName: 'Ind/Oth',
      };
    default:
      return name;
  }
};

export default null;
