const BASE_URL = "https://notes-api.dicoding.dev/v1";

function getAccessToken() {
  return localStorage.getItem("accessToken");
}

function putAccessToken(accessToken) {
  return localStorage.setItem("accessToken", accessToken);
}

async function fetchWithToken(url, options = {}) {
  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });
}

async function login({ email, password }) {
  const response = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const responseJson = await response.json();

  return { status: responseJson.status, message: responseJson.message, data: responseJson.data };
}

async function register({ name, email, password }) {
  const response = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  });

  const responseJson = await response.json();

  return { status: responseJson.status, message: responseJson.message };
}

async function getUserLogged() {
  const response = await fetchWithToken(`${BASE_URL}/users/me`);
  const responseJson = await response.json();

  return { status: responseJson.status, message: responseJson.message, data: responseJson.data };
}

async function addNote({ title, body }) {
  const response = await fetchWithToken(`${BASE_URL}/notes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, body }),
  });

  const responseJson = await response.json();

  return { status: responseJson.status, message: responseJson.message };
}

async function getActiveNotes() {
  const response = await fetchWithToken(`${BASE_URL}/notes`);
  const responseJson = await response.json();

  if (responseJson.status !== "success") {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data };
}

async function getArchivedNotes() {
  const response = await fetchWithToken(`${BASE_URL}/notes/archived`);
  const responseJson = await response.json();

  if (responseJson.status !== "success") {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data };
}

async function getNote(id) {
  const response = await fetchWithToken(`${BASE_URL}/notes/${id}`);
  const responseJson = await response.json();

  if (responseJson.status !== "success") {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data };
}

async function archiveNote(id) {
  const response = await fetchWithToken(`${BASE_URL}/notes/${id}/archive`, {
    method: "POST",
  });

  const responseJson = await response.json();

  return { status: responseJson.status, message: responseJson.message };
}

async function unarchiveNote(id) {
  const response = await fetchWithToken(`${BASE_URL}/notes/${id}/unarchive`, {
    method: "POST",
  });

  const responseJson = await response.json();

  return { status: responseJson.status, message: responseJson.message };
}

async function deleteNote(id) {
  const response = await fetchWithToken(`${BASE_URL}/notes/${id}`, {
    method: "DELETE",
  });

  const responseJson = await response.json();

  return { status: responseJson.status, message: responseJson.message };
}

const searchNotes = async (keyword, archived) => {
  if (archived) {
    const { error, data } = await getArchivedNotes();
    if (!error) {
      const filteredActiveNotes = data.filter((note) => note.title.toLowerCase().includes(keyword.toLowerCase()) && note.archived);
      return { error: false, data: filteredActiveNotes };
    }
    return { error: true, data: null };
  }
  const { error, data } = await getActiveNotes();
  if (!error) {
    const filteredArchivedNotes = data.filter((note) => note.title.toLowerCase().includes(keyword.toLowerCase()) && !note.archived);
    return { error: false, data: filteredArchivedNotes };
  }
  return { error: true, data: null };
};

const showFormattedDate = (date, language) => {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(date).toLocaleDateString(language === "english" ? "en-US" : "id-ID", options);
};

export { getAccessToken, putAccessToken, login, register, getUserLogged, addNote, getActiveNotes, getArchivedNotes, getNote, archiveNote, unarchiveNote, deleteNote, searchNotes, showFormattedDate };
