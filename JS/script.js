"use strict";

document.addEventListener("DOMContentLoaded", function () {
  // Variables and buttons
  const showFormBtn = document.getElementById("showFormBtn");
  const hideFormBtn = document.querySelector(".cancelBtn");
  const contactForm = document.querySelector(".contact-modal");
  const saveConfirmBtn = document.getElementById("saveBtn");
  const deleteAllBtn = document.getElementById("delete-all");
  const nameInput = document.getElementById("name");
  const phoneInput = document.getElementById("phone");
  const addressInput = document.getElementById("address");
  const emailInput = document.getElementById("email");
  let contactIndex = -1;
  const contactsList = document.querySelector(".phone-contact-list");

  // create contacts array of objects
  let contacts = [
    {
      Name: "John Doe",
      PhoneNumber: "0543210987",
      Address: "456 Oak Avenue, Anycity, USA",
      Email: "john.doe@example.com",
      ImageURL: "https://i.pravatar.cc/100?img=1",
    },
    {
      Name: "Jane Smith",
      PhoneNumber: "0505551234",
      Address: "789 Elm Street, Anystate, USA",
      Email: "jane.smith@example.com",
      ImageURL: "https://i.pravatar.cc/100?img=2",
    },
    {
      Name: "Bob Johnson",
      PhoneNumber: "0524478714",
      Address: "321 Pine Road, Anyvillage, USA",
      Email: "bob.johnson@example.com",
      ImageURL: "https://i.pravatar.cc/100?img=3",
    },
    {
      Name: "Sammy Larry",
      PhoneNumber: "0544825478",
      Address: "654 Maple Lane, Anysuburb, USA",
      Email: "sammy.larry@example.com",
      ImageURL: "https://i.pravatar.cc/100?img=4",
    },
  ];

  // Create names array
  let contactNames = contacts.map((person) => person.Name);

  // Sort the contacts array by name
  function sortContacts() {
    contacts.sort((a, b) => a.Name.localeCompare(b.Name));
  }

  // Function to add or update a contact
  function addOrUpdateContact() {
    const contact = {
      Name: nameInput.value.trim(),
      PhoneNumber: phoneInput.value.trim(),
      Address: addressInput.value.trim(),
      Email: emailInput.value.trim(),
      ImageURL: `https://i.pravatar.cc/100?img=${Math.floor(Math.random() * 71)}`    
    };

    if (contactIndex === -1) {
      // Add new contact
      contacts.push(contact);
      contactNames.push(contact.Name);
    } else {
      // Update existing contact
      contacts[contactIndex] = contact;
      contactNames[contactIndex] = contact.Name;
    }

    clearInputFields();
    contactIndex = -1;
    closeModal();
    sortContacts();
    displayContacts();
  }

  // Function to delete all contacts
  function deleteAllContacts() {
    contacts = [];
    contactNames = [];
    contactsList.innerHTML = ""; // Clear the contacts list
  }

  // Event listener for delete all button
  deleteAllBtn.addEventListener("click", function (event) {
    event.preventDefault();
    deleteAllContacts();
  });

  function generateContact(name, imageSrc) {
    const contactHtml = `
      <li class="contact">
        <img src="${imageSrc}" alt="${name}" />
        <h2>${name}</h2>
        <div class="icons">
          <span class="edit-icon">&#9998;</span>
          <span class="remove-icon">&#10006;</span>
          <span class="info-icon">&#8505;</span>
        </div>
      </li>
    `;
    return contactHtml;
  }

  // Function to refresh the contacts list UI
  function displayContacts(filteredContacts = contacts) {
    contactsList.innerHTML = "";
    filteredContacts.forEach((person) => {
      const contact = generateContact(person.Name, person.ImageURL);
      const contactElement = document.createElement("li");
      contactElement.innerHTML = contact;
      const editIcon = contactElement.querySelector(".edit-icon");

      editIcon.addEventListener("click", function () {
        editContact(person.Name);
      });

      const removeIcon = contactElement.querySelector(".remove-icon");

      removeIcon.addEventListener("click", function () {
        deleteContact(person);
      });

      contactsList.appendChild(contactElement);
    });
  }

  // Function to edit a contact
  function editContact(name) {
    contactIndex = contacts.findIndex((contact) => contact.Name === name);
    const contact = contacts[contactIndex];
    nameInput.value = contact.Name;
    phoneInput.value = contact.PhoneNumber;
    addressInput.value = contact.Address;
    emailInput.value = contact.Email;
    openModal();
  }

  // Function to delete a contact
  function deleteContact(contact) {
    const index = contacts.indexOf(contact);
    if (index !== -1) {
      contacts.splice(index, 1);
      displayContacts();
    }
  }

  // Function to open and close the contact modal
  function openModal() {
    contactForm.style.display = "flex";
  }

  function closeModal() {
    contactForm.style.display = "none";
    clearInputFields(); // Clear input fields on close
  }

  // Function to clear input fields
  function clearInputFields() {
    nameInput.value = "";
    phoneInput.value = "";
    addressInput.value = "";
    emailInput.value = "";
  }

  // Event listener for show form button to open modal
  showFormBtn.addEventListener("click", function () {
    openModal();
  });

  // Event listener for cancel button in the contact modal
  hideFormBtn.addEventListener("click", function () {
    closeModal();
  });

  // Event listener for save button in the contact modal
  saveConfirmBtn.addEventListener("click", function (e) {
    e.preventDefault();
    addOrUpdateContact();
  });

  // Initial sort and display of contacts
  sortContacts();
  displayContacts();
});
