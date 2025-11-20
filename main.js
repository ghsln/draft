
const dropbtn = document.querySelector('.dropbtn');
const dropdown = document.querySelector('.dropdown');

dropbtn.addEventListener('click', () => {
    dropdown.classList.toggle('show');
});


document.querySelectorAll('.dropdown-content a').forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        dropbtn.textContent = item.textContent;
        dropdown.classList.remove('show');
        console.log('Kategori dipilih:', item.dataset.category);
    });
});


window.addEventListener('click', function(e) {
    if (!dropdown.contains(e.target)) {
        dropdown.classList.remove('show');
    }
});



document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("bookModal");
    const modalCover = document.getElementById("modal-cover");
    const modalTitle = document.getElementById("modal-title");
    const modalAuthor = document.getElementById("modal-author");
    const modalYear = document.getElementById("modal-year");
    const modalRating = document.getElementById("modal-rating");
    const modalSynopsis = document.getElementById("modal-synopsis");
    const modalBorrow = document.getElementById("modal-borrow");
    const closeBtn = document.querySelector(".close-modal");


    const books = document.querySelectorAll(".book-item img");

    books.forEach(book => {
        book.addEventListener("click", () => {
            const data = {
                cover: book.src,
                title: book.nextElementSibling?.textContent || "Book Title",
                author: book.dataset.author || "Unknown Author",
                year: book.dataset.year || "0000",
                rating: book.dataset.rating || "⭐⭐⭐⭐⭐",
                synopsis: book.dataset.synopsis || "Sinopsis have not put yet.",
                borrowLink: book.dataset.borrow || "#"
            };

            modalCover.src = data.cover;
            modalTitle.textContent = data.title;
            modalAuthor.innerHTML = `<strong>Author:</strong> ${data.author}`;
            modalYear.innerHTML = `<strong>Published:</strong> ${data.year}`;
            modalRating.innerHTML = `<strong>Rating:</strong> ${data.rating}`;
            modalSynopsis.innerHTML = `<strong>Sinopsis:</strong> ${data.synopsis}`;
            modalBorrow.href = data.borrowLink;

            modal.style.display = "flex";
        });
    });


    closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });

    window.addEventListener("click", e => {
        if(e.target === modal){
            modal.style.display = "none";
        }
    });
});


//---------------------------------------------------------------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {
    const wrappers = document.querySelectorAll(".book-row-wrapper");

    wrappers.forEach(wrapper => {
        const row = wrapper.querySelector(".book-row");
        const btnLeft = wrapper.querySelector(".left-icon");
        const btnRight = wrapper.querySelector(".right-icon");

        if (!row) return; 

        const SCROLL_SIZE = 300;

        if (btnLeft) {
            btnLeft.addEventListener("click", () => {
                row.scrollBy({ left: -SCROLL_SIZE, behavior: "smooth" });
            });
        }

        if (btnRight) {
            btnRight.addEventListener("click", () => {
                row.scrollBy({ left: SCROLL_SIZE, behavior: "smooth" });
            });
        }
    });

    console.log("Universal book slider siap untuk semua kategori.");
});



//-------------------------------------------------------------------------------------------------------------------------

const defaultComments = [
    {name: "Emily", text: "Such a beautiful library concept!"},
    {name: "Lucas", text: "I hope more genres get added soon."},
    {name: "Anna", text: "The UI looks super clean!"},
    {name: "James", text: "I love the automatic scrolling feature."},
    {name: "Sophie", text: "Can't wait to borrow more books!"},
    {name: "Michael", text: "The library design is amazing."},
    {name: "Olivia", text: "The comment section looks fun!"},
    {name: "Ethan", text: "Nice job on the community section!"}
];

function createCommentCard(name, text, imgSrc=null) {
    const card = document.createElement("div");
    card.className = "comment-card";

    let imgHTML = imgSrc ? `<img src="${imgSrc}" alt="uploaded image">` : "";

    card.innerHTML = `
        <div class="comment-header"><strong>${name}</strong></div>
        <div class="comment-body">${text}</div>
        ${imgHTML}
        <div class="comment-actions">
            <button class="like-btn">👍 Like</button>
            <button class="reply-btn">💬 Reply</button>
        </div>
        <div class="reply-box">
            <textarea placeholder="Write a reply..."></textarea>
            <button class="send-reply">Reply</button>
        </div>
        <div class="reply-list"></div>
    `;


    const likeBtn = card.querySelector(".like-btn");
    likeBtn.addEventListener("click", () => {
        if(likeBtn.textContent.includes("Liked")){
            likeBtn.textContent = "👍 Like";
            likeBtn.style.color = "black";
        } else {
            likeBtn.textContent = "👍 Liked";
            likeBtn.style.color = "blue";
        }
    });


    const replyBtn = card.querySelector(".reply-btn");
    const replyBox = card.querySelector(".reply-box");
    replyBtn.addEventListener("click", () => {
        replyBox.style.display = replyBox.style.display === "flex" ? "none" : "flex";
    });


    const sendReplyBtn = card.querySelector(".send-reply");
    const replyList = card.querySelector(".reply-list");
    sendReplyBtn.addEventListener("click", () => {
        const replyText = replyBox.querySelector("textarea").value.trim();
        if(!replyText) return;

        const replyDiv = document.createElement("div");
        replyDiv.className = "reply-text";
        replyDiv.textContent = replyText;
        replyList.appendChild(replyDiv);
        replyBox.querySelector("textarea").value = "";
    });

    return card;
}


defaultComments.forEach(c => commentContainer.appendChild(createCommentCard(c.name, c.text)));


postBtn.addEventListener("click", () => {
    const username = document.getElementById("username").value.trim();
    const commentText = document.getElementById("commentText").value.trim();
    const fileInput = document.getElementById("commentImage");

    if(!username || !commentText){
        alert("Please enter your name and comment.");
        return;
    }

    if(fileInput.files && fileInput.files[0]){
        const reader = new FileReader();
        reader.onload = function(e){
            commentContainer.prepend(createCommentCard(username, commentText, e.target.result));
        }
        reader.readAsDataURL(fileInput.files[0]);
    } else {
        commentContainer.prepend(createCommentCard(username, commentText));
    }

    document.getElementById("username").value = "";
    document.getElementById("commentText").value = "";
    fileInput.value = "";
});

// Scroll buttons
document.getElementById("scrollUp").addEventListener("click", () => {
    commentContainer.scrollBy({top: -100, behavior: "smooth"});
});
document.getElementById("scrollDown").addEventListener("click", () => {
    commentContainer.scrollBy({top: 100, behavior: "smooth"});
});


