function updateTable() {
    const tableBody = document.querySelector("#storageTable tbody");
    tableBody.innerHTML = "";
  
    const storage = getStorage();
    const keys = Object.keys(storage);
  
    if (keys.length === 0) {
      const emptyRow = document.createElement("tr");
      const emptyHeader = document.createElement("td");
      emptyHeader.setAttribute("colspan", "3");
      emptyHeader.textContent = "Нет данных";
      emptyRow.appendChild(emptyHeader);
      tableBody.appendChild(emptyRow);
    } else {
      for (let key of keys) {
        const value = storage[key];
  
        const row = document.createElement("tr");
        const keyCell = document.createElement("td");
        const valueCell = document.createElement("td");
        const deleteCell = document.createElement("td");
        const deleteButton = document.createElement("span");
  
        keyCell.textContent = key;
        valueCell.textContent = value;
        deleteButton.textContent = "X";
        deleteButton.setAttribute("onclick", `deleteItem('${key}')`);
  
        deleteCell.appendChild(deleteButton);
  
        row.appendChild(keyCell);
        row.appendChild(valueCell);
        row.appendChild(deleteCell);
  
        tableBody.appendChild(row);
      }
    }
  }
  
  window.onload = function() {
    updateTable();
  
    document.querySelector("#sessionStorageButton").onclick = function() {
      saveItem(sessionStorage);
    };
  
    document.querySelector("#localStorageButton").onclick = function() {
      saveItem(localStorage);
    };
  
    document.querySelector("#clearStorageButton").onclick = function() {
      clearStorage();
    };
  };
  
  function getStorage() {
    const storage = getCurrentStorage();
    const data = {};
  
    for (let i = 0; i < storage.length; i++) {
      const key = storage.key(i);
      data[key] = storage.getItem(key);
    }
  
    return data;
  }
  
  function getCurrentStorage() {
    return Object.assign({}, sessionStorage, localStorage);
  }
  
  function saveItem(storage) {
    const key = prompt("Введите ключ:");
    const value = prompt("Введите значение:");
  
    if (key && value) {
      storage.setItem(key, value);
      updateTable();
    }
  }
  
  function deleteItem(key) {
    const confirmDelete = confirm("Вы уверены, что хотите удалить эту запись?");
  
    if (confirmDelete) {
      getCurrentStorage().removeItem(key);
      updateTable();
    }
  }
  
  function clearStorage() {
    const confirmClear = confirm("Вы уверены, что хотите полностью очистить хранилище?");
  
    if (confirmClear) {
      getCurrentStorage().clear();
      updateTable();
    }
  }