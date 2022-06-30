import React from "react";
import "./App.css";
import contactsJson from "./contacts.json";

function App() {
  const [contacts, setContacts] = React.useState(contactsJson.slice(0, 5));
  const [remainingContacts, setRemainingContacts] = React.useState(
    contactsJson.slice(5)
  );

  const [nameAscending, setNameAscending] = React.useState(true);
  const [popularityAscending, setPopularityAscending] = React.useState(true);

  const addContact = () => {
    if (remainingContacts.length > 0) {
      let rand = Math.floor(Math.random() * remainingContacts.length);
      setContacts(contacts.concat(remainingContacts[rand]));
      let contactCopy = [...remainingContacts];
      contactCopy.splice(rand, 1);
      setRemainingContacts(contactCopy);
    }
  };

  const deleteCeleb = (id) => {
    let filteredArr = contacts.filter(function (celeb) {
      return celeb.id !== id;
    });

    let filteredCeleb = contacts.find(function (celeb) {
      return celeb.id === id;
    });

    setContacts(filteredArr);
    setRemainingContacts(remainingContacts.concat(filteredCeleb));
  };

  const sortByName = () => {
    let cloneArr = [...contacts];
    cloneArr.sort((a, b) => {
      if (nameAscending) {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
    setNameAscending(!nameAscending);
    setContacts(cloneArr);
  };

  const sortByPopularity = () => {
    let cloneArr = [...contacts];
    cloneArr.sort((a, b) => {
      if (popularityAscending) {
        return a.popularity - b.popularity;
      } else {
        return b.popularity - a.popularity;
      }
    });
    setPopularityAscending(!popularityAscending);
    setContacts(cloneArr);
  };

  //create function sortByPopularity

  return (
    <div>
      <h1>Ironcontacts</h1>
      <h2>Currently viewing {contacts.length} celebrities</h2>
      <button onClick={addContact}>Add Celeb</button>
      <button onClick={sortByName}>
        Sort by Name ({nameAscending ? "ascending" : "descending"})
      </button>
      <button onClick={sortByPopularity}>
        Sort by Popularity ({popularityAscending ? "ascending" : "descending"})
      </button>
      <table>
        <tr>
          <th>Picture</th>
          <th>Name</th>
          <th>Popularity</th>
          <th>Won Oscar</th>
          <th>Won Emmy</th>
        </tr>
        <tbody>
          {contacts.map(function (contact) {
            return (
              <tr>
                <td>
                  <img
                    src={contact.pictureUrl}
                    alt="celeb"
                    width="30"
                    height="40"
                  />
                </td>
                <td>{contact.name}</td>
                <td>{contact.popularity}</td>
                <td>{contact.wonOscar && "🏆"}</td>
                <td>{contact.wonEmmy && "🏆"}</td>
                <td>
                  <button onClick={() => deleteCeleb(contact.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
