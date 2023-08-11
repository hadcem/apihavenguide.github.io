const categorySelect = document.getElementById('categorySelect');
const apiList = document.getElementById('apiList');

fetch('https://api.publicapis.org/categories')
    .then(response => response.json())
    .then(data => {
        data.categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.text = category;
            categorySelect.appendChild(option);
        });
    });

categorySelect.addEventListener('change', () => {
    const selectedCategory = categorySelect.value;
    if (selectedCategory) {
        fetch(`https://api.publicapis.org/entries?category=${selectedCategory}`)
            .then(response => response.json())
            .then(data => {
                apiList.innerHTML = '';
                data.entries.forEach(api => {
                    const apiItem = document.createElement('div');
                    apiItem.innerHTML = `
                        <h2>${api.API}</h2>
                        <p><strong>Description:</strong> ${api.Description}</p>
                        <p><strong>Auth:</strong> ${api.Auth || 'N/A'}</p>
                        <p><strong>HTTPS:</strong> ${api.HTTPS}</p>
                        <p><strong>Link:</strong> <a href="${api.Link}" target="_blank">${api.Link}</a></p>
                    `;
                    apiList.appendChild(apiItem);
                });
            })
            .catch(error => console.error('Error fetching APIs:', error));
    } else {
        apiList.innerHTML = '';
    }
});
