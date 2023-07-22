import "./App.css";
import contacts from "./contacts.json";
import { useState } from "react";

function App() {
  const [movieContacts, setMovieContacts] = useState([
    contacts[0],
    contacts[1],
    contacts[2],
    contacts[3],
    contacts[4],
  ]);

  const addRandomContact = () => {
    //create an array that is the left over "contacts" that are not inside "movieContacts"
    const newArray = contacts.filter((singlecontact) => {
      return !movieContacts.includes(singlecontact);
    });

    if (newArray.length === 0) {
      document.getElementById("add-new-button").disabled = true;
    }
    const max = newArray.length - 1;
    const randomContact = newArray[Math.floor(Math.random() * max)];
    const movieContactsCopy = Array.from(movieContacts);
    movieContactsCopy.push(randomContact);
    setMovieContacts(movieContactsCopy);
  };

  const sortPopularity = () => {
    const sortedContacts = [...movieContacts].sort(
      (a, b) => b.popularity - a.popularity
    );
    setMovieContacts(sortedContacts);
  };

  const sortName = () => {
    const sortedContacts = [...movieContacts].sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
    setMovieContacts(sortedContacts);
  };

  const deleteContact = (passedId) => {
    //the id is passed
    //to find the single entry that has the exact ID and remove it
    const movieContactsCopy = Array.from(movieContacts);
    const foundPos = movieContactsCopy.findIndex(
      (contact) => contact.id === passedId
    );
    // const foundPos = () => {
    //   for (let i = 0; i < movieContactsCopy.length-1; i++) {
    //     if (movieContactsCopy[i].id === passedId) {
    //       return i;
    //     }
    //   }
    // };
    movieContactsCopy.splice(foundPos, 1);
    setMovieContacts(movieContactsCopy);
  };

  return (
    <div className="App">
      <h1>IronContacts</h1>
      <button id="add-new-button" onClick={addRandomContact}>
        Add a random contact
      </button>
      <button id="sort-name-button" onClick={sortName}>
        Sort by name
      </button>
      <button id="sort-popularity-button" onClick={sortPopularity}>
        Sort by popularity
      </button>
      <table>
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Popularity</th>
            <th>Won an Oscar</th>
            <th>Won an Emmy</th>
            <th>Deletion</th>
          </tr>
        </thead>
        <tbody>
          {movieContacts.map((contact) => {
            return (
              <tr key={contact.id}>
                <th>
                  <img className="icon-img" src={contact.pictureUrl} alt="" />
                </th>
                <th>{contact.name}</th>
                <th>{contact.popularity}</th>
                {contact.wonEmmy ? <th>🏆</th> : <th></th>}
                {contact.wonOscar ? <th>🏆</th> : <th></th>}
                <th>
                  <button onClick={()=>deleteContact(contact.id)}>Delete</button>
                </th>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
