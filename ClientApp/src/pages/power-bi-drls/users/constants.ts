export const Menus = [
  {
    name: "View",
    route: "/power-bi-drls/users",
    privilegeRequired: "READ",
  },
  {
    name: "Add",
    route: "/power-bi-drls/users/add",
    privilegeRequired: "WRITE",
  },
  {
    name: "Edit",
    route: "/power-bi-drls/users/update",
    privilegeRequired: "WRITE",
  },
  {
    name: "History",
    route: "/power-bi-drls/users/history",
    privilegeRequired: "READ",
  },
];
export const UserHeadings = [
  // {
  //   id: "DFH1",
  //   label: "PORTAL ACCESS ID",
  //   name: "id",
  //   sorted: false,
  // },
  {
    id: "DFH2",
    label: "USER EMAIL",
    name: "userEmail",
    sorted: false,
  },
  {
    id: "DFH3",
    label: "Profile",
    name: "pbiRlsTeamAccessName",
    sorted: false,
  },
  {
    id: "DFH4-1",
    label: "ACCESS",
    name: "access",
    sorted: false,
  },
  {
    id: "DFH4",
    label: "STATUS",
    name: "status",
    sorted: false,
  },

  {
    id: "DFH5",
    label: "CREATED",
    name: "createTs",
    sorted: false,
  },
  {
    id: "DFH6",
    label: "MODIFIED",
    name: "modifiedTs",
    sorted: false,
  },
  {
    id: "DFH7",
    label: "CREATED BY",
    name: "createdBy",
    sorted: false,
  },
  {
    id: "DFH8",
    label: "MODIFIED BY",
    name: "modifiedBy",
    sorted: false,
  },
];

export const accessOptions = ["Read", "Write", "Admin"];
export const statusOptions = ["Active", "Inactive"];
export const isActiveOptions = ["true", "false"];
export const roleOptions = [
  "Content Creator",
  "Content Consumer",
  "Content Publisher",
  "Content Reviewer",
  "Power BI Admin User",
];
