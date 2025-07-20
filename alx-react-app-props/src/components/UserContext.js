import React from 'react';



const UserContext = React.createContext({
  userData: { name: "Ernest", age: 25, bio: "Loves money" },
  setUser: () => {}
}); 

export default UserContext;