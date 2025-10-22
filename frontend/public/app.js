const api = "/api/tasks";
const $list = document.getElementById("task-list");
const $form = document.getElementById("task-form");
const $loading = document.getElementById("loading");

async function fetchTasks() {
  $loading.classList.remove("hidden");
  const res = await fetch(api);
  const data = await res.json();
  $loading.classList.add("hidden");
  render(data);
}

function render(tasks) {
  $list.innerHTML = "";
  tasks.forEach(t => {
    const li = document.createElement("li");
    li.innerHTML = `
      <div class="row">
        <div>
          <strong>#${t.id}</strong> ${t.titulo}
          <small>(${t.estado})</small>
          <div class="desc">${t.descripcion ?? ""}</div>
        </div>
        <div class="actions">
          <button data-id="${t.id}" class="edit">Editar</button>
          <button data-id="${t.id}" class="del">Eliminar</button>
        </div>
      </div>
    `;
    $list.appendChild(li);
  });

  // acciones
  $list.querySelectorAll(".del").forEach(btn => {
    btn.onclick = async () => {
      const id = btn.dataset.id;
      await fetch(`${api}/${id}`, { method: "DELETE" });
      fetchTasks();
    };
  });

  $list.querySelectorAll(".edit").forEach(btn => {
    btn.onclick = async () => {
      const id = btn.dataset.id;
      const titulo = prompt("Nuevo título:");
      const descripcion = prompt("Nueva descripción:");
      const estado = prompt("Estado (pendiente/completada):");
      await fetch(`${api}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ titulo, descripcion, estado })
      });
      fetchTasks();
    };
  });
}

$form.onsubmit = async (e) => {
  e.preventDefault();
  const titulo = document.getElementById("titulo").value;
  const descripcion = document.getElementById("descripcion").value;
  const estado = document.getElementById("estado").value;
  await fetch(api, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ titulo, descripcion, estado })
  });
  $form.reset();
  fetchTasks();
};

fetchTasks();
