import { IUser } from "./@types";
import "./App.css";
import Login from "./screens/login.screen";

import useLocalStorage from "./hooks/local-storage.hook";

function App() {
  
  const clients: IUser[] = [
    {
      clientId: "1",
      clientName: "John Doe",
      clientEmail: "johndoe@example.com",
      clientAddress: "123 Main St, New York, NY",
      clientPhone: "123-456-7890",
      clientPassword: "password123"
    },
    {
      clientId: "2",
      clientName: "Jane Smith",
      clientEmail: "janesmith@example.com",
      clientAddress: "456 Elm St, Los Angeles, CA",
      clientPhone: "987-654-3210",
      clientPassword: "securePass456"
    },
    {
      clientId: "3",
      clientName: "Alice Johnson",
      clientEmail: "alicejohnson@example.com",
      clientAddress: "789 Oak St, Chicago, IL",
      clientPhone: "456-789-1234",
      clientPassword: "alicePass789"
    },
    {
      clientId: "4",
      clientName: "Bob Brown",
      clientEmail: "bobbrown@example.com",
      clientAddress: "101 Pine St, Houston, TX",
      clientPhone: "321-654-9870",
      clientPassword: "bobSecure987"
    },
    {
      clientId: "5",
      clientName: "Charlie Green",
      clientEmail: "charliegreen@example.com",
      clientAddress: "202 Cedar St, Miami, FL",
      clientPhone: "789-123-4567",
      clientPassword: "charlie1234"
    },
    {
      clientId: "6",
      clientName: "Diana White",
      clientEmail: "dianawhite@example.com",
      clientAddress: "303 Birch St, Seattle, WA",
      clientPhone: "654-987-3210",
      clientPassword: "diana5678"
    },
    {
      clientId: "7",
      clientName: "Ethan Black",
      clientEmail: "ethanblack@example.com",
      clientAddress: "404 Maple St, Denver, CO",
      clientPhone: "987-321-6543",
      clientPassword: "ethanpass900"
    }
  ];

  
    useLocalStorage(clients,"users");

  return (
    <>
      <Login/> 
    </>
  );
}

export default App;
