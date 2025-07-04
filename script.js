async function getData() {
    try {
        let res = await fetch("https://jsonplaceholder.typicode.com/posts");
        let data = await res.json();
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
}

async function getId() {
    const input = document.getElementById("id").value;
    const count = parseInt(input);
    const resultDiv = document.getElementById("result");

    resultDiv.innerHTML = ""; 

    if (isNaN(count) || count <= 0) {
        console.log("Please enter a valid positive number.");
        resultDiv.innerHTML = "<p>Please enter a valid positive number.</p>";
        return;
    }

    const data = await getData();

    if (data && data.length) {
        console.log(`--- First ${count} Posts ---`);
        let table = `<table style="width: 100%;">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>User ID</th>
                                <th>ID</th>
                                <th>Title</th>
                            </tr>
                        </thead>
                        <tbody>`;
        for (let i = 0; i < count && i < data.length; i++) {
            const post = data[i];
            console.log(`${i + 1}. [ID: ${post.id}] Title: ${post.title}`);
            table += `<tr>
                        <td>${i + 1}</td>
                        <td>${post.userId}</td>
                        <td>${post.id}</td>
                        <td>${post.title}</td>
                      </tr>`;
        }
        table += `</tbody>
                  </table>`;
        resultDiv.innerHTML = table;
    } else {
        console.log("No data received from API.");
        resultDiv.innerHTML = "<p>No data found.</p>";
    }
}
