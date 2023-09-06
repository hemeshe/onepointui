export const Menus = [
  {
    name: "View",
    route: "/admin/mi-portal",
    privilegeRequired: "READ",
  },
  {
    name: "Add",
    route: "/admin/mi-portal/add",
    privilegeRequired: "WRITE",
  },
  {
    name: "Edit",
    route: "/admin/mi-portal/update",
    privilegeRequired: "WRITE",
  },
  {
    name: "History",
    route: "/admin/mi-portal/history",
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
