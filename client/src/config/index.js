export const registerFormControls = [
  {
    name: "userName",
    label: "User Name",
    placeholder: "Enter your user name",
    componentType: "input",
    type: "text",
    required: true
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
    required: true
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Password must be at least 8 characters long",
    componentType: "input",
    type: "password",
    required: true
  },
  {
    name: "department",
    label: "Department",
    componentType: "select",
    options: [
      { id: "ICT", label: "ICT" },
      { id: "IAT", label: "IAT" },
      { id: "ET", label: "ET" },
      { id: "AT", label: "AT" },
      
    ],
    defaultOption: { id: "ICT", label: "ICT" },
    required: true
  },
];

export const loginFormControls = [
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
    required: true
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
    required: true
  },
];

export const addProductFormElements = [
  {
    label: "Title",
    name: "title",
    componentType: "input",
    type: "text",
    placeholder: "Enter Inventory Name",
    required: true
  },
  {
    label: "Device",
    name: "device",
    componentType: "select",
    options: [
      { id: "Computer", label: "Computer" },
      { id: "Server", label: "Server" },
      { id: "Printer", label: "Printer" },
      { id: "Projector", label: "Projector" },
      { id: "Router", label: "Router" },
      { id: "Camera", label: "Camera" },
    ],
    // defaultOption: { id: "Computer", label: "Computer" },
    required: true
  },

  {
    label: "ID",
    name: "did",
    componentType: "input",
    type: "text",
    placeholder: "Enter Device ID",
    required: true
  },
  {
    label: "Description",
    name: "description",
    componentType: "textarea",
    placeholder: "Enter Inventory description",
    required: true
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
    // defaultOption: { id: "ICT", label: "ICT" },
    required: true
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
    // defaultOption: { id: "Laboratory", label: "Laboratory" },
    required: true
  },
  {
    label: "Hall ID",
    name: "hallid",
    componentType: "select",
    options: [
      { id: "A 101", label: "A 101" },
      { id: "A 102", label: "A 102" },
      { id: "A 201", label: "A 201" },
      { id: "A 202", label: "A 202" },
      { id: "A 401", label: "A 401" },
      { id: "A 402", label: "A 402" },
      { id: "AG 01", label: "AG 01" },
      { id: "AG 02", label: "AG 02" },
      { id: "AG 03", label: "AG 03" },
      { id: "B 101", label: "B 101" },
      { id: "B 102", label: "B 102" },
      { id: "B 201", label: "B 201" },
      { id: "B 202", label: "B 202" },
      { id: "B 301", label: "B 301" },
      { id: "B 302", label: "B 302" },
      { id: "B 303", label: "B 303" },
      { id: "B 403", label: "B 403" },
      { id: "B 404", label: "B 404" },
      { id: "BG 01", label: "BG 01" },
      { id: "BG 02", label: "BG 02" },
      { id: "C 101", label: "C 101" },
      { id: "C 102", label: "C 102" },
      { id: "C 201", label: "C 201" },
      { id: "C 202", label: "C 202" },
      { id: "C 301", label: "C 301" },
      { id: "C 302", label: "C 302" },
      { id: "C 303", label: "C 303" },
      { id: "C 401", label: "C 401" },
      { id: "C 403", label: "C 403" },
      { id: "CG 01", label: "CG 01" },
      { id: "D 101", label: "D 101" },
      { id: "D 102", label: "D 102" },
      { id: "D 201", label: "D 201" },
      

    ],
    // defaultOption: { id: "A101", label: "A 101" },
    required: true
  },
  {
    label: "Condition",
    name: "condition",
    componentType: "select",
    options: [
     { id: "Working/Functional", label: "Working/Functional" },
     { id: "Damaged", label: "Damaged" },
     { id: "Under Maintenance", label: "Under Maintenance" },
     { id: "Faulty", label: "Faulty" },
    ],
    // defaultOption: { id: "Functional", label: "Working/Functional" },
    required: true
  },
  
  {
    label: "Repair Date",
    name: "Repairdate",
    componentType: "input",
    type: "date",
    placeholder: "Select a date",
    required: true
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
  // {
  //   id: "About",
  //   label: "About us",
  //   url: "https://cmb.ac.lk/", 
  // },
  // {
  //   id: "iat",
  //   label: "Support",
  //   path: "/shop/listing",
  // },
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
  device: [
    { id: "Computer", label: "Computer" },
    { id: "Server", label: "Server" },
    { id: "Printer", label: "Printer" },
    { id: "Projector", label: "Projector" },
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
//Create for Notification function
export const EditRepairDate = [
  {
    label: "Repair Date",
    name: "Repairdate",
    componentType: "input",
    type: "date",
    placeholder: "Select a date",
  },
];
