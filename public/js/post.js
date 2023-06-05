// Delete a post

const delButtonHandler = async (event) => {
  event.preventDefault();
  // console.log(event.target.hasAttribute("data-id"));
  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");

    const response = await fetch(`/api/posts/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to delete post");
    }
  }
};

const deleteButton = document.querySelector("#delete-btn");

if (deleteButton != null) {
  deleteButton.addEventListener("click", delButtonHandler);
}

// Edit
async function editFormHandler(event) {
  event.preventDefault();

  const title = document.querySelector('input[name="post-title"]').value.trim();
  const content = document.querySelector('input[name="content"]').value.trim();

  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];

  const response = await fetch(`/api/posts/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      post_id: id,
      title,
      content,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert(response.statusText);
  }
}

const submitButton = document.querySelector(".edit-post-form");

if (submitButton != null) {
  submitButton.addEventListener("submit", editFormHandler);
}
