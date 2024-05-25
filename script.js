// console.log("I love you mere mahadev");

const searchBtn = document.getElementById("SearchBtn");
const searchId = document.querySelector("[searched-name]");
const url = "https://api.github.com/users/";
const profilePic = document.querySelector("[profile-img]");
const userName = document.querySelector("[dev-name]");
const doj = document.querySelector("[date-of-join]");
const ProfileLink = document.querySelector("[profile-link]");
const bio = document.querySelector("[dev-bio]");
const repos = document.querySelector("[repo-box]");
const followers = document.querySelector("[follower-box]");
const follwing = document.querySelector("[following-box]");
const address = document.querySelector("[address]");
const blog = document.querySelector("[blog]");
const twitter = document.querySelector("[twitter]");
const company = document.querySelector("[company]");
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const infoBox = document.querySelector("[info-box]");

searchId.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const id = searchId.value;
    if (id !== "") getUserData(id);
  }
});

searchBtn.addEventListener("click", () => {
  const id = searchId.value;
  if (id !== "") getUserData(id);
});

searchId.addEventListener("keydown", function (e) {
  if (e.key == "Enter") {
    if (searchId.value !== "") getUserData(searchId.value);
  }
});

async function getUserData(name) {
  const response = await fetch(url + name);
  const data = await response.json();

  // console.log(data);
  // console.log(data?.login);
  // console.log(data?.id);
  updateProfile(data);
}

function checkNull(p1, p2) {
  if (p1 == "" || p1 == null) {
    p2.style.opacity = 0.5;
    p2.previousElementSibling.style.opacity = 0.5;
    return false;
  } else {
    return true;
  }
}

function updateProfile(userData) {
  profilePic.src = `https://avatars.githubusercontent.com/u/${userData?.id}?v=4`;
  userName.innerText = `${userData?.name}`;
  dateSegment = userData.created_at.split("T").shift().split("-");
  doj.innerText = `Joined ${dateSegment[2]} ${months[dateSegment[1] - 1]} ${
    dateSegment[0]
  }`;
  ProfileLink.href = `https://github.com/${userData?.login}`;
  ProfileLink.innerText = `${userData?.login}`;
  bio.innerText = `${userData?.bio}`;
  repos.innerText = `${userData?.public_repos}`;
  followers.innerText = `${userData?.followers}`;
  follwing.innerText = `${userData?.following}`;
  address.innerText = checkNull(userData.location, address)
    ? userData.location
    : "Not Available";
  blog.innerText = checkNull(userData.blog, blog)
    ? userData.blog
    : "Not Available";
  twitter.innerText = checkNull(userData.twitter_username, twitter)
    ? userData.twitter_username
    : "Not Available";
  company.innerText = checkNull(userData.company, company)
    ? userData.company
    : "Not Available";
  
  
  infoBox.classList.add("active");
}
