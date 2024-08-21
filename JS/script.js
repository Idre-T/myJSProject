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
  const contactsList = document.querySelector(".phone-contact-list");
  const confirmText = document.getElementById("confirm-text");
  const confirmForm = document.getElementById("confirm-popup");
  const cancelBtn = document.getElementById("confirm-cancelBtn");
  const confirmBtn = document.getElementById("confirm-confirmBtn");
  const alertText = document.querySelector(".alert");
  const searchInput = document.getElementById("search-input");
  let contactIndex = -1;

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
      ImageURL: `https://i.pravatar.cc/100?img=${Math.floor(
        Math.random() * 71
      )}`,
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
    closeConfirmModal();
    displayEmptyListMessage();
  }

  // Event listener for delete all button
  deleteAllBtn.addEventListener("click", function (event) {
    event.preventDefault();
    confirmText.textContent = "Are you sure you want to delete all contacts?";
    openConfirmModal(deleteAllContacts);
  });

  // Function to open and close the confirmation modal
  function openConfirmModal(callback) {
    confirmForm.style.display = "flex";
    confirmBtn.addEventListener("click", function handler() {
      callback();
      confirmBtn.removeEventListener("click", handler); // Remove the event listener after use
      closeConfirmModal();
    });
  }

  function closeConfirmModal() {
    confirmForm.style.display = "none";
  }

  // Event listener for cancel button in the confirmation modal
  cancelBtn.addEventListener("click", closeConfirmModal);

  // Function to display or hide empty list message
  function displayEmptyListMessage() {
    const emptyListMessage = document.getElementById("empty-list");
    if (contacts.length === 0) {
      emptyListMessage.style.display = "block";
    } else {
      emptyListMessage.style.display = "none";
    }
  }

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

    displayEmptyListMessage();
  }

  // Function to edit a contact
  function editContact(name) {
    contactIndex = contacts.findIndex((contact) => contact.Name === name);
    const contact = contacts[contactIndex];
    nameInput.value = contact.Name;
    phoneInput.value = contact.PhoneNumber;
    addressInput.value = contact.Address;
    emailInput.value = contact.Email;
    alertText.innerHTML = "Edit Contact";
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
    alertText.innerHTML = "New Contact"; // reset to "New Contact" from "Edit Contact"
    clearInputFields(); // Clear input fields on close
  }

  // Function to clear input fields
  function clearInputFields() {
    nameInput.value = "";
    phoneInput.value = "";
    addressInput.value = "";
    emailInput.value = "";
  }

  // Function to filter contacts by name
  function filterContacts(searchedName) {
    const filteredContacts = contacts.filter((contact) =>
      contact.Name.toLowerCase().includes(searchedName.toLowerCase())
    );
    displayContacts(filteredContacts);
  }

  // Event listener for search input field
  searchInput.addEventListener("input", function () {
    filterContacts(searchInput.value);
  });

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
