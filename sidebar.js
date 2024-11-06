const sidebar = document.createElement("div");
sidebar.id = "translateSidebar";
sidebar.style = `
  position: fixed;
  right: 0;
  top: 0;
  width: 300px;
  height: 100vh;
  background-color: #f9f9f9;
  z-index: 10000;
  box-shadow: -2px 0px 5px rgba(0,0,0,0.1);
`;
sidebar.innerHTML = "<p>Translation Sidebar Loaded Successfully</p>";
document.body.appendChild(sidebar);
