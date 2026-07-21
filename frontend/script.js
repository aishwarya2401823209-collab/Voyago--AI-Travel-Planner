// ======================================
// SIGN UP
// ======================================

const signupForm = document.getElementById("signupForm");

if (signupForm) {

    signupForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const user = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            phone: document.getElementById("phone").value,
            password: document.getElementById("password").value
        };

       let users = JSON.parse(localStorage.getItem("voyagoUsers")) || [];

const alreadyExists = users.some(u => u.email === user.email);

if (alreadyExists) {
    alert("An account with this email already exists.");
    return;
}

users.push(user);

localStorage.setItem("voyagoUsers", JSON.stringify(users));
localStorage.setItem("loggedInUser", JSON.stringify(user));
localStorage.setItem("loggedIn", "true");

        alert("Account created successfully!");

        window.location.href = "index.html";

    });

}



// ======================================
// LOGIN
// ======================================

// ======================================
// LOGIN
// ======================================

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const email = document.getElementById("loginEmail").value;
        const password = document.getElementById("loginPassword").value;

        const users = JSON.parse(localStorage.getItem("voyagoUsers")) || [];

        // Check if account exists
        const user = users.find(u => u.email === email);

        if (!user) {

            alert("No account found. Please sign up first.");
            return;

        }

        // Check password
        if (user.password === password) {

            localStorage.setItem("loggedInUser", JSON.stringify(user));
            localStorage.setItem("loggedIn", "true");

            alert("Login successful!");

            window.location.href = "index.html";

        }

        else {

            alert("Invalid email or password.");

        }

    });

}


// ======================================
// PAGE LOAD
// ======================================

document.addEventListener("DOMContentLoaded", function () {

    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    const loggedIn = localStorage.getItem("loggedIn");

    const profileBtn = document.getElementById("profileBtn");
    const profileSidebar = document.getElementById("profileSidebar");
    const closeSidebar = document.getElementById("closeSidebar");

    const sidebarUserName = document.getElementById("sidebarUserName");
    const sidebarUserEmail = document.getElementById("sidebarUserEmail");

    const profileName = document.querySelector(".profile-link span");

    // ===========================
    // Show user name in navbar
    // ===========================

    if (profileName) {

        if (loggedIn === "true" && user) {
            profileName.textContent = user.name;
        } else {
            profileName.textContent = "Profile";
        }

    }

    // ===========================
    // Profile button
    // ===========================

    if (profileBtn) {

        profileBtn.addEventListener("click", function (e) {

            e.preventDefault();

            if (loggedIn !== "true" || !user) {

                window.location.href = "profile.html";
                return;

            }

            if (sidebarUserName) {
                sidebarUserName.textContent = user.name;
            }

            if (sidebarUserEmail) {
                sidebarUserEmail.textContent = user.email;
            }

            if (profileSidebar) {
                profileSidebar.classList.add("active");
            }

        });

    }

    // ===========================
    // Close sidebar
    // ===========================

    if (closeSidebar) {

        closeSidebar.addEventListener("click", function () {

            if (profileSidebar) {
                profileSidebar.classList.remove("active");
            }

        });

    }

    // ===========================
    // Logout
    // ===========================

    const logoutBtn = document.getElementById("logoutBtn");

    if (logoutBtn) {

        logoutBtn.addEventListener("click", function () {

            localStorage.removeItem("loggedIn");
            localStorage.removeItem("loggedInUser");

            alert("Logged out successfully!");

            window.location.href = "index.html";

        });

    }

});