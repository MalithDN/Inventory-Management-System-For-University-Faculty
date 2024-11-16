export const registerFormControls = [
  {
    name: "userName",
    label: "User Name",
    placeholder: "Enter your user name",
    componentType: "input",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const loginFormControls = [
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const addProductFormElements = [
  {
    label: "Title",
    name: "title",
    componentType: "input",
    type: "text",
    placeholder: "Enter Inventory Name",
  },
  {
    label: "Device",
    name: "device",
    componentType: "select",
    options: [
      { id: "Computer", label: "Computer" },
      { id: "Server", label: "Server" },
      { id: "Printer", label: "Printer" },
      { id: "Projector", label: "Projecter" },
      { id: "Router", label: "Router" },
      { id: "Camera", label: "Camera" },
    ],
  },

  {
    label: "ID",
    name: "did",
    componentType: "input",
    type: "number",
    placeholder: "Enter Device ID",
  },
  {
    label: "Description",
    name: "description",
    componentType: "textarea",
    placeholder: "Enter Inventory description",
  },
  {
    label: "Department",
    name: "department",
    componentType: "select",
    options: [
      { id: "ICT", label: "ICT" },
      { id: "IAT", label: "IAT" },
      { id: "ET", label: "ET" },
      { id: "AT", label: "AT" },
      
    ],
  },
  
  
  {
    label: "Hall Type",
    name: "halltype",
    componentType: "select",
    options: [
      { id: "Laboratory", label: "Laboratory" },
      { id: "Lecture hall", label: "Lecture hall" },
      { id: "Conference room", label: "Conference room" },
      { id: "Office Room", label: "Office Room" },

    ],
  },
  {
    label: "Hall ID",
    name: "hallid",
    componentType: "select",
    options: [
      { id: "Ground", label: "Ground" },
      { id: "1st", label: "1st floor" },
      { id: "2nd", label: "2nd floor" },
      { id: "3rd", label: "3rd floor" },
      { id: "4th", label: "4th floor" },
      { id: "5th", label: "5th floor" },
    ]
  },
  {
    label: "Condition",
    name: "condition",
    componentType: "select",
    options: [
     { id: "Functional", label: "Working/Functional" },
     { id: "Damaged", label: "Damaged" },
     { id: "New", label: "New" },
     { id: "Faulty", label: "Faulty" },
    ]
  },
  
  {
    label: "Repair Date",
    name: "Repairdate",
    componentType: "input",
    type: "date",
    placeholder: "Select a date",
  }
];

export const shoppingViewHeaderMenuItems = [
  {
    id: "home",
    label: "Home",
    path: "/shop/home",
  },
  {
    id: "products",
    label: "Inventory",
    path: "/shop/listing",
  },
  {
    id: "About",
    label: "About us",
    url: "https://cmb.ac.lk/", 
  },
  {
    id: "iat",
    label: "Support",
    path: "/shop/listing",
  },
  // {
  //   id: "et",
  //   label: "FOT",
  //   path: "/shop/listing",
  // },
  // {
  //   id: "at",
  //   label: "AT",
  //   path: "/shop/listing",
  // },
  // {
  //   id: "account",
  //   label: "Reports",
  //   path: "shop/account",
  // },
  {
    id: "search",
    label: "Search",
    path: "/shop/search",
  },
];

export const departmentOptionsMap = {
  ICT: "ICT",
  IAT: "IAT",
  ET: "ET",
  AT: "AT",
};

export const categoryOptionsMap = {
  Computer: "Computer",
  Server: "Server",
  Printer: "Printer",
  Projector: "Projector",
  Router: "Router",
  Camera: "Camera",
};

export const filterOptions = {
  department: [
    { id: "ICT", label: "ICT" },
    { id: "IAT", label: "IAT" },
    { id: "ET", label: "ET" },
    { id: "AT", label: "AT" },
  ],
  category: [
    { id: "Computer", label: "Computer" },
    { id: "Server", label: "Server" },
    { id: "Printer", label: "Printer" },
    { id: "Projecter", label: "Projecter" },
    { id: "Router", label: "Router" },
    { id: "Camera", label: "Camera" },
  ],
};

export const sortOptions = [
  { id: "title-atoz", label: "Title: A to Z" },
  { id: "title-ztoa", label: "Title: Z to A" },
];

export const addressFormControls = [
  {
    label: "Address",
    name: "address",
    componentType: "input",
    type: "text",
    placeholder: "Enter your address",
  },
  {
    label: "City",
    name: "city",
    componentType: "input",
    type: "text",
    placeholder: "Enter your city",
  },
  {
    label: "Pincode",
    name: "pincode",
    componentType: "input",
    type: "text",
    placeholder: "Enter your pincode",
  },
  {
    label: "Phone",
    name: "phone",
    componentType: "input",
    type: "text",
    placeholder: "Enter your phone number",
  },
  {
    label: "Notes",
    name: "notes",
    componentType: "textarea",
    placeholder: "Enter any additional notes",
  },
];
