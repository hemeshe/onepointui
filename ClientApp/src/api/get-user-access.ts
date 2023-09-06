import { Api } from '../helpers/api';
import { Fetch } from '../helpers/fetch';

export const GetUserAccess = async () => {
  //let response = await Fetch(`${Api}/Account/PortalAccess`, "GET");
  let response = await Fetch(`${Api}/Account/UserAccess/Portal`, 'GET');
  if (!response.ok) {
    throw Error(response.statusText);
  }
  // let json = {
  //   id: 6337,
  //   userEmail: 'MUTHUKUMAR.KM@SHELL.COM',
  //   access: 'ADMIN',
  //   isActive: true,
  //   createTs: '2020-12-04T18:11:26',
  //   createBy: 'Bipin.Swarnkar@shell.com',
  //   modifiedTs: '2021-10-11T07:53:53',
  //   modifiedBy: 'Bipin.Swarnkar@shell.com',
  //   iv: 'NA',
  // };
  let json = await response.json();
  return json;
};
