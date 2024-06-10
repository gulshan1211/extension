

window.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('Submit').addEventListener('click', Help);
    document.getElementById('GoodMorning').addEventListener('click', () => {
        vscode.postMessage({
            type: 'goodMorning'
        });
    });
    document.getElementById('GoodNight').addEventListener('click', () => {
        vscode.postMessage({
            type: 'goodNight'
        });
    });
});
let query ='';

function Help() {
    // Get the value from the input field
    // var inputText = document.getElementById("userInput").value;
    // // Display the input text in the display div
    // document.getElementById("display").innerText = "You entered: " + inputText;

    // Get input field and trim the message
    const inputField = document.getElementById('userInput');
    const message = inputField.value.trim();
    // Update query with the user message
    query = message;
    // Log the message
    console.log(message);
    // If message is empty, return
    if (message === "") return;

    // Get chat window
    const chatWindow = document.getElementById('display');

    // Create div for user message
    const userMessageDiv = document.createElement('div');
    userMessageDiv.classList.add('message', 'user-message');
    userMessageDiv.textContent = message;
    // Append user message to chat window
    chatWindow.append(userMessageDiv);

 

    // Clear input field
    inputField.value = "";

    // Scroll chat window to bottom
    chatWindow.scrollTop = chatWindow.scrollHeight;
    fetchresponse();
}

// // Options for fetch request
// const options = {
//     method: 'GET',
//     headers: {
//         'x-rapidapi-key': '3180f78df6msh0979ad91d6caf66p1edc56jsn5b8f72608fb8',
// 		'x-rapidapi-host': 'reddit34.p.rapidapi.com'
//     }
// };

// // Function to fetch news based on user query
// async function fetchNews() {
//     const url = `https://reddit34.p.rapidapi.com/getPostsByUsername?username=${query}&sort=new`;
//     try {
//         // Fetch data from API
//         const response = await fetch(url, options);
//         if (!response.ok) {
//             throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         const result = await response.json(); // Parse the JSON response
//         // if user is not defined
//         if (!result.success) {
//             const errorMessage = document.createElement('div');
//             errorMessage.textContent = "No user found by this name";
//             errorMessage.style.color = 'red'; // Set text color to red

//             // Append the error message to the chatWindow
//             const chatWindow = document.getElementById('display');
//             chatWindow.appendChild(errorMessage);
//             return; // Exit the function
//         }

//         // Render the fetched posts
//         renderPosts(result.data.posts);
//     } catch (error) {
//         console.error('Error:', error);
//     }
// }

async function fetchresponse() {
    const url = `http://127.0.0.1:5000/chat`;
    
    // Create form data
    const formData = new FormData();
    formData.append('user_input', query); // Replace 'key1' and 'value1' with your actual form data
   
    
    const options = {
        method: 'POST',
        body: formData
    };
    
    try {
        // Fetch data from API
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json() ;
        const data = result.response ; // Parse the JSON response
        console.log(result.response)
        const chatWindow = document.getElementById('display');;
        const test = document.createElement('div');
        test.innerText=data ;
            chatWindow.appendChild(test);
            
        // if user is not defined
        // if (!result.success) {
        //     const errorMessage = document.createElement('div');
        //     errorMessage.textContent = "No user found by this name";
        //     errorMessage.style.color = 'red'; // Set text color to red

        //     // Append the error message to the chatWindow
        //     const chatWindow = document.getElementById('display');
        //     chatWindow.appendChild(errorMessage);
        //     return; // Exit the function
        // }

        // Render the fetched posts
        //renderPosts(result.data.posts);
    } catch (error) {
        console.error('Error:', error);
    }
}



// Function to render fetched posts
function renderPosts(posts) {
    // Get chat window
    const chatWindow = document.getElementById('display');
    // Create container for posts
    const postContainer = document.createElement('div');
    postContainer.classList.add('post-container');
    
    // Loop through each post and create elements
    posts.forEach(post => {
        const postDiv = document.createElement('div');
        postDiv.classList.add('post');

        const titleElement = document.createElement('h2');
        titleElement.textContent = post.title;

        const authorElement = document.createElement('p');
        authorElement.textContent = 'Author: ' + post.author;

        const contentElement = document.createElement('div');
        contentElement.classList.add('post-content');

        // Loop through each paragraph in the post content and append to content element
        post.media.richtextContent.document.forEach(paragraph => {
            if (paragraph.c && paragraph.c[0] && paragraph.c[0].t) {
                const paragraphElement = document.createElement('p');
                paragraphElement.textContent = paragraph.c[0].t;
                contentElement.appendChild(paragraphElement);
            }
        });

        const linkElement = document.createElement('a');
        linkElement.textContent = 'Read More';
        linkElement.href = post.permalink;

        // Append elements to the postDiv
        postDiv.appendChild(titleElement);
        postDiv.appendChild(authorElement);
        postDiv.appendChild(contentElement);
        postDiv.appendChild(linkElement);

        // Append postDiv to the postContainer
        postContainer.appendChild(postDiv);
    });

    // Append postContainer to the chatWindow
    chatWindow.appendChild(postContainer);
}